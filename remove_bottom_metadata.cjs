const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

// The exact HTML string to remove:
const regex = /<div className="w-full mt-space-2xl pt-space-md border-t border-surface-container-highest flex flex-col sm:flex-row justify-between items-center text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest gap-2">[\s\S]*?<span>INDEX REF: TECH-PORTFOLIO-[0-9-]+<\/span>\s*<\/div>/;

app = app.replace(regex, '');

fs.writeFileSync('src/App.jsx', app);
console.log('Removed bottom metadata baseline');
