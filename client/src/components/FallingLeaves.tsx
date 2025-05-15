import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Leaf {
  id: number;
  left: string;
  delay: string;
  duration: string;
  rotation: number;
  color: string;
}

const leafColors = ['#E84142', '#D32F2F', '#C62828', '#B71C1C'];

export function FallingLeaves() {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    // Create initial batch of leaves
    const initialLeaves = Array.from({ length: 20 }, (_, i) => createLeaf(i));
    setLeaves(initialLeaves);

    // Add a new leaf periodically
    const interval = setInterval(() => {
      setLeaves(prev => {
        // Remove leaves that have been falling for too long to manage DOM size
        if (prev.length > 50) {
          const newLeaves = [...prev.slice(-40)];
          newLeaves.push(createLeaf(Date.now()));
          return newLeaves;
        }
        return [...prev, createLeaf(Date.now())];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  function createLeaf(id: number): Leaf {
    const left = `${Math.random() * 100}%`;
    const delay = `${Math.random() * 10}s`;
    const duration = `${15 + Math.random() * 10}s`;
    const rotation = Math.random() * 360;
    const colorIndex = Math.floor(Math.random() * leafColors.length);

    return {
      id,
      left,
      delay,
      duration,
      rotation,
      color: leafColors[colorIndex]
    };
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute w-8 h-8"
          style={{
            left: leaf.left,
            top: '-40px',
          }}
          initial={{ y: -40, rotate: 0, opacity: 1 }}
          animate={{ 
            y: window.innerHeight + 40,
            rotate: leaf.rotation + 720,
            opacity: 0
          }}
          transition={{
            duration: parseInt(leaf.duration),
            delay: parseInt(leaf.delay),
            ease: "linear",
          }}
        >
          <svg viewBox="0 0 24 24" fill={leaf.color}>
            <path d="M12,2.5L8,7L2,7L2,12L8,17L12,21.5L16,17L22,12L22,7L16,7L12,2.5Z"></path>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
