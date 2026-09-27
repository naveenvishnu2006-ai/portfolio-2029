const fs = require('fs');
let file = fs.readFileSync('src/components/RetroCamera.jsx', 'utf8');
file = file.replace('function updateScreenTexture(time) {', 'function updateScreenTexture(time) {\n  try {\n');
file = file.replace('screenTexture.needsUpdate = true;', 'screenTexture.needsUpdate = true;\n  } catch(err) {\n    console.error("CANVAS ERROR:", err);\n  }');
fs.writeFileSync('src/components/RetroCamera.jsx', file);
console.log('Added try-catch');
