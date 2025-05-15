import { ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "font-pixel text-xs md:text-sm uppercase transition-all relative py-3 px-4 shadow-[0_4px_0_rgba(0,0,0,0.3)] hover:translate-y-[2px] hover:shadow-[0_2px_0_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-none",
  {
    variants: {
      variant: {
        default: "bg-avaxRed text-white",
        forest: "bg-forestGreen text-white",
        secondary: "bg-darkBrown text-beige",
        outline: "bg-transparent border-2 border-avaxRed text-avaxRed shadow-none hover:bg-avaxRed hover:text-white",
      },
      size: {
        default: "py-3 px-4",
        sm: "py-2 px-3 text-xs",
        lg: "py-4 px-6",
        icon: "p-2",
        full: "py-3 px-4 w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface PixelButtonProps 
  extends ButtonHTMLAttributes<HTMLButtonElement>, 
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
  external?: boolean;
}

export function PixelButton({
  className,
  variant,
  size,
  asChild = false,
  href,
  external = false,
  ...props
}: PixelButtonProps) {
  const classes = cn(buttonVariants({ variant, size, className }));
  
  if (href) {
    return (
      <a 
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {props.children}
      </a>
    );
  }
  
  return (
    <button
      className={classes}
      {...props}
    />
  );
}
