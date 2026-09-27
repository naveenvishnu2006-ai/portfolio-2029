const fs = require('fs');
let file = fs.readFileSync('src/App.jsx', 'utf8');

file = file.replace(/<ParallaxCamera><RetroCamera \/><\/ParallaxCamera>/, '<RetroCamera />');

fs.writeFileSync('src/App.jsx', file);
console.log('Removed ParallaxCamera wrapper');
