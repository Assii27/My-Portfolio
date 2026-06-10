import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Printer } from 'lucide-react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Architecture from './components/Architecture';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
  });

  const [showScrollFloatingButton, setShowScrollFloatingButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollFloatingButton(window.scrollY > 250);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-theme');
    } else {
      root.classList.remove('light-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white antialiased">
      {/* Absolute top grid mask lines */}
      <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-brand-500/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Sticky top Navigation Header */}
      <Navigation theme={theme} toggleTheme={toggleTheme} />
      
      {/* Content Layout groups */}
      <main className="flex-grow">
        <Hero />
        <About />
        <Skills />
        <Architecture />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Corporate Creative Footer panel */}
      <Footer />

      {/* Floating Action Button for prompt Resume Export (shows on scroll) */}
      <AnimatePresence>
        {showScrollFloatingButton && (
          <motion.a
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            href="/file/Asif_Maner_Java_DEV5.pdf"
            download="Asif_Maner_Java_DEV5.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-40 no-print flex items-center gap-2 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold font-mono text-xs tracking-wider px-4.5 py-3.5 rounded-full shadow-2xl shadow-brand-500/30 border border-brand-400/20 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
            title="Download PDF resume"
          >
            <Printer className="w-4 h-4 animate-pulse group-hover:scale-110 transition-transform" />
            <span>DOWNLOAD PDF RESUME</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
