import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Volume2, VolumeX, Terminal, Code2, Cpu, Sparkles, 
  Layers, ExternalLink, GraduationCap, Globe, Heart, 
  Compass, ArrowRight, Play, Eye, BookOpen, CheckCircle,
  Bot, Mail, Github, MessageSquare, Award, MessageCircle, Linkedin,
  FileText, Menu, Briefcase, AlertTriangle, Lightbulb, Check, Search, Zap
} from 'lucide-react';
import { CyberBackgroundCanvas } from './components/CyberBackgroundCanvas';
import { RobotDisplay } from './components/RobotDisplay';
import { ProjectModal } from './components/ProjectModal';
import { CyberAssistantModal } from './components/CyberAssistantModal';
import { ResumeModal } from './components/ResumeModal';
import { MobileNavDrawer } from './components/MobileNavDrawer';
import { CommandPalette } from './components/CommandPalette';
import { ContactSection } from './components/ContactSection';
import { ToolsAndCertificationsSection } from './components/ToolsAndCertificationsSection';
import { defaultPortfolioData } from './data';
import { soundManager } from './components/SoundEffects';
import { ProjectItem } from './types';

export default function App() {
  const [data] = useState(defaultPortfolioData);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeTab, setActiveTab] = useState('ABOUT');
  const [activeLabCode, setActiveLabCode] = useState<string>('lab_canvas_particles');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [recruiterMode, setRecruiterMode] = useState(false);

  // Global Ctrl+K / Cmd+K Command Palette Shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleSound = () => {
    soundManager.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
    soundManager.playClick();
  };

  const handleNavClick = (href: string, label: string) => {
    soundManager.playClick();
    setActiveTab(label);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProjectClick = (project: ProjectItem) => {
    soundManager.playClick();
    setSelectedProject(project);
  };

  const currentLab = data.labExperiments.find(l => l.id === activeLabCode) || data.labExperiments[0];

  return (
    <div className={`relative min-h-screen font-rajdhani overflow-x-hidden selection:bg-cyan-500 selection:text-black transition-colors duration-500 ${
      recruiterMode ? 'bg-[#0a0f18] text-slate-100' : 'bg-[#060a10] text-slate-100'
    }`}>
      {/* Background Cyber Canvas - Passes recruiterMode for calmer visual state */}
      <CyberBackgroundCanvas recruiterMode={recruiterMode} />

      {/* CRT Scanline overlay effect - disabled in recruiter mode for maximum clarity */}
      {!recruiterMode && (
        <div className="fixed inset-0 scanline-overlay z-10 pointer-events-none opacity-25" />
      )}

      {/* Top Header & Navigation Bar */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b px-3 sm:px-6 md:px-8 py-2.5 sm:py-3 flex items-center justify-between transition-colors ${
        recruiterMode 
          ? 'bg-slate-900/95 border-slate-700/80' 
          : 'bg-[#060a10]/90 border-cyan-500/30'
      }`}>
        
        {/* Brand / Logo */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); handleNavClick('#home', 'ABOUT'); }}
          className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer shrink-0 min-w-0"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center box-glow-cyan shadow-[0_0_10px_rgba(6,182,212,0.3)] shrink-0">
            <span className="font-orbitron font-bold text-cyan-300 text-xs sm:text-sm">MF</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-orbitron font-bold text-xs sm:text-sm tracking-wider text-white group-hover:text-cyan-300 transition-colors whitespace-nowrap">
              MALAIKA FATIMA
            </span>
            <span className="font-tech text-[9px] sm:text-[10px] text-cyan-400/80 hidden md:block whitespace-nowrap">
              FULL STACK & APPLIED AI
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links (Hidden on Mobile & Tablet to eliminate horizontal scrolling!) */}
        <nav className="hidden xl:flex items-center gap-2.5 2xl:gap-3.5 font-tech text-xs 2xl:text-sm tracking-wider py-1">
          {data.navigation.map((item, idx) => (
            <React.Fragment key={item.label}>
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href, item.label);
                }}
                onMouseEnter={() => soundManager.playHover()}
                className={`transition-all duration-200 hover:text-cyan-300 whitespace-nowrap ${
                  activeTab === item.label
                    ? 'text-cyan-400 text-glow-cyan font-bold border-b-2 border-cyan-400 pb-0.5'
                    : 'text-slate-400'
                }`}
              >
                {item.label}
              </a>
              {idx < data.navigation.length - 1 && (
                <span className="text-cyan-500/30 font-thin">|</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Top Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Formula 3: Corporate / Recruiter View Toggle (Desktop/Tablet) */}
          <button
            onClick={() => {
              soundManager.playClick();
              setRecruiterMode(!recruiterMode);
            }}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-tech transition-all cursor-pointer shrink-0 ${
              recruiterMode 
                ? 'bg-blue-600 border-blue-400 text-white font-bold shadow-md' 
                : 'bg-slate-900 border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-200'
            }`}
            title="Toggle Formal Corporate / Recruiter Executive Mode"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>{recruiterMode ? '👔 RECRUITER VIEW' : '👔 RECRUITER VIEW'}</span>
          </button>

          {/* Command Palette Quick Launcher (Ctrl+K) (Visible on Tablet & Desktop) */}
          <button
            onClick={() => {
              soundManager.playClick();
              setIsCommandPaletteOpen(true);
            }}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-200 text-xs font-tech transition-all cursor-pointer shrink-0"
            title="Open Command Palette & Quick Search (Ctrl + K / ⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-300">Quick</span>
            <kbd className="inline-block px-1.5 py-0.2 rounded bg-slate-950 border border-slate-800 text-[10px] text-cyan-400 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Formula 1: Instant 1-Click "Download / Print Official Resume" (PDF) Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              setIsResumeOpen(true);
            }}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-cyan-950/90 border border-cyan-400/70 hover:border-cyan-300 text-cyan-200 hover:text-white text-[11px] sm:text-xs font-orbitron font-semibold tracking-wider transition-all box-glow-cyan cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.25)] shrink-0"
            title="Instant 1-Click View, Download & Print Official Resume (PDF)"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>RESUME <span className="hidden sm:inline">(PDF)</span></span>
          </button>

          {/* AI Guide Quick Header Button (Desktop only) */}
          <button
            onClick={() => {
              soundManager.playClick();
              setIsAssistantOpen(true);
            }}
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white text-xs font-tech transition-all cursor-pointer shrink-0"
          >
            <Bot className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>ASK AURA</span>
          </button>

          {/* Audio toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => soundManager.playHover()}
            className="p-1.5 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all box-glow-cyan shrink-0"
            title={soundEnabled ? "Mute Audio" : "Enable Audio"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Mobile & Tablet Hamburger Menu Button (Matches Saad's portfolio modal style!) */}
          <button
            onClick={() => {
              soundManager.playClick();
              setIsMobileNavOpen(true);
            }}
            className="xl:hidden p-1.5 rounded-lg bg-cyan-950/90 border border-cyan-400/60 text-cyan-300 hover:text-white hover:border-cyan-300 transition-all cursor-pointer box-glow-cyan shrink-0"
            aria-label="Open navigation menu"
            title="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Recruiter Mode Active Banner */}
      {recruiterMode && (
        <div className="relative z-30 bg-blue-950/80 border-b border-blue-500/30 px-4 py-2 flex items-center justify-between text-xs font-tech text-blue-200">
          <div className="flex items-center gap-2 max-w-2xl">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>
              <strong>EXECUTIVE / RECRUITER MODE ACTIVE:</strong> High-readability corporate contrast, streamlined animations, and ATS-focused engineering presentation.
            </span>
          </div>
          <button
            onClick={() => setRecruiterMode(false)}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-blue-400/50 text-blue-300 hover:text-white text-[11px] font-bold"
          >
            SWITCH TO CYBER MODE
          </button>
        </div>
      )}

      {/* Main Container */}
      <main className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-20 space-y-28">
        
        {/* ===================================================================
            HERO SECTION (HOME)
           =================================================================== */}
        <section id="home" className="flex flex-col items-center justify-center text-center pt-2 sm:pt-6">
          
          {/* Top Tagline Pill */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 font-tech text-xs sm:text-sm text-cyan-300 tracking-wider box-glow-cyan"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>{data.tagline}</span>
          </motion.div>

          {/* Main Title: MALAIKA FATIMA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-1"
          >
            <h1 className="font-orbitron font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-wider text-white text-glow-bright uppercase">
              MALAIKA FATIMA
            </h1>
            <p className="font-orbitron font-semibold text-sm sm:text-lg md:text-xl tracking-widest text-cyan-400 text-glow-cyan uppercase max-w-2xl mx-auto">
              {data.subtitle}
            </p>
          </motion.div>

          {/* Floating Robot Centerpiece */}
          <RobotDisplay mediaConfig={data.robotMedia} recruiterMode={recruiterMode} />

          {/* Quick Action Interactive Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-4"
          >
            <button
              onClick={() => {
                soundManager.playClick();
                handleNavClick('#projects', 'PROJECTS');
              }}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-orbitron font-bold text-xs sm:text-sm tracking-wider transition-all box-glow-cyan cursor-pointer flex items-center gap-2"
            >
              <Layers className="w-4 h-4" />
              <span>EXPLORE PROJECTS</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setIsAssistantOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400/60 text-cyan-300 font-orbitron font-bold text-xs sm:text-sm tracking-wider transition-all box-glow-cyan cursor-pointer flex items-center gap-2"
            >
              <Bot className="w-4 h-4 animate-pulse text-cyan-300" />
              <span>TALK WITH AURA AI</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setIsResumeOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-cyan-950/90 hover:bg-cyan-900 border border-cyan-400/70 text-cyan-300 font-orbitron font-bold text-xs sm:text-sm tracking-wider transition-all box-glow-cyan cursor-pointer flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>VIEW / PRINT RESUME (PDF)</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                handleNavClick('#contact', 'CONTACT');
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500 text-slate-200 font-orbitron font-bold text-xs sm:text-sm tracking-wider transition-all cursor-pointer flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>CONTACT ME</span>
            </button>
          </motion.div>

        </section>

        {/* ===================================================================
            ABOUT ME SECTION (#about)
           =================================================================== */}
        <section id="about" className="space-y-8 scroll-mt-20">
          
          <div className="flex items-center gap-4">
            <h2 className="font-orbitron text-2xl sm:text-3xl font-extrabold text-white tracking-wider uppercase text-glow-cyan">
              ABOUT ME
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent" />
            <span className="font-tech text-xs text-cyan-400/80 hidden sm:inline">
              [ PROFILE & PURPOSE ]
            </span>
          </div>

          <div className="relative bg-slate-950/80 border border-cyan-500/40 rounded-2xl p-6 sm:p-10 box-glow-cyan overflow-hidden space-y-6">
            
            {/* Heart Core Quote */}
            <div className="border-l-4 border-cyan-400 pl-4 py-1">
              <p className="font-orbitron text-lg sm:text-xl font-bold text-cyan-300 italic text-glow-cyan">
                “{data.aboutQuote}”
              </p>
            </div>

            {/* Paragraphs */}
            <div className="space-y-4 font-rajdhani text-base sm:text-lg text-slate-200 leading-relaxed">
              {data.aboutParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Bottom Status Ribbon */}
            <div className="pt-4 border-t border-cyan-500/20 flex flex-wrap items-center justify-between text-xs font-tech text-cyan-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                STATUS: LEARNING & BUILDING CONTINUOUSLY
              </span>
              <span className="text-slate-400">AI • GAME DEV • WEB</span>
            </div>

            {/* Corner Decorative Ticks */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
          </div>

        </section>

        {/* ===================================================================
            EDUCATION SECTION (#education)
           =================================================================== */}
        <section id="education" className="space-y-8 scroll-mt-20">
          
          <div className="flex items-center gap-4">
            <h2 className="font-orbitron text-2xl sm:text-3xl font-extrabold text-white tracking-wider uppercase text-glow-cyan">
              EDUCATION
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent" />
            <span className="font-tech text-xs text-cyan-400/80 hidden sm:inline">
              [ ACADEMIC MATRIX ]
            </span>
          </div>

          <div className="relative bg-slate-950/80 border border-cyan-500/40 rounded-2xl p-6 sm:p-10 box-glow-cyan overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Degree and Institution */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-cyan-950 border border-cyan-400/60 text-cyan-400 box-glow-cyan">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-orbitron text-xl sm:text-2xl font-bold text-white tracking-wide">
                      {data.education.degree}
                    </h3>
                    <p className="font-tech text-sm sm:text-base text-cyan-300">
                      {data.education.institution}
                    </p>
                  </div>
                </div>

                <p className="font-rajdhani text-base text-slate-300 leading-relaxed">
                  {data.education.description}
                </p>
              </div>

              {/* Right Column: Progress HUD Meter */}
              <div className="lg:col-span-5 bg-slate-900/90 border border-cyan-500/30 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between font-tech text-xs sm:text-sm text-cyan-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="font-bold text-white tracking-wider">7TH SEMESTER STUDENT</span>
                  </div>
                  <span className="font-bold text-cyan-400 font-mono text-xs">
                    {data.education.completedSemesters} / {data.education.totalSemesters} SEMESTERS
                  </span>
                </div>

                {/* Progress Bar Container */}
                <div className="h-4 bg-slate-950 rounded-full border border-cyan-500/40 p-0.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(data.education.completedSemesters / data.education.totalSemesters) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-200 rounded-full box-glow-cyan"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-tech">
                  <span className="text-slate-300">6 SEMESTERS CLEARED (75%)</span>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/90 border border-emerald-400/60 text-emerald-300 font-bold box-glow-emerald">
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="tracking-wide">CGPA: {data.education.cgpa || '3.72 / 4.00'}</span>
                    <span className="text-[10px] text-emerald-400/80 font-normal ml-0.5">(HONORS)</span>
                  </div>
                </div>

                {/* Badges */}
                <div className="pt-2 flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded bg-cyan-950 border border-cyan-500/40 text-[11px] font-tech text-cyan-300">
                    ✓ OOP & C++
                  </span>
                  <span className="px-2.5 py-1 rounded bg-cyan-950 border border-cyan-500/40 text-[11px] font-tech text-cyan-300">
                    ✓ DATA STRUCTURES
                  </span>
                  <span className="px-2.5 py-1 rounded bg-cyan-950 border border-cyan-500/40 text-[11px] font-tech text-cyan-300">
                    ✓ DATABASE (SQL)
                  </span>
                  <span className="px-2.5 py-1 rounded bg-emerald-950/70 border border-emerald-500/40 text-[11px] font-tech text-emerald-300">
                    ★ 3.72 HIGH MERIT
                  </span>
                </div>
              </div>

            </div>

            {/* Corner Ticks */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
          </div>

        </section>

        {/* ===================================================================
            TECHNICAL SKILLS SECTION (#skills)
           =================================================================== */}
        <section id="skills" className="space-y-8 scroll-mt-20">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="font-orbitron text-2xl sm:text-3xl font-extrabold text-white tracking-wider uppercase text-glow-cyan">
                TECHNICAL SKILLS
              </h2>
              <div className="h-px w-24 sm:w-48 bg-gradient-to-r from-cyan-500/50 to-transparent" />
            </div>
            <span className="font-tech text-xs text-cyan-400 px-3 py-1 bg-cyan-950/60 border border-cyan-500/40 rounded-full box-glow-cyan">
              [ 4 CORE DOMAINS ]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.skillCategories.map((category) => (
              <div
                key={category.title}
                className={`relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:scale-102 ${
                  category.highlight
                    ? 'bg-gradient-to-b from-cyan-950/90 via-slate-950/90 to-slate-950 border-2 border-cyan-400 box-glow-cyan'
                    : 'bg-slate-950/80 border border-cyan-500/30 hover:border-cyan-400/60'
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4 border-b border-cyan-500/20 pb-3">
                    <h3 className="font-orbitron text-base font-bold text-white tracking-wide">
                      {category.title}
                    </h3>
                    {category.highlight ? (
                      <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
                    ) : (
                      <Code2 className="w-5 h-5 text-cyan-400/80" />
                    )}
                  </div>

                  {/* Skills Tag Pills */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-2.5 py-1 rounded-lg text-xs font-tech tracking-wider transition-colors ${
                          category.highlight
                            ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/50 font-bold'
                            : 'bg-slate-900 text-slate-200 border border-slate-700/60 hover:border-cyan-500/40 hover:text-cyan-300'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {category.highlight && (
                  <div className="mt-6 pt-3 border-t border-cyan-500/30 text-[11px] font-tech text-cyan-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span>ACTIVE RESEARCH & EXPERIMENTS</span>
                  </div>
                )}

                {/* Corner Ticks */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-400" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-400" />
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            TOOLS & CERTIFICATIONS SECTION (#tools)
           =================================================================== */}
        <ToolsAndCertificationsSection />

        {/* ===================================================================
            FEATURED PROJECTS SECTION (#projects)
           =================================================================== */}
        <section id="projects" className="space-y-8 scroll-mt-20">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="font-orbitron text-2xl sm:text-3xl font-extrabold text-white tracking-wider uppercase text-glow-cyan">
                FEATURED PROJECTS
              </h2>
              <div className="h-px w-24 sm:w-48 bg-gradient-to-r from-cyan-500/50 to-transparent" />
            </div>
            <span className="font-tech text-xs text-cyan-400 px-3 py-1 bg-cyan-950/60 border border-cyan-500/40 rounded-full box-glow-cyan">
              [ {data.projects.length} CREATIVE BUILDS ]
            </span>
          </div>

          {/* Projects Grid - Formula 2 & 4 Implementation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.projects.map((project) => (
              <div
                key={project.id}
                className="group relative bg-slate-950/90 border border-cyan-500/40 rounded-2xl overflow-hidden hover:border-cyan-300 transition-all duration-300 box-glow-cyan flex flex-col justify-between"
              >
                <div>
                  {/* Project Image Banner */}
                  <div 
                    onClick={() => handleProjectClick(project)}
                    className="relative h-48 sm:h-52 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-500"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-cyan-950/90 border border-cyan-400/50 text-[10px] font-tech text-cyan-300 tracking-wider box-glow-cyan">
                      {project.category}
                    </div>

                    {/* Quick Inspect Hover Overlay */}
                    <div className="absolute inset-0 bg-cyan-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-cyan-300 font-tech text-xs font-bold tracking-widest">
                      <Eye className="w-4 h-4" />
                      <span>INSPECT ARCHITECTURE SPEC</span>
                    </div>
                  </div>

                  {/* Project Info - Structured Formula */}
                  <div className="p-5 space-y-3.5">
                    <div>
                      <h3 className="font-orbitron text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>
                      {project.subtitle && (
                        <p className="font-tech text-xs text-cyan-400/80">
                          {project.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Problem ➔ Solution Structure */}
                    <div className="space-y-2 text-xs">
                      {project.problem && (
                        <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/30">
                          <div className="flex items-center gap-1.5 font-tech font-bold text-[10px] text-amber-400 uppercase tracking-wider mb-0.5">
                            <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                            <span>The Problem:</span>
                          </div>
                          <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed font-rajdhani">
                            {project.problem}
                          </p>
                        </div>
                      )}

                      {project.technicalChallenge && (
                        <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30">
                          <div className="flex items-center gap-1.5 font-tech font-bold text-[10px] text-cyan-300 uppercase tracking-wider mb-0.5">
                            <Lightbulb className="w-3 h-3 text-cyan-400 shrink-0" />
                            <span>Technical Solution:</span>
                          </div>
                          <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed font-rajdhani">
                            {project.technicalChallenge}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Engineering Performance Proof Badges */}
                    {project.metrics && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/40 text-[10px] font-tech font-bold text-emerald-300">
                          <Zap className="w-3 h-3 text-emerald-400" />
                          <span>{project.metrics.lighthouse}</span>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/40 text-[10px] font-tech text-cyan-300">
                          <span>⚡ {project.metrics.fps}</span>
                        </div>
                        <div className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700/80 text-[10px] font-tech text-slate-300">
                          {project.metrics.performanceTag}
                        </div>
                      </div>
                    )}

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-tech text-cyan-200"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-tech text-slate-400">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer - Formula 4: GitHub Source Code + Live Demo Buttons */}
                <div className="p-5 pt-0 flex items-center gap-2">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-orbitron font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                      title="Open Live Deployment"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>LIVE DEMO</span>
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-cyan-300 transition-all flex items-center gap-1.5"
                      title="View GitHub Repository Source Code"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span className="text-xs font-tech font-bold tracking-wider">CODE</span>
                    </a>
                  )}

                  <button
                    onClick={() => handleProjectClick(project)}
                    className="px-3 py-2 rounded-xl bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-500/40 hover:border-cyan-300 text-cyan-300 text-xs font-tech tracking-wider transition-all flex items-center justify-center gap-1"
                    title="Inspect Full Project Architecture Spec"
                  >
                    <span>SPEC</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
              </div>
            ))}
          </div>

        </section>

        {/* ===================================================================
            LEARNING JOURNEY SECTION (#journey)
           =================================================================== */}
        <section id="journey" className="space-y-8 scroll-mt-20">
          
          <div className="flex items-center gap-4">
            <h2 className="font-orbitron text-2xl sm:text-3xl font-extrabold text-white tracking-wider uppercase text-glow-cyan">
              WHAT I'M LEARNING
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent" />
            <span className="font-tech text-xs text-cyan-400/80 hidden sm:inline">
              [ EXPERIMENTATION // LAB ]
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-950/80 border border-cyan-500/40 rounded-2xl p-6 space-y-4 box-glow-cyan">
                <div className="flex items-center gap-2 font-tech text-xs text-cyan-400">
                  <Terminal className="w-4 h-4" />
                  <span>CURIOSITY & EXPERIMENTATION PROTOCOL</span>
                </div>
                <p className="font-rajdhani text-base text-slate-300 leading-relaxed">
                  {data.learningJourneyText}
                </p>
              </div>

              {/* Lab Selector Tabs */}
              <div className="space-y-2">
                <div className="font-tech text-xs text-slate-400 tracking-wider">
                  SELECT INTERACTIVE CODE LAB:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {data.labExperiments.map((lab) => (
                    <button
                      key={lab.id}
                      onClick={() => {
                        soundManager.playClick();
                        setActiveLabCode(lab.id);
                      }}
                      onMouseEnter={() => soundManager.playHover()}
                      className={`p-3 rounded-xl border text-left font-tech transition-all text-xs ${
                        activeLabCode === lab.id
                          ? 'bg-cyan-950/90 border-cyan-400 text-cyan-200 box-glow-cyan font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-cyan-500/40 hover:text-cyan-300'
                      }`}
                    >
                      <div className="truncate">{lab.title}</div>
                      <div className="text-[10px] text-cyan-400/70 truncate">{lab.language}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Interactive Code Terminal */}
            <div className="lg:col-span-7 bg-slate-950/95 border border-cyan-500/40 rounded-2xl overflow-hidden box-glow-cyan">
              
              {/* Terminal Top Window Bar */}
              <div className="bg-slate-900/90 border-b border-cyan-500/30 px-4 py-3 flex items-center justify-between font-tech text-xs text-cyan-400">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  </div>
                  <span className="ml-2 font-mono text-[11px] text-slate-300">
                    ~/experiments/{currentLab.id}.ts
                  </span>
                </div>
                <span className="text-[10px] text-cyan-300/80">
                  {currentLab.language}
                </span>
              </div>

              {/* Lab Description */}
              <div className="p-4 border-b border-slate-800 bg-slate-900/40">
                <p className="font-rajdhani text-sm text-cyan-200">
                  {currentLab.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {currentLab.tags.map((tag) => (
                    <span key={tag} className="text-[9px] font-tech px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="p-4 font-mono text-xs text-cyan-300 bg-black/80 overflow-x-auto max-h-80 leading-relaxed">
                <pre>{currentLab.codeSnippet}</pre>
              </div>

            </div>

          </div>

        </section>

        {/* ===================================================================
            MY PHILOSOPHY SECTION (#philosophy)
           =================================================================== */}
        <section id="philosophy" className="space-y-8 scroll-mt-20">
          
          <div className="flex items-center gap-4">
            <h2 className="font-orbitron text-2xl sm:text-3xl font-extrabold text-white tracking-wider uppercase text-glow-cyan">
              MY PHILOSOPHY ❤️
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent" />
            <span className="font-tech text-xs text-cyan-400/80 hidden sm:inline">
              [ CORE_BELIEF_SYSTEM ]
            </span>
          </div>

          <div className="relative bg-gradient-to-b from-cyan-950/40 via-slate-950/80 to-slate-950 border-2 border-cyan-400/70 rounded-3xl p-8 sm:p-12 text-center box-glow-cyan-lg overflow-hidden">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              
              <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-950 border border-cyan-400 flex items-center justify-center box-glow-cyan">
                <Heart className="w-8 h-8 text-cyan-400 animate-pulse" />
              </div>

              <h3 className="font-orbitron text-2xl sm:text-4xl font-extrabold text-white text-glow-bright tracking-wide">
                “{data.philosophy.mainQuote}”
              </h3>

              <p className="font-rajdhani text-lg sm:text-xl text-slate-200 leading-relaxed">
                {data.philosophy.bodyText}
              </p>

              <div className="pt-4">
                <div className="inline-block px-6 py-3 rounded-2xl bg-slate-900/90 border border-cyan-400/60 font-tech text-sm sm:text-base text-cyan-300 tracking-widest box-glow-cyan">
                  ✨ {data.philosophy.heartQuote}
                </div>
              </div>

            </div>

            {/* Corner HUD Ticks */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400" />
          </div>

        </section>

        {/* ===================================================================
            CONTACT SECTION (#contact)
           =================================================================== */}
        <ContactSection onOpenAssistant={() => setIsAssistantOpen(true)} />

      </main>

      {/* Floating Cyber AI Beacon Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            soundManager.playClick();
            setIsAssistantOpen(true);
          }}
          className="relative group flex items-center gap-3 px-4 py-3 rounded-full bg-slate-950/95 border-2 border-cyan-400 text-white box-glow-cyan hover:scale-105 transition-all cursor-pointer shadow-2xl"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/30 border border-cyan-300 text-cyan-200">
            <Bot className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div className="text-left font-tech pr-1 hidden sm:block">
            <div className="text-xs font-bold text-cyan-300">AURA AI GUIDE</div>
            <div className="text-[10px] text-cyan-500/80">Click to ask questions</div>
          </div>
        </button>
      </div>

      {/* Footer */}
      <footer className="relative z-20 border-t border-cyan-500/20 bg-[#060a10] py-8 text-center font-tech text-xs text-slate-400 space-y-4">
        {/* Quick Contact Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 px-4">
          <a
            href={data.contact.whatsappUrl || "https://wa.me/923226898750"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/80 hover:scale-105 transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp: {data.contact.whatsappDisplay || '+92 322 6898750'}</span>
          </a>

          <a
            href={`mailto:${data.contact.email}`}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/60 hover:scale-105 transition-all"
          >
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>{data.contact.email}</span>
          </a>

          <a
            href={data.contact.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-cyan-300 hover:border-cyan-400 hover:scale-105 transition-all"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub: @{data.contact.githubUsername}</span>
          </a>

          {data.contact.linkedinUrl && (
            <a
              href={data.contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-300 hover:bg-blue-900/80 hover:text-white hover:border-blue-400 hover:scale-105 transition-all"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-400" />
              <span>LinkedIn: @auratech01</span>
            </a>
          )}
        </div>

        <div className="text-cyan-400 font-bold tracking-widest">
          {data.copyrightText}
        </div>
        <p className="text-slate-500">
          DESIGNED WITH CYBERNETIC PRECISION & INTERACTIVE PASSION • VIRTUAL UNIVERSITY OF PAKISTAN
        </p>
      </footer>

      {/* Project Modal Inspector */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Cyber AI Assistant Modal */}
      <CyberAssistantModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
        onSelectProject={(projectId) => {
          const p = data.projects.find(x => x.id === projectId);
          if (p) setSelectedProject(p);
        }}
      />

      {/* Official Resume / CV Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Mobile Navigation Drawer (Saad Portfolio Style - No horizontal scrolling) */}
      <MobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        activeTab={activeTab}
        onNavigate={handleNavClick}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        recruiterMode={recruiterMode}
        onToggleRecruiterMode={() => setRecruiterMode(!recruiterMode)}
      />

      {/* Command Palette (Ctrl+K / ⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={handleNavClick}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        recruiterMode={recruiterMode}
        onToggleRecruiterMode={() => setRecruiterMode(!recruiterMode)}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onSelectProject={(projectId) => {
          const p = data.projects.find(x => x.id === projectId);
          if (p) setSelectedProject(p);
        }}
      />
    </div>
  );
}
