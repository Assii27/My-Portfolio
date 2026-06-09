import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Mail, Clock, Calendar, Smartphone, Globe, Code, Shield, Cpu, Layers, CheckCircle } from 'lucide-react';
import { PROFILE } from '../data';

export default function About() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-24 px-4 md:px-8 bg-slate-950 border-y border-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="mb-16 text-center md:text-left">
          <p className="font-mono text-sm uppercase tracking-widest text-brand-500 mb-2">01 // PROFILE & EXPERTISE</p>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white">Profile</h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Biography text & Expertises */}
          <div className="space-y-10">
            
            {/* Bio statement */}
            <div className="bg-slate-900/30 border border-slate-800/60 p-8 rounded-2xl">
              <h3 className="text-xl md:text-2xl font-sans font-bold text-white mb-4 leading-snug">
                I build fast and reliable payment systems that handle transactions smoothly.
              </h3>
              <div className="space-y-4 text-gray-300 font-sans leading-relaxed text-base">
                {PROFILE.bioParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Core Expertise and Domain Focus Grids */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Core Expertise Block */}
              <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/5 rounded-full blur-xl pointer-events-none" />
                <h4 className="text-lg font-display font-bold text-white mb-4 pb-2 border-b border-slate-800 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-brand-500" />
                  Core Expertise
                </h4>
                <ul className="space-y-3">
                  {PROFILE.coreExpertise.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 block shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Domain Focus Block */}
              <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
                <h4 className="text-lg font-display font-bold text-white mb-4 pb-2 border-b border-slate-800 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-400" />
                  Domain Focus
                </h4>
                <ul className="space-y-3">
                  {PROFILE.domainFocus.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 block shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
