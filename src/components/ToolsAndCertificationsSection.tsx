import React from 'react';
import { 
  Code, 
  GitBranch, 
  Terminal, 
  Layout, 
  Award, 
  CheckCircle, 
  Network, 
  GraduationCap, 
  Sparkles,
  Cpu
} from 'lucide-react';
import { defaultPortfolioData } from '../data';

export const ToolsAndCertificationsSection: React.FC = () => {
  const data = defaultPortfolioData;

  const getToolIcon = (name: string) => {
    if (name.includes('VS Code')) return <Code className="w-5 h-5 text-cyan-400" />;
    if (name.includes('Git')) return <GitBranch className="w-5 h-5 text-cyan-300" />;
    if (name.includes('Packet Tracer') || name.includes('Cisco')) return <Network className="w-5 h-5 text-cyan-400" />;
    if (name.includes('Linux')) return <Terminal className="w-5 h-5 text-emerald-400" />;
    if (name.includes('Figma')) return <Layout className="w-5 h-5 text-purple-400" />;
    return <Cpu className="w-5 h-5 text-cyan-400" />;
  };

  return (
    <section id="tools" className="space-y-8 scroll-mt-20">
      
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="font-orbitron text-2xl sm:text-3xl font-extrabold text-white tracking-wider uppercase text-glow-cyan">
            DEV TOOLS & CREDENTIALS
          </h2>
          <div className="h-px w-20 sm:w-40 bg-gradient-to-r from-cyan-500/50 to-transparent" />
        </div>
        <span className="font-tech text-xs text-cyan-400 px-3 py-1 bg-cyan-950/60 border border-cyan-500/40 rounded-full box-glow-cyan">
          [ WORKFLOW & BADGES ]
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Tools & Workflow (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <h3 className="font-orbitron text-base font-bold text-white tracking-wide">
              DEVELOPMENT WORKFLOW & TOOLS
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.toolsWorkflow.map((tool, index) => (
              <div
                key={tool.name}
                className={`relative bg-slate-950/90 border border-cyan-500/30 hover:border-cyan-400/70 rounded-xl p-4 transition-all duration-300 hover:scale-102 box-glow-cyan group ${
                  data.toolsWorkflow.length % 2 !== 0 && index === data.toolsWorkflow.length - 1 ? 'sm:col-span-2' : ''
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-400/40 group-hover:bg-cyan-500/30 transition-colors">
                    {getToolIcon(tool.name)}
                  </div>
                  <div>
                    <h4 className="font-orbitron text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {tool.name}
                    </h4>
                  </div>
                </div>
                <p className="text-xs font-tech text-cyan-400/70">
                  {tool.category}
                </p>

                {/* Corner detail */}
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400 opacity-60" />
              </div>
            ))}
          </div>

          {/* Linux & Environment Note */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/20 text-xs font-tech text-slate-300 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 animate-ping" />
            <span>Comfortable with Linux commands, Git repository management, and structured VS Code workflows.</span>
          </div>
        </div>

        {/* Right: Verified Cisco Certifications (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-cyan-400" />
            <h3 className="font-orbitron text-base font-bold text-white tracking-wide">
              VERIFIED CISCO CERTIFICATIONS
            </h3>
          </div>

          <div className="space-y-4">
            {data.certifications.map((cert) => (
              <div
                key={cert.title}
                className="relative bg-slate-950/90 border border-cyan-500/30 hover:border-cyan-400/70 rounded-xl p-5 transition-all duration-300 box-glow-cyan"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
                      {cert.title.includes('CCNA') || cert.title.includes('Network') ? (
                        <Network className="w-5 h-5 text-cyan-300" />
                      ) : (
                        <Code className="w-5 h-5 text-cyan-300" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-orbitron text-sm font-bold text-white">
                        {cert.title}
                      </h4>
                      <p className="text-xs font-tech text-cyan-400">
                        {cert.issuer} • <span className="text-slate-400">{cert.year}</span>
                      </p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-tech text-emerald-300 shrink-0 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> VERIFIED
                  </span>
                </div>

                <p className="text-xs font-tech text-slate-300 mt-2 leading-relaxed">
                  {cert.description}
                </p>

                {/* Corner detail */}
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400 opacity-60" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
