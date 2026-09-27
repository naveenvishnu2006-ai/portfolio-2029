const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');
app = app.replace(/onClick="([^"]+)"/g, 'onClick={() => { $1 }}');
fs.writeFileSync('src/App.jsx', app);
console.log('Fixed onClick handlers');
