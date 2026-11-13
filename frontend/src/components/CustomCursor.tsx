import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  return (
    // z-index diturunkan menjadi z-40 agar tidak menutupi Navbar (z-50)
    <div className="pointer-events-none fixed inset-0 z-40 hidden md:block overflow-hidden">
      {/* Titik utama kursor - Diubah menjadi Putih */}
      <motion.div
        className="absolute top-0 left-0 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovered ? 2.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 35 }}
      />
      
      {/* Lingkaran luar pendaran (Glow trailing) - Diubah menjadi Putih */}
      <motion.div
        className="absolute top-0 left-0 w-8 h-8 border border-white/50 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.4)]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
      />
    </div>
  );
}