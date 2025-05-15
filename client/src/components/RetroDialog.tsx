import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RetroDialogProps {
  children: ReactNode;
  className?: string;
  variant?: 'dark' | 'light';
  withAnimation?: boolean;
}

export function RetroDialog({ 
  children, 
  className, 
  variant = 'dark', 
  withAnimation = false 
}: RetroDialogProps) {
  const baseClasses = cn(
    "border-4 rounded-md p-4 relative",
    variant === 'dark' 
      ? "bg-darkBrown bg-opacity-75 border-white text-white" 
      : "bg-beige border-darkBrown text-darkBrown",
    className
  );
  
  if (withAnimation) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={baseClasses}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div className={baseClasses}>
      {children}
    </div>
  );
}
