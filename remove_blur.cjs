const fs = require('fs');
let file = fs.readFileSync('src/App.jsx', 'utf8');

file = file.replace(/bg-\[#05070a\]\/40 backdrop-blur-xl border-b border-white\/10/g, 'bg-surface-container-lowest/80');
file = file.replace(/bg-\[#05070a\]\/40 backdrop-blur-xl border-t border-white\/10/g, 'bg-surface-container-lowest/80');

fs.writeFileSync('src/App.jsx', file);
console.log('Removed heavy backdrop-blur');
