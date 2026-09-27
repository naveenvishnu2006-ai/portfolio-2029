const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

// The exact HTML string to remove:
// <div className="w-full flex justify-between items-center z-20 pb-space-md border-b border-surface-container-highest">
// ...
// </div>
// It is right after <section id="hero" ...>

const regex = /<div className="w-full flex justify-between items-center z-20 pb-space-md border-b border-surface-container-highest">[\s\S]*?<\/div>\s*<\/div>/;
app = app.replace(regex, '');

// Wait, the regex might grab too much if there are nested divs. Let's be more precise.
// It has 2 child divs.
app = app.replace(
  /<div className="w-full flex justify-between items-center z-20 pb-space-md border-b border-surface-container-highest">[\s\S]*?FIG 0\.1 \/\/ DEV ARTIFACT &amp; CODE ARCHIVE[\s\S]*?DEV \/\/ 2024 - 2025<\/span>\s*<\/div>\s*<\/div>/,
  ''
);

fs.writeFileSync('src/App.jsx', app);
console.log('Removed top metadata bar');
