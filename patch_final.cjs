const fs = require('fs');
let html = fs.readFileSync('../page1.html', 'utf8');

html = html.replace(/<script src="https:\/\/cdn\.tailwindcss\.com\?plugins=forms,container-queries"><\/script>/, '');
html = html.replace(/<script id="tailwind-config">[\s\S]*?<\/script>/, '');
html = html.replace(/<style>@layer base{[\s\S]*?<\/style>/, '<link rel="stylesheet" href="/style.css">');
html = html.replace('</body>', '<script type="module" src="/main.js"></script>\n</body>');

html = html.replace('screenMesh.position.set(-0.85, -0.15, 0.96);', 'screenMesh.position.set(-0.85, -0.15, 0.98);');

// Insert image loading
const imgLoadScript = `
let userImage = new Image();
userImage.crossOrigin = 'Anonymous';
userImage.src = '/profile.jpg';
let imageLoaded = false;
userImage.onload = () => { imageLoaded = true; };

let frame = 0;`;

// Replace the specific let frame = 0; that is near updateScreenTexture
html = html.replace(/let frame = 0;\s*const codeLines = \[/, imgLoadScript + '\nconst codeLines = [');

const drawScript = `
  try {
    sCtx.fillStyle = '#05070a';
    sCtx.fillRect(0, 0, 512, 384);

    if (imageLoaded && userImage.width > 0) {
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
      
      sCtx.drawImage(userImage, drawX, drawY, drawW, drawH);
      sCtx.fillStyle = 'rgba(5, 7, 10, 0.4)';
      sCtx.fillRect(0, 0, 512, 384);
    }
  } catch(e) {
    console.error("Canvas draw error:", e);
  }
`;

html = html.replace(/\/\/ CRT \/ Terminal background\s*sCtx\.fillStyle = '#05070a';\s*sCtx\.fillRect\(0, 0, 512, 384\);/, drawScript);

// Remove the code text drawing
html = html.replace(/\/\/ Terminal code text stream\s*sCtx\.font = '13px monospace';\s*sCtx\.fillStyle = '#ffffff';\s*codeLines\.forEach\(\(line, idx\) => \{\s*sCtx\.fillText\(line, 24, 90 \+ idx \* 26\);\s*\}\);/, '');

fs.writeFileSync('index.html', html);
console.log('Done');
