/**
 * Reading time calculation utility
 * Standard adult reading speed is ~200 words per minute (WPM).
 * For technical explanations, code walkthroughs, and case studies, 180-200 WPM is widely used.
 */

export interface ReadingTimeResult {
  minutes: number;
  words: number;
  text: string;
}

/**
 * Calculates estimated reading time for a given text or collection of text fragments.
 *
 * @param content - String or array of strings to analyze
 * @param wordsPerMinute - Average reading speed (default: 200 WPM)
 * @param suffix - Optional custom suffix or unit (default: 'min read')
 */
export function calculateReadingTime(
  content: string | (string | undefined | null)[],
  wordsPerMinute: number = 200,
  suffix: string = 'min read'
): ReadingTimeResult {
  const parts: string[] = Array.isArray(content)
    ? (content.filter(Boolean) as string[])
    : [content || ''];

  const rawText = parts.join(' ').trim();

  if (!rawText) {
    return {
      minutes: 1,
      words: 0,
      text: `1 ${suffix}`,
    };
  }

  // Split on whitespace to get word tokens
  const words = rawText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));

  return {
    minutes,
    words,
    text: `${minutes} ${suffix}`,
  };
}
