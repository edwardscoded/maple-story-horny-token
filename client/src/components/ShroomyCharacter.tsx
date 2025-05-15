import React from 'react';

interface ShroomyCharacterProps {
  className?: string;
  width?: number;
  height?: number;
}

export const ShroomyCharacter: React.FC<ShroomyCharacterProps> = ({
  className = '',
  width = 80,
  height = 80
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Mushroom cap */}
      <circle cx="50" cy="50" r="40" fill="#3C7DD9" />
      <circle cx="50" cy="50" r="35" fill="#4E8FE8" />
      
      {/* Spikes on the mushroom cap */}
      <path d="M50 10 L55 25 L45 25 Z" fill="#2C5AA0" />
      <path d="M80 30 L65 40 L70 25 Z" fill="#2C5AA0" />
      <path d="M90 50 L75 50 L80 40 Z" fill="#2C5AA0" />
      <path d="M80 70 L65 60 L70 75 Z" fill="#2C5AA0" />
      <path d="M50 90 L55 75 L45 75 Z" fill="#2C5AA0" />
      <path d="M20 70 L35 60 L30 75 Z" fill="#2C5AA0" />
      <path d="M10 50 L25 50 L20 40 Z" fill="#2C5AA0" />
      <path d="M20 30 L35 40 L30 25 Z" fill="#2C5AA0" />
      
      {/* White base */}
      <path d="M35 65 C35 75, 65 75, 65 65 L63 85 C63 92, 37 92, 37 85 Z" fill="#F0EAD6" />
      
      {/* Eyes */}
      <circle cx="42" cy="50" r="5" fill="#000" />
      <circle cx="58" cy="50" r="5" fill="#000" />
      
      {/* Eye shine */}
      <circle cx="44" cy="48" r="2" fill="#FFF" />
      <circle cx="60" cy="48" r="2" fill="#FFF" />
      
      {/* Smile */}
      <path d="M45 60 Q50 65 55 60" stroke="#000" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};