const fs = require('fs');
let file = fs.readFileSync('src/App.jsx', 'utf8');

const lenisString = 'const lenis = new Lenis({ autoRaf: true, duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });';
file = file.replace(lenisString, '');

fs.writeFileSync('src/App.jsx', file);
console.log('Removed Lenis string');
