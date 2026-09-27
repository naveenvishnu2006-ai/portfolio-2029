const fs = require('fs');
let file = fs.readFileSync('src/components/RetroCamera.jsx', 'utf8');

// 1. Remove the canvas cyan circle
file = file.replace(/if \(Math\.sin\(time \* 5\) > 0\) \{\s*sCtx\.fillStyle = '#00ffcc';\s*sCtx\.beginPath\(\);\s*sCtx\.arc\(460, 32, 7, 0, Math\.PI \* 2\);\s*sCtx\.fill\(\);\s*\}/, '');

// 2. Hide the physical 3D LED mesh
file = file.replace(/const ledMesh = new THREE\.Mesh\(ledGeo, ledMat\);/, 'const ledMesh = new THREE.Mesh(ledGeo, ledMat);\n    ledMesh.visible = false;');

fs.writeFileSync('src/components/RetroCamera.jsx', file);
console.log('Hidden LEDs');
