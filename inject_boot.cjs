const fs = require('fs');
let file = fs.readFileSync('src/App.jsx', 'utf8');

if (!file.includes('BootSequence')) {
  file = `import BootSequence from './components/BootSequence';\n` + file;
  file = file.replace(/<main/, '<BootSequence />\n<main');
  fs.writeFileSync('src/App.jsx', file);
  console.log('Added BootSequence to App.jsx');
}
