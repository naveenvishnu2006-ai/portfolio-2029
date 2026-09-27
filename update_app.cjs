const fs = require('fs');
let file = fs.readFileSync('src/App.jsx', 'utf8');

file = file.replace(/import React from 'react';/, "import React from 'react';\nimport { motion } from 'framer-motion';\nimport CustomCursor from './components/CustomCursor';\nimport useSound from 'use-sound';");

file = file.replace('<main', '<CustomCursor />\n<main');

file = file.replace(/<div className="software-tilt-card/g, '<motion.div drag dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }} whileDrag={{ scale: 1.1, zIndex: 10 }} className="software-tilt-card cursor-grab active:cursor-grabbing');

// Fix closing tags for the replaced motion divs
file = file.replace(/<\/div>\s*<div className="software-tilt-card/g, '</motion.div>\n<div className="software-tilt-card');
file = file.replace(/<\/div>\s*<\/div>\s*<div className="mt-space-2xl">/g, '</motion.div>\n</div>\n<div className="mt-space-2xl">');

fs.writeFileSync('src/App.jsx', file);
console.log('App.jsx updated with framer-motion!');
