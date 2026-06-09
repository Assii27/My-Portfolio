import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Download, Sparkles, RotateCw, Play, Terminal, Activity, Printer } from 'lucide-react';
import { PROFILE } from '../data';

const JAVA_CODE = `@Service
public class PaymentService {
    @Autowired
    private KafkaTemplate<String, AuthEvent> kafka;

    @Transactional
    public TxResponse authorize(PaymentRequest req) {
        // Validate parameters against standard CMS Core Rules
        if (req.getCardStatus() != CardState.ACTIVE) {
            return TxResponse.reject("CARD_BLOCKED");
        }
        SwitchPayload payload = RENRouter.dispatch(req);
        kafka.send("payments.auth.topic", new AuthEvent(payload));
        return TxResponse.approve(payload);
    }
}`;

export default function Hero() {
  const [typedText, setTypedText] = useState('Building High-Performance CMS Archi');
  const [showCursor, setShowCursor] = useState(true);
  const [simState, setSimState] = useState<'idle' | 'routing' | 'success'>('idle');
  const [simLog, setSimLog] = useState<string[]>([]);
  const [simCounter, setSimCounter] = useState(1284792);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  const highlightJava = (text: string) => {
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Comments in mute gray
    html = html.replace(/(\/\/.*)/g, '<span class="text-slate-500 italic font-normal">$1</span>');

    // Annotations in golden-yellow (#f59e0b)
    html = html.replace(/(@\w+)/g, '<span class="text-[#f59e0b] font-medium">$1</span>');

    // Keywords in high-contrast light blue (#60a5fa)
    const keywords = ['public', 'class', 'private', 'if', 'return', 'new', 'void'];
    keywords.forEach(kw => {
      const regex = new RegExp(`\\b(${kw})\\b`, 'g');
      html = html.replace(regex, '<span class="text-[#60a5fa] font-semibold">$1</span>');
    });

    // Custom types in green/teal (#34d399)
    const customTypes = [
      'PaymentService', 'KafkaTemplate', 'String', 'AuthEvent', 'TxResponse', 
      'PaymentRequest', 'CardState', 'ACTIVE', 'SwitchPayload', 'RENRouter'
    ];
    customTypes.forEach(t => {
      const regex = new RegExp(`\\b(${t})\\b`, 'g');
      html = html.replace(regex, '<span class="text-[#34d399] font-medium">$1</span>');
    });

    // Strings in orange/yellow (#fb923c)
    html = html.replace(/("[^"]*")/g, '<span class="text-[#fb923c] font-medium">$1</span>');

    // Code flow operators (e.g. != represented as ≠ font-ligature style)
    html = html.replace(/!=/g, '<span class="text-slate-400 font-semibold">≠</span>');

    return <code dangerouslySetInnerHTML={{ __html: html }} />;
  };

  // Text cycling typing effect
  useEffect(() => {
    let index = 0;
    const texts = ['Building High-Performance CMS Archi', 'Engineering High-Availability Switches'];
    let textIdx = 0;
    let isDeleting = false;
    let currentStr = '';
    
    const typingTimer = setInterval(() => {
      const activeText = texts[textIdx];
      if (!isDeleting) {
        currentStr = activeText.substring(0, currentStr.length + 1);
        setTypedText(currentStr);
        if (currentStr === activeText) {
          isDeleting = true;
          clearInterval(typingTimer);
          setTimeout(() => {
            textIdx = (textIdx + 1) % texts.length;
            isDeleting = false;
            currentStr = '';
          }, 3000);
        }
      }
    }, 100);

    return () => clearInterval(typingTimer);
  }, []);

  const runPaymentSimulation = () => {
    if (simState !== 'idle') return;
    
    setSimState('routing');
    setSimLog([`[INFO] Decrypting PIN & Card block parameters...`]);
    
    setTimeout(() => {
      setSimLog(prev => [...prev, `[SUCCESS] Authorization match found (0.004s)`]);
    }, 400);

    setTimeout(() => {
      setSimLog(prev => [...prev, `[CMS] Syncing ledger record with Database`]);
    }, 900);

    setTimeout(() => {
      setSimLog(prev => [...prev, `[KAFKA] Event audit broadcasted. Route Complete.`]);
      setSimCounter(prev => prev + 1);
      setSimState('idle');
    }, 1500);
  };

  const handleDownloadResume = () => {
    window.print();
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-32 px-4 md:px-8 overflow-hidden bg-slate-950">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />
      
      {/* Background visual glows */}
      <div className="absolute top-1/4 right-5 w-[25rem] h-[25rem] bg-brand-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-5 w-[20rem] h-[20rem] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 pb-16">
        
        {/* Left Column: Profile Info & Calls to Action */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          
          {/* Opportunities Status Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/30 px-4 py-1.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono font-medium text-emerald-400 tracking-wider uppercase">Available for new opportunities</span>
          </div>

          {/* Typing Title */}
          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-white mb-2 leading-[1.1] min-h-[140px] md:min-h-[180px] lg:min-h-[140px] max-w-3xl">
            {typedText}
            <span className={`text-brand-500 font-light ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
          </h1>

          {/* Transaction Quote Subheading */}
          <h2 className="text-lg md:text-2xl font-sans text-gray-300 leading-relaxed font-normal">
            Handling Millions of Transactions Securely. <span className="text-brand-400 block sm:inline font-semibold">Specialized in high-availability backend architectures.</span>
          </h2>

          {/* Core Profile Tags Tagline */}
          <div className="p-3.5 bg-slate-900/60 border border-slate-800/80 rounded-xl font-mono text-xs md:text-sm text-brand-400 tracking-wide max-w-xl">
            {PROFILE.tagline}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
            <a 
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 transition-all text-white font-semibold font-sans px-6 py-3.5 rounded-xl shadow-lg shadow-brand-500/20 cursor-pointer"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>

            <button 
              onClick={handleDownloadResume}
              className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 transition-all text-gray-300 hover:text-white font-semibold font-sans px-6 py-3.5 rounded-xl cursor-pointer"
              title="Print portfolio or save as PDF resume"
            >
              <Printer className="w-5 h-5 text-brand-500" />
              Export PDF Resume
            </button>
          </div>

          {/* Quick Platform Connections */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-gray-500 pt-2 font-mono text-xs">
            <span className="uppercase tracking-widest">// DIRECT DIAL</span>
            <span className="text-gray-300">{PROFILE.phone}</span>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <span className="text-gray-300">{PROFILE.email}</span>
          </div>

        </div>

        {/* Right Column: Code Service Simulation Panel with the precise screen styling */}
        <div className="lg:col-span-5 w-full flex flex-col items-center">
          <div className="w-full max-w-lg bg-[#0b1120] border border-slate-800/85 shadow-2xl rounded-3xl p-6 md:p-8 text-slate-300 relative select-none">
            
            {/* Top Windows bar with dots and title row */}
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800/60">
              {/* Traffic light dots */}
              <div className="flex bg-transparent items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <span className="text-xs font-mono text-slate-400 font-semibold ml-2">PaymentService.java</span>
              </div>
              
              {/* Terminal descriptor */}
              <div className="flex items-center gap-1.5 text-slate-500 font-mono text-xs">
                <span>&gt;_ Live JVM Switch</span>
              </div>
            </div>

            {/* Code presentation console block */}
            <div className="font-mono text-[12px] md:text-[13px] leading-relaxed select-text min-h-[290px] overflow-x-auto">
              <pre className="whitespace-pre font-mono leading-relaxed text-slate-200">
                {highlightJava(JAVA_CODE)}
              </pre>
            </div>

            {/* Micro-simulator panel integrated seamlessly in the card */}
            <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className={`w-4 h-4 ${simState !== 'idle' ? 'text-brand-500 animate-pulse' : 'text-slate-500'}`} />
                  <span className="text-xs font-mono text-slate-400">
                    Switch Live Stream: <strong className="text-brand-400 font-sans">{simCounter.toLocaleString()} tx</strong>
                  </span>
                </div>

                <button 
                  onClick={runPaymentSimulation}
                  disabled={simState !== 'idle'}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs rounded-xl font-mono font-bold transition-all border ${
                    simState === 'idle' 
                      ? 'bg-[#132237] border-blue-500/20 text-[#38bdf8] hover:bg-[#1e293b] cursor-pointer' 
                      : 'bg-[#0f172a] text-slate-650 border-slate-800 cursor-not-allowed text-slate-600'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  TEST FLOW
                </button>
              </div>

              {/* Simulation feedback terminal console */}
              <div className="bg-[#030712] border border-slate-900/80 p-3 rounded-2xl h-24 overflow-y-auto flex flex-col justify-end font-mono text-xs text-slate-400">
                {simLog.length === 0 ? (
                  <span className="text-slate-500 italic">
                    // Click 'TEST FLOW' above to trigger simulated JVM Switch authorization cycles and broadcast to Kafka cluster.
                  </span>
                ) : (
                  simLog.map((log, index) => {
                    let color = 'text-slate-400';
                    if (log.includes('[SUCCESS]')) color = 'text-emerald-400 font-semibold';
                    if (log.includes('[CMS]')) color = 'text-amber-400';
                    if (log.includes('[KAFKA]')) color = 'text-sky-400';
                    return (
                      <div key={index} className={`py-0.5 leading-normal ${color}`}>
                        {log}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom absolute statistics bar */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 to-transparent pt-12 pb-4">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-slate-800/80 bg-slate-950/60 backdrop-blur-sm rounded-xl px-6">
            {PROFILE.stats.map((stat, i) => (
              <div key={i} className="text-center sm:text-left">
                <p className="text-2xl md:text-3xl font-display font-black text-brand-400">{stat.value}</p>
                <p className="text-xs text-gray-450 font-mono uppercase tracking-widest mt-1 text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
