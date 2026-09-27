const fs = require('fs');
let file = fs.readFileSync('src/App.jsx', 'utf8');

// Remove Imports
file = file.replace(/import BootSequence from '\.\/components\/BootSequence';\n?/, '');
file = file.replace(/import ScrambleText from '\.\/components\/ScrambleText';\n?/, '');

// Remove BootSequence Component
file = file.replace(/<BootSequence \/>\n?/, '');

// Revert Hero Scramble
file = file.replace(
  /<h1 className="font-display-hero text-display-large font-black uppercase tracking-tighter leading-none mb-space-sm"><ScrambleText text="NAVEEN" as="div" \/><ScrambleText text="VISHNU" as="div" \/><\/h1>/,
  '<h1 className="font-display-hero text-display-large font-black uppercase tracking-tighter leading-none mb-space-sm">NAVEEN<br />VISHNU</h1>'
);

// Revert Tech Stack Header Scramble
file = file.replace(
  /<ScrambleText as="h2" text="TECH STACK & TOOLS" className="font-display-hero text-headline-lg font-black uppercase tracking-tight text-inverse-surface text-center drop-shadow-\[4px_4px_0px_#4c4546\]" \/>/,
  '<h2 className="font-display-hero text-headline-lg font-black uppercase tracking-tight text-inverse-surface text-center drop-shadow-[4px_4px_0px_#4c4546]">TECH STACK & TOOLS</h2>'
);

fs.writeFileSync('src/App.jsx', file);

// Delete the files
try { fs.unlinkSync('src/components/BootSequence.jsx'); } catch(e) {}
try { fs.unlinkSync('src/components/ScrambleText.jsx'); } catch(e) {}

console.log('Removed BootSequence and ScrambleText');
