const fs = require('fs');
let file = fs.readFileSync('src/App.jsx', 'utf8');

file = file.replace(/className="software-tilt-card([^"]*)transition-all([^"]*)"/g, 'className="software-tilt-card$1transition-colors$2"');

fs.writeFileSync('src/App.jsx', file);
console.log('Fixed transition fighting');
