const fs = require('fs');
let file = fs.readFileSync('src/App.jsx', 'utf8');

file = file.replace(/COPY EMAIL ↗\s*<\/span>\s*<\/a>/g, 'COPY EMAIL ↗\n              </span>\n</MagneticButton>');

fs.writeFileSync('src/App.jsx', file);
