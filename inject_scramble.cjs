const fs = require('fs');
let file = fs.readFileSync('src/App.jsx', 'utf8');

if (!file.includes('ScrambleText')) {
  file = `import ScrambleText from './components/ScrambleText';\n` + file;
  
  // Replace the TECH STACK & TOOLS header
  file = file.replace(
    /<h2 className="font-display-hero text-headline-lg font-black uppercase tracking-tight text-inverse-surface text-center drop-shadow-\[4px_4px_0px_#4c4546\]">\s*TECH STACK &amp; TOOLS\s*<\/h2>/,
    '<ScrambleText as="h2" text="TECH STACK & TOOLS" className="font-display-hero text-headline-lg font-black uppercase tracking-tight text-inverse-surface text-center drop-shadow-[4px_4px_0px_#4c4546]" />'
  );
  
  // Replace the YOUR NAME in hero section
  file = file.replace(
    /<h1 className="font-display-hero text-display-large font-black uppercase tracking-tighter leading-none mb-space-sm">\s*NAVEEN<br \/>\s*VISHNU\s*<\/h1>/,
    '<h1 className="font-display-hero text-display-large font-black uppercase tracking-tighter leading-none mb-space-sm"><ScrambleText text="NAVEEN" as="div" /><ScrambleText text="VISHNU" as="div" /></h1>'
  );

  fs.writeFileSync('src/App.jsx', file);
  console.log('Added ScrambleText to App.jsx');
}
