const fs = require('fs');
let file = fs.readFileSync('src/App.jsx', 'utf8');

file = file.replace(/<section className="relative w-full max-w-5xl mx-auto py-32[\s\S]*?<\/section>\s*(?=<section className="scroll-mt-20)/, '');

fs.writeFileSync('src/App.jsx', file);
console.log('Removed statement');
