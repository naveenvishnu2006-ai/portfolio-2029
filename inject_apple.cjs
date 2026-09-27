const fs = require('fs');
let file = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Add Imports
const imports = `import Lenis from 'lenis';
import { motion } from 'framer-motion';\n`;
if (!file.includes("from 'lenis'")) {
  file = file.replace("import React", imports + "import React");
}

// 2. Add Lenis initialization to useEffect
const lenisInit = `
    const lenis = new Lenis({ autoRaf: true, duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
`;
if (!file.includes("new Lenis")) {
  file = file.replace(/useEffect\(\(\) => \{/, "useEffect(() => {" + lenisInit);
}

// 3. Glassmorphism: Update Header and Footer
file = file.replace('bg-surface-container-lowest/80', 'bg-[#05070a]/40 backdrop-blur-xl border-b border-white/10'); // Header
file = file.replace('bg-surface-container-lowest/80', 'bg-[#05070a]/40 backdrop-blur-xl border-t border-white/10'); // Footer

// Update floating windows (software cards) to be glass
file = file.replace(/bg-surface-container-low border-2 border-inverse-surface/g, 'bg-[#ffffff]/5 backdrop-blur-lg border-2 border-white/20');

// 4. Cinematic Fade-Ups for Tech Stack Cards
// We will replace the <div className="software-tilt-card with <motion.div initial...
let cardIndex = 0;
file = file.replace(/<div className="software-tilt-card(.*?)"/g, (match, p1) => {
  const motionProps = `initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: ${cardIndex * 0.1}, ease: [0.22, 1, 0.36, 1] }}`;
  cardIndex++;
  return `<motion.div ${motionProps} className="software-tilt-card${p1}"`;
});
// Replace their closing tags
file = file.replace(/<\/div>\s*<\/div>\s*<div className="mt-space-2xl">/g, '</motion.div>\n</div>\n<div className="mt-space-2xl">');
// Note: We need a better regex for the closing tags. Wait, let's just do it cleanly.
file = file.replace(/<\/div>\s*<motion\.div initial/g, '</motion.div>\n<motion.div initial');


// 5. Word-by-Word Scroll Reveal Statement
const revealStatement = `
<section className="relative w-full max-w-5xl mx-auto py-32 px-margin-mobile lg:px-margin text-center">
  <motion.h3 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
    className="font-display-hero text-[3rem] lg:text-[5rem] font-bold leading-tight tracking-tight text-white/90"
  >
    I engineer high-performance <span className="text-primary-container">digital experiences</span> that blend raw aesthetics with <span className="text-primary-container">cutting-edge</span> WebGL technology.
  </motion.h3>
</section>
`;
if (!file.includes("I engineer high-performance")) {
  file = file.replace('<section className="scroll-mt-20', revealStatement + '\n<section className="scroll-mt-20');
}

fs.writeFileSync('src/App.jsx', file);
console.log('Apple-tier features injected!');
