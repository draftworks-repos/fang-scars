const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

const OUTPUT_DIR = path.resolve(__dirname, '../public/temp');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Generate rich SVGs for each key
function getSvgForImage(name, width, height) {
  // Common styles & gradients
  const baseDefs = `
    <defs>
      <linearGradient id="bgDark" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#15171C" />
        <stop offset="50%" stop-color="#23262E" />
        <stop offset="100%" stop-color="#2F333D" />
      </linearGradient>
      <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FFE9A8" />
        <stop offset="50%" stop-color="#FFCE55" />
        <stop offset="100%" stop-color="#F2B92E" />
      </linearGradient>
      <linearGradient id="paperGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#F6F1E7" />
        <stop offset="100%" stop-color="#EDE6D6" />
      </linearGradient>
      <pattern id="dotPattern" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="#FFCE55" opacity="0.18" />
      </pattern>
      <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" stroke-width="0.5" opacity="0.05" />
      </pattern>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
  `;

  let innerContent = '';

  if (name === 'hero.jpg') {
    innerContent = `
      <rect width="100%" height="100%" fill="url(#bgDark)" />
      <rect width="100%" height="100%" fill="url(#gridPattern)" />
      <circle cx="${width * 0.7}" cy="${height * 0.5}" r="380" fill="#FFCE55" opacity="0.08" filter="url(#glow)" />
      <!-- Artist hands & tattoo machine graphic -->
      <g transform="translate(${width * 0.65}, ${height * 0.45}) scale(1.4)">
        <!-- Coiled machine silhouette -->
        <rect x="-80" y="-120" width="70" height="180" rx="12" fill="#1B1D22" stroke="#FFCE55" stroke-width="4" />
        <circle cx="-45" cy="-60" r="28" fill="#2F333D" stroke="#FFE9A8" stroke-width="3" />
        <circle cx="-45" cy="0" r="28" fill="#2F333D" stroke="#FFE9A8" stroke-width="3" />
        <path d="M-45 60 L -45 160 L -40 220 L -35 160 Z" fill="#FFE9A8" stroke="#1B1D22" stroke-width="2" />
        <circle cx="-40" cy="235" r="4" fill="#FFCE55" />
        <!-- Needle sparks -->
        <line x1="-40" y1="240" x2="-20" y2="270" stroke="#FFCE55" stroke-width="3" stroke-linecap="round" />
        <line x1="-40" y1="240" x2="-60" y2="265" stroke="#FFE9A8" stroke-width="2" stroke-linecap="round" />
        <line x1="-40" y1="240" x2="-35" y2="285" stroke="#FFCE55" stroke-width="2" />
        <!-- Hand contour in black glove -->
        <path d="M -160 80 C -120 40 -80 60 -50 90 C -20 120 -40 180 -100 200 C -150 220 -200 160 -160 80 Z" fill="#181A20" stroke="#FFCE55" stroke-width="2" opacity="0.85" />
      </g>
      <text x="80" y="${height - 120}" font-family="Oswald, sans-serif" font-size="32" font-weight="700" letter-spacing="8" fill="#FFCE55" opacity="0.4">GOLD FANG ATELIER</text>
    `;
  } else if (name.startsWith('service-01') || name.startsWith('gallery-08') || name.startsWith('gallery-04')) {
    // Sacred Mandala
    innerContent = `
      <rect width="100%" height="100%" fill="#181A20" />
      <rect width="100%" height="100%" fill="url(#dotPattern)" />
      <g transform="translate(${width/2}, ${height/2})">
        <circle cx="0" cy="0" r="220" fill="none" stroke="#2F333D" stroke-width="36" />
        <circle cx="0" cy="0" r="180" fill="none" stroke="#FFCE55" stroke-width="2" stroke-dasharray="6,6" />
        <circle cx="0" cy="0" r="140" fill="none" stroke="#FFFFFF" stroke-width="1.5" />
        <circle cx="0" cy="0" r="90" fill="#23262E" stroke="#FFCE55" stroke-width="3" />
        <circle cx="0" cy="0" r="30" fill="#FFCE55" />
        <!-- 16 Mandala Petals -->
        ${Array.from({length: 16}).map((_, i) => {
          const angle = (i * 360) / 16;
          return `<g transform="rotate(${angle})">
            <path d="M 0 0 C 35 -60 50 -120 0 -170 C -50 -120 -35 -60 0 0 Z" fill="none" stroke="#FFE9A8" stroke-width="2.5" />
            <circle cx="0" cy="-140" r="5" fill="#FFCE55" />
            <line x1="0" y1="-30" x2="0" y2="-120" stroke="#FFFFFF" stroke-width="1" opacity="0.6" />
          </g>`;
        }).join('')}
      </g>
      <rect x="0" y="${height - 70}" width="100%" height="70" fill="rgba(20,22,27,0.85)" />
      <text x="30" y="${height - 28}" font-family="Oswald, sans-serif" font-size="22" font-weight="700" letter-spacing="4" fill="#FFCE55">SACRED MANDALA</text>
    `;
  } else if (name.startsWith('service-02') || name.startsWith('gallery-10')) {
    // Tribal / Blackwork
    innerContent = `
      <rect width="100%" height="100%" fill="#14161A" />
      <g transform="translate(${width/2}, ${height/2}) scale(1.1)">
        <!-- Heavy Polynesian spearheads and waves -->
        ${Array.from({length: 8}).map((_, i) => {
          const y = (i - 3.5) * 55;
          return `
            <path d="M -260 ${y} L -80 ${y + 20} L 0 ${y - 15} L 80 ${y + 20} L 260 ${y} L 180 ${y + 40} L 0 ${y + 15} L -180 ${y + 40} Z" fill="#23262E" stroke="#FFCE55" stroke-width="2.5" />
            <circle cx="0" cy="${y}" r="6" fill="#FFCE55" />
          `;
        }).join('')}
        <path d="M -150 -180 C -50 -240 50 -240 150 -180 L 100 -120 C 30 -160 -30 -160 -100 -120 Z" fill="#FFCE55" />
      </g>
      <rect x="0" y="${height - 70}" width="100%" height="70" fill="rgba(20,22,27,0.85)" />
      <text x="30" y="${height - 28}" font-family="Oswald, sans-serif" font-size="22" font-weight="700" letter-spacing="4" fill="#FFCE55">POLYNESIAN BLACKWORK</text>
    `;
  } else if (name.startsWith('service-03') || name.startsWith('gallery-03')) {
    // Hyper Realism Wolf / Animal
    innerContent = `
      <rect width="100%" height="100%" fill="#1A1D24" />
      <g transform="translate(${width/2}, ${height/2})">
        <!-- Dramatic wolf head silhouette with golden fangs -->
        <path d="M 0 -190 L 50 -90 L 130 -140 L 90 -20 L 150 40 L 90 90 L 120 180 L 0 130 L -120 180 L -90 90 L -150 40 L -90 -20 L -130 -140 L -50 -90 Z" fill="#23262E" stroke="#4A4D56" stroke-width="4" />
        <!-- Piercing amber eyes -->
        <ellipse cx="-45" cy="-20" rx="18" ry="10" fill="#FFCE55" stroke="#1B1D22" stroke-width="2" />
        <ellipse cx="45" cy="-20" rx="18" ry="10" fill="#FFCE55" stroke="#1B1D22" stroke-width="2" />
        <circle cx="-45" cy="-20" r="5" fill="#14161A" />
        <circle cx="45" cy="-20" r="5" fill="#14161A" />
        <!-- Snout & Gold Fangs -->
        <path d="M -30 40 L 30 40 L 18 80 L -18 80 Z" fill="#14161A" />
        <polygon points="-25,80 -15,120 -8,80" fill="#FFE9A8" stroke="#F2B92E" stroke-width="2" />
        <polygon points="25,80 15,120 8,80" fill="#FFE9A8" stroke="#F2B92E" stroke-width="2" />
      </g>
      <rect x="0" y="${height - 70}" width="100%" height="70" fill="rgba(20,22,27,0.85)" />
      <text x="30" y="${height - 28}" font-family="Oswald, sans-serif" font-size="22" font-weight="700" letter-spacing="4" fill="#FFCE55">MICRO-REALISM PORTRAIT</text>
    `;
  } else if (name.startsWith('service-04') || name.startsWith('gallery-05')) {
    // Balinese / Japanese Dragon
    innerContent = `
      <rect width="100%" height="100%" fill="#1E2129" />
      <g transform="translate(${width/2}, ${height/2}) scale(1.15)">
        <!-- Dragon coils -->
        <path d="M -180 120 C -120 -80 -40 -160 40 -120 C 140 -80 180 40 120 140 C 60 220 -80 200 -120 120" fill="none" stroke="#2F333D" stroke-width="48" stroke-linecap="round" />
        <path d="M -180 120 C -120 -80 -40 -160 40 -120 C 140 -80 180 40 120 140 C 60 220 -80 200 -120 120" fill="none" stroke="#FFCE55" stroke-width="6" />
        <!-- Scaled back spikes -->
        ${Array.from({length: 12}).map((_, i) => {
          const a = (i * 24) - 140;
          return `<polygon points="${a - 15},-90 ${a},-125 ${a + 15},-90" fill="#FFE9A8" />`;
        }).join('')}
        <!-- Barong flame crown -->
        <path d="M 0 -130 Q 30 -190 0 -220 Q -30 -190 0 -130 Z" fill="#FFCE55" />
      </g>
      <rect x="0" y="${height - 70}" width="100%" height="70" fill="rgba(20,22,27,0.85)" />
      <text x="30" y="${height - 28}" font-family="Oswald, sans-serif" font-size="22" font-weight="700" letter-spacing="4" fill="#FFCE55">TRADITIONAL BALINESE</text>
    `;
  } else if (name.startsWith('service-05')) {
    // Precision Piercing
    innerContent = `
      <rect width="100%" height="100%" fill="#181A20" />
      <g transform="translate(${width/2}, ${height/2})">
        <!-- Titanium jewelry rings and captive beads -->
        <circle cx="-60" cy="0" r="70" fill="none" stroke="#FFCE55" stroke-width="12" />
        <circle cx="-60" cy="-70" r="14" fill="#FFFFFF" stroke="#1B1D22" stroke-width="3" />
        <circle cx="70" cy="30" r="55" fill="none" stroke="#FFE9A8" stroke-width="9" />
        <circle cx="70" cy="-25" r="12" fill="#FFCE55" />
        <circle cx="30" cy="-80" r="40" fill="none" stroke="#4A4D56" stroke-width="8" stroke-dasharray="14,10" />
      </g>
      <rect x="0" y="${height - 70}" width="100%" height="70" fill="rgba(20,22,27,0.85)" />
      <text x="30" y="${height - 28}" font-family="Oswald, sans-serif" font-size="22" font-weight="700" letter-spacing="4" fill="#FFCE55">PRECISION PIERCING</text>
    `;
  } else if (name.startsWith('service-06')) {
    // Laser removal
    innerContent = `
      <rect width="100%" height="100%" fill="#15171C" />
      <g transform="translate(${width/2}, ${height/2})">
        <circle cx="0" cy="0" r="140" fill="none" stroke="#FFCE55" stroke-width="3" stroke-dasharray="8,8" />
        <line x1="-180" y1="0" x2="180" y2="0" stroke="#FFCE55" stroke-width="2" opacity="0.6" />
        <line x1="0" y1="-180" x2="0" y2="180" stroke="#FFCE55" stroke-width="2" opacity="0.6" />
        <circle cx="0" cy="0" r="60" fill="#23262E" stroke="#FFFFFF" stroke-width="3" />
        <circle cx="0" cy="0" r="24" fill="#FFCE55" filter="url(#glow)" />
      </g>
      <rect x="0" y="${height - 70}" width="100%" height="70" fill="rgba(20,22,27,0.85)" />
      <text x="30" y="${height - 28}" font-family="Oswald, sans-serif" font-size="22" font-weight="700" letter-spacing="4" fill="#FFCE55">LASER TATTOO REMOVAL</text>
    `;
  } else if (name.startsWith('artist-')) {
    // Artist Portrait
    const artistNum = name.replace('artist-0', '').replace('.jpg', '');
    const names = { '1': 'RUDRA SEN', '2': 'ZOYA KHAN', '3': 'KABIR RAY', '4': 'MIRA THORNE' };
    const specs = { '1': 'REALISM MASTER', '2': 'FINE LINE BOTANICA', '3': 'HEAVY BLACKWORK', '4': 'JAPANESE IREZUMI' };
    innerContent = `
      <rect width="100%" height="100%" fill="#181B22" />
      <rect width="100%" height="100%" fill="url(#dotPattern)" opacity="0.4" />
      <g transform="translate(${width/2}, ${height * 0.42}) scale(1.1)">
        <!-- Stylized artist silhouette with tattoos -->
        <circle cx="0" cy="-90" r="65" fill="#2F333D" stroke="#FFCE55" stroke-width="3" />
        <!-- Torso & shoulders -->
        <path d="M -140 140 C -120 20 -80 -10 -40 0 C 0 10 40 0 80 -10 C 120 20 140 140 140 140 Z" fill="#23262E" stroke="#FFCE55" stroke-width="2" />
        <!-- Tattoo sleeves pattern on silhouette -->
        <path d="M -110 50 Q -80 80 -100 120 M 110 50 Q 80 80 100 120" stroke="#FFE9A8" stroke-width="3" fill="none" />
        <circle cx="0" cy="70" r="24" fill="#14161A" stroke="#FFCE55" stroke-width="2" />
      </g>
      <rect x="20" y="${height - 120}" width="${width - 40}" height="90" fill="#23262E" stroke="#FFCE55" stroke-width="2" />
      <text x="${width/2}" y="${height - 75}" text-anchor="middle" font-family="Oswald, sans-serif" font-size="28" font-weight="700" letter-spacing="4" fill="#FFFFFF">${names[artistNum] || 'RESIDENT ARTIST'}</text>
      <text x="${width/2}" y="${height - 48}" text-anchor="middle" font-family="Montserrat, sans-serif" font-size="13" font-weight="600" letter-spacing="3" fill="#FFCE55">${specs[artistNum] || 'STUDIO MASTER'}</text>
    `;
  } else if (name.startsWith('about-01')) {
    // Client tattooed portrait in warm vintage tone
    innerContent = `
      <rect width="100%" height="100%" fill="#EDE6D8" />
      <radialGradient id="vignette" cx="50%" cy="45%" r="65%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.3" />
        <stop offset="70%" stop-color="#C2B7A3" stop-opacity="0.5" />
        <stop offset="100%" stop-color="#8E826F" stop-opacity="0.8" />
      </radialGradient>
      <rect width="100%" height="100%" fill="url(#vignette)" />
      <g transform="translate(${width/2}, ${height * 0.44})">
        <!-- Client head & neck in lifelike skin tone -->
        <circle cx="0" cy="-120" r="85" fill="#DEB897" stroke="#1B1D22" stroke-width="2.5" />
        <!-- Hair -->
        <path d="M -85 -120 C -95 -220 95 -220 85 -120 C 70 -50 50 30 30 70 L -30 70 C -50 30 -70 -50 -85 -120 Z" fill="#1C1E24" />
        <!-- Profile line -->
        <path d="M 0 -130 L 15 -110 L 0 -95" fill="none" stroke="#947153" stroke-width="2.5" />
        <!-- Hand on cheek -->
        <ellipse cx="50" cy="-80" rx="32" ry="18" fill="#DEB897" stroke="#1B1D22" stroke-width="2" transform="rotate(-30 50 -80)" />
        <!-- Torso with dark singlet -->
        <path d="M -180 180 C -150 40 -90 10 -40 20 L 40 20 C 90 10 150 40 180 180 Z" fill="#23262E" />
        <!-- Exposed inked arm showing full floral sleeve -->
        <path d="M -160 180 C -150 50 -100 30 -60 50 L -60 200 Z" fill="#D2A682" stroke="#1B1D22" stroke-width="2" />
        <!-- Detailed peony and leaves tattoo on arm -->
        <g transform="translate(-105, 110) scale(0.85)">
          <circle cx="0" cy="0" r="35" fill="#FFE9A8" stroke="#1B1D22" stroke-width="3" />
          ${Array.from({length: 8}).map((_, i) => `<ellipse cx="0" cy="-28" rx="16" ry="26" fill="none" stroke="#1B1D22" stroke-width="3" transform="rotate(${i * 45})" />`).join('')}
          <circle cx="0" cy="0" r="10" fill="#FFCE55" />
          <path d="M -40 40 Q -10 60 30 90" stroke="#1B1D22" stroke-width="3.5" fill="none" />
        </g>
      </g>
      <rect x="0" y="${height - 75}" width="100%" height="75" fill="#1B1D22" />
      <text x="${width/2}" y="${height - 28}" text-anchor="middle" font-family="Oswald, sans-serif" font-size="24" font-weight="700" letter-spacing="4" fill="#FFCE55">HEIRLOOM FINE LINE SLEEVE</text>
    `;
  } else if (name.startsWith('about-02')) {
    // Hands working on pattern tattoo: warm studio desktop & skin
    innerContent = `
      <rect width="100%" height="100%" fill="#3A332B" />
      <g transform="translate(${width/2}, ${height * 0.46}) scale(1.15)">
        <!-- Client forearm in warm skin tone -->
        <rect x="-260" y="-85" width="520" height="170" rx="30" fill="#DEB897" stroke="#1B1D22" stroke-width="3" />
        <!-- Blue stencil lines and fresh black ink -->
        <circle cx="0" cy="0" r="65" fill="none" stroke="#1E50A0" stroke-width="2.5" stroke-dasharray="4,4" />
        <circle cx="0" cy="0" r="50" fill="none" stroke="#1B1D22" stroke-width="4.5" />
        ${Array.from({length: 12}).map((_, i) => `<line x1="0" y1="-20" x2="0" y2="-50" stroke="#1B1D22" stroke-width="3.5" transform="rotate(${i * 30})" />`).join('')}
        <circle cx="0" cy="0" r="14" fill="#FFCE55" stroke="#1B1D22" stroke-width="2.5" />
        <!-- Artist gloved hand holding machine -->
        <path d="M 60 -110 C 90 -70 90 20 50 50 L 10 20 L 30 -100 Z" fill="#15171C" stroke="#FFCE55" stroke-width="2" />
        <!-- Brass rotary machine -->
        <rect x="40" y="-120" width="35" height="70" rx="6" fill="#F2B92E" stroke="#1B1D22" stroke-width="2.5" />
        <line x1="30" y1="-30" x2="0" y2="0" stroke="#1B1D22" stroke-width="4" stroke-linecap="round" />
        <circle cx="0" cy="0" r="4" fill="#FFCE55" />
      </g>
      <rect x="0" y="${height - 65}" width="100%" height="65" fill="#1B1D22" />
      <text x="30" y="${height - 24}" font-family="Oswald, sans-serif" font-size="20" font-weight="700" letter-spacing="3" fill="#FFCE55">CUSTOM LINEWORK IN PROGRESS</text>
    `;
  } else if (name.startsWith('about-hero.jpg') || name.startsWith('contact.jpg')) {
    // Studio sanctuary
    innerContent = `
      <rect width="100%" height="100%" fill="#15171C" />
      <rect width="100%" height="100%" fill="url(#gridPattern)" />
      <!-- Warm overhead ring light effect -->
      <circle cx="${width/2}" cy="${height * 0.3}" r="300" fill="#FFCE55" opacity="0.12" filter="url(#glow)" />
      <ellipse cx="${width/2}" cy="${height * 0.65}" rx="220" ry="40" fill="#14161A" opacity="0.7" />
      <!-- Tattoo Hydraulic Chair Outline -->
      <g transform="translate(${width/2}, ${height * 0.5}) scale(1.2)">
        <rect x="-50" y="-70" width="100" height="60" rx="8" fill="#242832" stroke="#FFCE55" stroke-width="3" />
        <rect x="-60" y="-5" width="120" height="70" rx="10" fill="#2B303C" stroke="#FFE9A8" stroke-width="3" />
        <rect x="-15" y="65" width="30" height="60" fill="#1B1D22" stroke="#FFCE55" stroke-width="2" />
        <ellipse cx="0" cy="125" rx="70" ry="16" fill="#181A20" stroke="#FFCE55" stroke-width="3" />
      </g>
      <text x="${width/2}" y="${height * 0.9}" text-anchor="middle" font-family="Oswald, sans-serif" font-size="28" font-weight="700" letter-spacing="6" fill="#FFCE55">GOLD FANG SANCTUARY</text>
    `;
  } else {
    // Gallery Items
    const gallNum = name.replace('gallery-', '').replace('.jpg', '');
    const titles = [
      'BOTANICAL PEONY SLEEVE',
      'VIPER & DAGGER FLASH',
      'APEX WOLF PORTRAIT',
      'SPINAL MANDALA FLOW',
      'MYTHIC SEA DRAGON',
      'FINE LINE BOTANICA',
      'DARK REALISM RAVEN',
      'SACRED LOTUS MANDALA',
      'TRADITIONAL SWALLOW',
      'BLACKOUT RUNE BAND'
    ];
    const itemTitle = titles[(parseInt(gallNum, 10) - 1) % titles.length] || 'CUSTOM TATTOO PIECE';
    innerContent = `
      <rect width="100%" height="100%" fill="#171A21" />
      <rect width="100%" height="100%" fill="url(#dotPattern)" opacity="0.3" />
      <g transform="translate(${width/2}, ${height * 0.44}) scale(1.15)">
        <!-- Distinct tattoo design graphics -->
        <circle cx="0" cy="0" r="130" fill="none" stroke="#2F333D" stroke-width="18" />
        <polygon points="0,-120 100,50 -100,50" fill="none" stroke="#FFCE55" stroke-width="3" />
        <polygon points="0,120 100,-50 -100,-50" fill="none" stroke="#FFE9A8" stroke-width="2" />
        <circle cx="0" cy="0" r="45" fill="#23262E" stroke="#FFCE55" stroke-width="3" />
        <circle cx="0" cy="0" r="16" fill="#FFCE55" />
      </g>
      <rect x="0" y="${height - 70}" width="100%" height="70" fill="rgba(20,22,27,0.92)" />
      <text x="24" y="${height - 28}" font-family="Oswald, sans-serif" font-size="20" font-weight="700" letter-spacing="3" fill="#FFCE55">${itemTitle}</text>
    `;
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      ${baseDefs}
      ${innerContent}
    </svg>
  `;
}

async function renderAll() {
  const images = [
    { name: 'hero.jpg', w: 1920, h: 1080 },
    { name: 'about-01.jpg', w: 800, h: 1000 },
    { name: 'about-02.jpg', w: 800, h: 600 },
    { name: 'about-hero.jpg', w: 1920, h: 800 },
    { name: 'contact.jpg', w: 1000, h: 1200 },
    { name: 'service-01.jpg', w: 900, h: 600 },
    { name: 'service-02.jpg', w: 900, h: 600 },
    { name: 'service-03.jpg', w: 900, h: 600 },
    { name: 'service-04.jpg', w: 900, h: 600 },
    { name: 'service-05.jpg', w: 900, h: 600 },
    { name: 'service-06.jpg', w: 900, h: 600 },
    { name: 'artist-01.jpg', w: 800, h: 1000 },
    { name: 'artist-02.jpg', w: 800, h: 1000 },
    { name: 'artist-03.jpg', w: 800, h: 1000 },
    { name: 'artist-04.jpg', w: 800, h: 1000 },
    { name: 'gallery-01.jpg', w: 600, h: 800 },
    { name: 'gallery-02.jpg', w: 600, h: 800 },
    { name: 'gallery-03.jpg', w: 600, h: 800 },
    { name: 'gallery-04.jpg', w: 600, h: 800 },
    { name: 'gallery-05.jpg', w: 600, h: 800 },
    { name: 'gallery-06.jpg', w: 600, h: 800 },
    { name: 'gallery-07.jpg', w: 600, h: 800 },
    { name: 'gallery-08.jpg', w: 600, h: 800 },
    { name: 'gallery-09.jpg', w: 600, h: 800 },
    { name: 'gallery-10.jpg', w: 600, h: 800 },
  ];

  console.log('Launching headless browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  for (const img of images) {
    const svg = getSvgForImage(img.name, img.w, img.h);
    await page.setViewportSize({ width: img.w, height: img.h });
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            html, body { width: 100%; height: 100%; overflow: hidden; background: #14161A; }
            svg { display: block; width: 100%; height: 100%; }
          </style>
        </head>
        <body>
          ${svg}
        </body>
      </html>
    `);

    const outPath = path.join(OUTPUT_DIR, img.name);
    await page.screenshot({ path: outPath, type: 'jpeg', quality: 90 });
    console.log(`Generated: ${img.name} (${img.w}x${img.h})`);
  }

  await browser.close();
  console.log('All 25 images rendered successfully!');
}

renderAll().catch((err) => {
  console.error('Error generating artwork:', err);
  process.exit(1);
});
