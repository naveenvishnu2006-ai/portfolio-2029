const fs = require('fs');
let file = fs.readFileSync('src/App.jsx', 'utf8');

if (file.includes('<a className="group flex items-center justify-between p-space-sm border-2 border-inverse-on-surface bg-inverse-surface/90 hover:bg-inverse-on-surface hover:text-inverse-surface transition-colors cursor-pointer" onClick={() => { navigator.clipboard.writeText(\'+91 93452 13903\'); alert(\'Copied: +91 93452 13903\'); }}>')) {
  console.log('Needs replacement');
  file = file.replace(/<a className="group flex items-center justify-between p-space-sm border-2 border-inverse-on-surface bg-inverse-surface\/90 hover:bg-inverse-on-surface hover:text-inverse-surface transition-colors cursor-pointer" onClick=\{\(\) => \{ navigator\.clipboard\.writeText\('\+91 93452 13903'\); alert\('Copied: \+91 93452 13903'\); \}\}>/g, '<MagneticButton as="a" className="group flex items-center justify-between p-space-sm border-2 border-inverse-on-surface bg-inverse-surface/90 hover:bg-inverse-on-surface hover:text-inverse-surface transition-colors cursor-pointer" onClick={() => { navigator.clipboard.writeText(\'+91 93452 13903\'); alert(\'Copied: +91 93452 13903\'); }}>');
  file = file.replace(/COPY \[PHONE\] ↗\s*<\/span>\s*<\/a>/g, 'COPY [PHONE] ↗\n              </span>\n</MagneticButton>');
  fs.writeFileSync('src/App.jsx', file);
  console.log('Fixed');
} else {
  console.log('Already fixed');
}
