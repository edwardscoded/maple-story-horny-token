import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AnimalCrossingDialogProps {
  messages: string[];
  characterImage?: string;
  characterName?: string;
  onComplete?: () => void;
  typingSpeed?: number;
  delayBetweenMessages?: number;
  className?: string;
}

export const AnimalCrossingDialog: React.FC<AnimalCrossingDialogProps> = ({
  messages,
  characterImage,
  characterName = 'Shroomy',
  onComplete,
  typingSpeed = 30,
  delayBetweenMessages = 1000,
  className = '',
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showNextButton, setShowNextButton] = useState(false);
  const [blipSound] = useState(() => new Audio('/sound/blip.mp3'));
  
  const messageRef = useRef<HTMLDivElement>(null);
  const currentCharIndex = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Sound effect for typing (Animal Crossing style)
  const playBlipSound = () => {
    // Try to play sound, but don't crash if it fails (browsers might block it)
    try {
      if (blipSound) {
        blipSound.volume = 0.2;
        blipSound.currentTime = 0;
        blipSound.play().catch(() => {});
      }
    } catch (e) {
      console.log('Sound disabled or not supported');
    }
  };
  
  // Typing effect for Animal Crossing style chunky text reveal
  useEffect(() => {
    if (!isTyping || currentMessageIndex >= messages.length) return;
    
    const currentFullText = messages[currentMessageIndex];
    
    if (currentCharIndex.current < currentFullText.length) {
      timeoutRef.current = setTimeout(() => {
        // Add the next character
        setDisplayedText(prev => {
          // Animal Crossing typically reveals several characters at once
          // with a slight pause, creating a chunky text appearance
          const nextChunkSize = Math.random() > 0.7 ? 3 : 1;
          const endIdx = Math.min(currentCharIndex.current + nextChunkSize, currentFullText.length);
          const newChars = currentFullText.substring(currentCharIndex.current, endIdx);
          currentCharIndex.current = endIdx;
          
          // Play the typing sound
          if (newChars.trim().length > 0) {
            playBlipSound();
          }
          
          return prev + newChars;
        });
        
        // If we're done with this message, show the Next button
        if (currentCharIndex.current >= currentFullText.length) {
          setShowNextButton(true);
          setIsTyping(false);
        }
      }, typingSpeed);
      
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
  }, [displayedText, currentMessageIndex, isTyping, messages, typingSpeed, playBlipSound]);
  
  // Handle Next button click
  const handleNext = () => {
    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex(prev => prev + 1);
      setDisplayedText('');
      currentCharIndex.current = 0;
      setIsTyping(true);
      setShowNextButton(false);
    } else {
      // We're done with all messages
      if (onComplete) onComplete();
    }
  };
  
  // Handle Skip button click
  const handleSkip = () => {
    if (isTyping) {
      // Show the full message immediately
      setDisplayedText(messages[currentMessageIndex]);
      currentCharIndex.current = messages[currentMessageIndex].length;
      setIsTyping(false);
      setShowNextButton(true);
    } else {
      handleNext();
    }
  };
  
  // Auto-scroll the message container to the bottom when new text appears
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [displayedText]);
  
  return (
    <div className={`relative ${className}`}>
      {/* Main dialog box - Animal Crossing style */}
      <div className="bg-white border-4 border-brown rounded-xl p-6 shadow-lg relative">
        {/* Character info section - top of dialog */}
        <div className="flex items-center mb-4 bg-[#f8f4e3] p-2 rounded-lg border-2 border-brown">
          {characterImage && (
            <div className="w-24 h-24 overflow-hidden mr-3 bg-transparent flex-shrink-0 p-1">
              <img 
                src={characterImage} 
                alt={characterName} 
                className="w-full h-full object-contain"
                onError={(e) => {
                  console.error('Image failed to load:', characterImage);
                  e.currentTarget.src = 'https://placehold.co/100x100/FFEEDD/brown?text=Shroomy';
                }}
              />
            </div>
          )}
          <div className="font-pixel text-xl text-[#9e5e3b]">{characterName}</div>
        </div>
        
        {/* Message text area - Animal Crossing style */}
        <div 
          ref={messageRef}
          className="font-pixel text-xl text-[#55453a] leading-relaxed min-h-[120px] max-h-[150px] overflow-y-auto pr-2 bg-[#f8f4e3] p-4 rounded-lg border-2 border-brown"
          style={{ letterSpacing: '0.5px' }}
        >
          {displayedText}
        </div>
        
        {/* Control buttons */}
        <div className="flex justify-end mt-4 space-x-3">
          {isTyping ? (
            <button 
              onClick={handleSkip}
              className="font-pixel text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-lg text-darkBrown transition-colors"
            >
              Skip
            </button>
          ) : showNextButton && (
            <motion.button
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.5 }}
              onClick={handleNext}
              className="font-pixel text-sm bg-avaxRed hover:bg-red-600 px-4 py-1 rounded-lg text-white transition-colors"
            >
              {currentMessageIndex < messages.length - 1 ? "Next" : "Close"}
            </motion.button>
          )}
        </div>
        
        {/* Animal Crossing dialog corner accent */}
        <div className="absolute -bottom-3 -right-3 w-0 h-0 border-t-[15px] border-t-transparent border-l-[15px] border-l-brown transform rotate-45"></div>
      </div>
    </div>
  );
};