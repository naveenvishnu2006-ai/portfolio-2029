const fs = require('fs');
let file = fs.readFileSync('src/App.jsx', 'utf8');

const imports = `import ScrollProgress from './components/ScrollProgress';
import MagneticButton from './components/MagneticButton';
import ParallaxCamera from './components/ParallaxCamera';
import SpotlightGrid from './components/SpotlightGrid';\n`;

file = file.replace(/import Lenis from 'lenis';/, imports + "import Lenis from 'lenis';");

// 1. Scroll Progress
file = file.replace('<main', '<ScrollProgress />\n<main');

// 2. Parallax Camera
file = file.replace(/<RetroCamera \/>/, '<ParallaxCamera><RetroCamera /></ParallaxCamera>');

// 3. Magnetic Buttons
// Replace the email and linkedin buttons
file = file.replace(/<a className="group flex items-center justify-between p-space-sm border-2/g, '<MagneticButton as="a" className="group flex items-center justify-between p-space-sm border-2');
file = file.replace(/<\/span>\s*<\/a>\s*<\/div>\s*<\/div>/g, '</span>\n</MagneticButton>\n</div>\n</div>');

// Replace the LET'S CONNECT button
file = file.replace(/<a className="inline-flex items-center gap-space-sm px-space-xl py-space-md/g, '<MagneticButton as="a" className="inline-flex items-center gap-space-sm px-space-xl py-space-md');
file = file.replace(/<\/span>\s*<\/a>\s*<\/div>\s*<\/div>\s*<\/section>/g, '</span>\n</MagneticButton>\n</div>\n</div>\n</section>');

// 4. Spotlight Grid
// Replace the grid container
file = file.replace(/<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-space-md w-full max-w-5xl">/, '<SpotlightGrid className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-space-md w-full max-w-5xl">');
file = file.replace(/<\/motion\.div>\s*<\/div>\s*<div className="mt-space-2xl">/, '</motion.div>\n</SpotlightGrid>\n<div className="mt-space-2xl">');

fs.writeFileSync('src/App.jsx', file);
console.log('Injected premium features');
