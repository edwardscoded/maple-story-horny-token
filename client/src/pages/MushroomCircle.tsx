import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { PixelButton } from '@/components/PixelButton';
import { PixelBorder } from '@/components/ui/pixel-border';
import { ParallaxBackground } from '@/components/ParallaxBackground';
import { useQuery } from '@tanstack/react-query';

interface Holder {
  id: number;
  rank: number;
  wallet: string;
  amount: string;
  status: string;
}

export default function MushroomCircle() {
  // Fetch holders from API
  const { data: holders, isLoading, error } = useQuery<Holder[]>({
    queryKey: ['/api/holders'],
    retry: 1,
  });
  
  // Fallback data in case API fails
  const fallbackHolders = [
    { id: 1, rank: 1, wallet: "0x3efe...2922", amount: "69,420,000", status: "Mushroom King" },
    { id: 2, rank: 2, wallet: "0xABCD...1234", amount: "42,069,000", status: "Elder Shroom" },
    { id: 3, rank: 3, wallet: "0xDEAD...BEEF", amount: "8,008,135", status: "Horny Degen" },
  ];
  
  return (
    <ParallaxBackground
      imageUrl="https://images.unsplash.com/photo-1516214104703-d870798883c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080"
      className="px-4 py-16"
    >
      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">The Mushroom Circle</h2>
          <div className="section-divider"></div>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Social Feed */}
            <PixelBorder>
              <h3 className="font-pixel text-darkBrown text-lg mb-4">Forest Chat</h3>
              <div className="bg-white h-96 overflow-y-auto p-4">
                <div className="text-center text-gray-500 py-12">
                  <p className="font-body text-xl">X Feed Integration</p>
                  <p className="text-sm mt-2">Real-time community posts will appear here</p>
                </div>
              </div>
              <div className="mt-4 flex gap-4">
                <PixelButton 
                  href="https://twitter.com/search?q=%24HORNY"
                  external={true}
                  className="flex-1"
                >
                  Join on X
                </PixelButton>
                <PixelButton 
                  href="https://t.me/HornyMapleStory"
                  external={true}
                  className="flex-1"
                >
                  Telegram
                </PixelButton>
              </div>
            </PixelBorder>
            
            {/* Community Memes */}
            <PixelBorder>
              <h3 className="font-pixel text-darkBrown text-lg mb-4">Meme Shrine</h3>
              <div className="p-6 text-center">
                <div className="bg-white p-8 rounded-lg border-2 border-dashed border-gray-300 mb-4">
                  <h4 className="font-pixel text-avaxRed text-lg mb-4">Submit Your Memes</h4>
                  <p className="text-gray-600 mb-4">
                    Share your best $HORNY token memes with the community
                  </p>
                  <div className="flex justify-center">
                    <div className="mt-2 text-sm text-gray-500">
                      Community submissions will appear here
                    </div>
                  </div>
                </div>
              </div>
              <PixelButton href="#" size="full" className="mt-4">Download Assets</PixelButton>
            </PixelBorder>
          </motion.div>
          
          {/* Top Holders section removed as requested */}
        </div>
      </div>
    </ParallaxBackground>
  );
}
