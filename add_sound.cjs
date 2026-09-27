const fs = require('fs');
let file = fs.readFileSync('src/components/CustomCursor.jsx', 'utf8');

const soundLogic = `const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('a') ||
        e.target.closest('button')
      ) {
        setIsHovering((prev) => {
          if (!prev) {
            try {
              const ctx = new (window.AudioContext || window.webkitAudioContext)();
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = 'square';
              osc.frequency.setValueAtTime(150, ctx.currentTime);
              osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.05);
              gain.gain.setValueAtTime(0.05, ctx.currentTime);
              gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.start();
              osc.stop(ctx.currentTime + 0.05);
            } catch (err) {}
          }
          return true;
        });
      } else {
        setIsHovering(false);
      }
    };`;

file = file.replace(/const handleMouseOver = \(e\) => \{[\s\S]*?\};\s*window\.addEventListener/m, soundLogic + '\n\n    window.addEventListener');

fs.writeFileSync('src/components/CustomCursor.jsx', file);
console.log('Added sound logic');
