import React, { useRef, useEffect } from 'react';

export default function SpotlightGrid({ children, className }) {
  const containerRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const spotlight = spotlightRef.current;
    if (!container || !spotlight) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spotlight.style.background = "radial-gradient(600px circle at " + x + "px " + y + "px, rgba(255,255,255,.15), transparent 40%)";
    };

    const handleMouseEnter = () => {
      spotlight.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      spotlight.style.opacity = '0';
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className={"relative overflow-hidden " + (className || "")}>
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-10"
      />
      {children}
    </div>
  );
}
