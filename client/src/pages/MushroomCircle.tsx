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
              <div className="grid grid-cols-2 gap-4">
                {/* A humorous meme showing mushroom characters in a trading scenario */}
                <img 
                  src="https://pixabay.com/get/gbce1c3cec4e31c8dd733bea3d1076dde33c400146d0afbb9b86e44781087fb40cf9226ee69c0e3cc38b842af1de609692781db0736f09cca32e8b13c52b308c1_1280.jpg" 
                  alt="Community meme" 
                  className="w-full h-40 object-cover" 
                />
                {/* A meme showing a surprised mushroom looking at price charts */}
                <img 
                  src="https://images.unsplash.com/photo-1612404730960-5c71577fca11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300" 
                  alt="Community meme" 
                  className="w-full h-40 object-cover" 
                />
                {/* A meme about diamond hands with mushroom characters */}
                <img 
                  src="https://pixabay.com/get/gf48a429e465f31f82e9b8af9cc60a8d31c874700204be263a8e731bfd4c87a773b90ed6de2f27ffa2562f8d839d74390c77fb53c243dcb07f91479035d97f251_1280.jpg" 
                  alt="Community meme" 
                  className="w-full h-40 object-cover" 
                />
                {/* A meme showing mushrooms on the moon */}
                <img 
                  src="https://pixabay.com/get/g787d75bec2eb496740ddb6da5d67a2cd010824fa8e77a7efa035d947f70f21fda26eb3916d09493e9d16c3eeb2fb7013d237cede687305b7d3e951034fa1c5c8_1280.jpg" 
                  alt="Community meme" 
                  className="w-full h-40 object-cover" 
                />
              </div>
              <PixelButton href="#" size="full" className="mt-4">Download Assets</PixelButton>
            </PixelBorder>
          </motion.div>
          
          {/* Bagholder Shrine */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12"
          >
            <PixelBorder>
              <h3 className="font-pixel text-darkBrown text-lg mb-4">Bagholder Shrine</h3>
              <div className="bg-white p-4">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="w-10 h-10 border-4 border-avaxRed border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : error ? (
                  <div className="text-center py-8 text-red-500">
                    <p>Failed to load holders data</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto max-h-[500px]">
                    <table className="min-w-full">
                      <thead className="sticky top-0 bg-white z-10">
                        <tr>
                          <th className="px-4 py-2 text-left font-pixel text-sm text-avaxRed">Rank</th>
                          <th className="px-4 py-2 text-left font-pixel text-sm text-avaxRed">Wallet</th>
                          <th className="px-4 py-2 text-left font-pixel text-sm text-avaxRed">$HORNY Held</th>
                          <th className="px-4 py-2 text-left font-pixel text-sm text-avaxRed">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(holders || fallbackHolders).map((holder, index) => (
                          <tr key={holder.id || index} className={index % 2 === 1 ? "bg-gray-50" : ""}>
                            <td className="px-4 py-2 font-body">#{holder.rank}</td>
                            <td className="px-4 py-2 font-mono text-sm">{holder.wallet}</td>
                            <td className="px-4 py-2 font-body">{holder.amount}</td>
                            <td className="px-4 py-2">
                              <span 
                                className={`px-2 py-1 rounded text-xs text-white ${
                                  holder.status === "Mushroom King" ? "bg-forestGreen" :
                                  holder.status === "Elder Shroom" ? "bg-avaxRed" :
                                  holder.status === "Mushroom Knight" ? "bg-amber-600" :
                                  holder.status === "Spore Guardian" ? "bg-indigo-600" :
                                  holder.status === "Fungus Friend" ? "bg-emerald-600" :
                                  holder.status === "Mycelium Member" ? "bg-cyan-600" :
                                  "bg-mushroomPink"
                                }`}
                              >
                                {holder.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </PixelBorder>
          </motion.div>
        </div>
      </div>
    </ParallaxBackground>
  );
}
