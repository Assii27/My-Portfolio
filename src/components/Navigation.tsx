import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Terminal, Monitor, Sparkles, Sun, Moon, Printer } from 'lucide-react';
import { PROFILE } from '../data';

interface NavigationProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export default function Navigation({ theme, toggleTheme }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact Me', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerOffset = scrolled ? 80 : 96; // Offset matching the fixed header height
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-45 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-900/60 py-4 shadow-lg shadow-black/10' 
          : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Brand/Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleScrollClick(e, '#home')}
            className="flex items-center gap-2 group"
          >
            <div className="p-1.5 bg-brand-500/10 text-brand-500 border border-brand-500/20 rounded-lg group-hover:bg-brand-500 group-hover:text-white transition-all">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="font-display font-bold text-lg text-white group-hover:text-brand-500 transition-colors tracking-wide">
              ASIF MAHAMMAD
            </span>
          </a>

          {/* Desktop Links Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleScrollClick(e, link.href)}
                className="text-gray-400 hover:text-white transition-colors relative py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Contact Fast CTA badge */}
          <div className="hidden md:flex items-center gap-4 animate-fade-in">
            <a
              href="https://github.com/Assii27/My-Portfolio/raw/main/file/Asif_Mahammad_CV.pdf"
              download="Asif_Mahammad_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-brand-500/10 hover:bg-brand-500 text-brand-400 hover:text-white border border-brand-500/20 px-4 py-2.5 rounded-xl transition-all font-semibold font-mono text-xs tracking-wider cursor-pointer"
              title="Download PDF Resume"
            >
              <Printer className="w-4 h-4" />
              <span>DOWNLOAD PDF</span>
            </a>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2.5 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-brand-400 hover:text-brand-300 rounded-xl transition-all cursor-pointer flex items-center justify-center"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>
            <a 
              href="#contact"
              onClick={(e) => handleScrollClick(e, '#contact')}
              className="text-xs bg-brand-500/10 text-brand-500 border border-brand-500/20 px-4 py-2 rounded-xl hover:bg-brand-500 hover:text-white transition-all font-semibold font-mono tracking-wide"
            >
              HIRE ME
            </a>
          </div>

          {/* Mobile hamburger toggles */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-slate-900 rounded-xl border border-slate-800 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              className="fixed inset-0 z-40 bg-slate-950/90 backdrop-blur-md md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Body */}
            <motion.div 
              className="fixed top-0 right-0 bottom-0 w-3/4 max-w-xs bg-slate-900 border-l border-slate-800 p-8 z-45 md:hidden flex flex-col justify-between"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <span className="font-display font-extrabold text-white">NAVIGATION</span>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 text-gray-500 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex flex-col gap-6 text-lg font-medium">
                  {navLinks.map((link) => (
                    <a 
                      key={link.name} 
                      href={link.href}
                      onClick={(e) => handleScrollClick(e, link.href)}
                      className="text-gray-400 hover:text-brand-500 transition-all font-display block"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Drawer footer info */}
              <div className="space-y-4">
                <a
                  href="https://github.com/Assii27/My-Portfolio/raw/main/file/Asif_Mahammad_CV.pdf"
                  download="Asif_Mahammad_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900/80 border border-slate-800 text-sm font-semibold font-mono py-3 rounded-xl transition-all text-brand-400 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Download PDF Resume</span>
                </a>
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900/80 border border-slate-800 text-sm font-semibold font-mono py-3 rounded-xl transition-all text-brand-400 cursor-pointer"
                >
                  {theme === 'light' ? (
                    <>
                      <Moon className="w-4 h-4" />
                      <span>Night Mode</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-4 h-4 text-amber-400" />
                      <span>Day Mode</span>
                    </>
                  )}
                </button>
                <a 
                  href="#contact"
                  onClick={(e) => handleScrollClick(e, '#contact')}
                  className="block text-center bg-brand-500 hover:bg-brand-600 text-white font-medium py-3 rounded-xl transition-all"
                >
                  Hire Me
                </a>
                <p className="text-[10px] font-mono text-gray-500 text-center tracking-wider uppercase">
                  ACTIVE HOST // INDIA
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
