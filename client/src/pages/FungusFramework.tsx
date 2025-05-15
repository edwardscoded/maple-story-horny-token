import { useState } from 'react';
import { motion } from 'framer-motion';
import { PixelBorder } from '@/components/ui/pixel-border';
import { ParallaxBackground } from '@/components/ParallaxBackground';
import { toast } from '@/hooks/use-toast';

export default function FungusFramework() {
  const [copySuccess, setCopySuccess] = useState(false);
  
  const contractAddress = "0x69420...HORNY";
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress)
      .then(() => {
        setCopySuccess(true);
        toast({
          title: "Copied to clipboard!",
          description: "Contract address has been copied",
          variant: "default",
        });
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        toast({
          title: "Failed to copy",
          description: "Please try again",
          variant: "destructive",
        });
      });
  };
  
  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "Spore Distribution",
      description: "Token launch, community building, and initial marketing campaign"
    },
    {
      phase: "Phase 2",
      title: "Mycelium Network",
      description: "Exchange listings, partnerships, and expanded marketing reach"
    },
    {
      phase: "Phase 3",
      title: "Mushroom Bloom",
      description: "NFT collection launch and community governance implementation"
    }
  ];
  
  return (
    <ParallaxBackground
      imageUrl="https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080"
      className="px-4 py-16"
      opacity={0.4}
    >
      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">The Fungus Framework</h2>
          <div className="section-divider"></div>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Contract Info */}
            <PixelBorder>
              <h3 className="font-pixel text-darkBrown text-lg mb-4">Contract Details</h3>
              <div className="bg-white p-4 space-y-4">
                <div>
                  <p className="font-body text-lg mb-2">$HORNY Contract:</p>
                  <p className="font-mono text-sm bg-gray-100 p-2 rounded overflow-x-auto">{contractAddress}</p>
                  <button 
                    className={`text-sm mt-1 hover:underline ${copySuccess ? 'text-green-500' : 'text-avaxRed'}`}
                    onClick={copyToClipboard}
                  >
                    {copySuccess ? "✓ Copied!" : "Copy Address"}
                  </button>
                </div>
                
                <div>
                  <p className="font-body text-lg mb-2">Deployed On:</p>
                  <p className="font-body">Avalanche C-Chain</p>
                </div>
                
                <div>
                  <p className="font-body text-lg mb-2">Security:</p>
                  <p className="font-body flex items-center">
                    <span className="inline-block w-4 h-4 rounded-full bg-green-500 mr-2"></span>
                    LP Locked for 4.20 Years
                  </p>
                  <p className="font-body flex items-center">
                    <span className="inline-block w-4 h-4 rounded-full bg-green-500 mr-2"></span>
                    Contract Verified
                  </p>
                </div>
              </div>
            </PixelBorder>
            
            {/* AVAX Benefits */}
            <PixelBorder>
              <h3 className="font-pixel text-darkBrown text-lg mb-4">Why AVAX?</h3>
              <div className="bg-white p-4">
                <ul className="space-y-4 font-body text-lg">
                  <li className="flex items-start">
                    <span className="inline-block w-5 h-5 rounded-full bg-avaxRed text-white flex items-center justify-center mr-2 mt-1">✓</span>
                    <span>Fast & Low-Cost Transactions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-5 h-5 rounded-full bg-avaxRed text-white flex items-center justify-center mr-2 mt-1">✓</span>
                    <span>Snow-Themed Synergy with Maple</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-5 h-5 rounded-full bg-avaxRed text-white flex items-center justify-center mr-2 mt-1">✓</span>
                    <span>EVM Compatible Smart Contracts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-5 h-5 rounded-full bg-avaxRed text-white flex items-center justify-center mr-2 mt-1">✓</span>
                    <span>Perfect for Degenerate Meme Coin Debauchery</span>
                  </li>
                </ul>
              </div>
            </PixelBorder>
          </motion.div>
          
          {/* Development Roadmap */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12"
          >
            <PixelBorder>
              <h3 className="font-pixel text-darkBrown text-lg mb-4">Mushroom Growth Stages</h3>
              <div className="bg-white p-4">
                <div className="relative">
                  {/* Roadmap line */}
                  <div className="absolute left-16 top-0 bottom-0 w-1 bg-avaxRed"></div>
                  
                  {/* Roadmap items */}
                  <div className="space-y-8">
                    {roadmapItems.map((item, index) => (
                      <div key={index} className="flex items-start relative">
                        <div className="absolute left-16 w-5 h-5 rounded-full bg-avaxRed transform -translate-x-1/2 z-10"></div>
                        <div className="w-16 font-pixel text-avaxRed">{item.phase}</div>
                        <div className="ml-12 font-body">
                          <h4 className="text-xl font-bold">{item.title}</h4>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </PixelBorder>
          </motion.div>
        </div>
      </div>
    </ParallaxBackground>
  );
}
