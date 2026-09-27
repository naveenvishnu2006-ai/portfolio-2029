import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function RetroCamera() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 9.8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(renderer.domElement);

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

    const cameraRig = new THREE.Group();
    scene.add(cameraRig);

    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x181818, roughness: 0.35, metalness: 0.3 });
    const silverMat = new THREE.MeshStandardMaterial({ color: 0xe6e6e6, roughness: 0.18, metalness: 0.85 });
    const darkMetalMat = new THREE.MeshStandardMaterial({ color: 0x0d0d0d, roughness: 0.4, metalness: 0.6 });

    const bodyGeo = new THREE.BoxGeometry(6.6, 4.4, 1.9);
    const cameraBody = new THREE.Mesh(bodyGeo, bodyMat);
    cameraRig.add(cameraBody);

    const edgesGeo = new THREE.EdgesGeometry(bodyGeo);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
    const bodyLines = new THREE.LineSegments(edgesGeo, lineMat);
    cameraBody.add(bodyLines);

    const topPlateGeo = new THREE.BoxGeometry(6.62, 0.45, 1.92);
    const topPlate = new THREE.Mesh(topPlateGeo, silverMat);
    topPlate.position.y = 2.3;
    cameraRig.add(topPlate);

    const shutterGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.4, 24);
    const shutter = new THREE.Mesh(shutterGeo, darkMetalMat);
    shutter.position.set(-1.9, 2.6, -0.1);
    cameraRig.add(shutter);

    const dialGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.32, 24);
    const dial = new THREE.Mesh(dialGeo, silverMat);
    dial.position.set(-0.75, 2.58, -0.1);
    cameraRig.add(dial);

    const powerGeo = new THREE.BoxGeometry(0.28, 0.28, 0.42);
    const power = new THREE.Mesh(powerGeo, darkMetalMat);
    power.position.set(1.5, 2.58, -0.1);
    cameraRig.add(power);

    const screenCanvas = document.createElement('canvas');
    const upscale = 4;
    screenCanvas.width = 512 * upscale;
    screenCanvas.height = 384 * upscale;
    const sCtx = screenCanvas.getContext('2d');
    sCtx.scale(upscale, upscale);
    sCtx.imageSmoothingEnabled = true;
    sCtx.imageSmoothingQuality = 'high';

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.generateMipmaps = false;
    screenTexture.minFilter = THREE.LinearFilter;

    const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture, toneMapped: false });
    const screenGeo = new THREE.PlaneGeometry(3.8, 2.85);
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(-0.85, -0.15, 0.98);
    cameraRig.add(screenMesh);

    const bezelGeo = new THREE.BoxGeometry(4.0, 3.05, 0.06);
    const bezelMesh = new THREE.Mesh(bezelGeo, silverMat);
    bezelMesh.position.set(-0.85, -0.15, 0.94);
    cameraRig.add(bezelMesh);

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

    const ledGeo = new THREE.SphereGeometry(0.09, 12, 12);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x00ffcc });
    const ledMesh = new THREE.Mesh(ledGeo, ledMat);
    ledMesh.visible = false;
    ledMesh.position.set(1.15, 0.8, 0.97);
    cameraRig.add(ledMesh);

    const screwGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.05, 8);
    screwGeo.rotateX(Math.PI / 2);
    [[-3.0, 1.9], [-3.0, -1.9], [3.0, 1.9], [3.0, -1.9]].forEach(([sx, sy]) => {
      const screw = new THREE.Mesh(screwGeo, silverMat);
      screw.position.set(sx, sy, 0.96);
      cameraRig.add(screw);
    });

    let frame = 0;
    const codeLines = [
      'void init_technologist() {',
      '  dev.stack = ["C++", "Py", "Java"];',
      '  dev.focus = "AI & CREATIVE TECH";',
      '  system.boot("TAMIL NADU");',
      '  while(learning) {',
      '    build(); experiment(); repeat();',
      '  }',
      '}'
    ];

    
    
    const userImage = new window.Image();
    userImage.crossOrigin = 'Anonymous';
    userImage.src = '/profile.jpg';
    let imageLoaded = false;
    userImage.onload = () => { imageLoaded = true; };

    function updateScreenTexture(time) {
      try {
        frame++;
        
        sCtx.fillStyle = '#05070a';
        sCtx.fillRect(0, 0, 512, 384);

        if (imageLoaded && userImage.naturalWidth > 0) {
          sCtx.save();
          
          const imgRatio = userImage.naturalWidth / userImage.naturalHeight;
          const screenRatio = 512 / 384;
          let drawW, drawH;
          
          // Use object-fit: cover to fill screen without distortion
          if (imgRatio > screenRatio) {
            drawH = 384;
            drawW = drawH * imgRatio;
          } else {
            drawW = 512;
            drawH = drawW / imgRatio;
          }
          
          sCtx.beginPath();
          sCtx.rect(0, 0, 512, 384);
          sCtx.clip();
          
          sCtx.drawImage(
            userImage,
            (512 - drawW) / 2,
            (384 - drawH) / 2,
            drawW,
            drawH
          );
          
          sCtx.restore();
        }

        screenTexture.needsUpdate = true;
      } catch(err) {
        console.error("CANVAS ERROR:", err);
      }
    }

    let targetRotX = 0;
    let targetRotY = 0;
    
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const normX = (x / rect.width) * 2 - 1;
      const normY = -(y / rect.height) * 2 + 1;
      targetRotY = normX * 0.45;
      targetRotX = -normY * 0.35;
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    let animId;
    const startTime = performance.now();

    function animate() {
      animId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) / 1000;

      const floatY = Math.sin(elapsedTime * 1.5) * 0.12;
      const floatRotZ = Math.sin(elapsedTime * 1.2) * 0.025;

      cameraRig.rotation.y += (targetRotY - cameraRig.rotation.y) * 0.08;
      cameraRig.rotation.x += (targetRotX - cameraRig.rotation.x) * 0.08;
      cameraRig.rotation.z = floatRotZ;
      cameraRig.position.y = floatY;

      ledMesh.material.color.setHex(Math.sin(elapsedTime * 6) > 0 ? 0x00ffcc : 0x004433);

      updateScreenTexture(elapsedTime);
      renderer.render(scene, camera);
    }
    animate();

    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full min-h-[380px] bg-transparent block relative z-10" />;
}
