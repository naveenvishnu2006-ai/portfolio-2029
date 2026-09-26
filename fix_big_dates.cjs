const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace the massive 2024 and 2025
html = html.replace(
  /<div class="font-display-hero text-display-hero[^>]+>\s*2024\s*<\/div>/g,
  '<div class="font-display-hero text-display-hero tracking-tighter text-inverse-surface leading-none select-none font-extrabold drop-shadow-[4px_4px_0px_#4c4546]">\n              2025\n            </div>'
);

html = html.replace(
  /<div class="font-display-hero text-display-hero[^>]+>\s*2025\s*<\/div>/g,
  '<div class="font-display-hero text-display-hero tracking-tighter text-inverse-surface leading-none select-none font-extrabold drop-shadow-[4px_4px_0px_#4c4546]">\n              2029\n            </div>'
);

fs.writeFileSync('index.html', html);
console.log('Replaced large years');
