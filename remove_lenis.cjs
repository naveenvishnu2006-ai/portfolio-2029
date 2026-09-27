const fs = require('fs');
let file = fs.readFileSync('src/App.jsx', 'utf8');

// Remove import
file = file.replace(/import Lenis from 'lenis';\n?/g, '');

// Remove initialization block
// The initialization block looks like:
// useEffect(() => {
//     const lenis = new Lenis({ autoRaf: true, duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
// 
//     const gl = ... (Wait, I injected lenis inside the App's useEffect? No, App doesn't have useEffect natively)
file = file.replace(/const lenis = new Lenis\(\{ autoRaf: true, duration: 1\.2, easing: \(t\) => Math\.min\(1, 1\.001 - Math\.pow\(2, -10 \* t\)\) \}\);\n/g, '');

fs.writeFileSync('src/App.jsx', file);
console.log('Removed Lenis');
