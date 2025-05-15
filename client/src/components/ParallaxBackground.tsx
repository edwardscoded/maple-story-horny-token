import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useParallax } from '@/hooks/useParallax';

interface ParallaxBackgroundProps {
  imageUrl: string;
  className?: string;
  children?: React.ReactNode;
  opacity?: number;
  speed?: number;
}

export function ParallaxBackground({
  imageUrl,
  className,
  children,
  opacity = 0.6,
  speed = 0.5
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { yOffset } = useParallax(ref, speed);
  
  return (
    <div 
      ref={ref} 
      className={cn(
        "relative min-h-screen overflow-hidden",
        className
      )}
    >
      {/* Background image with parallax effect */}
      <div 
        className="absolute inset-0 z-0 bg-center bg-no-repeat bg-cover"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          opacity,
          transform: `translateY(${yOffset}px)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}
