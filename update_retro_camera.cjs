const fs = require('fs');
let file = fs.readFileSync('src/components/RetroCamera.jsx', 'utf8');

// The new user image and screen texture update code
const imageCode = `
    const userImage = new window.Image();
    userImage.crossOrigin = 'Anonymous';
    userImage.src = '/profile.jpg';
    let imageLoaded = false;
    userImage.onload = () => { imageLoaded = true; };

    function updateScreenTexture(time) {
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
        
        // Grayscale/Terminal filter effect
        sCtx.filter = 'grayscale(100%) contrast(1.2) brightness(0.8)';
        sCtx.drawImage(userImage, 0, sy, 512, sh);
        sCtx.filter = 'none';

        // Overlay tracking dots (Facial Recognition / AI aesthetic)
        // Adjust coordinates slightly to match the face in the specific image
        sCtx.fillStyle = '#baff29';
        const numDots = 18;
        for (let i = 0; i < numDots; i++) {
          const dx = 230 + Math.sin(time*2 + i)*40 + Math.random()*5;
          const dy = 160 + i*8 + Math.cos(time*3 + i)*20;
          
          sCtx.beginPath();
          sCtx.arc(dx, dy, 2.5, 0, Math.PI*2);
          sCtx.fill();

          // Connect some dots
          if (i > 0 && i % 3 === 0) {
            sCtx.strokeStyle = 'rgba(186, 255, 41, 0.4)';
            sCtx.lineWidth = 1;
            sCtx.beginPath();
            sCtx.moveTo(dx, dy);
            sCtx.lineTo(230 + Math.sin(time*2 + (i-1))*40, 160 + (i-1)*8 + Math.cos(time*3 + (i-1))*20);
            sCtx.stroke();
          }
        }

        // Draw bounding box
        sCtx.strokeStyle = 'rgba(186, 255, 41, 0.7)';
        sCtx.lineWidth = 2;
        sCtx.strokeRect(190 + Math.sin(time)*5, 120 + Math.cos(time*1.5)*5, 100, 120);
        sCtx.restore();
      }

      sCtx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      for (let y = 0; y < 384; y += 4) {
        sCtx.fillRect(0, y, 512, 2);
      }

      sCtx.fillStyle = 'rgba(255, 255, 255, 0.16)';
      for (let i = 0; i < 300; i++) {
        const nx = Math.random() * 512;
        const ny = Math.random() * 384;
        sCtx.fillRect(nx, ny, 1.5, 1.5);
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
    }
`;

// Find the start of function updateScreenTexture(time)
const startIdx = file.indexOf('function updateScreenTexture');
const endIdx = file.indexOf('let targetRotX = 0;');

if (startIdx !== -1 && endIdx !== -1) {
  file = file.substring(0, startIdx) + imageCode + file.substring(endIdx);
  fs.writeFileSync('src/components/RetroCamera.jsx', file);
  console.log('Successfully updated RetroCamera.jsx');
} else {
  console.log('Could not find updateScreenTexture block');
}
