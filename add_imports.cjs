const fs = require('fs');
let file = fs.readFileSync('src/App.jsx', 'utf8');

const imports = `import { motion } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import useSound from 'use-sound';
`;

file = imports + file;
fs.writeFileSync('src/App.jsx', file);
console.log('Added imports');
