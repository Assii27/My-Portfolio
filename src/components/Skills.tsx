import { motion } from 'motion/react';
import { Cpu, Terminal, Database, Shield, Layers, HelpCircle, CheckCircle } from 'lucide-react';
import { SKILLS } from '../data';

export default function Skills() {
  const marqueeTags = [
    "Java", "Spring Boot", "Hibernate", "Kafka", "MySQL", "Microservices", "REST API", "Git", "IntelliJ", "Jira",
    "Java", "Spring Boot", "Hibernate", "Kafka", "MySQL", "Microservices", "REST API", "Git", "IntelliJ", "Jira",
    "Java", "Spring Boot", "Hibernate", "Kafka", "MySQL", "Microservices", "REST API", "Git", "IntelliJ", "Jira"
  ];

  const techStackGroups = [
    {
      title: "Backend",
      icon: <Terminal className="w-5 h-5 text-brand-500" />,
      items: [
        { name: "Java", desc: "Core & Enterprise editions" },
        { name: "Spring Boot", desc: "Microservices & injection" },
        { name: "Hibernate", desc: "ORM data mappings" }
      ]
    },
    {
      title: "Messaging",
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      items: [
        { name: "Kafka", desc: "High-throughput event loops" }
      ]
    },
    {
      title: "Database",
      icon: <Database className="w-5 h-5 text-amber-500" />,
      items: [
        { name: "MySQL", desc: "Query indexing & partitions" }
      ]
    },
    {
      title: "Tools",
      icon: <Layers className="w-5 h-5 text-purple-400" />,
      items: [
        { name: "Git", desc: "Strict branch controllers" },
        { name: "IntelliJ", desc: "Profiling & profiling" },
        { name: "Jira", desc: "Agile Kanban boards" }
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 px-4 md:px-8 bg-slate-950/70 border-b border-slate-900">
      
      {/* 1. Stack Group List */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center md:text-left">
          <p className="font-mono text-sm uppercase tracking-widest text-brand-500 mb-2">02 // TECH STACK</p>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white">Tech Stack</h2>
          <p className="text-gray-400 mt-2 font-mono text-sm">Modern tools for modern banking.</p>
        </div>

        {/* Tech Stack cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {techStackGroups.map((group, idx) => (
            <div key={idx} className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 relative group hover:border-slate-700 transition-all">
              <div className="absolute top-0 right-0 w-16 h-16 bg-brand-500/[0.02] rounded-full blur-md" />
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  {group.icon}
                </div>
                <h3 className="text-lg font-display font-medium text-white">{group.title}</h3>
              </div>

              <div className="space-y-4">
                {group.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="border-t border-slate-850 pt-3 first:border-0 first:pt-0">
                    <p className="text-sm font-sans font-semibold text-gray-200">{item.name}</p>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Core Technologies scrolling tape */}
      <div className="mt-24 w-full overflow-hidden border-y border-slate-800 bg-slate-900/20 py-8 relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
        
        <p className="text-center font-mono text-[10px] tracking-widest text-gray-500 uppercase mb-6">// CORE TECHNOLOGIES & SKILLS // CONTINUOUS PIPELINE</p>

        {/* Marquee wrap */}
        <div className="flex select-none overflow-hidden gap-10">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-10 text-xl font-display font-black text-gray-400">
            {marqueeTags.map((tag, tagIdx) => (
              <div key={tagIdx} className="flex items-center gap-3 uppercase tracking-wide">
                <span className="text-brand-500 font-mono text-sm">//</span>
                <span className="text-white hover:text-brand-400 transition-colors">{tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Custom inline keyframes inline configuration */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); }
          }
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}} />
      </div>

    </section>
  );
}
