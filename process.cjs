const fs = require('fs');
let html = fs.readFileSync('../page1.html', 'utf8');

html = html.replace(/<script src="https:\/\/cdn\.tailwindcss\.com\?plugins=forms,container-queries"><\/script>/, '');
html = html.replace(/<script id="tailwind-config">[\s\S]*?<\/script>/, '');
html = html.replace(/<style>@layer base{[\s\S]*?<\/style>/, '<link rel="stylesheet" href="/style.css">');

// ensure module main.js is loaded
html = html.replace('</body>', '<script type="module" src="/main.js"></script>\n</body>');

fs.writeFileSync('index.html', html);
console.log('index.html created successfully');
