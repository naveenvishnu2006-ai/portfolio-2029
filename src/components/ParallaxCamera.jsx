import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxCamera({ children }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <motion.div style={{ y }} className="w-full h-full">
      {children}
    </motion.div>
  );
}
