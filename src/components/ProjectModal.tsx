import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Cpu, Layers, CheckCircle2, Copy, Check, Terminal, Sparkles } from 'lucide-react';
import { ProjectItem } from '../types';
import { soundManager } from './SoundEffects';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const handleClose = () => {
    soundManager.playClick();
    onClose();
  };

  const handleCopySnippet = () => {
    if (!project.codeSnippet?.code) return;
    navigator.clipboard.writeText(project.codeSnippet.code);
    soundManager.playSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl bg-slate-950/98 border border-cyan-500/50 rounded-2xl shadow-2xl box-glow-cyan-lg overflow-hidden max-h-[92vh] flex flex-col"
        >
          {/* Top Header Bar */}
          <div className="flex items-start justify-between border-b border-cyan-500/30 px-6 py-4 bg-slate-900/60 shrink-0">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-tech text-xs tracking-widest text-cyan-400 uppercase font-semibold">
                  {project.category}
                </span>
              </div>
              <h2 className="font-orbitron text-xl sm:text-2xl font-bold text-white tracking-wide">
                {project.title}
              </h2>
              {project.subtitle && (
                <p className="font-tech text-xs text-slate-400">
                  {project.subtitle}
                </p>
              )}
            </div>

            <button
              onClick={handleClose}
              onMouseEnter={() => soundManager.playHover()}
              className="p-2 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-400 hover:text-cyan-300 hover:border-cyan-400 transition-all cursor-pointer"
              title="Close specification"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Specification Content */}
          <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
            
            {/* Top Row: Visual Screenshot & Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              {/* Project Image Banner */}
              <div className="md:col-span-8 relative rounded-xl overflow-hidden border border-cyan-500/30 group max-h-56 bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 md:h-56 object-cover filter contrast-105 group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const fallbackMap: Record<string, string> = {
                      jade_lantern: 'https://lh3.googleusercontent.com/d/1ooVB0g3SFFU7gVlwb0ndwo5gtJUd1pIL',
                      birthday_experience: 'https://lh3.googleusercontent.com/d/1G8mS3a56xc6GZ4LDKeL13yt8L07q9faj',
                      project_sentinel: 'https://lh3.googleusercontent.com/d/1wwGEOCTqytRquvvkLlNUlgnHCkbq9M-8'
                    };
                    if (fallbackMap[project.id]) {
                      e.currentTarget.src = fallbackMap[project.id];
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-cyan-950/90 border border-cyan-400/60 rounded text-[11px] font-tech text-cyan-200">
                    STATUS: VERIFIED DEPLOYMENT
                  </span>
                </div>
              </div>

              {/* Quick Launch & Stats Card */}
              <div className="md:col-span-4 flex flex-col justify-between gap-3 p-4 rounded-xl bg-slate-900/70 border border-cyan-500/30">
                <div>
                  <div className="font-tech text-xs text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>SYSTEM METRICS</span>
                  </div>
                  {project.stats && (
                    <div className="space-y-2">
                      {project.stats.map((stat, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-slate-950/60 px-3 py-1.5 rounded border border-slate-800">
                          <span className="font-tech text-[10px] text-slate-400">{stat.label}</span>
                          <span className="font-orbitron text-xs font-bold text-cyan-300">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => soundManager.playHover()}
                      onClick={() => soundManager.playClick()}
                      className="w-full py-2.5 px-3 rounded-lg font-tech text-xs tracking-wider bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold transition-all flex items-center justify-center gap-2 box-glow-cyan"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>LAUNCH LIVE DEMO</span>
                    </a>
                  ) : (
                    <div className="w-full py-2.5 px-3 rounded-lg font-tech text-[11px] text-center text-cyan-300 bg-slate-950/80 border border-cyan-500/40 flex items-center justify-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      <span>LOCAL AUDIT // STANDALONE</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Architecture Overview Section */}
            <div className="space-y-2">
              <div className="font-tech text-xs text-cyan-400 tracking-widest uppercase flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>ARCHITECTURE OVERVIEW</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 font-rajdhani text-sm text-slate-300 leading-relaxed">
                {project.overview || project.description}
              </div>
            </div>

            {/* Side-by-Side Structured Cards: Topology/Key Modules & Protocols/Tech Stack */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: Key System Modules */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/20 space-y-3">
                <div className="font-tech text-xs text-cyan-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-slate-800 pb-2">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>SYSTEM ARCHITECTURE & CORE MODULES</span>
                </div>
                <ul className="space-y-2 font-rajdhani text-sm text-slate-300">
                  {(project.keyModules || [
                    "Modular Client-Side Logic Architecture",
                    "Dynamic Rendering & DOM State Pipeline",
                    "Asynchronous Data Flow Controller",
                    "Performance-Optimized Rendering Pipeline"
                  ]).map((mod, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0 shadow-[0_0_8px_#22d3ee]" />
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 2: Protocols & Standards */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/20 space-y-3">
                <div className="font-tech text-xs text-cyan-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-slate-800 pb-2">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>PROTOCOLS, STANDARDS & FRAMEWORKS</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {(project.protocols || project.techStack).map((protocol, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1.5 bg-cyan-950/50 border border-cyan-500/30 hover:border-cyan-400 rounded-lg text-xs font-tech text-cyan-200 transition-colors"
                    >
                      {protocol}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Technical Milestones & Verification (With Checkmarks) */}
            <div className="space-y-3">
              <div className="font-tech text-xs text-cyan-400 tracking-widest uppercase flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>TECHNICAL MILESTONES & VERIFICATION</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2.5">
                {(project.milestones || [
                  "Engineered responsive components with robust state handling and cross-browser reliability.",
                  "Streamlined asset delivery pipeline achieving optimal frame rates and fast initial render.",
                  "Conducted end-to-end user journey tests to guarantee seamless interaction flows.",
                  "Structured clean, maintainable modular codebase adhering to modern software principles."
                ]).map((milestone, idx) => (
                  <div key={idx} className="flex items-start gap-3 font-rajdhani text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{milestone}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Code Implementation / Snippet with Copy Snippet Button */}
            {project.codeSnippet && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-tech text-xs text-cyan-400 tracking-widest uppercase flex items-center gap-2">
                    <span className="font-mono text-cyan-400">&lt;/&gt;</span>
                    <span>{project.codeSnippet.title}</span>
                  </div>
                  <button
                    onClick={handleCopySnippet}
                    onMouseEnter={() => soundManager.playHover()}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white font-tech text-xs transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>COPY SNIPPET</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-cyan-500/30 bg-slate-950 p-4 font-mono text-xs text-cyan-300/90 custom-scrollbar overflow-x-auto shadow-inner">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-500 font-tech">
                    <span>SYNTAX: {project.codeSnippet.language.toUpperCase()}</span>
                    <span>STANDALONE VERIFIED EXECUTION</span>
                  </div>
                  <pre className="leading-relaxed">
                    <code>{project.codeSnippet.code}</code>
                  </pre>
                </div>
              </div>
            )}

          </div>

          {/* Bottom HUD Footer Bar */}
          <div className="border-t border-cyan-500/20 px-6 py-3 bg-slate-950 flex flex-wrap items-center justify-between text-xs font-tech text-slate-400 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>MALAIKA NOOR // PORTFOLIO SPECIFICATION PROTOCOL</span>
            </div>
            <div className="text-cyan-400/80">
              PRESS ESC OR CLOSE TO RETURN
            </div>
          </div>

          {/* Corner Cyber Brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
