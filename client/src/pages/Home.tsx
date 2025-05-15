import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PixelButton } from '@/components/PixelButton';

export default function Home() {
  const [clickCount, setClickCount] = useState(0);
  
  // Handle mascot click for easter egg
  const handleMascotClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      // When reaching 69, trigger easter egg
      if (newCount === 69 && (window as any).showNsfwShrine) {
        (window as any).showNsfwShrine();
      }
      return newCount;
    });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: "url('/src/assets/images/horny_mushroom_bg.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      />
      
      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-20 z-0"></div>
      
      {/* Main content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 text-center p-6 rounded-lg bg-white bg-opacity-80 backdrop-blur-sm shadow-lg"
      >
        <h1 className="font-pixel text-avaxRed text-2xl md:text-4xl mb-4">Maple Story</h1>
        <div className="font-rpg text-4xl md:text-6xl mb-8 text-darkBrown">$HORNY</div>
        <p className="font-body text-xl md:text-2xl mb-8 max-w-xl mx-auto text-darkBrown">
          A kawaii-inspired meme coin on the AVAX blockchain.
        </p>
        
        {/* No need for external mascot image as it's already in our background */}
        <div className="relative mx-auto w-48 h-48 mb-6 cursor-pointer" onClick={handleMascotClick}>
          {/* Counter will still be shown when clicking */}
          {clickCount > 0 && (
            <span className="absolute top-0 right-0 bg-avaxRed text-white font-pixel text-xs px-2 py-1 rounded-full">
              {clickCount}/69
            </span>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
          <PixelButton href="/forest-gate">Enter The Forest</PixelButton>
          <PixelButton 
            href="https://arena.trade/token/0x3efeae3c9183f14f3baaaaf964f6e43e2f7a2922" 
            external={true}
            variant="forest"
          >
            Buy $HORNY
          </PixelButton>
        </div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <svg className="w-6 h-6 text-darkBrown" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </section>
  );
}
