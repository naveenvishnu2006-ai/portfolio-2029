const fs = require('fs');
let file = fs.readFileSync('src/App.jsx', 'utf8');

file = file.replace(/bg-background\/95 backdrop-blur-md/g, 'bg-background');

fs.writeFileSync('src/App.jsx', file);
console.log('Removed header blur');
