const fs = require('fs');
let file = fs.readFileSync('src/components/RetroCamera.jsx', 'utf8');

const replacement = `if (imageLoaded && userImage.naturalWidth > 0) {
        sCtx.save();
        
        // object-fit: cover calculation
        const imgRatio = userImage.naturalWidth / userImage.naturalHeight;
        const screenRatio = 512 / 384;
        let drawW, drawH;
        
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
      }`;

// Regex to replace the entire if (imageLoaded && userImage.naturalWidth > 0) block
const regex = /if \(imageLoaded && userImage\.naturalWidth > 0\) \{[\s\S]*?sCtx\.restore\(\);\s*\}/;
file = file.replace(regex, replacement);

fs.writeFileSync('src/components/RetroCamera.jsx', file);
console.log('Fixed image drawing block');
