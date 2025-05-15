import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { PixelButton } from '@/components/PixelButton';
import { RetroDialog } from '@/components/RetroDialog';
import { ParallaxBackground } from '@/components/ParallaxBackground';
import { PixelBorder } from '@/components/ui/pixel-border';
import { useHornyPrice } from '@/hooks/useHornyPrice';

// Typing animation custom hook
function useTypingAnimation(texts: string[], typingSpeed = 40, delayBetweenTexts = 500) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const currentCharIndex = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Toggle cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  // Typing effect
  useEffect(() => {
    if (!isTyping || currentTextIndex >= texts.length) return;
    
    const currentFullText = texts[currentTextIndex];
    
    if (currentCharIndex.current < currentFullText.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayedText(prev => prev + currentFullText[currentCharIndex.current]);
        currentCharIndex.current += 1;
      }, typingSpeed);
      
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    } else {
      // Text completed, move to next after delay
      timeoutRef.current = setTimeout(() => {
        if (currentTextIndex < texts.length - 1) {
          setCurrentTextIndex(prev => prev + 1);
          setDisplayedText('');
          currentCharIndex.current = 0;
        } else {
          setIsTyping(false);
        }
      }, delayBetweenTexts);
      
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
  }, [displayedText, currentTextIndex, isTyping, texts, typingSpeed, delayBetweenTexts]);
  
  return { displayedText, showCursor, isTyping, currentTextIndex };
}

export default function ForestGate() {
  const { price, change, loading, error } = useHornyPrice();
  const [showConversation, setShowConversation] = useState(false);
  const [showContent, setShowContent] = useState(false);
  
  // Define conversation texts
  const conversationTexts = [
    "Welcome to the Horny Forest, traveler! I'm Shroomy, your guide to this mystical realm of kawaii creatures and degen opportunities.",
    "The prophecy speaks of great wealth for those who HODL the sacred $HORNY token through the next bull market...",
    "Let me show you around our community and the incredible tokenomics of $HORNY."
  ];
  
  const { displayedText, showCursor, isTyping, currentTextIndex } = useTypingAnimation(
    conversationTexts, 
    30, // typing speed in ms
    1000 // delay between texts in ms
  );
  
  // Start conversation when component mounts
  useEffect(() => {
    // Small delay before starting the conversation
    const timer = setTimeout(() => {
      setShowConversation(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Show content after conversation finishes or after a timeout
  useEffect(() => {
    if (!isTyping && currentTextIndex === conversationTexts.length - 1) {
      // Conversation finished, show content after delay
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isTyping, currentTextIndex, conversationTexts.length]);
  
  // Fallback to show content after 15 seconds
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!showContent) {
        setShowContent(true);
      }
    }, 15000);
    
    return () => clearTimeout(fallbackTimer);
  }, [showContent]);
  
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
          {/* Typing animation dialog */}
          {showConversation && (
            <RetroDialog className="mb-8" withAnimation variant="light">
              <div className="min-h-[120px]">
                <p className="font-body text-xl">
                  "{displayedText}
                  {showCursor && <span className="animate-pulse">|</span>}
                </p>
              </div>
              
              {/* Skip button - only shows while typing is happening */}
              {isTyping && (
                <div className="text-right mt-4">
                  <button 
                    className="text-sm text-darkBrown opacity-70 hover:opacity-100 transition-opacity"
                    onClick={() => {
                      setShowContent(true);
                    }}
                  >
                    [Skip →]
                  </button>
                </div>
              )}
            </RetroDialog>
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
