const fs = require('fs');
let file = fs.readFileSync('src/App.jsx', 'utf8');

// Just remove all framer-motion imports and add one at the very top
file = file.replace(/import\s+\{\s*motion\s*\}\s+from\s+'framer-motion';[\r\n]*/g, '');
file = `import { motion } from 'framer-motion';\n` + file;

fs.writeFileSync('src/App.jsx', file);
console.log('Fixed imports');
