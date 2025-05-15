import { motion } from 'framer-motion';
import { RetroDialog } from '@/components/RetroDialog';
import { PixelBorder } from '@/components/ui/pixel-border';

export default function SporesOfWealth() {
  return (
    <section className="relative min-h-screen px-4 py-16 bg-forestGreen text-beige">
      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">The Spores of Wealth</h2>
          <div className="section-divider"></div>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <RetroDialog className="mb-12">
              <h3 className="font-rpg text-2xl text-avaxRed mb-4">$HORNY Tokenomics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-pixel text-white text-lg mb-4">Supply & Distribution</h4>
                  <ul className="space-y-2 font-body text-lg">
                    <li>Total Supply: 69,420,000,000 $HORNY</li>
                    <li>Circulating: 66,666,666,666 $HORNY</li>
                    <li>Burned: 2,753,333,334 $HORNY</li>
                    <li>LP Locked: 4.20 years</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-pixel text-white text-lg mb-4">Tax Structure</h4>
                  <ul className="space-y-2 font-body text-lg">
                    <li>Buy Tax: 4.20%</li>
                    <li>Sell Tax: 6.90%</li>
                    <li>Marketing: 2%</li>
                    <li>Burn: 1%</li>
                    <li>LP: 1%</li>
                  </ul>
                </div>
              </div>
            </RetroDialog>
          </motion.div>
          
          {/* Tokenomics Tree Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <PixelBorder className="text-darkBrown">
              <h4 className="font-pixel text-center text-lg mb-4">Wealth Tree Growth</h4>
              <div className="relative h-64 bg-white p-4 flex items-end justify-center">
                {/* A pixel art tree that shows growth based on market cap */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  <div className="w-48 h-48 relative">
                    {/* A stylized tree graphic showing growth stages */}
                    <img 
                      src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200" 
                      alt="Growth tree visualization" 
                      className="w-full h-full object-contain" 
                    />
                    {/* Maple leaves as decoration */}
                    <img 
                      src="https://pixabay.com/get/gbdc156eac207c18f109df6c1e38ea31442b52471e361f11022fab9a0ad86d1239bd93260066036cadd4e1644cf73a66347ec08cdbf5230201af3d4d320731dda_1280.jpg" 
                      alt="Maple leaf" 
                      className="absolute top-0 right-0 w-12 h-12 object-contain" 
                    />
                    {/* Maple leaves as decoration */}
                    <img 
                      src="https://images.unsplash.com/photo-1509224863479-ab583ee78692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                      alt="Maple leaf" 
                      className="absolute bottom-0 left-0 w-10 h-10 object-contain" 
                    />
                  </div>
                </div>
                
                {/* Market cap milestones */}
                <div className="w-full flex justify-between text-sm text-gray-600 z-10">
                  <div>$0</div>
                  <div>$1M</div>
                  <div>$10M</div>
                  <div>$100M</div>
                  <div>$1B</div>
                </div>
              </div>
            </PixelBorder>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
