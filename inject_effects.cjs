const fs = require('fs');
let appJsx = fs.readFileSync('src/App.jsx', 'utf8');

const useEffectContent = `
  useEffect(() => {
    // 1. AI Projector Spotlight Tracking
    const projectorZone = document.getElementById('projector-interactive-zone');
    const light = document.getElementById('projector-light');
    
    const handleProjectorMove = (e) => {
      const rect = projectorZone.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      projectorZone.style.setProperty('--mouse-x', \`\${x}px\`);
      projectorZone.style.setProperty('--mouse-y', \`\${y}px\`);
    };

    if (projectorZone && light) {
      projectorZone.addEventListener('mousemove', handleProjectorMove);
    }

    // 2. Hero Interactive Skew Tilt
    const heroContainer = document.getElementById('hero-distortion-container');
    const handleHeroMove = (e) => {
      const xNorm = (e.clientX / window.innerWidth) - 0.5;
      const yNorm = (e.clientY / window.innerHeight) - 0.5;
      heroContainer.style.transform = \`perspective(1000px) rotateY(\${xNorm * 4}deg) rotateX(\${-yNorm * 4}deg)\`;
    };
    if (heroContainer) {
      window.addEventListener('mousemove', handleHeroMove);
    }

    // 3. Software Tilt Cards Specular Effect
    const cards = document.querySelectorAll('.software-tilt-card');
    const handleCardMove = (e, card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      card.style.transform = \`perspective(400px) rotateX(\${-y * 0.1}deg) rotateY(\${x * 0.1}deg) translateY(-6px)\`;
    };
    const handleCardLeave = (card) => {
      card.style.transform = 'perspective(400px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    };

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => handleCardMove(e, card));
      card.addEventListener('mouseleave', () => handleCardLeave(card));
    });

    return () => {
      if (projectorZone) projectorZone.removeEventListener('mousemove', handleProjectorMove);
      if (heroContainer) window.removeEventListener('mousemove', handleHeroMove);
      cards.forEach(card => {
        // Simple cleanup, in a real React app we'd use refs
      });
    };
  }, []);
`;

// Replace `import InteractiveTilt` etc
appJsx = appJsx.replace(/import InteractiveTilt.*/g, '');
appJsx = appJsx.replace(/import ProjectorLight.*/g, '');

// Insert useEffect
appJsx = appJsx.replace(/function App\(\) {/, 'function App() {\n' + useEffectContent);

// Also replace the RetroCamera container with the component
appJsx = appJsx.replace(/<div id="threejs-container"[^>]*><\/div>/, '<RetroCamera />');

// Insert LiquidGlass at the top of hero
appJsx = appJsx.replace(/(<section[^>]*id="hero"[^>]*>)/, '$1\n        <LiquidGlass />');

fs.writeFileSync('src/App.jsx', appJsx);
console.log('App.jsx updated with effects and components');
