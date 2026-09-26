const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
  '<div class="absolute inset-0 flex items-center justify-center pointer-events-none z-20 opacity-40">',
  '<div class="absolute inset-0 flex items-center justify-center pointer-events-none z-20 opacity-40 hidden">'
);

fs.writeFileSync('index.html', html);
console.log('Hidden dashed crosshairs and center dot');
