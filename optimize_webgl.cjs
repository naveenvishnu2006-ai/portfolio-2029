const fs = require('fs');
let file = fs.readFileSync('src/components/LiquidGlass.jsx', 'utf8');

// The line is:
// const w = canvas.clientWidth || window.innerWidth;
// const h = canvas.clientHeight || window.innerHeight;

// Let's cap the resolution!
file = file.replace(
  /const w = canvas\.clientWidth \|\| window\.innerWidth;/g,
  'const dpr = Math.min(window.devicePixelRatio || 1, 1.5);\n      const w = (canvas.clientWidth || window.innerWidth) * dpr;'
);
file = file.replace(
  /const h = canvas\.clientHeight \|\| window\.innerHeight;/g,
  'const h = (canvas.clientHeight || window.innerHeight) * dpr;'
);

fs.writeFileSync('src/components/LiquidGlass.jsx', file);
console.log('Optimized WebGL resolution');
