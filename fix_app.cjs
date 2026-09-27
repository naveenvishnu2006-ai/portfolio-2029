const fs = require('fs');
let file = fs.readFileSync('src/App.jsx', 'utf8');

// I will just change `<motion.div drag...` back to `<div` for the software cards to fix the compile error instantly,
// then I will add the features the right way.

file = file.replace(/<motion\.div drag dragConstraints=\{\{ left: -50, right: 50, top: -50, bottom: 50 \}\} whileDrag=\{\{ scale: 1\.1, zIndex: 10 \}\} className="software-tilt-card cursor-grab active:cursor-grabbing/g, '<div className="software-tilt-card');
file = file.replace(/<\/motion\.div>/g, '</div>');

fs.writeFileSync('src/App.jsx', file);
console.log('Fixed compile error');
