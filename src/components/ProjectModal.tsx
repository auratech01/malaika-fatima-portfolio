import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Cpu, Layers, Sparkles } from 'lucide-react';
import { ProjectItem } from '../types';
import { soundManager } from './SoundEffects';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const handleClose = () => {
    soundManager.playClick();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-slate-950/95 border border-cyan-500/50 rounded-2xl p-6 shadow-2xl box-glow-cyan-lg overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Top HUD Header Bar */}
          <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
              <span className="font-tech text-xs tracking-widest text-cyan-400">
                PROJECT_SPEC // {project.id.toUpperCase()}
              </span>
            </div>
            <button
              onClick={handleClose}
              onMouseEnter={() => soundManager.playHover()}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-cyan-300 hover:border-cyan-400 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Image Display */}
            <div className="flex flex-col gap-3">
              <div className="relative rounded-xl overflow-hidden border border-cyan-500/30 group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 md:h-56 object-cover filter contrast-110"
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
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-cyan-950/90 border border-cyan-400/50 rounded text-[10px] font-tech text-cyan-300">
                  {project.category}
                </div>
              </div>

              {/* Performance Metrics / Stats */}
              {project.stats && (
                <div className="grid grid-cols-3 gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-cyan-500/20">
                  {project.stats.map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className="font-tech text-[9px] text-slate-400 truncate">{stat.label}</div>
                      <div className="font-orbitron text-[11px] font-bold text-cyan-300 truncate">{stat.value}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Project Specs & Details */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-orbitron text-xl font-bold text-white tracking-wide mb-1">
                  {project.title}
                </h3>
                {project.subtitle && (
                  <p className="font-tech text-xs text-cyan-400 tracking-wider mb-3">
                    {project.subtitle}
                  </p>
                )}

                <div className="font-rajdhani text-sm text-slate-300 leading-relaxed mb-4 whitespace-pre-line space-y-2">
                  {project.description}
                </div>

                {/* Tech Stack Chips */}
                <div className="mb-4">
                  <div className="flex items-center gap-1.5 text-xs font-tech text-cyan-400 mb-2">
                    <Layers className="w-3.5 h-3.5" />
                    <span>TECHNOLOGY PROTOCOLS:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-cyan-950/60 border border-cyan-500/30 rounded text-xs font-tech text-cyan-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800">
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => soundManager.playHover()}
                    onClick={() => soundManager.playClick()}
                    className="w-full py-2.5 px-4 rounded-xl font-tech text-xs sm:text-sm tracking-wider bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold transition-all flex items-center justify-center gap-2 box-glow-cyan"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>LAUNCH LIVE PROJECT DEMO</span>
                  </a>
                ) : (
                  <div className="w-full py-2.5 px-4 rounded-xl font-tech text-xs text-center text-cyan-300 bg-slate-900/90 border border-cyan-500/40 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="tracking-wider">LIVE DEMO: COMING SOON // DEPLOYMENT IN PROGRESS</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Corner Brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
