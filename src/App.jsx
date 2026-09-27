import { motion } from 'framer-motion';
import useSound from 'use-sound';
import ScrollProgress from './components/ScrollProgress';
import MagneticButton from './components/MagneticButton';
import ParallaxCamera from './components/ParallaxCamera';
import SpotlightGrid from './components/SpotlightGrid';

import React, { useEffect } from 'react';
import RetroCamera from './components/RetroCamera';
import LiquidGlass from './components/LiquidGlass';



function App() {

  useEffect(() => {
    

    // 1. AI Projector Spotlight Tracking
    const projectorZone = document.getElementById('projector-interactive-zone');
    const light = document.getElementById('projector-light');
    
    const handleProjectorMove = (e) => {
      const rect = projectorZone.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      projectorZone.style.setProperty('--mouse-x', `${x}px`);
      projectorZone.style.setProperty('--mouse-y', `${y}px`);
    };

    if (projectorZone && light) {
      projectorZone.addEventListener('mousemove', handleProjectorMove);
    }

    // 2. Hero Interactive Skew Tilt
    const heroContainer = document.getElementById('hero-distortion-container');
    const handleHeroMove = (e) => {
      const xNorm = (e.clientX / window.innerWidth) - 0.5;
      const yNorm = (e.clientY / window.innerHeight) - 0.5;
      heroContainer.style.transform = `perspective(1000px) rotateY(${xNorm * 4}deg) rotateX(${-yNorm * 4}deg)`;
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
      card.style.transform = `perspective(400px) rotateX(${-y * 0.1}deg) rotateY(${x * 0.1}deg) translateY(-6px)`;
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

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background"><div className="h-20 w-full px-margin-mobile lg:px-margin flex items-center justify-between gap-gutter"><div className="flex items-center gap-space-lg"><a className="group flex flex-col" data-path="hero" href="#" onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); return false; }}><span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-space-xs">[ DEV // CSE UNDERGRAD ]</span></a><div className="hidden xl:flex items-center gap-space-sm pl-space-md"><span className="inline-block w-2 h-2 rounded-full bg-on-surface animate-pulse"></span><span className="font-label-sm text-label-sm text-on-surface uppercase tracking-widest">DEV // 2024 - 2025 PORTFOLIO</span></div></div><nav className="hidden md:flex items-center gap-space-xs" data-active-classes="bg-surface-container text-on-surface font-bold"><a aria-current="page" className="px-space-sm py-space-xs uppercase tracking-wider transition-colors bg-surface-container text-on-surface font-bold" data-path="hero" href="#" onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); return false; }}>[ HERO ]</a><a className="px-space-sm py-space-xs font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors" data-path="about" href="#about">[ ABOUT ]</a><a className="px-space-sm py-space-xs font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors" data-path="skills" href="#skills">[ SKILLS ]</a><a className="px-space-sm py-space-xs font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors" data-path="softwares" href="#softwares">[ TECH STACK ]</a><a className="px-space-sm py-space-xs font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors" data-path="contact" href="#contact">[ CONTACT ]</a></nav><div className="flex items-center gap-space-md"><button className="flex items-center gap-space-xs px-space-sm py-space-xs bg-surface-container hover:bg-surface-bright text-on-surface transition-all active:scale-95" type="button"><span className="material-symbols-outlined text-[16px]">code</span><span className="font-label-sm text-label-sm uppercase tracking-wider hidden sm:inline">TERMINAL</span></button><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">terminal</span></div></div></div></header><ScrollProgress />
<main className="w-full pt-20 bg-background">
        <LiquidGlass /><div className="flex flex-col w-full text-on-surface select-none overflow-x-hidden font-body-md">


<section className="scroll-mt-20 relative w-full bg-transparent text-inverse-surface pt-space-xl pb-space-2xl px-margin-mobile lg:px-margin flex flex-col items-center justify-between min-h-[calc(100vh-80px)] border-b-2 border-surface-container-highest overflow-hidden" id="hero">




<div className="relative w-full max-w-7xl my-auto py-space-xl z-20 transition-transform duration-200 ease-out flex flex-col items-center" id="hero-distortion-container">

<div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-space-md text-center lg:text-left">

<div className="lg:col-span-3 flex flex-col items-center lg:items-start order-2 lg:order-1">
<div className="font-display-hero text-display-hero tracking-tighter text-inverse-surface leading-none select-none font-extrabold drop-shadow-[4px_4px_0px_#4c4546]">
              2029
            </div>
<div className="mt-space-xs inline-flex items-center gap-1 px-space-sm py-0.5 bg-inverse-surface text-primary-container font-label-md text-label-md font-bold tracking-widest uppercase">
            [ DEV // ARCHIVE ]
          </div>
</div>

<div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2 my-space-md lg:my-0">
<div className="relative group cursor-crosshair">

<div className="relative bg-inverse-surface text-primary-container px-space-lg py-space-sm transform -rotate-2 group-hover:rotate-0 transition-transform duration-300 shadow-[8px_8px_0px_0px_#4c4546]">
<span className="block font-display-hero text-[64px] lg:text-[84px] uppercase leading-none font-extrabold tracking-tight text-center">
                NAVEEN
              </span>
<span className="block font-display-hero text-[64px] lg:text-[84px] uppercase leading-none font-extrabold tracking-tight text-center -mt-2">
                VISHNU
              </span>

<div className="absolute -top-3 -left-3 w-6 h-6 bg-transparent text-inverse-surface flex items-center justify-center text-xs font-mono font-bold">✕</div>
<div className="absolute -bottom-3 -right-3 w-6 h-6 bg-transparent text-inverse-surface flex items-center justify-center text-xs font-mono font-bold">✕</div>
</div>

<div className="absolute -right-8 -top-6 rotate-12 bg-transparent border-2 border-inverse-surface px-2 py-0.5 text-inverse-surface font-label-sm text-label-sm uppercase tracking-widest hidden md:block">
              CSE ENGINEER
            </div>
</div>
</div>

<div className="lg:col-span-3 flex flex-col items-center lg:items-end order-3">

<div className="mb-space-sm transform rotate-6 hover:-rotate-3 transition-transform duration-300">
<svg className="w-48 h-20 text-inverse-surface filter drop-shadow-[2px_2px_0px_#ffffff]" fill="currentColor" viewBox="0 0 240 80">
<text fontFamily="'Syne', sans-serif" fontSize="30" fontWeight="900" letterSpacing="-1" transform="rotate(-5 20,40)" x="10" y="38">NAVEEN</text>
<text fontFamily="'Space Mono', monospace" fontSize="32" fontWeight="700" letterSpacing="-1" transform="rotate(4 50,70)" x="45" y="70">VISHNU</text>
<path d="M 12 75 Q 90 60 220 72" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4"></path>
</svg>
</div>
<div className="font-display-hero text-display-hero tracking-tighter text-inverse-surface leading-none select-none font-extrabold drop-shadow-[4px_4px_0px_#4c4546]">
              2029
            </div>
</div>
</div>

<div className="w-full mt-space-xl flex flex-wrap items-center justify-center gap-space-sm">
<div className="px-space-md py-space-xs bg-surface-container-highest text-inverse-surface font-headline-sm text-headline-sm uppercase tracking-wider font-extrabold transform -rotate-1 border border-outline-variant">
          COMPUTER SCIENCE STUDENT
        </div>
<span className="font-headline-md text-headline-md text-inverse-surface mx-space-xs select-none">•</span>
<div className="px-space-md py-space-xs bg-inverse-surface text-primary-container font-headline-sm text-headline-sm uppercase tracking-wider font-extrabold transform rotate-1 shadow-[4px_4px_0px_0px_#4c4546]">
          DEVELOPER
        </div>
<span className="font-headline-md text-headline-md text-inverse-surface mx-space-xs select-none">•</span>
<div className="px-space-md py-space-xs bg-surface-container-highest text-inverse-surface font-headline-sm text-headline-sm uppercase tracking-wider font-extrabold transform -rotate-1 border border-outline-variant">
          CREATIVE TECHNOLOGIST
        </div>
</div>

<div className="w-full mt-space-md flex flex-wrap items-center justify-center gap-space-xs">
<span className="px-space-sm py-1 border border-outline-variant bg-surface-container text-inverse-surface font-label-sm text-label-sm font-bold uppercase tracking-wider">[ TAMIL NADU, INDIA ]</span>
<span className="px-space-sm py-1 border border-outline-variant bg-surface-container text-inverse-surface font-label-sm text-label-sm font-bold uppercase tracking-wider">[ CSE UNDERGRAD ]</span>
<span className="px-space-sm py-1 border border-outline-variant bg-surface-container text-inverse-surface font-label-sm text-label-sm font-bold uppercase tracking-wider">[ CREATIVE TECHNOLOGIST ]</span>
<span className="px-space-sm py-1 border border-inverse-surface bg-inverse-surface text-primary-container font-label-sm text-label-sm font-bold uppercase tracking-wider">[ AVAILABLE FOR ROLES ]</span>
</div>
</div>

<div className="w-full border-t border-surface-container-highest pt-space-sm flex flex-col sm:flex-row justify-between items-center gap-space-sm z-20">
<div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest flex items-center gap-space-sm">
<span className="w-2 h-2 rounded-full bg-inverse-surface"></span>
<span>SCROLL DOWN TO INSPECT DEV DOSSIER</span>
</div>
<div className="font-label-sm text-label-sm text-inverse-surface font-bold uppercase tracking-wider">
        [ MANIFESTO: LEARN. BUILD. EXPERIMENT. REPEAT. ]
      </div>
</div>
</section>

<section className="scroll-mt-20 relative w-full bg-inverse-surface/90 text-inverse-on-surface py-space-2xl px-margin-mobile lg:px-margin z-30 transition-colors duration-500" id="about">
<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">

<div className="lg:col-span-6 flex flex-col items-center">

<div className="w-full bg-surface-container-low text-on-surface p-space-md border-4 border-inverse-on-surface shadow-[10px_10px_0px_0px_#1a1c1c] relative group">

<div className="w-full flex justify-between items-center pb-space-sm mb-space-sm border-b border-surface-container-highest font-label-sm text-label-sm text-on-surface-variant uppercase">
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-error animate-pulse"></span>
<span className="font-bold text-inverse-surface tracking-wider">REC [DEV-TERM.01]</span>
</div>
<div className="flex items-center gap-space-xs tracking-widest font-mono text-on-surface">
<span>BAT 98%</span>
<span className="material-symbols-outlined text-[16px]">battery_full</span>
<span>• SHUTTER 1/500</span>
</div>
</div>

<div className="relative w-full h-[400px] bg-transparent overflow-hidden border-2 border-surface-container-high flex flex-col justify-between p-space-md">

<div className="absolute inset-0 z-10 flex items-center justify-center">

<div className="w-full h-full min-h-[380px] bg-transparent block relative z-10" style={{display: "block"}}>

<RetroCamera />

</div>

</div>

<div className="relative z-20 flex justify-between items-start pointer-events-none text-inverse-surface">
<div className="font-label-sm text-label-sm bg-transparent/80 px-2 py-1 border border-surface-container-highest">
<span>NAVEEN VISHNU // DEV-TERM.01</span><br/>
<span>ISO 800 • F/1.8 • RAW+CODE</span>
</div>
<div className="font-label-sm text-label-sm bg-transparent/80 px-2 py-1 text-right border border-surface-container-highest">
<span>CSE // TAMIL NADU</span><br/>
<span className="text-on-surface-variant">60.0 FPS</span>
</div>
</div>

<div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 opacity-40 hidden">
<div className="w-32 h-32 border border-dashed border-inverse-surface flex items-center justify-center">
<div className="w-2 h-2 bg-inverse-surface/90 rounded-full"></div>
</div>
</div>

<div className="relative z-20 flex justify-between items-end pointer-events-none font-label-sm text-label-sm text-inverse-surface">
<span className="bg-transparent/80 px-2 py-0.5">MEM: 512GB ARCHIVE</span>
<span className="bg-transparent/80 px-2 py-0.5 text-on-surface-variant font-mono">DEBUG: ACTIVE</span>
</div>
</div>

<div className="mt-space-md flex items-center justify-between pt-space-xs font-label-sm text-label-sm text-inverse-surface">
<div className="flex items-center gap-space-sm">
<span className="w-4 h-4 rounded-full border border-inverse-surface flex items-center justify-center text-[10px]">W</span>
<span className="w-4 h-4 rounded-full border border-inverse-surface flex items-center justify-center text-[10px]">T</span>
<span className="text-on-surface-variant uppercase tracking-wider text-[11px]">ZOOM ROCKER</span>
</div>
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-outline"></div>
<div className="w-3 h-3 rounded-full bg-outline"></div>
<div className="w-3 h-3 rounded-full bg-outline"></div>
<span className="uppercase tracking-widest text-[11px]">DPAD CONTROLS</span>
</div>
</div>
</div>

<div className="mt-space-md w-full flex justify-start items-center pl-space-md">

</div>
</div>

<div className="lg:col-span-6 flex flex-col gap-space-xl">

<div className="flex flex-col gap-space-md">

<div className="inline-block relative">
<h2 className="font-display-hero text-headline-lg font-black uppercase tracking-tight text-inverse-on-surface drop-shadow-[3px_3px_0px_#000000]">
              ABOUT ME
            </h2>
<div className="h-1.5 w-36 bg-inverse-on-surface -mt-2"></div>
</div>

<p className="font-body-lg text-body-lg text-inverse-on-surface font-normal leading-relaxed mt-space-sm">
              Hi! I'm <strong className="font-bold underline decoration-2">Naveen Vishnu</strong>. I’m a Computer Science Engineering student from Tamil Nadu, India, exploring the intersection of software, AI, and design.<br/><br/>I enjoy turning ideas into simple, intuitive digital experiences while continuously learning new technologies and improving my craft.
            </p>
<div className="flex flex-wrap gap-space-xs mt-space-xs">
<span className="px-space-sm py-1 border-2 border-inverse-on-surface font-label-sm text-label-sm font-bold uppercase tracking-wider">
              [ TAMIL NADU, INDIA ]
            </span>
<span className="px-space-sm py-1 border-2 border-inverse-on-surface font-label-sm text-label-sm font-bold uppercase tracking-wider">
              [ CSE UNDERGRAD ]
            </span>
<span className="px-space-sm py-1 border-2 border-inverse-on-surface font-label-sm text-label-sm font-bold uppercase tracking-wider bg-inverse-on-surface text-inverse-surface">
              [ AVAILABLE FOR ROLES ]
            </span>
</div>
</div>

<div className="flex flex-col gap-space-md border-t-2 border-inverse-on-surface pt-space-lg" id="contact">
<div className="flex justify-between items-baseline">
<div>
<h3 className="font-display-hero text-headline-md font-extrabold uppercase tracking-tight text-inverse-on-surface">
                CONTACT
              </h3>
<p className="font-label-sm text-label-sm uppercase font-bold tracking-widest text-inverse-on-surface mt-1">LET'S CONNECT</p>
</div>

</div>

<div className="flex flex-col gap-space-xs">

<MagneticButton className="group flex items-center justify-between p-space-sm border-2 border-inverse-on-surface bg-inverse-surface/90 hover:bg-inverse-on-surface hover:text-inverse-surface transition-colors cursor-pointer" onClick={() => { navigator.clipboard.writeText('+91 93452 13903'); alert('Copied: +91 93452 13903'); }}>
<div className="flex items-center gap-space-md">
<span className="material-symbols-outlined text-[20px]">call</span>
<span className="font-label-lg text-label-lg tracking-wider font-bold">+91 93452 13903</span>
</div>
<span className="font-label-sm text-label-sm uppercase tracking-widest px-2 py-0.5 border border-current">
                CALL / COPY [PHONE]
              </span>
</MagneticButton>

<MagneticButton as="a" className="group flex items-center justify-between p-space-sm border-2 border-inverse-on-surface bg-inverse-surface/90 hover:bg-inverse-on-surface hover:text-inverse-surface transition-colors cursor-pointer" href="mailto:naveenvishnu20006@gmail.com" onClick={() => { navigator.clipboard.writeText('naveenvishnu20006@gmail.com'); }}>
<div className="flex items-center gap-space-md">
<span className="material-symbols-outlined text-[20px]">mail</span>
<span className="font-label-lg text-label-lg tracking-wider font-bold">naveenvishnu20006@gmail.com</span>
</div>
<span className="font-label-sm text-label-sm uppercase tracking-widest px-2 py-0.5 border border-current">
                COPY EMAIL ↗
              </span>
</MagneticButton>

<MagneticButton as="a" className="group flex items-center justify-between p-space-sm border-2 border-inverse-on-surface bg-inverse-surface/90 hover:bg-inverse-on-surface hover:text-inverse-surface transition-colors" href="https://linkedin.com/in/naveen-vishnu2006" rel="noopener noreferrer" target="_blank">
<div className="flex items-center gap-space-md">
<span className="font-bold font-mono text-[16px] px-1 border border-current">in</span>
<span className="font-label-lg text-label-lg tracking-wider font-bold">NAVEEN VISHNU</span>
</div>
<span className="font-label-sm text-label-sm uppercase tracking-widest px-2 py-0.5 border border-current">
                CONNECT [LINKEDIN] ↗
              </span>
</MagneticButton>
</div>
</div>
</div>
</div>
</section>

<section className="scroll-mt-20 relative w-full bg-transparent text-inverse-surface py-space-2xl px-margin-mobile lg:px-margin border-t-2 border-b-2 border-surface-container-highest" id="skills">

<div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter" id="ai-projector-canvas">

<div className="lg:col-span-4 p-space-lg bg-surface-container-lowest/80 border-2 border-surface-container-highest flex flex-col justify-between shadow-[6px_6px_0px_0px_#201f1f]">
<div>

<div className="flex flex-wrap items-start justify-between gap-2 pb-space-md border-b border-surface-container-highest mb-space-lg">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-[28px] text-inverse-surface">school</span>
<h3 className="font-display-hero text-headline-sm font-black uppercase tracking-tight">EDUCATION</h3>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant font-mono whitespace-nowrap pt-1">[ 01 / ACAD ]</span>
</div>

<div className="flex flex-col gap-space-lg">

<div className="flex flex-col gap-1">
<div className="flex justify-between items-baseline">
<span className="font-headline-sm text-headline-sm font-bold text-inverse-surface leading-tight">Computer Science &amp; Engineering</span>
<span className="font-label-sm text-label-sm px-1.5 py-0.5 bg-surface-container text-on-surface">B.E. / B.TECH</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Engineering Institute · Tamil Nadu, India</p>
<div className="w-full bg-surface-container h-1 mt-1">
<div className="bg-inverse-surface/90 h-1 w-full"></div>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant mt-1">Focus on Algorithms, Systems &amp; AI</span>
</div>

<div className="flex flex-col gap-1">
<div className="flex justify-between items-baseline">
<span className="font-headline-sm text-headline-sm font-bold text-inverse-surface leading-tight">Higher Secondary</span>
<span className="font-label-sm text-label-sm px-1.5 py-0.5 bg-surface-container text-on-surface">GRAD</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Tamil Nadu State Board</p>
<div className="w-full bg-surface-container h-1 mt-1">
<div className="bg-inverse-surface/90 h-1 w-full"></div>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant mt-1">Physics, Chemistry, Mathematics &amp; CS</span>
</div>
</div>
</div>
<div className="mt-space-xl pt-space-md border-t border-surface-container-highest flex justify-between items-center font-label-sm text-label-sm text-on-surface-variant">
<span>ACADEMIC STATUS</span>
<span className="text-inverse-surface font-bold">CURRENTLY ENROLLED [OK]</span>
</div>
</div>

<div className="lg:col-span-3 p-space-lg bg-surface-container-lowest/80 border-2 border-surface-container-highest flex flex-col justify-between shadow-[6px_6px_0px_0px_#201f1f]">
<div>

<div className="flex flex-wrap items-start justify-between gap-2 pb-space-md border-b border-surface-container-highest mb-space-lg">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-[28px] text-inverse-surface">hub</span>
<h3 className="font-display-hero text-headline-sm font-black uppercase tracking-tight">FOCUS AREAS</h3>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant font-mono">[ 02 / DOMAINS ]</span>
</div>
<div className="flex flex-col gap-space-md">

<div className="flex flex-col gap-1 border-b border-surface-container-high pb-space-xs">
<div className="flex justify-between items-baseline">
<span className="font-headline-sm text-[17px] font-bold">Software Development</span>
<span className="font-label-sm text-[10px] tracking-widest uppercase font-bold text-inverse-surface">[HIGH PRIORITY]</span>
</div>
<div className="grid grid-cols-5 gap-1.5 w-full mt-1">
<div className="h-2 bg-inverse-surface/90"></div>
<div className="h-2 bg-inverse-surface/90"></div>
<div className="h-2 bg-inverse-surface/90"></div>
<div className="h-2 bg-inverse-surface/90"></div>
<div className="h-2 bg-inverse-surface/90"></div>
</div>
</div>

<div className="flex flex-col gap-1 border-b border-surface-container-high pb-space-xs">
<div className="flex justify-between items-baseline">
<span className="font-headline-sm text-[17px] font-bold">Artificial Intelligence &amp; ML</span>
<span className="font-label-sm text-[10px] tracking-widest uppercase font-bold text-inverse-surface">[ACTIVE]</span>
</div>
<div className="grid grid-cols-5 gap-1.5 w-full mt-1">
<div className="h-2 bg-inverse-surface/90"></div>
<div className="h-2 bg-inverse-surface/90"></div>
<div className="h-2 bg-inverse-surface/90"></div>
<div className="h-2 bg-inverse-surface/90"></div>
<div className="h-2 bg-surface-container-highest"></div>
</div>
</div>

<div className="flex flex-col gap-1 border-b border-surface-container-high pb-space-xs">
<div className="flex justify-between items-baseline">
<span className="font-headline-sm text-[17px] font-bold">Full-Stack Development</span>
<span className="font-label-sm text-[10px] tracking-widest uppercase font-bold text-inverse-surface">[PRODUCTION]</span>
</div>
<div className="grid grid-cols-5 gap-1.5 w-full mt-1">
<div className="h-2 bg-inverse-surface/90"></div>
<div className="h-2 bg-inverse-surface/90"></div>
<div className="h-2 bg-inverse-surface/90"></div>
<div className="h-2 bg-inverse-surface/90"></div>
<div className="h-2 bg-surface-container-highest"></div>
</div>
</div>

<div className="flex flex-col gap-1 border-b border-surface-container-high pb-space-xs">
<div className="flex justify-between items-baseline">
<span className="font-headline-sm text-[17px] font-bold">Data &amp; Analytics</span>
<span className="font-label-sm text-[10px] tracking-widest uppercase font-bold text-inverse-surface">[CORE]</span>
</div>
<div className="grid grid-cols-5 gap-1.5 w-full mt-1">
<div className="h-2 bg-inverse-surface/90"></div>
<div className="h-2 bg-inverse-surface/90"></div>
<div className="h-2 bg-inverse-surface/90"></div>
<div className="h-2 bg-surface-container-highest"></div>
<div className="h-2 bg-surface-container-highest"></div>
</div>
</div>

<div className="flex flex-col gap-1">
<div className="flex justify-between items-baseline">
<span className="font-headline-sm text-[17px] font-bold">Creative Tech &amp; UI/UX</span>
<span className="font-label-sm text-[10px] tracking-widest uppercase font-bold text-inverse-surface">[PASSION]</span>
</div>
<div className="grid grid-cols-5 gap-1.5 w-full mt-1">
<div className="h-2 bg-inverse-surface/90"></div>
<div className="h-2 bg-inverse-surface/90"></div>
<div className="h-2 bg-inverse-surface/90"></div>
<div className="h-2 bg-inverse-surface/90"></div>
<div className="h-2 bg-inverse-surface/90"></div>
</div>
</div>
</div>
</div>

<div className="mt-space-lg p-space-sm bg-surface-container border border-surface-container-highest flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">INTERESTS &amp; PASSIONS</span>
<span className="material-symbols-outlined text-[18px]">explore</span>
</div>
</div>

<div className="lg:col-span-5 relative p-space-lg bg-surface-container-lowest/80 border-2 border-surface-container-highest flex flex-col justify-between overflow-hidden shadow-[6px_6px_0px_0px_#201f1f]" id="projector-interactive-zone">

<div className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-60" id="projector-light" style={{background: "radial-gradient(circle 220px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.22), transparent 75%)"}}></div>
<div className="relative z-10">

<div className="flex items-center justify-between pb-space-md border-b border-surface-container-highest mb-space-md">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-[28px] text-inverse-surface">bolt</span>
<h3 className="font-display-hero text-headline-sm font-black uppercase tracking-tight">SKILLS &amp; STACK</h3>
</div>
<div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant font-mono whitespace-nowrap pt-1">
<span className="w-2 h-2 rounded-full bg-inverse-surface/90 animate-ping"></span>
<span>[ PROJECTOR ON ]</span>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">
<div className="flex items-center gap-space-sm p-space-xs hover:bg-inverse-surface/90 hover:text-primary-container transition-colors group cursor-default">
<span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary-container">memory</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold uppercase tracking-wider">C++</span>
<span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-primary-container">[SYSTEMS &amp; DSA]</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-xs hover:bg-inverse-surface/90 hover:text-primary-container transition-colors group cursor-default">
<span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary-container">terminal</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold uppercase tracking-wider">PYTHON</span>
<span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-primary-container">[AI / DATA / BACKEND]</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-xs hover:bg-inverse-surface/90 hover:text-primary-container transition-colors group cursor-default">
<span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary-container">code</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold uppercase tracking-wider">JAVA</span>
<span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-primary-container">[ENTERPRISE &amp; OOP]</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-xs hover:bg-inverse-surface/90 hover:text-primary-container transition-colors group cursor-default">
<span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary-container">android</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold uppercase tracking-wider">ANDROID</span>
<span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-primary-container">[MOBILE APPS]</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-xs hover:bg-inverse-surface/90 hover:text-primary-container transition-colors group cursor-default">
<span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary-container">psychology</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold uppercase tracking-wider">AI &amp; ML</span>
<span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-primary-container">[MODELS &amp; EXPLORATION]</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-xs hover:bg-inverse-surface/90 hover:text-primary-container transition-colors group cursor-default">
<span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary-container">design_services</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold uppercase tracking-wider">UI/UX &amp; DESIGN</span>
<span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-primary-container">[INTERACTION &amp; EXP]</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-xs hover:bg-inverse-surface/90 hover:text-primary-container transition-colors group cursor-default">
<span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary-container">web</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold uppercase tracking-wider">FULL-STACK WEB</span>
<span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-primary-container">[REACT/TS/NODE]</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-xs hover:bg-inverse-surface/90 hover:text-primary-container transition-colors group cursor-default">
<span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary-container">architecture</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold uppercase tracking-wider">SYSTEM ARCH</span>
<span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-primary-container">[OPTIMIZATION]</span>
</div>
</div>
</div>
</div>
<div className="relative z-10 mt-space-md pt-space-xs border-t border-surface-container-highest flex justify-between items-center font-label-sm text-label-sm text-on-surface-variant">
<span>SPOTLIGHT INTERACTION ACTIVE</span>
<span className="font-mono text-inverse-surface">FOCUS: 100%</span>
</div>
</div>
</div>
</section>

<section className="scroll-mt-20 relative w-full bg-transparent text-inverse-surface py-space-2xl px-margin-mobile lg:px-margin overflow-hidden" id="softwares">
<div className="max-w-7xl mx-auto flex flex-col items-center">

<div className="flex items-center gap-space-md mb-space-xl">
<span className="font-display-hero text-headline-lg font-bold text-on-surface-variant select-none">[</span>
<h2 className="font-display-hero text-headline-lg font-black uppercase tracking-tight text-inverse-surface text-center drop-shadow-[4px_4px_0px_#4c4546]">TECH STACK & TOOLS</h2>
<span className="font-display-hero text-headline-lg font-bold text-on-surface-variant select-none">]</span>
</div>

<SpotlightGrid className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-space-md w-full max-w-5xl">

<motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: 0, ease: [0.22, 1, 0.36, 1] }} className="software-tilt-card group relative h-40 bg-surface-container-low border-2 border-inverse-surface flex flex-col justify-between p-space-sm cursor-pointer shadow-[6px_6px_0px_0px_#353534] transition-colors hover:bg-inverse-surface/90 hover:text-primary-container hover:-translate-y-2">
<div className="flex justify-between items-start">
<span className="font-label-sm text-label-sm uppercase font-mono group-hover:text-primary-container">01</span>
<span className="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:text-primary-container">memory</span>
</div>
<div className="font-display-hero text-headline-lg font-extrabold text-center tracking-tighter my-auto">
            C++
          </div>
<div className="text-center font-label-sm text-[10px] uppercase font-bold tracking-widest">
            SYSTEMS &amp; DSA
          </div>
</motion.div>
<motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="software-tilt-card group relative h-40 bg-surface-container-low border-2 border-inverse-surface flex flex-col justify-between p-space-sm cursor-pointer shadow-[6px_6px_0px_0px_#353534] transition-colors hover:bg-inverse-surface/90 hover:text-primary-container hover:-translate-y-2">
<div className="flex justify-between items-start">
<span className="font-label-sm text-label-sm uppercase font-mono group-hover:text-primary-container">02</span>
<span className="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:text-primary-container">terminal</span>
</div>
<div className="font-display-hero text-headline-lg font-extrabold text-center tracking-tighter my-auto">
            Py
          </div>
<div className="text-center font-label-sm text-[10px] uppercase font-bold tracking-widest">
            PYTHON / ML
          </div>
</motion.div>
<motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="software-tilt-card group relative h-40 bg-surface-container-low border-2 border-inverse-surface flex flex-col justify-between p-space-sm cursor-pointer shadow-[6px_6px_0px_0px_#353534] transition-colors hover:bg-inverse-surface/90 hover:text-primary-container hover:-translate-y-2">
<div className="flex justify-between items-start">
<span className="font-label-sm text-label-sm uppercase font-mono group-hover:text-primary-container">03</span>
<span className="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:text-primary-container">coffee</span>
</div>
<div className="font-display-hero text-headline-lg font-extrabold text-center tracking-tighter my-auto">
            Java
          </div>
<div className="text-center font-label-sm text-[10px] uppercase font-bold tracking-widest">
            CORE &amp; ANDROID
          </div>
</motion.div>
<motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: 0.30000000000000004, ease: [0.22, 1, 0.36, 1] }} className="software-tilt-card group relative h-40 bg-surface-container-low border-2 border-inverse-surface flex flex-col justify-between p-space-sm cursor-pointer shadow-[6px_6px_0px_0px_#353534] transition-colors hover:bg-inverse-surface/90 hover:text-primary-container hover:-translate-y-2">
<div className="flex justify-between items-start">
<span className="font-label-sm text-label-sm uppercase font-mono group-hover:text-primary-container">04</span>
<span className="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:text-primary-container">android</span>
</div>
<div className="font-display-hero text-headline-lg font-extrabold text-center tracking-tighter my-auto">
            And
          </div>
<div className="text-center font-label-sm text-[10px] uppercase font-bold tracking-widest">
            STUDIO / APPS
          </div>
</motion.div>
<motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} className="software-tilt-card group relative h-40 bg-surface-container-low border-2 border-inverse-surface flex flex-col justify-between p-space-sm cursor-pointer shadow-[6px_6px_0px_0px_#353534] transition-colors hover:bg-inverse-surface/90 hover:text-primary-container hover:-translate-y-2">
<div className="flex justify-between items-start">
<span className="font-label-sm text-label-sm uppercase font-mono group-hover:text-primary-container">05</span>
<span className="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:text-primary-container">psychology</span>
</div>
<div className="font-display-hero text-headline-lg font-extrabold text-center tracking-tighter my-auto">
            AI
          </div>
<div className="text-center font-label-sm text-[10px] uppercase font-bold tracking-widest">
            MODELS &amp; LLMS
          </div>
</motion.div>
<motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} className="software-tilt-card group relative h-40 bg-surface-container-low border-2 border-inverse-surface flex flex-col justify-between p-space-sm cursor-pointer shadow-[6px_6px_0px_0px_#353534] transition-colors hover:bg-inverse-surface/90 hover:text-primary-container hover:-translate-y-2">
<div className="flex justify-between items-start">
<span className="font-label-sm text-label-sm uppercase font-mono group-hover:text-primary-container">06</span>
<span className="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:text-primary-container">draw</span>
</div>
<div className="font-display-hero text-headline-lg font-extrabold text-center tracking-tighter my-auto">
            UX
          </div>
<div className="text-center font-label-sm text-[10px] uppercase font-bold tracking-widest">
            FIGMA &amp; CLEAN UI
          </div>
</motion.div>
</SpotlightGrid>
<div className="mt-space-2xl">
<a className="inline-flex items-center gap-space-sm px-space-xl py-space-md bg-inverse-surface/90 text-primary-container font-label-lg text-label-lg font-bold uppercase tracking-widest border-2 border-inverse-surface shadow-[6px_6px_0px_0px_#ffffff] hover:bg-transparent hover:text-inverse-surface transition-all active:translate-x-1 active:translate-y-1 active:shadow-none" href="#contact">
<span>LET'S CONNECT / OPPORTUNITIES</span>
<span className="material-symbols-outlined text-[18px]">north_east</span>
</a>
</div>
</div>
</section>


</div></main><footer className="w-full bg-surface-container-lowest/80 py-space-2xl"><div className="w-full px-margin-mobile lg:px-margin flex flex-col md:flex-row justify-between items-start md:items-end gap-space-xl"><div className="flex flex-col gap-space-sm"></div><div className="flex flex-col sm:flex-row sm:items-center gap-space-lg"><div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">© 2024 - 2025 ALL RIGHTS RESERVED.</div><div className="flex items-center gap-space-md"><a className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider hover:underline" data-path="contact" href="#contact">CONNECT [01]</a><a className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider hover:underline" data-path="skills" href="#skills">STACK [02]</a></div></div></div></footer>
    </>
  );
}

export default App;
