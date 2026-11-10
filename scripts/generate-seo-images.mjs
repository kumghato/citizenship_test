/**
 * Builds the raster assets that social platforms and search engines expect:
 *   public/og-image.png     1200x630 Open Graph / Twitter card
 *   public/icon1-34.png     logo at 1x for the header and footer
 *   public/icon1-68.png     logo at 2x (retina + `srcset` descriptor)
 *
 * Usage: node scripts/generate-seo-images.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const publicDir = path.join(root, 'public');

const logoSource = await readFile(path.join(publicDir, 'icon1.svg'), 'utf8');

// Raster logo variants used with srcSet in the header/footer brand lockup.
for (const size of [34, 68]) {
  const png = await sharp(Buffer.from(logoSource)).resize(size, size).png({ compressionLevel: 9 }).toBuffer();
  await writeFile(path.join(publicDir, `icon1-${size}.png`), png);
}

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#c2e2d3" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#c2e2d3" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="tile" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1d7a68"/>
      <stop offset="100%" stop-color="#0d4c41"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="#f7f8f5"/>
  <circle cx="1080" cy="90" r="420" fill="url(#glow)"/>

  <text x="80" y="132" font-family="DejaVu Sans Mono, Menlo, monospace" font-size="20" font-weight="700"
        letter-spacing="4" fill="#176b5b">CIVICPASS</text>

  <text x="78" y="252" font-family="DejaVu Sans, Arial, Helvetica, sans-serif" font-size="66" font-weight="700"
        letter-spacing="-2.4" fill="#172521">Citizenship test</text>
  <text x="78" y="330" font-family="DejaVu Sans, Arial, Helvetica, sans-serif" font-size="66" font-weight="700"
        letter-spacing="-2.4" fill="#176b5b">practice, four countries</text>

  <text x="80" y="404" font-family="DejaVu Sans, Arial, Helvetica, sans-serif" font-size="27"
        fill="#53625d">Free timed mock exams with every answer checked</text>
  <text x="80" y="440" font-family="DejaVu Sans, Arial, Helvetica, sans-serif" font-size="27"
        fill="#53625d">against the official government handbooks.</text>

  <g transform="translate(990, 62)">
    <rect width="118" height="118" rx="34" fill="url(#tile)"/>
    <g transform="translate(28, 28) scale(3.87)" fill="none" stroke="#ffffff" stroke-width="1.9"
       stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4Z"/>
      <path d="m16 12 2 2 4-4"/>
      <path d="M22 6V3h-6c-2.2 0-4 1.8-4 4v14c0-1.7 1.3-3 3-3h7v-2.3"/>
    </g>
  </g>

  <line x1="80" y1="520" x2="1120" y2="520" stroke="#dfe7e1" stroke-width="2"/>

  <text x="80" y="572" font-family="DejaVu Sans, Arial, Helvetica, sans-serif" font-size="24" font-weight="600"
        fill="#53625d">USCIS Civics</text>
  <text x="255" y="572" font-family="DejaVu Sans, Arial, Helvetica, sans-serif" font-size="24"
        fill="#82908a">·</text>
  <text x="288" y="572" font-family="DejaVu Sans, Arial, Helvetica, sans-serif" font-size="24" font-weight="600"
        fill="#53625d">Life in the UK</text>
  <text x="472" y="572" font-family="DejaVu Sans, Arial, Helvetica, sans-serif" font-size="24"
        fill="#82908a">·</text>
  <text x="505" y="572" font-family="DejaVu Sans, Arial, Helvetica, sans-serif" font-size="24" font-weight="600"
        fill="#53625d">Discover Canada</text>
  <text x="728" y="572" font-family="DejaVu Sans, Arial, Helvetica, sans-serif" font-size="24"
        fill="#82908a">·</text>
  <text x="761" y="572" font-family="DejaVu Sans, Arial, Helvetica, sans-serif" font-size="24" font-weight="600"
        fill="#53625d">Our Common Bond</text>
</svg>`;

await sharp(Buffer.from(ogSvg)).png({ compressionLevel: 9 }).toFile(path.join(publicDir, 'og-image.png'));

console.log('Wrote public/og-image.png, public/icon1-34.png and public/icon1-68.png');
