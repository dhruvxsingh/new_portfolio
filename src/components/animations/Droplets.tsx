'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Droplets({ count = 30 }: { count?: number }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none z-0">
      {Array(count).fill(0).map((_, i) => {
        const size = 20 + Math.random(); // Larger droplets (50-200px)
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const opacity = 0.2 + Math.random() * 0.3; // Semi-transparent
        
        return (
          <motion.div
            key={i}
            initial={{ 
              y: -size,
              opacity: 0,
              scale: 0.5
            }}
            animate={{ 
              y: `calc(100vh + ${size}px)`, // Fall to bottom of viewport
              opacity: [opacity, opacity, 0], // Fade out at bottom
              x: left * 0.1 - 5, // Slight horizontal drift
              scale: 1
            }}
            transition={{
              duration: 5 + Math.random() * 10, // Longer duration
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${left}%`,
              top: `-${size}px`,
              width: `${size}px`,
              height: `${size}px`,
              filter: 'blur(2px)'
            }}
            className="absolute bg-blue-400/70 rounded-full"
          />
        );
      })}
    </div>
  );
}