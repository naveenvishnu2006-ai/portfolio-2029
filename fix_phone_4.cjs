const fs = require('fs');
let file = fs.readFileSync('src/App.jsx', 'utf8');

const targetIndex = file.indexOf("navigator.clipboard.writeText('+91 93452 13903')");
if (targetIndex !== -1) {
  const lastA = file.lastIndexOf('<a ', targetIndex);
  if (lastA !== -1) {
    file = file.substring(0, lastA) + '<MagneticButton as="a" ' + file.substring(lastA + 3);
    
    // Now replace the closing tag
    const phoneStringEnd = file.indexOf('COPY [PHONE]', targetIndex);
    if (phoneStringEnd !== -1) {
        const closeA = file.indexOf('</a>', phoneStringEnd);
        if (closeA !== -1) {
            file = file.substring(0, closeA) + '</MagneticButton>' + file.substring(closeA + 4);
        }
    }
    fs.writeFileSync('src/App.jsx', file);
    console.log('Fixed completely via backwards search');
  } else {
    console.log('Could not find last <a');
  }
} else {
  console.log('Could not find target');
}
