const fs = require('fs');
let file = fs.readFileSync('src/components/RetroCamera.jsx', 'utf8');

// Replace shadow map
file = file.replace(/THREE\.PCFSoftShadowMap/g, 'THREE.PCFShadowMap');

// Replace clock logic
// From:
// const clock = new THREE.Clock();
// function animate() {
//   animId = requestAnimationFrame(animate);
//   const elapsedTime = clock.getElapsedTime();

file = file.replace(/const clock = new THREE\.Clock\(\);\s*function animate\(\) \{/g, 'const startTime = performance.now();\n\n    function animate() {');
file = file.replace(/const elapsedTime = clock\.getElapsedTime\(\);/g, 'const elapsedTime = (performance.now() - startTime) / 1000;');

fs.writeFileSync('src/components/RetroCamera.jsx', file);
console.log('Fixed Three.js deprecations');
