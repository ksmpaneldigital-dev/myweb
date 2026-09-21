/**
 * High-performance Fuzzy Search Utility for Projects & Portfolio items.
 * Implements subsequence matching, word-boundary bonuses, Levenshtein typo-tolerance,
 * and relevance scoring.
 */

export interface FuzzyMatchResult {
  match: boolean;
  score: number;
}

/**
 * Calculates Levenshtein distance between two strings
 */
export function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  const dp: number[] = Array.from({ length: n + 1 }, (_, i) => i);

  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const temp = dp[j];
      if (a[i - 1] === b[j - 1]) {
        dp[j] = prev;
      } else {
        dp[j] = 1 + Math.min(prev, dp[j], dp[j - 1]);
      }
      prev = temp;
    }
  }

  return dp[n];
}

/**
 * Scores a single query term against a target text
 */
function scoreTermAgainstText(term: string, text: string): number {
  const t = text.toLowerCase();
  const q = term.toLowerCase();

  if (!q || !t) return 0;

  // 1. Exact full substring match (highest baseline)
  const exactIndex = t.indexOf(q);
  if (exactIndex !== -1) {
    let score = 100 + q.length * 10;
    // Word boundary bonus
    if (exactIndex === 0 || /\s|[_-]/.test(t[exactIndex - 1])) {
      score += 40;
    }
    return score;
  }

  // 2. Acronym / Initials match (e.g. "pos" -> "Point of Sale", "crm" -> "Customer Relationship Management")
  const words = t.split(/[\s,./\\-_|:]+/).filter(Boolean);
  const initials = words.map((w) => w[0]).join('');
  if (initials.includes(q)) {
    return 95 + q.length * 5;
  }

  // 3. Typo-tolerant & Prefix word matching (Levenshtein & prefix)
  let bestWordScore = 0;
  for (const word of words) {
    if (word.startsWith(q)) {
      bestWordScore = Math.max(bestWordScore, 85 + q.length * 5);
      continue;
    }

    if (Math.abs(word.length - q.length) <= 3) {
      const dist = levenshteinDistance(q, word);
      const maxAllowedDist = q.length >= 7 ? 2 : q.length >= 3 ? 1 : 0;

      if (dist <= maxAllowedDist) {
        const ratio = 1 - dist / Math.max(q.length, word.length);
        const typoScore = Math.floor(ratio * 75);
        bestWordScore = Math.max(bestWordScore, typoScore);
      }
    }
  }

  // 4. Subsequence match (fzf style with density requirement)
  let qIdx = 0;
  let tIdx = 0;
  let firstMatchIdx = -1;
  let consecutiveMatches = 0;
  let subsequenceScore = 0;

  while (qIdx < q.length && tIdx < t.length) {
    if (q[qIdx] === t[tIdx]) {
      if (firstMatchIdx === -1) firstMatchIdx = tIdx;
      consecutiveMatches++;
      subsequenceScore += 8 + consecutiveMatches * 4;

      // Word boundary bonus
      if (tIdx === 0 || /\s|[_-]/.test(t[tIdx - 1])) {
        subsequenceScore += 18;
      }

      qIdx++;
    } else {
      consecutiveMatches = 0;
    }
    tIdx++;
  }

  if (qIdx === q.length) {
    const spread = tIdx - firstMatchIdx;
    // For short queries (< 5 chars), reject if spread is too loose
    const maxSpreadAllowed = q.length <= 3 ? q.length + 2 : q.length * 2.5;
    if (spread <= maxSpreadAllowed) {
      const densityBonus = Math.max(0, 25 - Math.floor((spread - q.length) * 2));
      subsequenceScore += densityBonus;
      return Math.max(subsequenceScore, bestWordScore);
    }
  }

  return bestWordScore;
}

export interface FuzzySearchResult<T> {
  item: T;
  score: number;
  matchedFields: ('title' | 'description' | 'tags')[];
}

/**
 * Fuzzy searches an array of items by title, description, and optional tags
 */
export function fuzzySearchProjects<
  T extends {
    title: string;
    description: string;
    longDescription?: string;
    tags: string[];
    category?: string;
  }
>(query: string, items: T[]): FuzzySearchResult<T>[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) {
    return items.map((item) => ({
      item,
      score: 1,
      matchedFields: [],
    }));
  }

  // Split query into tokens for multi-word fuzzy matching
  const tokens = cleanQuery.split(/\s+/).filter(Boolean);

  const results: FuzzySearchResult<T>[] = [];

  for (const item of items) {
    let totalScore = 0;
    const matchedFields: ('title' | 'description' | 'tags')[] = [];

    // All tokens must have some match across title, description, or tags
    let allTokensMatched = true;

    for (const token of tokens) {
      const titleScore = scoreTermAgainstText(token, item.title);
      const descScore = Math.max(
        scoreTermAgainstText(token, item.description),
        item.longDescription ? scoreTermAgainstText(token, item.longDescription) * 0.8 : 0
      );
      const tagScores = item.tags.map((t) => scoreTermAgainstText(token, t));
      const maxTagScore = tagScores.length > 0 ? Math.max(...tagScores) : 0;
      const catScore = item.category ? scoreTermAgainstText(token, item.category) : 0;

      // Threshold check for this token
      const tokenMatched = titleScore >= 25 || descScore >= 25 || maxTagScore >= 25 || catScore >= 25;

      if (!tokenMatched) {
        allTokensMatched = false;
        break;
      }

      if (titleScore >= 25 && !matchedFields.includes('title')) matchedFields.push('title');
      if (descScore >= 25 && !matchedFields.includes('description')) matchedFields.push('description');
      if (maxTagScore >= 25 && !matchedFields.includes('tags')) matchedFields.push('tags');

      // Title match has highest weight
      const weightedTokenScore =
        titleScore * 3.0 + descScore * 1.5 + maxTagScore * 2.0 + catScore * 1.2;

      totalScore += weightedTokenScore;
    }

    if (allTokensMatched && totalScore > 0) {
      results.push({
        item,
        score: totalScore,
        matchedFields,
      });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}
