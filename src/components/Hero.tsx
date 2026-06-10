import { useState, useEffect } from 'react';
import { Linkedin, Printer, Play, Terminal, Activity } from 'lucide-react';
import { PROFILE } from '../data';

export default function Hero() {
  const [typedText, setTypedText] = useState('Building High-Performance CMS Archi');
  const [showCursor, setShowCursor] = useState(true);
  
  // Interactive Code Execution State Machine
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<null | 'entry' | 'log' | 'kafka'>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "// Click 'RUN SWITCH SIMULATION' below to initiate test packet flow tracing."
  ]);
  const [txCount, setTxCount] = useState(742918);

  const startSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    const mockTxId = `TX-${Math.floor(100000 + Math.random() * 900000).toString(16).toUpperCase()}`;
    const amount = (Math.random() * 500 + 5).toFixed(2);
    
    setTerminalLogs([`[INCOMING] Ingress Event: RECEIVED packet {id: "${mockTxId}", amount: "$${amount}"}`]);
    setActiveStep('entry');

    setTimeout(() => {
      setActiveStep('log');
      setTerminalLogs(prev => [...prev, `[JVM LOG] Info - Mapping core parameters to Memory ledger...`, `[JVM LOG] Info - Tracking reference: ${mockTxId}`]);
    }, 900);

    setTimeout(() => {
      setActiveStep('kafka');
      setTerminalLogs(prev => [...prev, `[KAFKA] Producer published ${mockTxId} event to cluster broker 'tx-topic'`]);
    }, 1800);

    setTimeout(() => {
      setActiveStep(null);
      setTerminalLogs(prev => [...prev, `[STATUS] Success. Message payload resolved on-us in ${(Math.random() * 1.5 + 0.8).toFixed(2)}ms.`]);
      setTxCount(prev => prev + 1);
      setIsRunning(false);
    }, 2700);
  };

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Text cycling typing effect
  useEffect(() => {
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

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-32 px-4 md:px-8 overflow-hidden bg-slate-950">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />
      
      {/* Background visual glows */}
      <div className="absolute top-1/4 right-5 w-[25rem] h-[25rem] bg-brand-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-5 w-[20rem] h-[20rem] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 pb-40 px-4 md:px-8">
        
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
              className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 transition-all text-white font-semibold font-sans px-6 py-3.5 rounded-xl shadow-lg shadow-brand-500/20 cursor-pointer animate-fade-in"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>

            <a 
              href="https://github.com/Assii27/My-Portfolio/raw/main/file/Asif_Mahammad_CV.pdf"
              download="Asif_Mahammad_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 transition-all text-gray-300 hover:text-white font-semibold font-sans px-6 py-3.5 rounded-xl cursor-pointer"
              title="Download PDF Resume"
            >
              <Printer className="w-5 h-5 text-brand-500" />
              Download PDF Resume
            </a>
          </div>

          {/* Quick Platform Connections */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-gray-500 pt-2 font-mono text-xs">
            <span className="uppercase tracking-widest">// DIRECT DIAL</span>
            <span className="text-gray-300">{PROFILE.phone}</span>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <span className="text-gray-300">{PROFILE.email}</span>
          </div>

        </div>

        {/* Right Column: Code Snippet Card in Dark Mode */}
        <div className="lg:col-span-12 xl:col-span-5 w-full flex flex-col items-center">
          <div className="w-full max-w-lg bg-slate-900/65 backdrop-blur-md border border-slate-800/90 shadow-2xl rounded-3xl p-6 md:p-8 text-slate-350 relative select-none">
            
            {/* Top Windows bar with dots */}
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800/40">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <span className="text-[11px] font-mono text-slate-500 ml-2">PaymentSwitch.java</span>
              </div>
              <div className="text-[10px] font-mono text-brand-500 font-semibold flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${isRunning ? 'bg-amber-400 animate-ping' : 'bg-emerald-500'}`} />
                <span>// Spring Boot Runtime</span>
              </div>
            </div>

            {/* Embedded custom high-fidelity styled syntax highlighting pre-built JSX */}
            <div className="font-mono text-[13px] leading-relaxed select-text min-h-[220px]">
              <pre className="whitespace-pre font-mono leading-relaxed">
                <div>
                  <span className="text-sky-450 font-medium">@Service</span>
                </div>
                <div>
                  <span className="text-purple-400 font-semibold">public class</span>{' '}
                  <span className="text-purple-400 font-semibold">PaymentSwitch</span>{' '}
                  <span className="text-slate-400">{"{"}</span>
                </div>
                
                <div className="pl-4">
                  <span className="text-sky-450 font-medium">@Autowired</span>
                </div>
                <div className="pl-4">
                  <span className="text-purple-400 font-semibold">private</span>{' '}
                  <span className="text-purple-400 font-semibold">KafkaTemplate</span>{' '}
                  <span className="text-slate-300">kafka;</span>
                </div>
                
                <div className="h-4" />
                
                <div className={`transition-all duration-300 py-0.5 px-2 rounded ${activeStep === 'entry' ? 'bg-brand-500/10 border-l-2 border-brand-500' : 'border-l-2 border-transparent'}`}>
                  <span className="pl-2 text-purple-450 font-semibold">public void</span>{' '}
                  <span className="text-slate-200">process</span>
                  <span className="text-slate-400">(</span>
                  <span className="text-purple-450 font-semibold">Transaction</span>{' '}
                  <span className="text-slate-200">tx</span>
                  <span className="text-slate-400">) {"{"}</span>
                </div>
                
                <div className={`transition-all duration-300 py-0.5 px-2 rounded ${activeStep === 'log' ? 'bg-amber-500/10 border-l-2 border-amber-400' : 'border-l-2 border-transparent'}`}>
                  <span className="pl-6 text-emerald-450">log.info("Processing: " + tx.id());</span>
                </div>
                
                <div className={`transition-all duration-300 py-0.5 px-2 rounded ${activeStep === 'kafka' ? 'bg-purple-500/10 border-l-2 border-purple-400' : 'border-l-2 border-transparent'}`}>
                  <span className="pl-6 text-emerald-450">kafka.send("tx-topic", tx);</span>
                </div>
                
                <div className="pl-4">
                  <span className="text-slate-400">{"}"}</span>
                </div>
                <div>
                  <span className="text-slate-400">{"}"}</span>
                </div>
              </pre>
            </div>

            {/* Integrated Live Runner Panel */}
            <div className="mt-6 pt-5 border-t border-slate-800/60 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Activity className={`w-4 h-4 shrink-0 ${isRunning ? 'text-brand-500 animate-pulse' : 'text-slate-500'}`} />
                  <span className="text-[11px] font-mono text-slate-400">
                    Processed Stream: <strong className="text-brand-400 font-sans">{txCount.toLocaleString()} tx</strong>
                  </span>
                </div>
                
                <button
                  onClick={startSimulation}
                  disabled={isRunning}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-mono font-bold rounded-xl border transition-all cursor-pointer ${
                    isRunning
                      ? 'bg-slate-950 border-slate-900 text-slate-550 cursor-not-allowed'
                      : 'bg-brand-500 text-white border-brand-400 hover:bg-brand-600 shadow-md shadow-brand-500/20'
                  }`}
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>{isRunning ? 'EXECUTING...' : 'RUN SWITCH SIMULATION'}</span>
                </button>
              </div>

              {/* Terminal Screen inside the card */}
              <div className="bg-slate-950/90 border border-slate-850/80 p-3.5 rounded-2xl min-h-[105px] max-h-[140px] overflow-y-auto font-mono text-[11px] flex flex-col justify-end gap-1.5 select-text">
                {terminalLogs.map((log, i) => {
                  let color = 'text-slate-400';
                  if (log.startsWith('[INCOMING]')) color = 'text-blue-400';
                  if (log.startsWith('[JVM LOG]')) color = 'text-amber-400/90';
                  if (log.startsWith('[KAFKA]')) color = 'text-purple-400';
                  if (log.startsWith('[STATUS]')) color = 'text-emerald-400 font-semibold';
                  return (
                    <div key={i} className="flex items-start gap-1">
                      <span className="text-slate-700 font-bold select-none shrink-0">&gt;</span>
                      <span className={color}>{log}</span>
                    </div>
                  );
                })}
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
