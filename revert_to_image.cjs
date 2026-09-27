const fs = require('fs');
let file = fs.readFileSync('src/components/RetroCamera.jsx', 'utf8');

const startVideoIdx = file.indexOf("const video = document.createElement('video');");
const endVideoIdx = file.indexOf("let targetRotX = 0;");

if (startVideoIdx !== -1 && endVideoIdx !== -1) {
  const replacement = `const userImage = new window.Image();
    userImage.crossOrigin = 'Anonymous';
    userImage.src = '/profile.jpg';
    let imageLoaded = false;
    userImage.onload = () => { imageLoaded = true; };

    function updateScreenTexture(time) {
      try {
        frame++;
        
        sCtx.fillStyle = '#05070a';
        sCtx.fillRect(0, 0, 512, 384);

        if (imageLoaded && userImage.naturalWidth > 0) {
          sCtx.save();
          
          const imgRatio = userImage.naturalWidth / userImage.naturalHeight;
          const screenRatio = 512 / 384;
          let drawW, drawH;
          
          // Use object-fit: cover to fill screen without distortion
          if (imgRatio > screenRatio) {
            drawH = 384;
            drawW = drawH * imgRatio;
          } else {
            drawW = 512;
            drawH = drawW / imgRatio;
          }
          
          sCtx.beginPath();
          sCtx.rect(0, 0, 512, 384);
          sCtx.clip();
          
          sCtx.drawImage(
            userImage,
            (512 - drawW) / 2,
            (384 - drawH) / 2,
            drawW,
            drawH
          );
          
          sCtx.restore();
        }

        screenTexture.needsUpdate = true;
      } catch(err) {
        console.error("CANVAS ERROR:", err);
      }
    }

    `;

  file = file.substring(0, startVideoIdx) + replacement + file.substring(endVideoIdx);
  fs.writeFileSync('src/components/RetroCamera.jsx', file);
  console.log('Reverted webcam back to static image profile.jpg');
} else {
  console.log('Could not find video block');
}
