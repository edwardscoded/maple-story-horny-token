import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PixelButton } from '@/components/PixelButton';
import { ParallaxBackground } from '@/components/ParallaxBackground';
import { PixelBorder } from '@/components/ui/pixel-border';
import { useHornyPrice } from '@/hooks/useHornyPrice';
import { AnimalCrossingDialog } from '@/components/AnimalCrossingDialog';
import { ShroomyCharacter } from '@/components/ShroomyCharacter';

export default function ForestGate() {
  const { price, change, loading, error } = useHornyPrice();
  const [showConversation, setShowConversation] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [shroomyCharacterSvg, setShroomyCharacterSvg] = useState<string>('');
  
  // Define conversation messages in Animal Crossing style
  const conversationMessages = [
    "Welcome to the Horny Forest, traveler! I'm Shroomy, your guide to this mystical realm of kawaii creatures and degen opportunities.",
    "The prophecy speaks of great wealth for those who HODL the sacred $HORNY token through the next bull market...",
    "Let me show you around our community and the incredible tokenomics of $HORNY.",
    "We're going to make it, fren!"
  ];
  
  // Generate the Shroomy character SVG as a data URL
  useEffect(() => {
    const svgElement = document.createElement('div');
    svgElement.innerHTML = '<svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#3C7DD9" /><circle cx="50" cy="50" r="35" fill="#4E8FE8" /><path d="M50 10 L55 25 L45 25 Z" fill="#2C5AA0" /><path d="M80 30 L65 40 L70 25 Z" fill="#2C5AA0" /><path d="M90 50 L75 50 L80 40 Z" fill="#2C5AA0" /><path d="M80 70 L65 60 L70 75 Z" fill="#2C5AA0" /><path d="M50 90 L55 75 L45 75 Z" fill="#2C5AA0" /><path d="M20 70 L35 60 L30 75 Z" fill="#2C5AA0" /><path d="M10 50 L25 50 L20 40 Z" fill="#2C5AA0" /><path d="M20 30 L35 40 L30 25 Z" fill="#2C5AA0" /><path d="M35 65 C35 75, 65 75, 65 65 L63 85 C63 92, 37 92, 37 85 Z" fill="#F0EAD6" /><circle cx="42" cy="50" r="5" fill="#000" /><circle cx="58" cy="50" r="5" fill="#000" /><circle cx="44" cy="48" r="2" fill="#FFF" /><circle cx="60" cy="48" r="2" fill="#FFF" /><path d="M45 60 Q50 65 55 60" stroke="#000" stroke-width="2" stroke-linecap="round" /></svg>';
    
    const svgString = svgElement.innerHTML;
    const dataUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;
    setShroomyCharacterSvg(dataUrl);
  }, []);
  
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
      className="px-4 py-16"
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
                characterImage={shroomyCharacterSvg}
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