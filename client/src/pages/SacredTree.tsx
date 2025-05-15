import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RetroDialog } from '@/components/RetroDialog';
import { ParallaxBackground } from '@/components/ParallaxBackground';
import sacredTreeBg from '../assets/images/backgrounds/sacred_tree_bg.png';

export default function SacredTree() {
  const [activeChapter, setActiveChapter] = useState(0);
  
  const chapters = [
    {
      title: "Chapter I: Origin of the Horny Mushroom",
      content: [
        "Long ago, in the mystical forests of AVAX, there grew a special mushroom unlike any other. Blessed by the Maple spirits, this mushroom possessed an unusual quality - it made creatures... excited.",
        "The forest creatures called it \"The Horny Mushroom\" for its peculiar effect and distinctive shape that resembled... well, you know."
      ]
    },
    {
      title: "Chapter II: Prophecy of the Great Maple Pump",
      content: [
        "The wise elder mushrooms foretold a prophecy: \"When the red leaves of the Maple trees fall during the season of the bull, a great pump shall occur.\"",
        "\"Those who believe and HODL the essence of the Horny Mushroom shall be rewarded with untold riches, while paper-handed normies shall forever regret their weak decisions.\""
      ]
    },
    {
      title: "Chapter III: Tragedy of the Coomers",
      content: [
        "But not all is well in the Maple Forest. A group known as \"The Coomers\" seeks to exploit the Horny Mushrooms for their own selfish gains, mining them to extinction.",
        "Only through the power of community and the sacred $HORNY token can we protect the mushrooms and fulfill the prophecy of the Great Pump.",
        "Will you join us in our mission?"
      ]
    }
  ];
  
  const goToNextChapter = () => {
    if (activeChapter < chapters.length - 1) {
      setActiveChapter(prev => prev + 1);
    }
  };
  
  return (
    <ParallaxBackground
      imageUrl={sacredTreeBg}
      className="px-4 py-16 min-h-screen text-beige"
      opacity={0.9}
    >
      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">The Sacred Tree</h2>
          <div className="section-divider"></div>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          {/* Story sections with scroll reveal */}
          <div className="space-y-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChapter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <RetroDialog className="lore-section" withAnimation>
                  <h3 className="font-rpg text-2xl text-avaxRed mb-4">{chapters[activeChapter].title}</h3>
                  {chapters[activeChapter].content.map((paragraph, idx) => (
                    <p key={idx} className="font-body text-xl mb-4">{paragraph}</p>
                  ))}
                  {activeChapter < chapters.length - 1 && (
                    <button 
                      onClick={goToNextChapter}
                      className="font-pixel text-xs mt-4 text-avaxRed hover:text-white transition-colors"
                    >
                      ▼ NEXT ▼
                    </button>
                  )}
                </RetroDialog>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Decorative elements removed as requested */}
        </div>
      </div>
    </ParallaxBackground>
  );
}
