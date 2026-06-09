import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Calendar, ChevronDown, ChevronUp, Award, HelpCircle } from 'lucide-react';

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleLearnMore = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const experienceData = [
    {
      id: "euronet",
      year: "March 2024 — Nov 2025",
      domain: "Payments & Switching",
      role: "Software Developer-Java",
      company: "Euronet Services Pvt Ltd, Pune",
      highlights: [
        "Developed and enhanced Java-based backend modules for Switch System (REN Product) in the Payment Domain.",
        "Worked on Card Management System (CMS) modules including Prepaid Card issuing lifecycles, reload systems, card activation flows, and statement report generation.",
        "Architected secure triggers for Prepaid Card transaction loads/claims with custom rule validations.",
        "Involved in payment processing flows ensuring smooth real-time transaction operations.",
        "Performed data transformation using XML/XSL/JSON and handled data mapping for fintech and banking formats.",
        "Participated in debugging, RCA (Root Cause Analysis), defect fixing and issue resolution in UAT and Production environments.",
        "Worked on issuer transactions authorization routing and end-of-day settlement.",
        "Prepared Low-Level Design (LLD) with class diagrams and contributed to technical documentation."
      ],
      extraDetails: "Direct responsibilities involved high-integrity state machine controls during routing, maintaining PCI-DSS standard controls, and parsing high-throughput ISO-8583 payment objects. Also led investigation into concurrent payment database locks during peak transaction hours."
    },
    {
      id: "spcl",
      year: "Sept 2020 — Jan 2024",
      domain: "Banking Domain",
      role: "Software Developer",
      company: "SPCL Infotech",
      highlights: [
        "Developed and maintained Java-based backend modules for Banking Admin Application used by banks to manage and update customer information.",
        "Built customer and corporate registration modules and supported complete registration workflows.",
        "Designed and developed menu/submenu management features for service configuration and dynamic UI control.",
        "Implemented secure transaction logging to record and monitor all banking activities.",
        "Designed and implemented business logic using Java, Spring Boot, Hibernate and OOP principles to ensure system reliability and scalability.",
        "Managed MySQL database operations including query optimization, stored procedures and data handling.",
        "Debugged, analysed defects and performed RCA to improve system performance and stability."
      ],
      extraDetails: "Spearheaded corporate-level KYC onboarding forms. Configured robust Spring Data endpoints that reduced thread pool exhaustion logs. Mapped complex layout components to clean Hibernate models, facilitating zero downtime during hot database scheme shifts."
    }
  ];

  const achievements = [
    {
      value: "25%",
      desc: "Reduced downtime by 25% via proactive monitoring and performance optimization."
    },
    {
      value: "40%",
      desc: "Improved API response time by 40% through query optimization and caching."
    },
    {
      value: "5+",
      desc: "Successfully delivered 5+ major feature releases in high-pressure financial environments."
    }
  ];

  return (
    <section id="experience" className="py-24 px-4 md:px-8 bg-slate-950 border-b border-slate-900 scroll-mt-20">
      <div className="max-w-5xl mx-auto space-y-24">
        
        {/* Experience TIMELINE BLOCK */}
        <div>
          {/* Section Header */}
          <div className="mb-16 text-center md:text-left">
            <p className="font-mono text-sm uppercase tracking-widest text-brand-500 mb-2">06 // CAREER MILESTONES</p>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white">Work History</h2>
            <p className="text-gray-400 mt-2 font-mono text-sm">Professional journey in fintech.</p>
          </div>

          {/* Timeline Stack */}
          <div className="relative border-l border-slate-800 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12">
            {experienceData.map((item, idx) => {
              const isOpen = expandedId === item.id;
              return (
                <div key={item.id} className="relative group">
                  
                  {/* Circle Indicator on vertical bar */}
                  <div className="absolute -left-[45px] md:-left-[61px] top-1.5 p-2 bg-slate-900 border border-slate-800 text-brand-400 rounded-xl group-hover:bg-brand-400 group-hover:text-white transition-all shadow-md">
                    <Briefcase className="w-4 h-4 md:w-5 md:h-5" />
                  </div>

                  {/* Header Badge */}
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <div className="flex items-center gap-1 text-[11px] font-mono text-brand-400 tracking-wider font-semibold bg-brand-500/10 border border-brand-500/20 px-2.5 py-1 rounded-md">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.year}</span>
                    </div>
                    <span className="text-xs bg-slate-900 text-slate-500 font-mono px-2.5 py-1 rounded border border-slate-850">{item.domain}</span>
                  </div>

                  {/* Primary Card */}
                  <div className="bg-slate-900/40 border border-slate-805 p-6 md:p-8 rounded-2xl group-hover:border-slate-800 transition-colors">
                    <h3 className="text-xl md:text-2xl font-display font-black text-white leading-tight">
                      {item.role}
                    </h3>
                    <h4 className="text-sm font-sans font-semibold text-brand-400 uppercase tracking-wide mt-1 mb-6">
                      {item.company}
                    </h4>

                    {/* Highlights bullet lists */}
                    <div className="space-y-3">
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">// LOGICAL CORE RESPONSIBILITIES</p>
                      {item.highlights.map((bullet, bulletIdx) => (
                        <div key={bulletIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-gray-300 font-sans leading-relaxed">
                          <span className="text-brand-500 mt-1 block select-none shrink-0">↳</span>
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>

                    {/* Learn more interactive toggle */}
                    <div className="mt-6 pt-6 border-t border-slate-850">
                      <button
                        onClick={() => toggleLearnMore(item.id)}
                        className="flex items-center gap-1.5 text-xs font-mono font-medium text-brand-450 hover:text-brand-450 text-brand-500 transition-colors uppercase cursor-pointer"
                      >
                        <span>{isOpen ? "Collapse work details" : "Learn More"}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-850 mt-4 text-xs font-sans text-gray-400 leading-relaxed">
                              {item.extraDetails}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* ACHIEVEMENTS STATS BLOCK */}
        <div className="border-t border-slate-900 pt-20">
          <div className="mb-12 text-center md:text-left">
            <p className="font-mono text-sm uppercase tracking-widest text-brand-500 mb-2">07 // METRIC-BASED ENGAGEMENTS</p>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white">Achievements</h2>
            <p className="text-gray-400 mt-2 font-mono text-sm">Proven track record of excellence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((item, idx) => (
              <div key={idx} className="bg-slate-900/35 border border-slate-805 hover:border-slate-750 p-6 rounded-2xl relative overflow-hidden group transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/[0.015] rounded-full blur-xl" />
                <div className="flex items-center gap-1.5 text-3xl md:text-4xl font-display font-black text-brand-400 mb-3">
                  <Award className="w-6 h-6 text-brand-550" />
                  <span>{item.value}</span>
                </div>
                <p className="text-xs md:text-sm text-gray-300 font-sans leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
