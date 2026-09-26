const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const imgLoadScript = `
let userImage = new Image();
userImage.src = '/profile.jpg';
let imageLoaded = false;
userImage.onload = () => { imageLoaded = true; };

let frame = 0;`;

html = html.replace('let frame = 0;', imgLoadScript);

const drawScript = `
  // CRT / Terminal background
  sCtx.fillStyle = '#05070a';
  sCtx.fillRect(0, 0, 512, 384);

  if (imageLoaded) {
    // Calculate aspect ratio to cover the 512x384 canvas
    const imgRatio = userImage.width / userImage.height;
    const canvasRatio = 512 / 384;
    let drawW = 512;
    let drawH = 384;
    let drawX = 0;
    let drawY = 0;
    
    if (imgRatio > canvasRatio) {
      drawW = 384 * imgRatio;
      drawX = (512 - drawW) / 2;
    } else {
      drawH = 512 / imgRatio;
      drawY = (384 - drawH) / 2;
    }
    
    // Draw in background
    sCtx.drawImage(userImage, drawX, drawY, drawW, drawH);
    
    // Add a dark tint over the image so text remains readable
    sCtx.fillStyle = 'rgba(5, 7, 10, 0.4)';
    sCtx.fillRect(0, 0, 512, 384);
  }
`;

html = html.replace(/\/\/ CRT \/ Terminal background\s*sCtx\.fillStyle = '#05070a';\s*sCtx\.fillRect\(0, 0, 512, 384\);/, drawScript);

fs.writeFileSync('index.html', html);
console.log('index.html patched with image logic');
