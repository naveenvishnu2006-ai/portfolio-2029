const fs = require('fs');
let file = fs.readFileSync('src/components/BootSequence.jsx', 'utf8');

file = file.replace('> {line}', '{">"} {line}');

fs.writeFileSync('src/components/BootSequence.jsx', file);
