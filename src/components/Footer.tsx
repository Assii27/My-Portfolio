import { Mail, ArrowUpCircle } from 'lucide-react';
import { PROFILE } from '../data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-gray-500 py-12 px-4 md:px-8 border-t border-slate-900">
      
      {/* Declaration Card Block if defined */}
      {PROFILE.declaration && (
        <div className="w-full border-b border-slate-900 pb-8 mb-8 text-center max-w-4xl mx-auto">
          <p className="text-[10px] font-mono tracking-widest text-gray-500 uppercase mb-3">// PROFESSIONAL DECLARATION</p>
          <p className="text-xs text-gray-400 italic leading-relaxed font-sans px-4">
            "{PROFILE.declaration}"
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-slate-800/60" />
            <span className="font-mono text-xs text-brand-500 font-semibold">{PROFILE.name}</span>
            <span className="w-6 h-px bg-slate-800/60" />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-sans">
        
        {/* Left Side Metadata */}
        <div className="text-center md:text-left">
          <p className="text-white font-display font-bold mb-1">
            {PROFILE.name} <span className="text-brand-500 font-mono text-xs font-semibold">.PRO</span>
          </p>
          <p className="text-xs text-gray-500">
            &copy; {currentYear}. Built cleanly with React 19, Motion, and Tailwind CSS.
          </p>
        </div>

        {/* Middle Email Link */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <Mail className="w-3.5 h-3.5 text-brand-500" />
          <a 
            href={`mailto:${PROFILE.email}`} 
            className="hover:text-brand-500 transition-colors"
          >
            {PROFILE.email}
          </a>
        </div>

        {/* Right Side scroll button */}
        <div>
          <button
            onClick={handleScrollTop}
            className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group"
          >
            <span className="text-xs font-mono uppercase tracking-widest">// RETURN TO APEX</span>
            <ArrowUpCircle className="w-5 h-5 text-brand-500 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
