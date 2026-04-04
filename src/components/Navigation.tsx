import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import DecryptedText from './DecryptedText';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Me", hover: "Lore", path: "/me" },
    { name: "Thinking", hover: "Philosophy", path: "/philosophy" },
    { name: "Vision", hover: "Teleology", path: "/vision" },
    { name: "Projects", hover: "Endeavors", path: "/projects" },
    { name: "Blog", hover: "Articles", path: "/blog" },
    { name: "Conversations", hover: "Dialogue", path: "/contact" }
  ];

  return (
    <nav className="border-b-8 border-black sticky top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" onClick={() => setIsOpen(false)} className="text-2xl md:text-3xl font-black tracking-tighter uppercase relative z-50">
          <DecryptedText text="ADITHYA" />
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden lg:flex gap-8 font-black uppercase text-sm tracking-widest">
          {links.map(link => (
            <Link key={link.path} to={link.path} className="hover:underline decoration-8 underline-offset-8">
              <DecryptedText text={link.name} hoverText={link.hover} />
            </Link>
          ))}
        </div>
        
        <div className="hidden md:flex gap-6 font-black uppercase text-xs z-50">
          <a href="https://github.com/Hundred-Trillion" target="_blank" rel="noreferrer" className="hover:underline">Github</a>
          <a href="https://www.linkedin.com/in/adithyasrivatsa/" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden relative z-50 p-2 border-4 border-black active:bg-black active:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-40 border-b-8 border-black flex flex-col pt-24 px-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-8 font-black uppercase text-3xl tracking-tighter">
              {links.map(link => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  className="border-b-4 border-black pb-4 hover:pl-4 transition-all"
                >
                  <DecryptedText text={link.name} hoverText={link.hover} />
                </Link>
              ))}
            </div>
            
            <div className="mt-12 flex flex-col gap-4 font-black uppercase text-xl pb-12">
              <a href="https://github.com/Hundred-Trillion" target="_blank" rel="noreferrer" className="border-4 border-black p-4 text-center hover:bg-black hover:text-white transition-colors">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/adithyasrivatsa/" target="_blank" rel="noreferrer" className="border-4 border-black p-4 text-center hover:bg-black hover:text-white transition-colors">
                LinkedIn
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
