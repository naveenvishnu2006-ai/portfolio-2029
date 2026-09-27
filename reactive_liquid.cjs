const fs = require('fs');
let file = fs.readFileSync('src/components/LiquidGlass.jsx', 'utf8');

const newUniforms = `uniform vec2 u_mouse;
uniform float u_velocity;`;

const newNoiseLogic = `  float t = u_time * 0.45 + u_velocity * 0.1;
  float n1 = snoise(aspectSt * 3.0 + vec2(t * 0.2, t * 0.15)) * (1.0 + u_velocity * 0.8);
  float n2 = snoise(aspectSt * 6.0 - vec2(t * 0.3, -t * 0.25) + vec2(n1 * 0.5)) * (1.0 + u_velocity * 0.5);`;

const newJsLogic = `    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');
    const uVelocity = gl.getUniformLocation(prog, 'u_velocity');

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    let velocity = 0.0;
    
    const handleMouseMove = (event) => {
      velocity = Math.min(velocity + 0.15, 3.0);
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };
    
    const handleScroll = () => {
      velocity = Math.min(velocity + 0.5, 4.0);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    let animId;
    function render(t) {
      velocity *= 0.96; // decay
      if (typeof window.ResizeObserver === 'undefined') syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      if (uVelocity) gl.uniform1f(uVelocity, velocity);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(render);
    }
    render(0);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };`;

file = file.replace('uniform vec2 u_mouse;', newUniforms);
file = file.replace(/float t = u_time[\s\S]*?float n2 = snoise[\s\S]*?\* 0\.5\)\);/, newNoiseLogic);
file = file.replace(/const uTime = gl\.getUniformLocation[\s\S]*?cancelAnimationFrame\(animId\);\n    \};\n/m, newJsLogic + '\n');

fs.writeFileSync('src/components/LiquidGlass.jsx', file);
console.log('Added reactive liquid');
