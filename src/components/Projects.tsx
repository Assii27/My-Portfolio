import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, CheckCircle2, Server, FolderGit2, X, ChevronDown, ChevronUp } from 'lucide-react';
import { PROJECTS } from '../data';

export default function Projects() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <section id="key-projects" className="py-24 px-4 md:px-8 bg-slate-950/70 border-b border-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="font-mono text-sm uppercase tracking-widest text-brand-500 mb-2">05 // CASE STUDIES & PORTFOLIO</p>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white">Key Projects</h2>
            <p className="text-gray-405 mt-2 font-mono text-sm text-slate-400">Real-world impact, delivered.</p>
          </div>
          <div className="text-xs text-gray-500 font-mono flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-brand-500" />
            <span>COMMITTED TO GITHUB SECURE REPOSITORIES // CMS STATE</span>
          </div>
        </div>

        {/* Projects Grid Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project, idx) => {
            const isExpanded = expandedId === project.id;
            
            // Custom project specific indicators mapping to user request
            const projectMeta = project.id === "project-1" 
              ? {
                  company: "Euronet",
                  detailsArr: ["10K+ Transactions/Day", "30% Latency Reduction", "99.9% Success Rate"],
                  techLabel: "Microservices • Event-Driven",
                  archBullets: [
                    "Developed high-availability switch authorization pipelines in Java 8+ and Spring Boot for real-time EFT loops.",
                    "Orchestrated real-time high-throughput routing using Apache Kafka partitioned message systems.",
                    "Integrated comprehensive PIN switching setups adhering to strict financial PCI safety margins.",
                    "Reduced transaction exception latency from 14ms down to under 4ms using thread debug routines."
                  ]
                }
              : {
                  company: "SPCL Infotech",
                  detailsArr: ["40% Faster Onboarding", "Secure Audit Logs", "Role-based Access"],
                  techLabel: "Microservices • Event-Driven",
                  archBullets: [
                    "Engineered enterprise-grade individual/corporate client onboarding portals with complex state mapping.",
                    "Constructed dynamic menu/submenu configurations mapped directly against MySQL relational rule systems.",
                    "Implemented bulletproof thread-safe database logging structures to guard customer transaction trails.",
                    "Optimized DB indexed schemas resulting on zero transaction blockage under continuous simulated stress testing."
                  ]
                };

            return (
              <div 
                key={project.id} 
                className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden transition-all hover:border-slate-700 hover:bg-slate-900/60 flex flex-col justify-between"
              >
                
                {/* Visual Top block with standard stock representation overlay */}
                <div className="p-6 md:p-8 space-y-6">
                  
                  {/* Top Header Label */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-slate-950 text-brand-400 border border-slate-850 px-3 py-1.5 rounded-lg font-mono uppercase tracking-widest font-semibold">
                      {projectMeta.company}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono tracking-wide">
                      {projectMeta.techLabel}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white mb-2 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-450 leading-relaxed font-sans text-slate-400">
                      {project.description}
                    </p>
                  </div>

                  {/* Stats Block highlights mapped on card */}
                  <div className="grid grid-cols-3 gap-2 py-4 px-3 bg-slate-950/60 border border-slate-850 rounded-xl text-center">
                    {projectMeta.detailsArr.map((stat, sIdx) => (
                      <div key={sIdx} className="border-r last:border-r-0 border-slate-850">
                        <p className="text-xs font-mono font-bold text-brand-400 truncate px-1">{stat}</p>
                      </div>
                    ))}
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="text-xs bg-slate-950 text-gray-300 font-mono border border-slate-850 px-2.5 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Expanding details drawer action */}
                <div className="border-t border-slate-850/80 bg-slate-950/30 p-4">
                  <button 
                    onClick={() => toggleExpand(project.id)}
                    className="w-full flex items-center justify-between py-2 text-xs font-mono font-medium text-brand-400 hover:text-brand-300 transition-colors uppercase cursor-pointer"
                  >
                    <span>{isExpanded ? "Close Project specifications" : "View Project Details"}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 pb-2 text-xs text-slate-300 space-y-3 font-mono border-t border-slate-850 mt-3 leading-relaxed">
                          <p className="text-gray-400 font-sans text-sm font-medium">
                            {project.longDescription}
                          </p>
                          <div className="space-y-2 mt-2 pt-2 border-t border-slate-900">
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">// SYSTEM IMPLEMENTATION DETAILS</p>
                            {projectMeta.archBullets.map((bullet, bIdx) => (
                              <div key={bIdx} className="flex items-start gap-2 text-xs text-gray-300 font-sans leading-relaxed">
                                <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                                <span>{bullet}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
