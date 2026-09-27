const fs = require('fs');
let file = fs.readFileSync('src/App.jsx', 'utf8');

// Revert all MagneticButtons that are meant to be 'a' tags back to normal 'a' tags
file = file.replace(/<MagneticButton as="a"/g, '<a');
file = file.replace(/<\/MagneticButton>/g, '</a>');

// Now, correctly wrap the 4 specific buttons!
// 1. Email Button
file = file.replace(/<a className="group flex items-center justify-between p-space-sm border-2 border-inverse-on-surface bg-inverse-surface\/90 hover:bg-inverse-on-surface hover:text-inverse-surface transition-colors cursor-pointer" href="mailto:naveenvishnu20006@gmail.com"/, '<MagneticButton as="a" className="group flex items-center justify-between p-space-sm border-2 border-inverse-on-surface bg-inverse-surface/90 hover:bg-inverse-on-surface hover:text-inverse-surface transition-colors cursor-pointer" href="mailto:naveenvishnu20006@gmail.com"');
file = file.replace(/COPY EMAIL ↗\s*<\/span>\s*<\/a>/, 'COPY EMAIL ↗\n              </span>\n</MagneticButton>');

// 2. LinkedIn Button
file = file.replace(/<a className="group flex items-center justify-between p-space-sm border-2 border-inverse-on-surface bg-inverse-surface\/90 hover:bg-inverse-on-surface hover:text-inverse-surface transition-colors"/, '<MagneticButton as="a" className="group flex items-center justify-between p-space-sm border-2 border-inverse-on-surface bg-inverse-surface/90 hover:bg-inverse-on-surface hover:text-inverse-surface transition-colors"');
file = file.replace(/CONNECT \[LINKEDIN\] ↗\s*<\/span>\s*<\/a>/, 'CONNECT [LINKEDIN] ↗\n              </span>\n</MagneticButton>');

// 3. Phone Button
file = file.replace(/<a className="group flex items-center justify-between p-space-sm border-2 border-inverse-on-surface bg-inverse-surface\/90 hover:bg-inverse-on-surface hover:text-inverse-surface transition-colors cursor-pointer" onClick=\{\(\) => \{ navigator\.clipboard\.writeText\('\+91 93452 13903'\); alert\('Copied: \+91 93452 13903'\); \}\}/, '<MagneticButton as="a" className="group flex items-center justify-between p-space-sm border-2 border-inverse-on-surface bg-inverse-surface/90 hover:bg-inverse-on-surface hover:text-inverse-surface transition-colors cursor-pointer" onClick={() => { navigator.clipboard.writeText(\'+91 93452 13903\'); alert(\'Copied: +91 93452 13903\'); }}');
file = file.replace(/COPY \[PHONE\] ↗\s*<\/span>\s*<\/a>/, 'COPY [PHONE] ↗\n              </span>\n</MagneticButton>');

// 4. Let's Connect Button
file = file.replace(/<a className="inline-flex items-center gap-space-sm px-space-xl py-space-md border-2 border-inverse-on-surface bg-inverse-surface text-inverse-on-surface hover:bg-inverse-on-surface hover:text-inverse-surface transition-all active:scale-95"/, '<MagneticButton as="a" className="inline-flex items-center gap-space-sm px-space-xl py-space-md border-2 border-inverse-on-surface bg-inverse-surface text-inverse-on-surface hover:bg-inverse-on-surface hover:text-inverse-surface transition-all active:scale-95"');
file = file.replace(/SEND MESSAGE ↗\s*<\/span>\s*<\/a>/, 'SEND MESSAGE ↗\n              </span>\n</MagneticButton>');

fs.writeFileSync('src/App.jsx', file);
console.log('Fixed tags globally!');
