import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, ArrowRight, Laptop, Server, Cpu, Database, CheckCircle2, Shield, Activity, HelpCircle, ArrowRightLeft, RefreshCw, FileText, CreditCard, ShieldAlert, Check, Settings } from 'lucide-react';

export default function Architecture() {
  const [activeTab, setActiveTab] = useState<'fast' | 'on_us' | 'off_us' | 'workflow'>('on_us');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [simActive, setSimActive] = useState<boolean>(false);
  const [simMessage, setSimMessage] = useState<string>("Select a step above or click 'RUN PACKET ROUTE' to start transaction lifecycle tracing.");
  
  const [activeWorkflowTab, setActiveWorkflowTab] = useState<'issuance' | 'settlement' | 'dispute'>('issuance');
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(0);
  const [wfSimActive, setWfSimActive] = useState<boolean>(false);
  const [wfConsoleMessage, setWfConsoleMessage] = useState<string>("Click 'EXECUTE WORKFLOW' to begin simulation or choose a stage manually.");

  const workflows = {
    issuance: {
      title: "Prepaid Card Issuance & Activation",
      desc: "CMS flow coordinating cardholder KYC, secure PAN cryptoblock generation, wallet token creation, and physical dispatch mapping.",
      badge: "CMS ENGINE",
      icon: CreditCard,
      color: "from-brand-500 to-blue-600",
      textColor: "text-brand-400",
      steps: [
        {
          title: "KYC & Identity Verification",
          role: "System verifies domestic identity registers (Aadhar/PAN), AML logs, and assigns a master banking CIS identifier.",
          log: "[KYC-OK] Customer credentials successfully matched. Risk level: LOW."
        },
        {
          title: "Cryptographic PAN Generation",
          role: "Hardware Security Module (HSM) generates primary account numbers (PAN), encrypts CVV/PIN blocks with secure keys.",
          log: "[HSM-GEN] Envoiced secure card PAN routing. Temporary cryptoblock set up."
        },
        {
          title: "Velocity Limits Setup",
          role: "Configures wallet card custom load ranges, ATM cash limits, online checkout limits, and mapping rules.",
          log: "[VELOCITY-CONF] Limit profiles set rules: Daily POS limit of $10K established."
        },
        {
          title: "NFC Token & Activation",
          role: "Initializes Apple/Google Pay virtual tap payloads, prints welcome kit labels, and marks status as READY.",
          log: "[CMS-ACTIVE] Card is online. Secure profile ready for NFC provisioning."
        }
      ]
    },
    settlement: {
      title: "EOD Clearing & Settlement",
      desc: "Reconciliation engine processing real-time system logs against clearing house (interchange) netting cycles.",
      badge: "CLEARING ENGINE",
      icon: RefreshCw,
      color: "from-emerald-500 to-teal-600",
      textColor: "text-emerald-400",
      steps: [
        {
          title: "Batch Capturing & Audit",
          role: "Collects transaction records in Kafka partitions throughout the business hours and dumps to persistent files.",
          log: "[BATCH] Kafka partition payments.auth batched; audited 12,450 transactions."
        },
        {
          title: "Netting & Fee Distribution",
          role: "Aggregates interchange shares, processes sponsor bank fees, and computes tax and revenue rates per bin.",
          log: "[NETTING-EOD] Net payments calculated: Receivables of $412,450 logged."
        },
        {
          title: "ISO-8583 Message Export",
          role: "Formats batches to specific clear layout formats (Mastercard IPM / Visa Base II) and sends via FTPS tunnels.",
          log: "[ISO-8583] Structured IPM files successfully distributed over clearing tunnels."
        },
        {
          title: "Suspense Reconciliation",
          role: "Balances outstanding suspense ledger accounts against incoming clearing reports and updates main databases.",
          log: "[RECONCILED] General ledger zero balancing succeeded. Suspense funds released."
        }
      ]
    },
    dispute: {
      title: "Chargeback & Dispute Management",
      desc: "Automated claim resolution engine compliant with Visa/Mastercard customer protection guidelines.",
      badge: "DISPUTE ENGINE",
      icon: ShieldAlert,
      color: "from-amber-500 to-red-600",
      textColor: "text-amber-400",
      steps: [
        {
          title: "Dispute Raising",
          role: "Cardholder flags a transaction in real-time. System moves the disputed funds to a temporary reserve escrow.",
          log: "[CLAIM-OPEN] Case #CHG-4509 raise. Holding $129.00 in dispute escrow."
        },
        {
          title: "Acquirer Presentment",
          role: "Collects claim evidence and dispatches formal electronic chargeback files to the merchant's acquiring gateway.",
          log: "[CMS-DISPATCH] Digital package routed to Visa dispute interchange hub."
        },
        {
          title: "Representment Review",
          role: "Merchant's system responds. Automatically parses incoming proofs of delivery or signs liability acceptance.",
          log: "[REPRESENTMENT] Merchant uploaded delivery logs. Running algorithmic check."
        },
        {
          title: "Final Settlement",
          role: "Closes case: reverses credit back to cardholder's master ledger OR unblocks held escrow funds to merchant account.",
          log: "[DISPUTE-RESOLVED] Decision: Fraud claim upheld. Reversing funds to customer."
        }
      ]
    }
  };

  useEffect(() => {
    setActiveWorkflowStep(0);
    setWfConsoleMessage(`Selected ${workflows[activeWorkflowTab].title}. Click stages or run automation.`);
  }, [activeWorkflowTab]);

  const runWorkflowSimulation = (wfKey: 'issuance' | 'settlement' | 'dispute') => {
    if (wfSimActive) return;
    setWfSimActive(true);
    setActiveWorkflowStep(0);
    setWfConsoleMessage(`[SYSTEM] Starting workflow test: ${workflows[wfKey].title}...`);

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current < workflows[wfKey].steps.length) {
        setActiveWorkflowStep(current);
        setWfConsoleMessage(`[STAGE ${current + 1}] ${workflows[wfKey].steps[current].log}`);
      } else {
        clearInterval(interval);
        setWfSimActive(false);
        setWfConsoleMessage(`[COMPLETED] ${workflows[wfKey].title} test completed. Status: GREEN`);
      }
    }, 1500);
  };

  const stepDetails = [
    {
      num: "1",
      name: "User Initiator",
      role: "Cardholder swipes card or initiates payment online.",
      log: "[INIT] Cardholder initiates electronic transfer. Packaging fields..."
    },
    {
      num: "2",
      name: "ATM/POS Terminal",
      role: "Acquirer terminal validates card swipe and encrypts raw parameters.",
      log: "[ACQ] POS Terminal generated encrypted payload. Forwarding message to gateway..."
    },
    {
      num: "3",
      name: "Payment Switch Hub",
      role: "Euronet REN Switch routes matching BIN requests towards issuer.",
      log: "[SWITCH] Euronet Switch Hub intercepted BIN matches. Formatting layout to ISO-8583 standards..."
    },
    {
      num: "4",
      name: "Core Banking Issuer",
      role: "Issuer account ledger checks limits and registers lock approval.",
      log: "[ISSUER] Authorization checked. Sufficient limits verified. Locking funds..."
    },
    {
      num: "5",
      name: "Success Approved",
      role: "Terminal prints response receipt and transaction is reconciled.",
      log: "[RECONCILIATION] Success approval. Transact complete in 0.012s."
    }
  ];

  const handleRunSimulation = () => {
    if (simActive) return;
    setSimActive(true);
    setCurrentStep(0);
    setSimMessage(stepDetails[0].log);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      if (progress < 5) {
        setCurrentStep(progress);
        setSimMessage(stepDetails[progress].log);
      } else {
        clearInterval(interval);
        setSimActive(false);
      }
    }, 1200);
  };

  const getTabLabel = () => {
    switch (activeTab) {
      case 'on_us':
        return "On-Us transactions are processed entirely within the same bank infrastructure. The request travels to the core banking system and returns with an authorization response in milliseconds, ensuring maximum speed and reliability.";
      case 'off_us':
        return "Off-Us transactions require routing out to external interchange schemes (Visa/Mastercard/Amex or National switches). The payment switch translates messages using ISO 8583 standards to reconcile with external acquiring/issuing systems.";
      case 'fast':
        return "Transaction requests are parsed and streamlined via event-driven Apache Kafka clusters and low-latency network routers, facilitating multi-threaded asynchronous parsing in less than 30ms.";
      case 'workflow':
        return "Core systems handle custom customer onboarding lifecycles, real-time risk checks, physical/virtual prepaid card mapping states, dispute resolutions, and end-of-day batch clearing.";
    }
  };

  return (
    <section id="projects" className="py-24 px-4 md:px-8 bg-slate-950 border-b border-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* ================= SECTION A: TRANSACTION LIFECYCLE ================= */}
        <div>
          {/* Header */}
          <div className="mb-16 text-center md:text-left">
            <p className="font-mono text-sm uppercase tracking-widest text-brand-500 mb-2">03 // SYSTEM ARCHITECTURE</p>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white">Transaction Lifecycle</h2>
            <p className="text-gray-400 mt-2 font-mono text-sm">End-to-end payment processing visualization.</p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/[0.02] rounded-full blur-2xl pointer-events-none" />

            {/* Stepper interactive visualizer */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10 mb-8">
              {stepDetails.map((step, idx) => {
                const isActive = currentStep === idx;
                const isPassed = !simActive || currentStep >= idx;
                return (
                  <button 
                    key={idx}
                    onClick={() => {
                      if (!simActive) {
                        setCurrentStep(idx);
                        setSimMessage(step.log);
                      }
                    }}
                    className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between h-40 group cursor-pointer ${
                      isActive 
                        ? 'bg-brand-500/10 border-brand-500 shadow-lg shadow-brand-500/10' 
                        : isPassed && simActive
                          ? 'bg-emerald-950/20 border-emerald-500/30'
                          : 'bg-slate-950/60 border-slate-850 hover:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`font-mono text-xs px-2.5 py-1 rounded-lg border font-bold ${
                        isActive 
                          ? 'bg-brand-500 text-white border-brand-400' 
                          : isPassed && simActive
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-slate-900 text-gray-400 border-slate-800'
                      }`}>
                        Step {step.num}
                      </span>
                      {isActive && (
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-500"></span>
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-white group-hover:text-brand-400 transition-colors">{step.name}</h4>
                      <p className="text-[10px] text-gray-500 font-mono mt-1 line-clamp-2 leading-relaxed">{step.role}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Action Simulator Controls */}
            <div className="flex flex-wrap items-center justify-between gap-6 border-t border-slate-800 pt-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleRunSimulation}
                  disabled={simActive}
                  className={`flex items-center gap-2 font-mono text-xs font-semibold px-5 py-3 rounded-xl transition-all cursor-pointer ${
                    simActive 
                      ? 'bg-slate-800 text-slate-500 border border-slate-800 cursor-not-allowed'
                      : 'bg-brand-500 text-white shadow-lg shadow-brand-500/10 hover:bg-brand-600 border border-brand-500'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  {simActive ? 'RUNNING LIFECYCLE...' : 'RUN PACKET ROUTE'}
                </button>

                <div className="text-xs text-gray-500 font-mono flex items-center gap-1">
                  <span>Packet speed:</span>
                  <strong className="text-zinc-300 font-sans">0.003s</strong>
                </div>
              </div>

              {/* Console log feedback block */}
              <div className="flex-grow md:max-w-lg w-full bg-slate-950 p-4 rounded-xl border border-slate-850 flex items-center gap-3 font-mono text-xs">
                <Activity className="w-5 h-5 text-brand-500 shrink-0 animate-pulse" />
                <p className="text-gray-300 leading-relaxed font-mono truncate">{simMessage}</p>
              </div>
            </div>

            {/* Internal Bank Processing Section */}
            <div className="mt-8 pt-8 border-t border-slate-800">
              <h4 className="text-sm font-mono text-gray-400 uppercase tracking-widest mb-4">// Internal Bank Processing Node Setup</h4>
              
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Switch Tabs */}
                <div className="lg:col-span-4 flex flex-col gap-2">
                  {[
                    { id: 'fast', name: 'Fast Processing' },
                    { id: 'on_us', name: 'On-Us Flow' },
                    { id: 'off_us', name: 'Off-Us Flow' },
                    { id: 'workflow', name: 'Banking Workflows' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`text-left px-5 py-3 rounded-xl text-sm font-display font-bold border transition-all cursor-pointer ${
                        activeTab === tab.id
                          ? 'bg-brand-500/10 border-brand-500 text-brand-400'
                          : 'bg-slate-950/50 border-slate-850 text-gray-400 hover:text-white hover:border-slate-800'
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>

                {/* Tab explanations content block */}
                <div className="lg:col-span-8 bg-slate-950/80 p-6 rounded-2xl border border-slate-850 h-36 flex flex-col justify-center">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-brand-500/10 text-brand-500 rounded-lg shrink-0 mt-0.5 border border-brand-500/10">
                      <ArrowRightLeft className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-brand-500 font-bold uppercase tracking-wider">
                        {activeTab === 'fast' ? 'Low Latency Architecture' : activeTab === 'on_us' ? 'Core On-Us Processing' : activeTab === 'off_us' ? 'Clearing & Interchange Scheme' : 'Enterprise Orchestration'}
                      </p>
                      <p className="text-sm text-gray-300 mt-1 leading-relaxed font-sans font-medium">
                        {getTabLabel()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ================= SECTION B: ARCHITECTURE FLOW SCHEMA ================= */}
        <div>
          {/* Header */}
          <div className="mb-16 text-center md:text-left">
            <p className="font-mono text-sm uppercase tracking-widest text-brand-500 mb-2">04 // LOW LATENCY ARCHITECTURES</p>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white">System Architecture</h2>
            <div className="flex flex-wrap items-center mt-3 gap-2">
              <span className="text-xs bg-brand-500/10 text-brand-500 border border-brand-500/20 px-2.5 py-1 rounded font-mono font-medium">Designing for High Availability.</span>
              <p className="text-gray-400 font-sans text-sm font-medium">I specialize in distributed systems that handle financial transactions with zero data loss and sub-second latency.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Core Architectural philosophy notes */}
            <div className="lg:col-span-4 space-y-4">
              {[
                {
                  title: "Microservices Flow",
                  desc: "Decoupled services for auth, processing, and settlement."
                },
                {
                  title: "Event-Driven Design",
                  desc: "Asynchronous processing using Kafka for high throughput."
                },
                {
                  title: "Secure Gateways",
                  desc: "Robust API gateways with role-based access and encryption."
                }
              ].map((card, idx) => (
                <div key={idx} className="bg-slate-900/35 border border-slate-800/80 p-6 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-colors">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-brand-500/[0.01] rounded-full blur-md" />
                  <h3 className="text-md font-display font-bold text-white mb-1.5 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-brand-500" />
                    {card.title}
                  </h3>
                  <p className="text-xs text-gray-450 leading-relaxed font-sans font-medium text-slate-400">{card.desc}</p>
                </div>
              ))}
            </div>

            {/* System Visual Node Connection flow diagram */}
            <div className="lg:col-span-8 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
              <p className="text-[10px] font-mono tracking-widest text-gray-500 uppercase mb-8">// ENTERPRISE LOGICAL TOPOLOGY CHART</p>
              
              <div className="space-y-6">
                
                {/* Level 1: Entry Point API Gateway */}
                <div className="flex justify-center">
                  <div className="bg-slate-950 border border-brand-500 p-4 rounded-xl shadow-lg shadow-brand-500/5 text-center min-w-44">
                    <p className="text-[10px] font-mono text-brand-400 leading-none mb-1">ENTRY POINT</p>
                    <p className="text-xs font-display font-bold text-white uppercase">API Gateway</p>
                  </div>
                </div>

                {/* Level 1 -> Level 2 connector line */}
                <div className="flex justify-center">
                  <div className="w-0.5 h-6 bg-gradient-to-b from-brand-500 to-slate-800" />
                </div>

                {/* Level 2: Decoupled Services Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-950/90 border border-slate-800 p-3.5 rounded-xl text-center">
                    <p className="text-[9px] font-mono text-zinc-500 mb-0.5 uppercase">// SECURITY</p>
                    <p className="text-xs font-display font-bold text-gray-200">Auth Service</p>
                  </div>
                  <div className="bg-slate-950/90 border border-brand-500/40 p-3.5 rounded-xl text-center ring-2 ring-brand-500/10">
                    <p className="text-[9px] font-mono text-brand-400 mb-0.5 uppercase">// ROUTER</p>
                    <p className="text-xs font-display font-bold text-white">Payment Core</p>
                  </div>
                  <div className="bg-slate-950/90 border border-slate-800 p-3.5 rounded-xl text-center">
                    <p className="text-[9px] font-mono text-zinc-500 mb-0.5 uppercase">// LIFECYCLE</p>
                    <p className="text-xs font-display font-bold text-gray-200">CMS Module</p>
                  </div>
                </div>

                {/* Level 2 -> Level 3 connectors */}
                <div className="flex justify-around px-8">
                  <div className="w-0.5 h-6 bg-slate-800" />
                  <div className="w-0.5 h-6 bg-brand-500/60" />
                  <div className="w-0.5 h-6 bg-slate-800" />
                </div>

                {/* Level 3: Messaging Broker Queue Block */}
                <div className="bg-slate-950/90 border border-emerald-500/40 p-4.5 rounded-xl flex items-center justify-between gap-6 shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/[0.04] rounded-full blur-lg" />
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[9px] font-mono text-emerald-400 tracking-wider">ASYNC EVENT DISPATCHER</p>
                      <h4 className="text-sm font-display font-black text-white">Apache Kafka Cluster</h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded font-semibold animate-pulse">PARTITIONS METRIC: ACTIVE</span>
                  </div>
                </div>

                {/* Level 3 -> Level 4 connector */}
                <div className="flex justify-center">
                  <div className="w-0.5 h-6 bg-slate-800" />
                </div>

                {/* Level 4: Database Storage System */}
                <div className="bg-slate-950/90 border border-slate-800 p-4 rounded-xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-900 rounded-lg text-zinc-400 border border-slate-800">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[9px] font-mono text-zinc-500">DURABLE RELATIONAL JOURNALING</p>
                      <h4 className="text-sm font-display font-bold text-gray-200">Database (MySQL/Hibernate)</h4>
                    </div>
                  </div>
                  <div className="text-xs text-zinc-500 font-mono">
                    Audit logs journal
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* ================= SECTION C: ENTERPRISE WORKFLOW ENGINES ================= */}
        <div id="workflows" className="pt-24 border-t border-slate-900 scroll-mt-20">
          {/* Header */}
          <div className="mb-16 text-center md:text-left">
            <p className="font-mono text-sm uppercase tracking-widest text-brand-500 mb-2">05 // BUSINESS LOGIC WORKFLOWS</p>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white">Banking Workflows</h2>
            <p className="text-gray-400 mt-2 font-sans text-sm font-medium">
              Interactive orchestration engines representing prepaid card lifecycles, EOD clearing matching, and chargeback dispute operations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left side: Workflow Selectors & Steps */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Horizontal pills */}
              <div className="flex flex-wrap gap-2.5 bg-slate-900/40 p-2 rounded-2xl border border-slate-850">
                {(['issuance', 'settlement', 'dispute'] as const).map((key) => {
                  const wf = workflows[key];
                  const Icon = wf.icon;
                  const isSelected = activeWorkflowTab === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        if (!wfSimActive) {
                          setActiveWorkflowTab(key);
                        }
                      }}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all font-display font-extrabold text-xs tracking-wide cursor-pointer flex-1 justify-center whitespace-nowrap ${
                        isSelected
                          ? 'bg-gradient-to-r ' + wf.color + ' text-white shadow-lg shadow-brand-500/20'
                          : 'bg-slate-950/60 text-gray-400 border border-transparent hover:text-gray-200 hover:bg-slate-950'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{wf.badge}</span>
                    </button>
                  );
                })}
              </div>

              {/* Workflow general description */}
              <div className="bg-slate-900/30 border border-slate-850/80 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-[10px] font-mono leading-none tracking-widest uppercase font-bold px-2.5 py-1 rounded bg-slate-950 border border-slate-850 ${workflows[activeWorkflowTab].textColor}`}>
                    {workflows[activeWorkflowTab].badge}
                  </span>
                  <p className="text-xs font-mono text-gray-500">SYSTEM CAPABILITY</p>
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-2">{workflows[activeWorkflowTab].title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">{workflows[activeWorkflowTab].desc}</p>
              </div>

              {/* Vertical timeline steps */}
              <div className="space-y-4">
                {workflows[activeWorkflowTab].steps.map((step, idx) => {
                  const isPassed = activeWorkflowStep >= idx;
                  const isCurrent = activeWorkflowStep === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (!wfSimActive) {
                          setActiveWorkflowStep(idx);
                          setWfConsoleMessage(`[MANUAL] Selected step: ${step.title}. ${step.log}`);
                        }
                      }}
                      className={`w-full text-left p-4.5 rounded-xl border transition-all cursor-pointer flex items-start gap-4 relative group ${
                        isCurrent
                          ? 'bg-slate-900 border-brand-500 shadow-md ring-1 ring-brand-500/20'
                          : 'bg-slate-950/40 border-slate-850/80 hover:border-slate-805/90'
                      }`}
                    >
                      <div className={`mt-0.5 w-6 h-6 rounded-full border flex items-center justify-center shrink-0 font-mono text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-brand-500 text-white border-brand-400'
                          : isPassed
                            ? 'bg-emerald-950 text-emerald-450 border-emerald-500/30'
                            : 'bg-slate-900 text-slate-500 border-slate-800'
                      }`}>
                        {idx + 1}
                      </div>

                      <div className="flex-grow space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-xs font-display font-black transition-colors ${
                            isCurrent ? 'text-brand-400' : 'text-gray-200 group-hover:text-brand-500'
                          }`}>
                            {step.title}
                          </h4>
                          {isCurrent && (
                            <span className="text-[10px] font-mono text-brand-500 animate-pulse font-bold">// CURRENT STATE</span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-400 leading-relaxed font-sans">{step.role}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Right side: Live Simulator and Node State Machine Viewer */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Embedded Shell Console terminal */}
              <div className="bg-slate-950/90 rounded-2xl border border-slate-850 overflow-hidden shadow-2xl">
                <div className="bg-slate-900/80 px-4 py-3 border-b border-slate-850 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-[10px] font-mono text-gray-500 ml-2">workflow_cli.sh</span>
                  </div>
                  <span className="text-[9px] font-mono text-brand-500/80 font-bold bg-brand-500/5 border border-brand-500/10 px-2 py-0.5 rounded">ENV: SANDBOX</span>
                </div>

                <div className="p-5 font-mono text-xs space-y-4 min-h-[160px] flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-500">
                      <span>$</span>
                      <span>./simulate_flow --engine={activeWorkflowTab}</span>
                    </div>
                    <div className="text-zinc-300 leading-relaxed text-[11px] font-mono">
                      {wfConsoleMessage}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-900/60">
                    <button
                      onClick={() => runWorkflowSimulation(activeWorkflowTab)}
                      disabled={wfSimActive}
                      className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-wide font-black px-4 py-2.5 rounded-lg transition-all cursor-pointer ${
                        wfSimActive
                          ? 'bg-slate-900 text-slate-500 border border-slate-850 cursor-not-allowed'
                          : 'bg-white hover:bg-zinc-200 text-black shadow-lg border border-white'
                      }`}
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{wfSimActive ? 'SIMULATING...' : 'EXECUTE WORKFLOW'}</span>
                    </button>

                    <div className="text-[10px] text-slate-550 font-mono flex items-center gap-1.5 label select-none">
                      <span className={`h-2 w-2 rounded-full ${wfSimActive ? 'bg-amber-400 animate-ping' : 'bg-emerald-500'}`} />
                      <span>{wfSimActive ? 'ENGINE BUSY' : 'ENGINE IDLE'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* State Machine Transition Graph Widget */}
              <div className="bg-slate-900/40 border border-slate-850/80 p-6 rounded-2xl relative overflow-hidden">
                <p className="text-[9px] font-mono tracking-widest text-gray-500 uppercase mb-6">// ACTIVE STATE TRANSITION CHART</p>
                
                <div className="flex items-center justify-between gap-1 relative z-10 select-none py-4">
                  {workflows[activeWorkflowTab].steps.map((step, idx) => (
                    <div key={idx} className="flex items-center justify-between flex-1">
                      {/* Circle State Node */}
                      <div className="flex flex-col items-center flex-1">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center border text-[11.5px] font-mono font-black transition-all ${
                          activeWorkflowStep === idx
                            ? 'bg-brand-500 text-white border-brand-400 ring-4 ring-brand-500/10 scale-110 shadow-lg'
                            : activeWorkflowStep >= idx
                              ? 'bg-emerald-950 text-emerald-400 border-emerald-500/25'
                              : 'bg-slate-950 text-slate-600 border-slate-850'
                        }`}>
                          S{idx + 1}
                        </div>
                        <span className={`text-[9px] font-mono mt-2 text-center truncate w-14 ${
                          activeWorkflowStep === idx ? 'text-brand-400 font-bold' : 'text-gray-500'
                        }`}>
                          State {idx + 1}
                        </span>
                      </div>

                      {/* Transition vector line */}
                      {idx < workflows[activeWorkflowTab].steps.length - 1 && (
                        <div className="flex-grow flex items-center justify-center min-w-3 px-1">
                          <div className={`h-0.5 w-full rounded transition-colors duration-500 ${
                            activeWorkflowStep > idx
                              ? 'bg-emerald-500'
                              : activeWorkflowStep === idx
                                ? 'bg-brand-500 animate-pulse'
                                : 'bg-slate-800'
                          }`} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4 bg-slate-950/60 p-3.5 rounded-xl border border-slate-850/60 flex items-center gap-2 text-[10px] font-mono text-zinc-400 leading-relaxed font-mono">
                  <Settings className={`w-3.5 h-3.5 text-slate-500 shrink-0 ${wfSimActive ? 'animate-spin' : ''}`} />
                  <span>
                    State machine evaluates transitions via Spring & Kafka events. Triggering <strong className="text-zinc-200">S{activeWorkflowStep + 1}</strong>: ({workflows[activeWorkflowTab].steps[activeWorkflowStep].title})
                  </span>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
