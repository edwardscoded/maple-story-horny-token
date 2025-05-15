import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PixelBorderProps {
  children: ReactNode;
  className?: string;
  padding?: boolean;
  withShadow?: boolean;
}

export function PixelBorder({ 
  children, 
  className,
  padding = true,
  withShadow = true,
}: PixelBorderProps) {
  return (
    <div 
      className={cn(
        "border-4 border-darkBrown relative", 
        withShadow && "shadow-[4px_4px_0_rgba(61,40,23,0.8)]",
        padding && "p-4",
        "bg-beige",
        className
      )}
    >
      {children}
    </div>
  );
}
