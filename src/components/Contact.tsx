import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, CheckCircle, Copy, Check, Trash2, Award, Terminal, Smartphone, MapPin, Clock, Calendar } from 'lucide-react';
import { PROFILE } from '../data';
import { Message } from '../types';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const [showConsole, setShowConsole] = useState(false);
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

  useEffect(() => {
    // Load sent messages from localStorage
    const saved = localStorage.getItem('asif_portfolio_messages');
    if (saved) {
      try {
        setLocalMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load local messages", e);
      }
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    // Simulate server ingestion latency
    setTimeout(() => {
      const newMessage: Message = {
        id: 'msg-' + Date.now(),
        name,
        email,
        subject: subject || 'General Partnership',
        message,
        date: new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };

      const updated = [newMessage, ...localMessages];
      setLocalMessages(updated);
      localStorage.setItem('asif_portfolio_messages', JSON.stringify(updated));

      // Reset Form fields
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      
      setLoading(false);
      setSuccess(true);
      
      // Auto-dismiss success notification after 5 sec
      setTimeout(() => setSuccess(false), 5000);
    }, 1200);
  };

  const deleteMessage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = localMessages.filter(m => m.id !== id);
    setLocalMessages(updated);
    localStorage.setItem('asif_portfolio_messages', JSON.stringify(updated));
  };

  const clearAllMessages = () => {
    if (window.confirm("Are you sure you want to clear your local message history?")) {
      setLocalMessages([]);
      localStorage.removeItem('asif_portfolio_messages');
    }
  };

  return (
    <section id="contact" className="py-24 px-4 md:px-8 bg-slate-950/20">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="mb-16 text-center md:text-left">
          <p className="font-mono text-sm uppercase tracking-widest text-brand-500 mb-2">08 // COMMUNICATION CENTER</p>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white">Contact Me</h2>
          <p className="text-emerald-400 font-mono text-xs mt-2 uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for new opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Telemetry Identity Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/65 border border-slate-800 p-8 rounded-3xl relative overflow-hidden backdrop-blur-sm space-y-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <p className="text-xs font-mono text-gray-500 tracking-wider uppercase mb-2">// TELEMETRY IDENTITY</p>
              
              <div className="space-y-6">
                
                {/* Time */}
                <div className="flex items-center gap-4 bg-slate-950/80 border border-slate-850 p-4 rounded-xl">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-brand-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">WORKSPACE CLOCK</p>
                    <p className="text-sm text-gray-200 font-mono tracking-wider font-semibold">{time || "Syncing..."}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 bg-slate-950/80 border border-slate-850 p-4 rounded-xl">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-brand-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">LOCATION</p>
                    <p className="text-sm text-gray-200 font-sans font-medium">{PROFILE.location}</p>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-center gap-4 bg-slate-950/80 border border-slate-850 p-4 rounded-xl justify-between">
                  <div className="flex items-center gap-4 min-w-0 font-sans">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-brand-400 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">EMAIL DIRECT</p>
                      <p className="text-sm text-brand-400 font-sans font-semibold truncate hover:underline">
                        <a href={`mailto:${PROFILE.email}`} title={PROFILE.email}>{PROFILE.email}</a>
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="p-2.5 bg-slate-900 hover:bg-slate-800 text-gray-400 hover:text-white rounded-lg border border-slate-800 transition-all cursor-pointer flex-shrink-0"
                    title="Copy Email"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Contact Phone */}
                <div className="flex items-center gap-4 bg-slate-950/80 border border-slate-850 p-4 rounded-xl">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-brand-400 shrink-0">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">MOBILE CONTACT</p>
                    <p className="text-sm text-gray-200 font-mono font-semibold">{PROFILE.phone}</p>
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-center gap-4 bg-slate-950/80 border border-slate-850 p-4 rounded-xl">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-brand-400 shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">AVAILABILITY STATUS</p>
                    <p className="text-sm text-gray-250 font-sans font-medium">Remote / Hybrid Placement // India</p>
                  </div>
                </div>

              </div>
              
              {/* Fast stats indicators */}
              <div className="border-t border-slate-850 pt-5">
                <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-3">// RESPONSE TIME WARRANTY</p>
                <div className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-brand-500 mt-1.5" />
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    I typically reply within <strong className="text-white">12-24 business hours</strong> with a comprehensive scope evaluation sheet.
                  </p>
                </div>
              </div>
            </div>

            {/* Local Message Box Console System */}
            {localMessages.length > 0 && (
              <div className="bg-slate-900/30 border border-slate-850 rounded-3xl p-6">
                <button
                  onClick={() => setShowConsole(!showConsole)}
                  className="w-full flex items-center justify-between text-left text-sm font-mono text-gray-400 hover:text-white cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-brand-500" />
                    SUBMISSION ARCHIVE ({localMessages.length})
                  </span>
                  <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-md">
                    {showConsole ? 'COLLAPSE' : 'EXPAND'}
                  </span>
                </button>

                <AnimatePresence>
                  {showConsole && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-slate-850 space-y-4 max-h-[300px] overflow-y-auto pr-1"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-gray-500 font-mono uppercase">Local storage history</span>
                        <button
                          onClick={clearAllMessages}
                          className="text-[10px] text-red-400 hover:text-red-300 font-mono flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Purge Session
                        </button>
                      </div>

                      {localMessages.map((msg) => (
                        <div key={msg.id} className="bg-slate-950/60 p-4 rounded-xl border border-slate-850 text-xs text-gray-300 relative group/msg">
                          <button
                            onClick={(e) => deleteMessage(msg.id, e)}
                            className="absolute top-2 right-2 p-1 bg-slate-900 hover:bg-slate-800 rounded text-gray-500 hover:text-red-400 opacity-0 group-hover/msg:opacity-100 transition-opacity cursor-pointer"
                            title="Delete Submission"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          
                          <div className="flex items-center justify-between mb-1">
                            <strong className="text-white font-sans">{msg.name}</strong>
                            <span className="font-mono text-[9px] text-gray-500">{msg.date}</span>
                          </div>
                          
                          <p className="font-mono text-[10px] text-brand-500 mb-2 truncate">{msg.subject}</p>
                          <p className="font-sans leading-relaxed text-gray-400 whitespace-pre-line">{msg.message}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Secure Interactive Messaging Form */}
          <div className="lg:col-span-7">
            <form 
              id="contact-form"
              onSubmit={handleSubmit} 
              className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl relative overflow-hidden space-y-6"
            >
              <p className="text-xs font-mono text-gray-500 tracking-wider uppercase">// DIRECT MESSAGE FORM</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-gray-450 mb-2">Name *</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g., Dev Patel"
                    className="w-full bg-slate-950/80 border border-slate-850 hover:border-slate-800 focus:border-brand-500 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-gray-450 mb-2">Email *</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E.g., dev@company.com"
                    className="w-full bg-slate-950/80 border border-slate-850 hover:border-slate-800 focus:border-brand-500 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-450 mb-2">Subject</label>
                <input 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="E.g., Consulting Agreement"
                  className="w-full bg-slate-950/80 border border-slate-850 hover:border-slate-800 focus:border-brand-500 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-450 mb-2">Message *</label>
                <textarea 
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your goals, tech stack requests, or timeline boundaries..."
                  className="w-full bg-slate-950/80 border border-slate-850 hover:border-slate-800 focus:border-brand-500 rounded-xl p-4 text-sm text-white placeholder-gray-600 focus:outline-none transition-all resize-none"
                />
              </div>

              {/* Submit CTA action block */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-850">
                <span className="text-[11px] text-gray-500 font-mono tracking-wide">* Denotes required entry rows</span>
                
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm transition-all shadow-lg ${
                    loading 
                      ? 'bg-slate-800 text-gray-500 border border-slate-750 cursor-not-allowed shadow-none'
                      : 'bg-brand-500 hover:bg-brand-600 text-white shadow-brand-500/15 group cursor-pointer'
                  }`}
                >
                  {loading ? 'Transmitting...' : 'Dispatch Message'}
                  <Send className={`w-4 h-4 ${loading ? 'opacity-30' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform'}`} />
                </button>
              </div>

              {/* Toast Success States banner */}
              <AnimatePresence>
                {success && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-400"
                  >
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold">Message synchronized successfully!</p>
                      <p className="text-xs text-emerald-400/80 mt-0.5">Your communication has been securely logged in local archives.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
