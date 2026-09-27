const fs = require('fs');
let html = fs.readFileSync('src/App.jsx', 'utf8');

html = html.replace(
  /<span className="block font-display-hero text-display-hero uppercase leading-none font-extrabold tracking-tight text-center">\s*NAVEEN\s*<\/span>/,
  '<span className="block font-display-hero text-[64px] lg:text-[84px] uppercase leading-none font-extrabold tracking-tight text-center">\n                NAVEEN\n              </span>'
);

html = html.replace(
  /<span className="block font-display-hero text-display-hero uppercase leading-none font-extrabold tracking-tight text-center -mt-2">\s*VISHNU\s*<\/span>/,
  '<span className="block font-display-hero text-[64px] lg:text-[84px] uppercase leading-none font-extrabold tracking-tight text-center -mt-2">\n                VISHNU\n              </span>'
);

fs.writeFileSync('src/App.jsx', html);
console.log('Scaled down NAVEEN VISHNU');
