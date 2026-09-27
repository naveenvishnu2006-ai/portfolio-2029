const fs = require('fs');
let file = fs.readFileSync('src/components/RetroCamera.jsx', 'utf8');

// We need to rewrite the updateScreenTexture function entirely to make it clean

const cleanScreenTextureCode = `function updateScreenTexture(time) {
  try {
      frame++;
      
      // CRT / Terminal background
      sCtx.fillStyle = '#05070a';
      sCtx.fillRect(0, 0, 512, 384);

      if (imageLoaded && userImage.naturalWidth > 0) {
        sCtx.save();
        // Calculate crop to fill screen width
        const iw = userImage.naturalWidth;
        const ih = userImage.naturalHeight;
        const scale = 512 / iw;
        const sh = ih * scale;
        const sy = (384 - sh) / 2; // Center vertically
        
        // No filter, full color and clear
        sCtx.drawImage(userImage, 0, sy, 512, sh);
        sCtx.restore();
      }

      sCtx.font = 'bold 16px monospace';
      sCtx.fillStyle = '#ffffff';
      sCtx.fillText('NAVEEN VISHNU // DEV-OS v2.4', 24, 38);

      if (Math.sin(time * 5) > 0) {
        sCtx.fillStyle = '#00ffcc';
        sCtx.beginPath();
        sCtx.arc(460, 32, 7, 0, Math.PI * 2);
        sCtx.fill();
      }
      sCtx.fillStyle = '#ffffff';
      sCtx.fillText('Camera', 400, 37); // Changed from ONLINE to match camera vibe

      sCtx.lineWidth = 2.5;
      sCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      const pad = 20;
      const bl = 24;
      sCtx.beginPath(); sCtx.moveTo(pad, pad + bl); sCtx.lineTo(pad, pad); sCtx.lineTo(pad + bl, pad); sCtx.stroke();
      sCtx.beginPath(); sCtx.moveTo(512 - pad - bl, pad); sCtx.lineTo(512 - pad, pad); sCtx.lineTo(512 - pad, pad + bl); sCtx.stroke();
      sCtx.beginPath(); sCtx.moveTo(pad, 384 - pad - bl); sCtx.lineTo(pad, 384 - pad); sCtx.lineTo(pad + bl, 384 - pad); sCtx.stroke();
      sCtx.beginPath(); sCtx.moveTo(512 - pad - bl, 384 - pad); sCtx.lineTo(512 - pad, 384 - pad); sCtx.lineTo(512 - pad, 384 - pad - bl); sCtx.stroke();

      if (!imageLoaded) {
        sCtx.font = '13px monospace';
        sCtx.fillStyle = '#ffffff';
        codeLines.forEach((line, idx) => {
          sCtx.fillText(line, 24, 90 + idx * 26);
        });
      }

      sCtx.fillStyle = '#888888';
      sCtx.fillText('> AI_MODEL: ACTIVE | DSA: 100% | LAT: 11.1271° N', 24, 350);

      screenTexture.needsUpdate = true;
  } catch(err) {
    console.error("CANVAS ERROR:", err);
  }
}`;

const startIdx = file.indexOf('function updateScreenTexture');
const endIdx = file.indexOf('let targetRotX');

if (startIdx !== -1 && endIdx !== -1) {
  file = file.substring(0, startIdx) + cleanScreenTextureCode + '\n    ' + file.substring(endIdx);
  fs.writeFileSync('src/components/RetroCamera.jsx', file);
  console.log('Cleaned up RetroCamera.jsx');
}
