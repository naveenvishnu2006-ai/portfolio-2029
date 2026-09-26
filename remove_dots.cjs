const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove DEV REC dot and ONLINE text
html = html.replace(/\/\/ Blinking DEV REC dot[\s\S]*?sCtx\.fillText\('ONLINE', 390, 37\);/, '');

// 2. Remove ledMesh creation
html = html.replace(/\/\/ Status LED \(Cyan \/ White blink for developer \/ creative tech\)[\s\S]*?cameraRig\.add\(ledMesh\);/, '');

// 3. Remove ledMesh animation
html = html.replace(/\/\/ LED blink indicator\s*ledMesh\.material\.color\.setHex\(Math\.sin\(elapsedTime \* 6\) > 0 \? 0x00ffcc : 0x004433\);/, '');

fs.writeFileSync('index.html', html);
console.log('Removed DEV REC dot, ONLINE, and LED mesh.');
