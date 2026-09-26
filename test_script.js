<script>
(function() {
  const container = document.getElementById('threejs-container-ANIMATION_13');
  const devicePixelRatio = window.devicePixelRatio || 1;
  // Three.js Retro Cyber-Terminal / Retro Hardware Viewfinder for Naveen Vishnu
const width = container.clientWidth || window.innerWidth;
const height = container.clientHeight || 450;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(0, 0, 9.8);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

// Lighting setup for high contrast editorial brutalist aesthetic
const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
scene.add(ambientLight);

const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.8);
dirLight1.position.set(6, 8, 7);
dirLight1.castShadow = true;
scene.add(dirLight1);

const rimLight = new THREE.DirectionalLight(0xeeeeee, 2.0);
rimLight.position.set(-7, -4, -5);
scene.add(rimLight);

const spotLight = new THREE.SpotLight(0xffffff, 2.5);
spotLight.position.set(0, 6, 8);
spotLight.angle = Math.PI / 4;
spotLight.penumbra = 0.5;
scene.add(spotLight);

// Group to hold all 3D hardware components
const cameraRig = new THREE.Group();
scene.add(cameraRig);

// Materials - Brutalist monochrome cyber matte / industrial metal
const bodyMat = new THREE.MeshStandardMaterial({
  color: 0x181818,
  roughness: 0.35,
  metalness: 0.3,
});

const silverMat = new THREE.MeshStandardMaterial({
  color: 0xe6e6e6,
  roughness: 0.18,
  metalness: 0.85,
});

const darkMetalMat = new THREE.MeshStandardMaterial({
  color: 0x0d0d0d,
  roughness: 0.4,
  metalness: 0.6,
});

// 1. Camera / Device Body (Industrial cyber deck chassis)
const bodyGeo = new THREE.BoxGeometry(6.6, 4.4, 1.9);
const cameraBody = new THREE.Mesh(bodyGeo, bodyMat);
cameraRig.add(cameraBody);

// Edge outline accent for brutalist comic/zine hand-drawn vibe
const edgesGeo = new THREE.EdgesGeometry(bodyGeo);
const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
const bodyLines = new THREE.LineSegments(edgesGeo, lineMat);
cameraBody.add(bodyLines);

// 2. Top Plate & Industrial dials
const topPlateGeo = new THREE.BoxGeometry(6.62, 0.45, 1.92);
const topPlate = new THREE.Mesh(topPlateGeo, silverMat);
topPlate.position.y = 2.3;
cameraRig.add(topPlate);

// Shutter / Execute button (cylinder)
const shutterGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.4, 24);
const shutter = new THREE.Mesh(shutterGeo, darkMetalMat);
shutter.position.set(-1.9, 2.6, -0.1);
cameraRig.add(shutter);

// Mode Dial
const dialGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.32, 24);
const dial = new THREE.Mesh(dialGeo, silverMat);
dial.position.set(-0.75, 2.58, -0.1);
cameraRig.add(dial);

// Power toggle
const powerGeo = new THREE.BoxGeometry(0.28, 0.28, 0.42);
const power = new THREE.Mesh(powerGeo, darkMetalMat);
power.position.set(1.5, 2.58, -0.1);
cameraRig.add(power);

// 3. LCD Viewfinder Screen on the FRONT facing the user
const screenCanvas = document.createElement('canvas');
screenCanvas.width = 512;
screenCanvas.height = 384;
const sCtx = screenCanvas.getContext('2d');

const screenTexture = new THREE.CanvasTexture(screenCanvas);
screenTexture.generateMipmaps = false;
screenTexture.minFilter = THREE.LinearFilter;

const screenMat = new THREE.MeshBasicMaterial({
  map: screenTexture,
  toneMapped: false,
});

const screenGeo = new THREE.PlaneGeometry(3.8, 2.85);
const screenMesh = new THREE.Mesh(screenGeo, screenMat);
screenMesh.position.set(-0.85, -0.15, 0.96);
cameraRig.add(screenMesh);

// Screen Bezel / Border
const bezelGeo = new THREE.BoxGeometry(4.0, 3.05, 0.06);
const bezelMesh = new THREE.Mesh(bezelGeo, silverMat);
bezelMesh.position.set(-0.85, -0.15, 0.94);
cameraRig.add(bezelMesh);

// 4. Navigation Buttons & D-Pad (Right side of screen on front panel)
const dpadBaseGeo = new THREE.CylinderGeometry(0.68, 0.68, 0.16, 32);
dpadBaseGeo.rotateX(Math.PI / 2);
const dpadBase = new THREE.Mesh(dpadBaseGeo, silverMat);
dpadBase.position.set(1.95, -0.4, 0.97);
cameraRig.add(dpadBase);

const dpadCenterGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.22, 24);
dpadCenterGeo.rotateX(Math.PI / 2);
const dpadCenter = new THREE.Mesh(dpadCenterGeo, darkMetalMat);
dpadCenter.position.set(1.95, -0.4, 1.01);
cameraRig.add(dpadCenter);

// Micro Indicator & Mini Buttons
const btnGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.14, 16);
btnGeo.rotateX(Math.PI / 2);
const btnTop = new THREE.Mesh(btnGeo, silverMat);
btnTop.position.set(1.95, 0.7, 0.97);
cameraRig.add(btnTop);

const btnBot1 = new THREE.Mesh(btnGeo, silverMat);
btnBot1.position.set(1.5, -1.35, 0.97);
cameraRig.add(btnBot1);

const btnBot2 = new THREE.Mesh(btnGeo, silverMat);
btnBot2.position.set(2.4, -1.35, 0.97);
cameraRig.add(btnBot2);

// Status LED (Cyan / White blink for developer / creative tech)
const ledGeo = new THREE.SphereGeometry(0.09, 12, 12);
const ledMat = new THREE.MeshBasicMaterial({ color: 0x00ffcc });
const ledMesh = new THREE.Mesh(ledGeo, ledMat);
ledMesh.position.set(1.15, 0.8, 0.97);
cameraRig.add(ledMesh);

// Corner screws
const screwGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.05, 8);
screwGeo.rotateX(Math.PI / 2);
[[-3.0, 1.9], [-3.0, -1.9], [3.0, 1.9], [3.0, -1.9]].forEach(([sx, sy]) => {
  const screw = new THREE.Mesh(screwGeo, silverMat);
  screw.position.set(sx, sy, 0.96);
  cameraRig.add(screw);
});

// Dynamic Code & Terminal Screen Matrix on the LCD Viewfinder
let frame = 0;
const codeLines = [
  'void init_technologist() {',
  '  dev.stack = [\"C++\", \"Py\", \"Java\"];',
  '  dev.focus = \"AI & CREATIVE TECH\";',
  '  system.boot(\"TAMIL NADU\");',
  '  while(learning) {',
  '    build(); experiment(); repeat();',
  '  }',
  '}'
];

function updateScreenTexture(time) {
  frame++;
  // CRT / Terminal background
  sCtx.fillStyle = '#05070a';
  sCtx.fillRect(0, 0, 512, 384);

  // Scanline grid
  sCtx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  for (let y = 0; y < 384; y += 4) {
    sCtx.fillRect(0, y, 512, 2);
  }

  // Digital grain / phosphor noise
  sCtx.fillStyle = 'rgba(255, 255, 255, 0.16)';
  for (let i = 0; i < 300; i++) {
    const nx = Math.random() * 512;
    const ny = Math.random() * 384;
    sCtx.fillRect(nx, ny, 1.5, 1.5);
  }

  // Header HUD
  sCtx.font = 'bold 16px monospace';
  sCtx.fillStyle = '#ffffff';
  sCtx.fillText('NAVEEN VISHNU // DEV-OS v2.4', 24, 38);

  // Blinking DEV REC dot
  if (Math.sin(time * 5) > 0) {
    sCtx.fillStyle = '#00ffcc';
    sCtx.beginPath();
    sCtx.arc(460, 32, 7, 0, Math.PI * 2);
    sCtx.fill();
  }
  sCtx.fillStyle = '#ffffff';
  sCtx.fillText('ONLINE', 390, 37);

  // Viewfinder corner brackets
  sCtx.lineWidth = 2.5;
  sCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
  const pad = 20;
  const bl = 24;
  // Top-left
  sCtx.beginPath(); sCtx.moveTo(pad, pad + bl); sCtx.lineTo(pad, pad); sCtx.lineTo(pad + bl, pad); sCtx.stroke();
  // Top-right
  sCtx.beginPath(); sCtx.moveTo(512 - pad - bl, pad); sCtx.lineTo(512 - pad, pad); sCtx.lineTo(512 - pad, pad + bl); sCtx.stroke();
  // Bottom-left
  sCtx.beginPath(); sCtx.moveTo(pad, 384 - pad - bl); sCtx.lineTo(pad, 384 - pad); sCtx.lineTo(pad + bl, 384 - pad); sCtx.stroke();
  // Bottom-right
  sCtx.beginPath(); sCtx.moveTo(512 - pad - bl, 384 - pad); sCtx.lineTo(512 - pad, 384 - pad); sCtx.lineTo(512 - pad, 384 - pad - bl); sCtx.stroke();

  // Center wireframe cube rotation / AI Node graphic
  sCtx.save();
  sCtx.translate(370, 200);
  const ang = time * 0.8;
  sCtx.strokeStyle = '#00ffcc';
  sCtx.lineWidth = 2;
  const sz = 45;
  sCtx.strokeRect(-sz/2 + Math.sin(ang)*10, -sz/2, sz, sz);
  sCtx.strokeRect(-sz/2 - Math.sin(ang)*10, -sz/2, sz, sz);
  sCtx.beginPath();
  sCtx.arc(0, 0, 8, 0, Math.PI * 2);
  sCtx.fillStyle = '#ffffff';
  sCtx.fill();
  sCtx.restore();

  // Terminal code text stream
  sCtx.font = '13px monospace';
  sCtx.fillStyle = '#ffffff';
  codeLines.forEach((line, idx) => {
    sCtx.fillText(line, 24, 90 + idx * 26);
  });

  // Telemetry status footer
  sCtx.fillStyle = '#888888';
  sCtx.fillText('> AI_MODEL: ACTIVE | DSA: 100% | LAT: 11.1271° N', 24, 350);

  screenTexture.needsUpdate = true;
}

// Mouse Parallax tracking
let mouseX = 0;
let mouseY = 0;
let targetRotX = 0;
let targetRotY = 0;

function onMouseMove(e) {
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const normX = (x / rect.width) * 2 - 1;
  const normY = -(y / rect.height) * 2 + 1;
  targetRotY = normX * 0.45;
  targetRotX = -normY * 0.35;
}

window.addEventListener('mousemove', onMouseMove);

// Animation Loop
let animId;
const clock = new THREE.Clock();

function animate() {
  animId = requestAnimationFrame(animate);
  const elapsedTime = clock.getElapsedTime();

  // Subtle floating sway
  const floatY = Math.sin(elapsedTime * 1.5) * 0.12;
  const floatRotZ = Math.sin(elapsedTime * 1.2) * 0.025;

  // Smooth lerp to mouse targets
  cameraRig.rotation.y += (targetRotY - cameraRig.rotation.y) * 0.08;
  cameraRig.rotation.x += (targetRotX - cameraRig.rotation.x) * 0.08;
  cameraRig.rotation.z = floatRotZ;
  cameraRig.position.y = floatY;

  // LED blink indicator
  ledMesh.material.color.setHex(Math.sin(elapsedTime * 6) > 0 ? 0x00ffcc : 0x004433);

  // Update LCD canvas
  updateScreenTexture(elapsedTime);

  renderer.render(scene, camera);
}
animate();

// Resize handling
function onResize() {
  const w = container.clientWidth || window.innerWidth;
  const h = container.clientHeight || 450;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
window.addEventListener('resize', onResize);

// Clean up
return function cleanup() {
  cancelAnimationFrame(animId);
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('resize', onResize);
  renderer.dispose();
  if (renderer.domElement && renderer.domElement.parentNode) {
    renderer.domElement.parentNode.removeChild(renderer.domElement);
  }
};

})();
</script>