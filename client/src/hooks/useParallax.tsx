import { useState, useEffect, RefObject } from 'react';

interface ParallaxReturn {
  yOffset: number;
}

export function useParallax(
  ref: RefObject<HTMLElement>,
  speed: number = 0.5
): ParallaxReturn {
  const [yOffset, setYOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const scrollTop = window.scrollY;
      const element = ref.current;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollTop;
      const elementCenter = elementTop + (rect.height / 2);
      const windowCenter = scrollTop + (window.innerHeight / 2);
      const distanceFromCenter = elementCenter - windowCenter;
      
      // Calculate parallax offset based on distance from center of viewport
      const offset = distanceFromCenter * speed;
      
      setYOffset(offset);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, speed]);

  return { yOffset };
}
