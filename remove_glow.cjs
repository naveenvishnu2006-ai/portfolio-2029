const fs = require('fs');
let file = fs.readFileSync('src/App.jsx', 'utf8');

// Replace the frosted glass back to solid brutalist on the tech cards
file = file.replace(/bg-\[#ffffff\]\/5 backdrop-blur-lg border-2 border-white\/20/g, 'bg-surface-container-low border-2 border-inverse-surface');

fs.writeFileSync('src/App.jsx', file);
console.log('Removed glow from tech stacks');
