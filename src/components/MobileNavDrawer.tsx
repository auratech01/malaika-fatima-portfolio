import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, Send, Bot, Sparkles, Briefcase, Volume2, VolumeX, ShieldCheck, Search } from 'lucide-react';
import { soundManager } from './SoundEffects';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (href: string, label: string) => void;
  onOpenResume: () => void;
  onOpenAssistant: () => void;
  onOpenCommandPalette?: () => void;
  recruiterMode: boolean;
  onToggleRecruiterMode: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  activeTab: string;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenResume,
  onOpenAssistant,
  onOpenCommandPalette,
  recruiterMode,
  onToggleRecruiterMode,
  soundEnabled,
  onToggleSound,
  activeTab
}) => {
  const navItems = [
    { label: 'ABOUT', href: '#home', display: 'Profile' },
    { label: 'SKILLS', href: '#skills', display: 'Skills' },
    { label: 'PROJECTS', href: '#projects', display: 'Projects' },
    { label: 'TOOLS', href: '#tools', display: 'Tools & Workflow' },
    { label: 'JOURNEY', href: '#journey', display: 'Education & Path' },
    { label: 'PHILOSOPHY', href: '#philosophy', display: 'Philosophy' },
    { label: 'CONTACT', href: '#contact', display: 'Contact' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md xl:hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.22 }}
            className={`w-full max-w-sm rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[92vh] ${
              recruiterMode 
                ? 'bg-slate-900 border-slate-700 text-slate-100' 
                : 'bg-[#080d16] border-cyan-500/50 text-white box-glow-cyan'
            }`}
          >
            {/* Header: User Info & Close Button (Matching Saad's style) */}
            <div className="p-4 border-b border-cyan-500/20 flex items-center justify-between bg-slate-950/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/90 border border-cyan-400 flex items-center justify-center font-orbitron font-bold text-cyan-300 text-base shadow-[0_0_12px_rgba(6,182,212,0.4)]">
                  MF
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-orbitron font-bold text-sm tracking-wide text-white">
                      Malaika Fatima
                    </span>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-400/60 text-[9px] font-tech text-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      AVAILABLE
                    </span>
                  </div>
                  <p className="font-tech text-[11px] text-cyan-400/90">
                    Full Stack & AI Developer
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-400 hover:text-white"
                title="Close Navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Middle Section: Scrollable Content */}
            <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar flex-1">
              
              {/* Quick Settings Bar: Recruiter View & Audio */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-tech">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onToggleRecruiterMode();
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                    recruiterMode 
                      ? 'bg-blue-600 text-white font-bold' 
                      : 'bg-slate-900 text-slate-300 hover:text-cyan-300'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>{recruiterMode ? '👔 Executive View ON' : '👔 Switch to Recruiter View'}</span>
                </button>

                <button
                  onClick={() => {
                    onToggleSound();
                  }}
                  className="p-1.5 rounded-lg bg-slate-900 text-cyan-400 border border-slate-800"
                  title="Toggle Sound"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
                </button>
              </div>

              {/* 2-Column Clean Link Grid (Just like Saad's mobile view!) */}
              <div className="grid grid-cols-2 gap-2 font-tech text-xs tracking-wider">
                {navItems.map((item) => {
                  const isActive = activeTab === item.label;
                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        onNavigate(item.href, item.label);
                        onClose();
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_10px_rgba(6,182,212,0.25)]'
                          : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-cyan-500/50 hover:text-white'
                      }`}
                    >
                      <span>{item.display}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Two Prominent Action Buttons (Matching Saad's style) */}
              <div className="space-y-2 pt-1">
                {/* 1. View & Print Official Resume Button */}
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onClose();
                    onOpenResume();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-cyan-950/90 hover:bg-cyan-900 border border-cyan-400/80 text-cyan-200 font-orbitron font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 box-glow-cyan cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>VIEW & PRINT OFFICIAL RESUME</span>
                </button>

                {/* 2. Contact / Get In Touch Button */}
                <button
                  onClick={() => {
                    onNavigate('#contact', 'CONTACT');
                    onClose();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-orbitron font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>GET IN TOUCH / CONTACT</span>
                </button>

                {/* 3. Command Palette & Ask Aura AI Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onClose();
                      if (onOpenCommandPalette) onOpenCommandPalette();
                    }}
                    className="py-2 px-3 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 font-tech text-xs tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5 text-cyan-400" />
                    <span>COMMAND (⌘K)</span>
                  </button>

                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onClose();
                      onOpenAssistant();
                    }}
                    className="py-2 px-3 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white font-tech text-xs tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Bot className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>ASK AURA AI</span>
                  </button>
                </div>
              </div>

              {/* Bio Summary at Bottom (Just like Saad's) */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] font-rajdhani text-slate-400 leading-relaxed">
                Dedicated Computer Science student with practical hands-on experience in <span className="text-cyan-300 font-semibold">C++, Python, React, and Applied AI</span>. Passionate about building interactive systems and robust full-stack software.
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
