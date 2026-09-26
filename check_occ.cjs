const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
console.log('2024 occurrences:');
const m1 = html.match(/.{0,30}2024.{0,30}/g);
if(m1) m1.forEach(m => console.log('  ' + m));

console.log('href="#" occurrences:');
const m2 = html.match(/.{0,30}href=\"#\".{0,30}/g);
if(m2) m2.forEach(m => console.log('  ' + m));
