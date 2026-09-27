const fs = require('fs');
let file = fs.readFileSync('src/components/RetroCamera.jsx', 'utf8');

const originalCode = `const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 512;
    screenCanvas.height = 384;
    const sCtx = screenCanvas.getContext('2d');`;

const highResCode = `const screenCanvas = document.createElement('canvas');
    const upscale = 4;
    screenCanvas.width = 512 * upscale;
    screenCanvas.height = 384 * upscale;
    const sCtx = screenCanvas.getContext('2d');
    sCtx.scale(upscale, upscale);
    sCtx.imageSmoothingEnabled = true;
    sCtx.imageSmoothingQuality = 'high';`;

file = file.replace(originalCode, highResCode);

fs.writeFileSync('src/components/RetroCamera.jsx', file);
console.log('Scaled up canvas resolution');
