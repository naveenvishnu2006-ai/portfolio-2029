const fs = require('fs');
let file = fs.readFileSync('src/components/CustomCursor.jsx', 'utf8');

// Replace the return statement that renders the motion.div with a return null;
const renderStart = file.indexOf('return (');
if (renderStart !== -1) {
  file = file.substring(0, renderStart) + 'return null;\n}\n';
  fs.writeFileSync('src/components/CustomCursor.jsx', file);
  console.log('Removed visible cursor');
} else {
  console.log('Could not find render statement');
}
