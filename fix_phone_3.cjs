const fs = require('fs');
let file = fs.readFileSync('src/App.jsx', 'utf8');

// Replace the A tag for the phone button manually
const phoneStringStart = file.indexOf('<a className="group flex items-center justify-between p-space-sm border-2 border-inverse-on-surface bg-inverse-surface/90 hover:bg-inverse-on-surface hover:text-inverse-surface transition-colors cursor-pointer" onClick={() => { navigator.clipboard.writeText(\'+91 93452 13903\');');

if (phoneStringStart !== -1) {
  // Replace '<a' with '<MagneticButton as="a"'
  file = file.substring(0, phoneStringStart) + '<MagneticButton as="a"' + file.substring(phoneStringStart + 2);
  
  // Now replace the closing tag
  const phoneStringEnd = file.indexOf('COPY [PHONE] ↗', phoneStringStart);
  if (phoneStringEnd !== -1) {
      const closeA = file.indexOf('</a>', phoneStringEnd);
      if (closeA !== -1) {
          file = file.substring(0, closeA) + '</MagneticButton>' + file.substring(closeA + 4);
      }
  }
  fs.writeFileSync('src/App.jsx', file);
  console.log('Fixed completely via substring');
} else {
  console.log('Could not find string start');
}
