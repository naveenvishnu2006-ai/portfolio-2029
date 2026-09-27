const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

// Remove LiquidGlass from wherever it is currently
app = app.replace(/\s*<LiquidGlass \/>/g, '');

// Insert it right after <main...>
app = app.replace(/(<main[^>]*>)/, '$1\n        <LiquidGlass />');

fs.writeFileSync('src/App.jsx', app);
console.log('Moved LiquidGlass to main');
