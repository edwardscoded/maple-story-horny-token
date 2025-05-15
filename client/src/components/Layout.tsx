import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { FallingLeaves } from './FallingLeaves';
import { AnimatePresence, motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { name: 'Home', path: '/' },
  { name: 'Forest Gate', path: '/forest-gate' },
  { name: 'Sacred Tree', path: '/sacred-tree' },
  { name: 'Mushroom Circle', path: '/mushroom-circle' },
  { name: 'Spores of Wealth', path: '/spores-of-wealth' },
  { name: 'Fungus Framework', path: '/fungus-framework' },
];

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (mobileMenuOpen) setMobileMenuOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  // Easter egg NSFW shrine modal
  const [showNsfwShrine, setShowNsfwShrine] = useState(false);

  // Expose the Easter egg to the window object so pages can trigger it
  useEffect(() => {
    (window as any).showNsfwShrine = () => setShowNsfwShrine(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? 'bg-darkBrown text-beige shadow-md' : 'bg-transparent text-darkBrown'
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className={`font-pixel ${scrolled ? 'text-avaxRed' : 'text-avaxRed'} text-lg`}>
              $HORNY
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                className={`font-pixel text-xs py-1 border-b-2 ${
                  location === item.path 
                  ? 'border-avaxRed text-avaxRed' 
                  : `${scrolled ? 'border-transparent text-beige hover:text-avaxRed' : 'border-transparent hover:text-avaxRed'}`
                }`}
              >
                {item.name}
              </Link>
            ))}
            <a 
              href="https://arena.trade/token/0x3efeae3c9183f14f3baaaaf964f6e43e2f7a2922" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`font-pixel text-xs py-1 px-3 bg-avaxRed text-white hover:bg-opacity-90 shadow-md transition-all`}
            >
              BUY $HORNY
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              toggleMobileMenu();
            }}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-darkBrown text-beige shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <Link 
                    key={item.path} 
                    href={item.path}
                    className={`font-pixel text-sm py-2 ${
                      location === item.path 
                      ? 'text-avaxRed' 
                      : 'text-beige hover:text-avaxRed'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <a 
                  href="https://arena.trade/token/0x3efeae3c9183f14f3baaaaf964f6e43e2f7a2922" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-pixel text-sm py-2 px-4 bg-avaxRed text-white hover:bg-opacity-90 text-center shadow-md"
                >
                  BUY $HORNY
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main content */}
      <main className="flex-grow relative overflow-x-hidden">
        <FallingLeaves />
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-darkBrown text-beige py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <h2 className="font-pixel text-avaxRed text-xl mb-2">Maple Story</h2>
              <p className="font-rpg text-2xl">$HORNY</p>
              <p className="font-body mt-2 text-sm text-gray-400">The Kawaii Meme Coin of AVAX</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="font-pixel text-xs py-2 px-4 bg-avaxRed text-white hover:bg-opacity-90 shadow-md">Twitter</a>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="font-pixel text-xs py-2 px-4 bg-avaxRed text-white hover:bg-opacity-90 shadow-md">Telegram</a>
              <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="font-pixel text-xs py-2 px-4 bg-avaxRed text-white hover:bg-opacity-90 shadow-md">Discord</a>
              <a href="https://medium.com" target="_blank" rel="noopener noreferrer" className="font-pixel text-xs py-2 px-4 bg-avaxRed text-white hover:bg-opacity-90 shadow-md">Medium</a>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="font-body text-sm text-gray-400">$HORNY is a meme coin with no intrinsic value or expectation of financial return. There is no formal team or roadmap. It is experimental and for entertainment purposes only.</p>
            <p className="font-body text-sm text-gray-400 mt-2">© 2025 Maple Story $HORNY. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Easter Egg NSFW Shrine Modal */}
      {showNsfwShrine && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="max-w-md w-full bg-beige p-4 rounded-lg pixel-border text-center">
            <h3 className="font-rpg text-avaxRed text-2xl mb-4">The Secret Shrine</h3>
            <p className="font-body text-xl mb-4">You have discovered the secret shrine by clicking the mushroom 69 times!</p>
            <p className="font-body text-lg mb-6">Here's a special discount code for $HORNY merch:</p>
            <div className="bg-darkBrown text-white font-pixel p-4 mb-6">HORNY420DEGEN</div>
            <button 
              className="font-pixel text-xs py-2 px-4 bg-avaxRed text-white hover:bg-opacity-90 shadow-md w-full"
              onClick={() => setShowNsfwShrine(false)}
            >
              Close Shrine
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
