/**
 * High-performance OpenGraph and Social Media Share Card Generator.
 * Generates pixel-perfect 1200x630 sharing cards using an off-screen HTML5 Canvas.
 * Supports custom name, job title, section badge, stats, and a rendered professional avatar.
 */

export interface OGCardOptions {
  name?: string;
  brand?: string;
  title?: string;
  subtitle?: string;
  sectionBadge?: string;
  avatarUrl?: string;
  highlights?: string[];
  theme?: 'dark' | 'neon' | 'cyber';
  websiteUrl?: string;
}

const DEFAULT_OPTIONS: Required<OGCardOptions> = {
  name: 'KIMSAN',
  brand: 'PRO SERVERS',
  title: 'Senior Full-Stack Developer & Software Architect',
  subtitle: 'Building modern, scalable web applications, enterprise APIs, & cloud infrastructure.',
  sectionBadge: 'Portfolio Showcase',
  avatarUrl: '/images/profile.png',
  highlights: ['React & TypeScript', 'Laravel & Node.js', 'Distributed Cloud APIs', 'High-Performance UI/UX'],
  theme: 'dark',
  websiteUrl: 'pro-servers.dev',
};

// Cache generated data URLs to avoid re-rendering unchanged cards
const cardCache = new Map<string, string>();

/**
 * Loads an image from a URL or relative path with timeout and crossOrigin handling.
 */
function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    const timer = setTimeout(() => {
      resolve(null);
    }, 3000);

    img.onload = () => {
      clearTimeout(timer);
      resolve(img);
    };

    img.onerror = () => {
      clearTimeout(timer);
      resolve(null);
    };

    img.src = src;
  });
}

/**
 * Draws rounded rectangle path.
 */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/**
 * Draws wrapped text with line clamping and max width.
 */
function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number = 3
): number {
  const words = text.split(' ');
  let line = '';
  let linesDrawn = 0;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      if (linesDrawn >= maxLines - 1) {
        ctx.fillText(line.trim() + '...', x, y);
        linesDrawn++;
        return linesDrawn * lineHeight;
      }
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
      linesDrawn++;
    } else {
      line = testLine;
    }
  }

  if (line.trim().length > 0 && linesDrawn < maxLines) {
    ctx.fillText(line, x, y);
    linesDrawn++;
  }

  return linesDrawn * lineHeight;
}

/**
 * Generates an OpenGraph 1200x630 image (Data URL / PNG).
 */
export async function generateSocialCard(options?: OGCardOptions): Promise<string> {
  const config = { ...DEFAULT_OPTIONS, ...options };
  const cacheKey = JSON.stringify(config);

  if (cardCache.has(cacheKey)) {
    return cardCache.get(cacheKey)!;
  }

  if (typeof document === 'undefined') {
    return '';
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 630;
  const ctx = canvas.getContext('2d');

  if (!ctx) return '';

  // 1. Background Fill - Deep modern obsidian / navy
  const bgGrad = ctx.createLinearGradient(0, 0, 1200, 630);
  bgGrad.addColorStop(0, '#090d16');
  bgGrad.addColorStop(0.5, '#0b1120');
  bgGrad.addColorStop(1, '#030712');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1200, 630);

  // 2. Ambient Lighting Glow Orbs
  // Top-left primary indigo glow
  const orb1 = ctx.createRadialGradient(250, 100, 20, 250, 100, 500);
  orb1.addColorStop(0, 'rgba(99, 102, 241, 0.28)');
  orb1.addColorStop(0.5, 'rgba(79, 70, 229, 0.12)');
  orb1.addColorStop(1, 'rgba(15, 23, 42, 0)');
  ctx.fillStyle = orb1;
  ctx.beginPath();
  ctx.arc(250, 100, 500, 0, Math.PI * 2);
  ctx.fill();

  // Bottom-right cyan/emerald glow
  const orb2 = ctx.createRadialGradient(980, 500, 20, 980, 500, 450);
  orb2.addColorStop(0, 'rgba(6, 182, 212, 0.22)');
  orb2.addColorStop(0.5, 'rgba(16, 185, 129, 0.08)');
  orb2.addColorStop(1, 'rgba(15, 23, 42, 0)');
  ctx.fillStyle = orb2;
  ctx.beginPath();
  ctx.arc(980, 500, 450, 0, Math.PI * 2);
  ctx.fill();

  // 3. Subtle grid lines pattern
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 1;
  const gridSize = 40;
  for (let x = 0; x < 1200; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 630);
    ctx.stroke();
  }
  for (let y = 0; y < 630; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1200, y);
    ctx.stroke();
  }

  // 4. Outer decorative border frame
  roundRect(ctx, 30, 30, 1140, 570, 24);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Top accent gradient line
  const topAccentGrad = ctx.createLinearGradient(120, 30, 1080, 30);
  topAccentGrad.addColorStop(0, 'rgba(99, 102, 241, 0)');
  topAccentGrad.addColorStop(0.3, 'rgba(99, 102, 241, 0.9)');
  topAccentGrad.addColorStop(0.7, 'rgba(6, 182, 212, 0.9)');
  topAccentGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
  ctx.strokeStyle = topAccentGrad;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(120, 30);
  ctx.lineTo(1080, 30);
  ctx.stroke();

  // 5. Header Brand & Badge Section
  // Brand Logo icon box
  const brandX = 80;
  const brandY = 80;
  roundRect(ctx, brandX, brandY, 48, 48, 12);
  const iconGrad = ctx.createLinearGradient(brandX, brandY, brandX + 48, brandY + 48);
  iconGrad.addColorStop(0, '#6366f1');
  iconGrad.addColorStop(1, '#06b6d4');
  ctx.fillStyle = iconGrad;
  ctx.fill();

  // Server icon representation
  ctx.fillStyle = '#ffffff';
  roundRect(ctx, brandX + 12, brandY + 12, 24, 6, 2);
  ctx.fill();
  roundRect(ctx, brandX + 12, brandY + 21, 24, 6, 2);
  ctx.fill();
  roundRect(ctx, brandX + 12, brandY + 30, 24, 6, 2);
  ctx.fill();
  // Status dot on icon
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.arc(brandX + 31, brandY + 15, 2, 0, Math.PI * 2);
  ctx.fill();

  // Brand Name
  ctx.font = '700 24px "Space Grotesk", system-ui, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('PRO ', brandX + 64, brandY + 32);
  const proWidth = ctx.measureText('PRO ').width;
  ctx.fillStyle = '#818cf8';
  ctx.fillText('SERVERS', brandX + 64 + proWidth, brandY + 32);

  // Section / Context Badge
  if (config.sectionBadge) {
    const badgeText = config.sectionBadge.toUpperCase();
    ctx.font = '600 13px system-ui, sans-serif';
    const badgeMetrics = ctx.measureText(badgeText);
    const badgeW = badgeMetrics.width + 28;
    const badgeH = 32;
    const badgeX = 1200 - 80 - badgeW;
    const badgeY = brandY + 8;

    roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 16);
    ctx.fillStyle = 'rgba(99, 102, 241, 0.15)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Pulse dot in badge
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(badgeX + 14, badgeY + 16, 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(badgeText, badgeX + 24, badgeY + 21);
  }

  // 6. Right Side - Professional Avatar & Status Badge (400px column)
  const avatarCenterX = 960;
  const avatarCenterY = 290;
  const avatarRadius = 115;

  // Avatar back glow
  const avatarGlow = ctx.createRadialGradient(
    avatarCenterX,
    avatarCenterY,
    50,
    avatarCenterX,
    avatarCenterY,
    160
  );
  avatarGlow.addColorStop(0, 'rgba(99, 102, 241, 0.45)');
  avatarGlow.addColorStop(0.7, 'rgba(6, 182, 212, 0.15)');
  avatarGlow.addColorStop(1, 'rgba(15, 23, 42, 0)');
  ctx.fillStyle = avatarGlow;
  ctx.beginPath();
  ctx.arc(avatarCenterX, avatarCenterY, 160, 0, Math.PI * 2);
  ctx.fill();

  // Try loading avatar image
  const avatarImg = await loadImage(config.avatarUrl);

  ctx.save();
  ctx.beginPath();
  ctx.arc(avatarCenterX, avatarCenterY, avatarRadius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  if (avatarImg) {
    ctx.drawImage(
      avatarImg,
      avatarCenterX - avatarRadius,
      avatarCenterY - avatarRadius,
      avatarRadius * 2,
      avatarRadius * 2
    );
  } else {
    // Elegant fallback avatar portrait
    const fallbackGrad = ctx.createLinearGradient(
      avatarCenterX - avatarRadius,
      avatarCenterY - avatarRadius,
      avatarCenterX + avatarRadius,
      avatarCenterY + avatarRadius
    );
    fallbackGrad.addColorStop(0, '#1e293b');
    fallbackGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = fallbackGrad;
    ctx.fill();

    ctx.font = '700 72px "Space Grotesk", system-ui, sans-serif';
    ctx.fillStyle = '#818cf8';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(config.name.charAt(0) || 'K', avatarCenterX, avatarCenterY);
  }
  ctx.restore();

  // Avatar ring border with gradient
  const ringGrad = ctx.createLinearGradient(
    avatarCenterX - avatarRadius,
    avatarCenterY - avatarRadius,
    avatarCenterX + avatarRadius,
    avatarCenterY + avatarRadius
  );
  ringGrad.addColorStop(0, '#818cf8');
  ringGrad.addColorStop(0.5, '#06b6d4');
  ringGrad.addColorStop(1, '#10b981');

  ctx.strokeStyle = ringGrad;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(avatarCenterX, avatarCenterY, avatarRadius + 3, 0, Math.PI * 2);
  ctx.stroke();

  // Availability badge under avatar
  const availW = 230;
  const availH = 34;
  const availX = avatarCenterX - availW / 2;
  const availY = avatarCenterY + avatarRadius + 22;

  roundRect(ctx, availX, availY, availW, availH, 17);
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Green pulsating status dot
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.arc(availX + 18, availY + 17, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = '600 12px system-ui, sans-serif';
  ctx.fillStyle = '#34d399';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('Available for Opportunities', availX + 30, availY + 17);

  // 7. Left Side - Person Name & Title & Subtitle
  const contentLeft = 80;
  const contentWidth = 640;

  // Person Name (KIMSAN)
  ctx.font = '800 48px "Space Grotesk", system-ui, sans-serif';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(config.name, contentLeft, 205);

  // Secondary handle
  ctx.font = '600 20px "JetBrains Mono", monospace';
  ctx.fillStyle = '#64748b';
  ctx.fillText(' / @v4udevelop', contentLeft + ctx.measureText(config.name).width + 12, 205);

  // Job Title / Headline with vibrant gradient
  ctx.font = '700 30px "Space Grotesk", system-ui, sans-serif';
  const titleGrad = ctx.createLinearGradient(contentLeft, 240, contentLeft + 600, 240);
  titleGrad.addColorStop(0, '#a5b4fc');
  titleGrad.addColorStop(0.6, '#38bdf8');
  titleGrad.addColorStop(1, '#34d399');
  ctx.fillStyle = titleGrad;

  // Draw title wrapped if long
  const titleLineHeight = 36;
  drawWrappedText(ctx, config.title, contentLeft, 252, contentWidth, titleLineHeight, 2);

  // Subtitle / Description
  ctx.font = '400 17px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillStyle = '#94a3b8';
  drawWrappedText(ctx, config.subtitle, contentLeft, 335, contentWidth, 26, 2);

  // 8. Key Highlights / Tech Pills
  const pillsY = 410;
  let currentPillX = contentLeft;

  config.highlights.slice(0, 4).forEach((skill) => {
    ctx.font = '600 13px "JetBrains Mono", monospace';
    const pillMetrics = ctx.measureText(skill);
    const pillWidth = pillMetrics.width + 24;
    const pillHeight = 34;

    if (currentPillX + pillWidth <= contentLeft + contentWidth + 20) {
      roundRect(ctx, currentPillX, pillsY, pillWidth, pillHeight, 8);
      ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(skill, currentPillX + 12, pillsY + 22);

      currentPillX += pillWidth + 10;
    }
  });

  // 9. Bottom Footer Bar inside card
  const footerY = 530;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(contentLeft, footerY);
  ctx.lineTo(1120, footerY);
  ctx.stroke();

  // Left website url
  ctx.font = '600 15px "JetBrains Mono", monospace';
  ctx.fillStyle = '#818cf8';
  ctx.fillText('🔗 https://' + config.websiteUrl, contentLeft, footerY + 36);

  // Platform badges on bottom right
  const badgeSocial = 'LinkedIn  •  Telegram  •  GitHub  •  X / Twitter';
  ctx.font = '500 14px system-ui, sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.textAlign = 'right';
  ctx.fillText(badgeSocial, 1120, footerY + 36);

  const dataUrl = canvas.toDataURL('image/png', 0.95);
  cardCache.set(cacheKey, dataUrl);
  return dataUrl;
}

/**
 * Downloads the generated card directly as a PNG file.
 */
export async function downloadSocialCard(options?: OGCardOptions, fileName?: string): Promise<void> {
  const dataUrl = await generateSocialCard(options);
  if (!dataUrl) return;

  const link = document.createElement('a');
  link.download = fileName || `${(options?.name || 'portfolio').toLowerCase()}-share-card.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
