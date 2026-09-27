const fs = require('fs');
let file = fs.readFileSync('src/App.jsx', 'utf8');

file = file.replace(/import CustomCursor from '\.\/components\/CustomCursor';\n?/, '');
file = file.replace(/<CustomCursor \/>\n?/, '');

fs.writeFileSync('src/App.jsx', file);
console.log('Removed CustomCursor');
