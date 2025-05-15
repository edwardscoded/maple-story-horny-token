import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PixelButton } from '@/components/PixelButton';
import { ParallaxBackground } from '@/components/ParallaxBackground';
import { PixelBorder } from '@/components/ui/pixel-border';
import { useHornyPrice } from '@/hooks/useHornyPrice';
import { AnimalCrossingDialog } from '@/components/AnimalCrossingDialog';
import shroomyImage from '../assets/images/characters/shroomy.png';

export default function ForestGate() {
  const { price, change, loading, error } = useHornyPrice();
  const [showConversation, setShowConversation] = useState(false);
  const [showContent, setShowContent] = useState(false);
  
  // Define conversation messages in Animal Crossing style
  const conversationMessages = [
    "Hello there, wanderer! *boing* I'm Shroomy, guardian of this magical forest and mascot of the $HORNY token!",
    "Welcome to the Forest Gate! *bounce* This is where all the fun-gis hang out, hehe! Get it? Fun-guys? Fungi? *giggle*",
    "Our $HORNY tokens grow wild here, just like me! They're the most magical mushrooms in all of the AVAX chain!",
    "The Sacred Tree ahead holds ancient wisdom... and maybe some sick gains too! The markets have been REALLY fun lately!",
    "Over at the Mushroom Circle, you'll find our top holders. Those guys have, like, TONS of $HORNY! Super impressive!",
    "Make sure to check out the Spores of Wealth! That's where all the juicy tokenomics live. Supply, demand, all that jazz!",
    "And if you want to meet other $HORNY enthusiasts, the Fungus Framework is our mega-cool community hub!",
    "What are you waiting for? Let's go explore! And remember: Stay $HORNY, stay happy! *wiggle dance*"
  ];
  
  // Start conversation when component mounts
  useEffect(() => {
    // Small delay before starting the conversation
    const timer = setTimeout(() => {
      setShowConversation(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle when dialog is complete
  const handleDialogComplete = () => {
    setShowContent(true);
  };

  return (
    <ParallaxBackground
      imageUrl="/src/assets/images/forest_gate_bg.png"
      className="px-4 py-16 min-h-screen"
    >
      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">The Forest Gate</h2>
          <div className="section-divider"></div>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          {/* Animal Crossing style dialog */}
          {showConversation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 max-w-2xl mx-auto"
            >
              <AnimalCrossingDialog
                messages={conversationMessages}
                characterImage={shroomyImage}
                characterName="Shroomy"
                onComplete={handleDialogComplete}
                typingSpeed={40}
                delayBetweenMessages={1200}
              />
            </motion.div>
          )}
          
          {/* Content appears after conversation completes */}
          {showContent && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
            >
              {/* Price Chart */}
              <PixelBorder>
                <h3 className="font-pixel text-darkBrown text-lg mb-4">$HORNY Price</h3>
                <div className="bg-white h-64 flex items-center justify-center">
                  {loading ? (
                    <div className="text-center">
                      <div className="w-8 h-8 border-4 border-avaxRed border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <p className="font-body text-gray-500">Loading price data...</p>
                    </div>
                  ) : error ? (
                    <div className="text-center text-red-500">
                      <p className="font-body text-lg">Oops! Couldn't fetch price data.</p>
                      <p className="text-sm mt-2">Please try again later</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="font-body text-2xl text-avaxRed">${price || '0.0000042069'}</p>
                      <p className={`font-body text-xl ${change && parseFloat(change) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {change ? `${change}% today` : '+69% today'}
                      </p>
                      <p className="text-gray-500 text-sm mt-4">Price data via DexScreener API</p>
                      
                      {/* Simple placeholder chart */}
                      <div className="h-20 mx-auto mt-4 flex items-end gap-1">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div 
                            key={i}
                            className="bg-avaxRed bg-opacity-70 w-2"
                            style={{ 
                              height: `${20 + Math.sin(i/2) * 15 + Math.random() * 10}px`,
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </PixelBorder>
              
              {/* Buy Now Section */}
              <PixelBorder id="buy">
                <h3 className="font-pixel text-darkBrown text-lg mb-4">Buy $HORNY</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4">
                    <p className="font-body text-lg mb-2">Token Contract:</p>
                    <p className="font-mono text-sm bg-gray-100 p-2 rounded overflow-x-auto">0x3efeae3c9183f14f3baaaaf964f6e43e2f7a2922</p>
                  </div>
                  <PixelButton 
                    href="https://arena.trade/token/0x3efeae3c9183f14f3baaaaf964f6e43e2f7a2922" 
                    external={true}
                    size="full"
                  >
                    Buy on Arena
                  </PixelButton>
                  <p className="text-sm text-gray-600 text-center mt-2">Always DYOR. This is not financial advice.</p>
                </div>
              </PixelBorder>
            </motion.div>
          )}
        </div>
      </div>
    </ParallaxBackground>
  );
}