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
      if (newCount === 69 && window.showNsfwShrine) {
        window.showNsfwShrine();
      }
      return newCount;
    });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-beige px-4 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 text-center"
      >
        <h1 className="font-pixel text-avaxRed text-2xl md:text-4xl mb-4">Maple Story</h1>
        <div className="font-rpg text-4xl md:text-6xl mb-8 text-darkBrown">$HORNY</div>
        <p className="font-body text-xl md:text-2xl mb-8 max-w-xl mx-auto">
          A kawaii-inspired meme coin on the AVAX blockchain.
        </p>
        
        {/* Main mushroom mascot */}
        <div className="relative mx-auto w-48 h-48 mb-6 animate-float cursor-pointer" onClick={handleMascotClick}>
          <img 
            src="https://pixabay.com/get/g71724161ea3495d96a9c8071a0e9f5085f8844787167a1a20a043a2d84ecb86be45291626e9c8e961e38e1504492b9456e91a310069b71f7fb984a392f7a3e92_1280.jpg"
            alt="Horny Mushroom Mascot" 
            className="w-full h-full object-contain rounded-full" 
          />
          {clickCount > 0 && (
            <span className="absolute top-0 right-0 bg-avaxRed text-white font-pixel text-xs px-2 py-1 rounded-full">
              {clickCount}/69
            </span>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
          <PixelButton href="/forest-gate">Enter The Forest</PixelButton>
          <PixelButton 
            href="https://traderjoexyz.com" 
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
