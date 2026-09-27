const fs = require('fs');

// Read vanilla HTML
const vanillaHtml = fs.readFileSync('../vanilla-portfolio/index.html', 'utf8');

// Extract the hero section
const heroMatch = vanillaHtml.match(/<section[^>]*id="hero"[^>]*>([\s\S]*?)<\/section>/);
if (!heroMatch) {
  console.log("Hero section not found in vanilla");
  process.exit(1);
}

let vanillaHero = heroMatch[0];

// Convert HTML to JSX
let jsxHero = vanillaHero;
jsxHero = jsxHero.replace(/class=/g, 'className=');
jsxHero = jsxHero.replace(/<!--[\s\S]*?-->/g, ''); // Remove comments
jsxHero = jsxHero.replace(/<br>/g, '<br/>');
jsxHero = jsxHero.replace(/<hr>/g, '<hr/>');
jsxHero = jsxHero.replace(/style="([^"]+)"/g, (match, p1) => {
  const styles = p1.split(';').filter(s => s.trim()).map(s => {
    const [key, value] = s.split(':');
    if (!key || !value) return '';
    const camelKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
    return `${camelKey}: "${value.trim()}"`;
  });
  return `style={{${styles.join(', ')}}}`;
});
jsxHero = jsxHero.replace(/viewbox/g, 'viewBox');
jsxHero = jsxHero.replace(/stroke-linecap/g, 'strokeLinecap');
jsxHero = jsxHero.replace(/stroke-width/g, 'strokeWidth');
jsxHero = jsxHero.replace(/font-family/g, 'fontFamily');
jsxHero = jsxHero.replace(/font-size/g, 'fontSize');
jsxHero = jsxHero.replace(/font-weight/g, 'fontWeight');
jsxHero = jsxHero.replace(/letter-spacing/g, 'letterSpacing');

// In React, we already removed bg-primary-container from the hero section to make it transparent for Liquid Glass.
// Let's do that for the new jsxHero as well.
jsxHero = jsxHero.replace(/bg-primary-container/g, 'bg-transparent');

// Read React App.jsx
let reactApp = fs.readFileSync('src/App.jsx', 'utf8');

// Replace the existing hero section in React with the ported vanilla one
const reactHeroRegex = /<section[^>]*id="hero"[^>]*>[\s\S]*?<\/section>/;
reactApp = reactApp.replace(reactHeroRegex, jsxHero);

fs.writeFileSync('src/App.jsx', reactApp);
console.log('Replaced React hero section with vanilla hero section');
