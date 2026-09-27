const fs = require('fs');

let html = fs.readFileSync('../vanilla-portfolio/index.html', 'utf8');

// Extract the body content between <header> and <footer> inclusive
const bodyContent = html.match(/<header[\s\S]*<\/footer>/)[0];

// Convert to JSX
let jsx = bodyContent;
jsx = jsx.replace(/class=/g, 'className=');
jsx = jsx.replace(/<!--[\s\S]*?-->/g, ''); // Remove HTML comments
jsx = jsx.replace(/<br>/g, '<br/>');
jsx = jsx.replace(/<hr>/g, '<hr/>');
jsx = jsx.replace(/style="([^"]+)"/g, (match, p1) => {
  const styles = p1.split(';').filter(s => s.trim()).map(s => {
    const [key, value] = s.split(':');
    if (!key || !value) return '';
    const camelKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
    return `${camelKey}: "${value.trim()}"`;
  });
  return `style={{${styles.join(', ')}}}`;
});
// Remove the inline script tag from the JSX
jsx = jsx.replace(/<script[\s\S]*?<\/script>/g, '');
// Remove the webgl container div (we will replace it with a React component)
// wait, we can just keep the id and run the script in useEffect
jsx = jsx.replace(/<div id="threejs-container-ANIMATION_13"[^>]*><\/div>/, '<div id="threejs-container" className="w-full h-full"></div>');

// Write to App.jsx
const appTemplate = `import React, { useEffect } from 'react';
import RetroCamera from './components/RetroCamera';
import LiquidGlass from './components/LiquidGlass';
import InteractiveTilt from './components/InteractiveTilt';
import ProjectorLight from './components/ProjectorLight';

function App() {
  return (
    <>
      ${jsx}
    </>
  );
}

export default App;
`;

fs.writeFileSync('src/App.jsx', appTemplate);
console.log('App.jsx created');
