const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const headInsert = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Chivo:ital,wght@0,300;0,400;0,700;0,900;1,400&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@700;800&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet">
`;

html = html.replace('<head>', '<head>\n' + headInsert);
html = html.replace('<body>', '<body class="bg-background font-body-md text-on-surface antialiased selection:bg-inverse-surface selection:text-inverse-on-surface">');

fs.writeFileSync('index.html', html);
console.log('Fixed index.html');
