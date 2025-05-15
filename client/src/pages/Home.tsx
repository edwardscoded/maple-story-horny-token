import { useState } from 'react';
import { motion } from 'framer-motion';
import { PixelButton } from '@/components/PixelButton';

export default function Home() {
  const [clickCount, setClickCount] = useState(0);
  const [showAchievement, setShowAchievement] = useState(false);
  
  // Handle mascot click for easter egg
  const handleMascotClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      // When reaching 69, trigger easter egg
      if (newCount === 69) {
        if ((window as any).showNsfwShrine) {
          (window as any).showNsfwShrine();
        }
        // Use setTimeout to avoid the setState during render warning
        setTimeout(() => {
          setShowAchievement(true);
          setTimeout(() => setShowAchievement(false), 3000);
        }, 0);
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
      
      {/* Main navigation buttons positioned at top */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 text-center p-4 rounded-lg bg-white bg-opacity-80 backdrop-blur-sm shadow-lg absolute top-5 left-0 right-0 mx-auto w-fit"
      >
        <div className="flex justify-center gap-4 items-center">
          <PixelButton href="/forest-gate" className="text-sm md:text-base">
            Enter Forest
          </PixelButton>
          <PixelButton
            href="https://arena.trade/token/0x3efeae3c9183f14f3baaaaf964f6e43e2f7a2922"
            variant="secondary"
            external
            className="text-sm md:text-base"
          >
            Buy
          </PixelButton>
        </div>
      </motion.div>
      
      {/* Clickable area over the mushroom in the background */}
      <div 
        className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-40 h-40 cursor-pointer"
        onClick={handleMascotClick}
        style={{
          borderRadius: "50%"
        }}
      >
        {clickCount > 0 && (
          <span className="absolute top-0 right-0 bg-avaxRed text-white font-pixel text-xs px-2 py-1 rounded-full">
            {clickCount}/69
          </span>
        )}
      </div>
      
      {/* Achievement message */}
      {showAchievement && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-4 right-4 bg-avaxRed text-white p-4 rounded-lg shadow-lg font-pixel z-50"
        >
          <p>Achievement Unlocked: Horny AF!</p>
        </motion.div>
      )}
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </section>
  );
}
