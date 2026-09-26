const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
  '<div class="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant font-mono">', 
  '<div class="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant font-mono whitespace-nowrap pt-1">'
);

fs.writeFileSync('index.html', html);
console.log('Fixed PROJECTOR ON wrapper');
