import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  FileText, 
  Layers, 
  Cpu, 
  Bot, 
  Mail, 
  Linkedin, 
  Github, 
  Briefcase, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  ExternalLink,
  Command,
  CornerDownLeft,
  X
} from 'lucide-react';
import { defaultPortfolioData } from '../data';
import { soundManager } from './SoundEffects';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (href: string, label: string) => void;
  onOpenResume: () => void;
  onOpenAssistant: () => void;
  recruiterMode: boolean;
  onToggleRecruiterMode: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onSelectProject?: (projectId: string) => void;
}

interface CommandItem {
  id: string;
  category: 'Navigation' | 'Actions' | 'Projects' | 'Social';
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenResume,
  onOpenAssistant,
  recruiterMode,
  onToggleRecruiterMode,
  soundEnabled,
  onToggleSound,
  onSelectProject
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  const commands: CommandItem[] = [
    {
      id: 'resume',
      category: 'Actions',
      title: 'View & Download Official Resume (PDF)',
      subtitle: 'ATS-friendly official CV with 1-click print and direct download',
      icon: <FileText className="w-4 h-4 text-cyan-400" />,
      shortcut: 'PDF',
      action: () => {
        onOpenResume();
        onClose();
      }
    },
    {
      id: 'ask-aura',
      category: 'Actions',
      title: 'Launch Aura AI Portfolio Assistant',
      subtitle: 'Interactive AI companion answering questions about skills & background',
      icon: <Bot className="w-4 h-4 text-emerald-400" />,
      shortcut: 'AI',
      action: () => {
        onOpenAssistant();
        onClose();
      }
    },
    {
      id: 'recruiter-mode',
      category: 'Actions',
      title: recruiterMode ? 'Switch to Cyber Sci-Fi Mode' : 'Switch to Executive / Recruiter View',
      subtitle: 'Toggles between high-readability corporate contrast and cyber aesthetic',
      icon: <Briefcase className="w-4 h-4 text-blue-400" />,
      shortcut: 'MODE',
      action: () => {
        onToggleRecruiterMode();
        onClose();
      }
    },
    {
      id: 'nav-projects',
      category: 'Navigation',
      title: 'Jump to Featured Projects',
      subtitle: 'Jade Lantern, Birthday Experience, Project Sentinel',
      icon: <Layers className="w-4 h-4 text-cyan-400" />,
      shortcut: 'PROJ',
      action: () => {
        onNavigate('#projects', 'PROJECTS');
        onClose();
      }
    },
    {
      id: 'nav-skills',
      category: 'Navigation',
      title: 'Jump to Technical Skills & Lab',
      subtitle: 'C++, Python, HTML5 Canvas, TypeScript, Interactive Experiments',
      icon: <Cpu className="w-4 h-4 text-purple-400" />,
      shortcut: 'SKILLS',
      action: () => {
        onNavigate('#skills', 'SKILLS');
        onClose();
      }
    },
    {
      id: 'nav-about',
      category: 'Navigation',
      title: 'Jump to About Malaika & Philosophy',
      subtitle: 'Computer Science background at Virtual University of Pakistan',
      icon: <ArrowRight className="w-4 h-4 text-cyan-400" />,
      shortcut: 'ABOUT',
      action: () => {
        onNavigate('#about', 'ABOUT');
        onClose();
      }
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      title: 'Jump to Contact Section',
      subtitle: 'Email, WhatsApp Business, LinkedIn, GitHub direct connect',
      icon: <Mail className="w-4 h-4 text-amber-400" />,
      shortcut: 'CONTACT',
      action: () => {
        onNavigate('#contact', 'CONTACT');
        onClose();
      }
    },
    {
      id: 'proj-jade',
      category: 'Projects',
      title: 'Jade Lantern Restaurant (Live Web Experience)',
      subtitle: 'Interactive 3D flipbook menu & responsive canvas atmosphere',
      icon: <Layers className="w-4 h-4 text-cyan-400" />,
      action: () => {
        if (onSelectProject) onSelectProject('jade_lantern');
        else window.open('https://auratech01.github.io/jade-lantern-restaurant/', '_blank');
        onClose();
      }
    },
    {
      id: 'proj-birthday',
      category: 'Projects',
      title: 'Birthday Experience (Canvas 2D Physics)',
      subtitle: '22 unlockable levels, real-time particle mechanics, audio daemons',
      icon: <Layers className="w-4 h-4 text-pink-400" />,
      action: () => {
        if (onSelectProject) onSelectProject('birthday_experience');
        else window.open('https://auratech01.github.io/birthday-experience/', '_blank');
        onClose();
      }
    },
    {
      id: 'social-linkedin',
      category: 'Social',
      title: 'Connect on LinkedIn',
      subtitle: 'linkedin.com/in/auratech01',
      icon: <Linkedin className="w-4 h-4 text-blue-400" />,
      shortcut: 'LINK',
      action: () => {
        window.open('https://www.linkedin.com/in/auratech01', '_blank');
        onClose();
      }
    },
    {
      id: 'social-github',
      category: 'Social',
      title: 'Visit GitHub Profile & Repositories',
      subtitle: 'github.com/auratech01',
      icon: <Github className="w-4 h-4 text-slate-300" />,
      shortcut: 'GIT',
      action: () => {
        window.open('https://github.com/auratech01', '_blank');
        onClose();
      }
    },
    {
      id: 'toggle-sound',
      category: 'Actions',
      title: soundEnabled ? 'Mute Cyber Audio Effects' : 'Enable Cyber Audio Effects',
      subtitle: 'Interactive sound feedback for clicks and UI triggers',
      icon: soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />,
      shortcut: 'MUTE',
      action: () => {
        onToggleSound();
        onClose();
      }
    }
  ];

  const filteredCommands = commands.filter((cmd) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(q) ||
      (cmd.subtitle && cmd.subtitle.toLowerCase().includes(q)) ||
      cmd.category.toLowerCase().includes(q) ||
      (cmd.shortcut && cmd.shortcut.toLowerCase().includes(q))
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      soundManager.playHover();
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      soundManager.playHover();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        soundManager.playClick();
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
          />

          {/* Palette Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl bg-slate-950 border border-cyan-500/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 box-glow-cyan"
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 bg-slate-900/90 border-b border-cyan-500/30">
              <Search className="w-5 h-5 text-cyan-400 shrink-0 animate-pulse" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command, project, or shortcut (e.g. resume, projects, skills)..."
                className="flex-1 bg-transparent text-sm sm:text-base text-cyan-100 placeholder-slate-500 focus:outline-none font-tech"
              />
              <button
                onClick={onClose}
                className="p-1 rounded text-slate-400 hover:text-cyan-300 transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List of Actions */}
            <div 
              ref={listRef}
              className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-900/60 font-tech scrollbar-thin scrollbar-thumb-cyan-500/20"
            >
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-slate-500 text-xs">
                  No matching commands found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={cmd.id}
                      onClick={() => {
                        soundManager.playClick();
                        cmd.action();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-cyan-950/80 border border-cyan-400/50 text-white translate-x-1 box-glow-cyan'
                          : 'text-slate-300 hover:bg-slate-900/80 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-2 rounded-lg ${
                          isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-900 text-slate-400'
                        }`}>
                          {cmd.icon}
                        </div>
                        <div className="truncate">
                          <div className="font-orbitron font-semibold text-xs sm:text-sm tracking-wide text-cyan-100">
                            {cmd.title}
                          </div>
                          {cmd.subtitle && (
                            <div className="text-[11px] text-slate-400 truncate">
                              {cmd.subtitle}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        {cmd.shortcut && (
                          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] text-cyan-400 tracking-wider">
                            {cmd.shortcut}
                          </span>
                        )}
                        {isSelected && (
                          <CornerDownLeft className="w-3.5 h-3.5 text-cyan-400 hidden sm:block" />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Navigation Hints */}
            <div className="px-4 py-2 bg-slate-900/80 border-t border-cyan-500/20 flex items-center justify-between text-[11px] font-tech text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-[9px] text-cyan-300">↑↓</kbd> to navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-[9px] text-cyan-300">↵</kbd> to select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-[9px] text-cyan-300">esc</kbd> to close
                </span>
              </div>
              <span className="hidden sm:inline text-cyan-400/70 font-semibold">
                MALAIKA FATIMA • SYSTEM COMMAND
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
