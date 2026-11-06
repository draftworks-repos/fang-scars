import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const tempDir = path.resolve('public/temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Clean up any test or svg files
const existing = fs.readdirSync(tempDir);
for (const file of existing) {
  if (file.endsWith('.svg') || file === 'test.jpg') {
    fs.unlinkSync(path.join(tempDir, file));
  }
}

const files = [
  { name: 'hero.jpg', w: 1920, h: 1080, color: '0x16181D' },
  { name: 'about-01.jpg', w: 800, h: 1000, color: '0x23262E' },
  { name: 'about-02.jpg', w: 800, h: 600, color: '0x2B2F3A' },
  { name: 'about-hero.jpg', w: 1920, h: 800, color: '0x1C1E24' },
  { name: 'contact.jpg', w: 1000, h: 1200, color: '0x1F222A' },
  
  // Services
  { name: 'service-01.jpg', w: 900, h: 600, color: '0x262A34' },
  { name: 'service-02.jpg', w: 900, h: 600, color: '0x21242D' },
  { name: 'service-03.jpg', w: 900, h: 600, color: '0x292D38' },
  { name: 'service-04.jpg', w: 900, h: 600, color: '0x222630' },
  { name: 'service-05.jpg', w: 900, h: 600, color: '0x2C303D' },
  { name: 'service-06.jpg', w: 900, h: 600, color: '0x1A1C22' },

  // Artists
  { name: 'artist-01.jpg', w: 800, h: 1000, color: '0x242832' },
  { name: 'artist-02.jpg', w: 800, h: 1000, color: '0x2D323E' },
  { name: 'artist-03.jpg', w: 800, h: 1000, color: '0x20232B' },
  { name: 'artist-04.jpg', w: 800, h: 1000, color: '0x282C37' },

  // Gallery 01 to 10
  { name: 'gallery-01.jpg', w: 600, h: 800, color: '0x232730' },
  { name: 'gallery-02.jpg', w: 600, h: 800, color: '0x1E2128' },
  { name: 'gallery-03.jpg', w: 600, h: 800, color: '0x2A2E39' },
  { name: 'gallery-04.jpg', w: 600, h: 800, color: '0x21252D' },
  { name: 'gallery-05.jpg', w: 600, h: 800, color: '0x272B35' },
  { name: 'gallery-06.jpg', w: 600, h: 800, color: '0x1C1E25' },
  { name: 'gallery-07.jpg', w: 600, h: 800, color: '0x252933' },
  { name: 'gallery-08.jpg', w: 600, h: 800, color: '0x20242C' },
  { name: 'gallery-09.jpg', w: 600, h: 800, color: '0x2B2F3A' },
  { name: 'gallery-10.jpg', w: 600, h: 800, color: '0x222630' },
];

for (const f of files) {
  const filePath = path.join(tempDir, f.name);
  if (!fs.existsSync(filePath)) {
    try {
      execSync(`ffmpeg -f lavfi -i color=c=${f.color}:s=${f.w}x${f.h}:d=1 -frames:v 1 -y "${filePath}"`, { stdio: 'ignore' });
    } catch (e) {
      console.error(`Failed ${f.name}:`, e.message);
    }
  }
}

console.log('All public/temp files ready:', fs.readdirSync(tempDir));
