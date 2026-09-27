const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

// Replace the HTML NAVEEN VISHNU blocks with nothing, since we already put LiquidGlass at the top of Hero section.
app = app.replace(/<span className="block font-display-hero[^>]*>\s*NAVEEN\s*<\/span>/, '');
app = app.replace(/<span className="block font-display-hero[^>]*>\s*VISHNU\s*<\/span>/, '');

fs.writeFileSync('src/App.jsx', app);
console.log('Removed HTML NAVEEN VISHNU');
