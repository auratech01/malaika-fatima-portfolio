import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  FileText,
  Download,
  Copy,
  Check,
  Printer
} from 'lucide-react';
import { soundManager } from './SoundEffects';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Google Drive URLs for Malaika Fatima's official verified resume
  const googleDriveViewUrl = "https://drive.google.com/file/d/1OTSpW_HUMv2l2U7_Xmti82TB81uKkn3T/view?usp=sharing";
  const googleDriveDownloadUrl = "https://drive.google.com/uc?export=download&id=1OTSpW_HUMv2l2U7_Xmti82TB81uKkn3T";

  const handleDownloadPDF = () => {
    soundManager.playClick();
    window.open(googleDriveDownloadUrl, '_blank');
  };

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  const plainTextResume = `MALAIKA FATIMA
Computer Science Student | AI & Game Development Enthusiast
Phone: +92 322 6898750 | Email: auratech1101@gmail.com | Location: Pakistan
GitHub: https://github.com/auratech01 | LinkedIn: https://linkedin.com/in/auratech01
Portfolio: https://auratech01.github.io/malaika-fatima-portfolio/

PROFESSIONAL SUMMARY
Computer Science undergraduate with hands-on experience building multi-threaded Python applications and interactive HTML5 Canvas-based web games. Comfortable combining practical software development with modern AI tools such as the Google Gemini API and computer-vision libraries like OpenCV. Seeking an internship or entry-level role in software development, applied AI, or game development.

EDUCATION
Bachelor of Science in Computer Science (BSCS) | Virtual University of Pakistan
Status: Currently in 7th Semester (2023 - Present) | CGPA: 3.72 / 4.00 (High Academic Merit)
Core Coursework: Object-Oriented Programming (C++), Data Structures, Database Management Systems (SQL), Web Technologies

TECHNICAL SKILLS
- Programming Languages: Python, JavaScript (ES6+), C++, SQL, HTML5, CSS3
- Web & Game Development: HTML5 Canvas (2D), Interactive Game Loops, 2D Physics & Collision Handling, Drag-and-Drop Mechanics, CSS 3D Transforms
- Frameworks & Libraries: CustomTkinter, Tkinter, OpenCV, Google Gemini API, Multi-Threading (Python)
- Developer Tools: VS Code, Git, GitHub Desktop, Cisco Packet Tracer, Linux (Ubuntu), Figma

FEATURED PROJECTS
1. Jade Lantern: Echoes of the Sun (Interactive Game)
   - 2D Canvas platformer featuring drag-and-drop slingshot mechanics, collision engines & light particles.
2. The Grand Birthday Experience (3D Interactive Web App)
   - Dynamic 3D perspective gallery, cinematic music sequencing & personalized web architecture.
3. Project Sentinel (Intelligent Python & AI Assistant)
   - Desktop AI assistant with Gemini API integration, camera vision support, multi-threaded operations.`;

  const handleCopyText = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(plainTextResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-950 border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden box-glow-cyan my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar - Clean, Minimalist, Rich Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-slate-900/95 border-b border-cyan-500/30 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-400/40">
              <FileText className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-xs sm:text-base text-white tracking-wide">
                MALAIKA FATIMA // RESUME
              </h3>
              <p className="text-[10px] sm:text-xs font-tech text-cyan-400/80">
                OFFICIAL VERIFIED CURRICULUM VITAE (CGPA 3.72)
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Copy Text Button */}
            <button
              onClick={handleCopyText}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-tech transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-950 border-emerald-400 text-emerald-300'
                  : 'bg-slate-900 border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white'
              }`}
              title="Copy plain-text resume to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED!' : 'COPY TEXT'}</span>
            </button>

            {/* Print / Save PDF Button */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-white text-xs font-tech transition-all cursor-pointer"
              title="Print or Save as PDF using browser print dialog"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">PRINT / SAVE PDF</span>
              <span className="sm:hidden">PRINT</span>
            </button>

            {/* Direct Google Drive Download */}
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-tech transition-all cursor-pointer box-glow-cyan shadow-md"
              title="Download the official PDF file directly from Google Drive"
            >
              <Download className="w-3.5 h-3.5 text-slate-950" />
              <span>DOWNLOAD PDF</span>
            </button>

            {/* View on Google Drive */}
            <a
              href={googleDriveViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white text-xs font-tech transition-all cursor-pointer"
              title="Open the official resume file on Google Drive in a new tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span>DRIVE</span>
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer ml-1"
              title="Close Resume"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Document Preview Area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-slate-950/95 scrollbar-thin scrollbar-thumb-cyan-500/30">
          <div className="max-w-3xl mx-auto bg-white text-slate-900 p-6 sm:p-10 rounded-lg shadow-2xl font-sans text-sm leading-relaxed border border-slate-200">
            
            {/* Header */}
            <div className="text-center border-b border-slate-300 pb-4 mb-5">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 uppercase">
                MALAIKA FATIMA
              </h1>
              <p className="text-sm font-semibold text-slate-700 mt-1">
                Computer Science Student | AI & Game Development Enthusiast
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-600 mt-2 font-mono">
                <span>+92 322 6898750</span>
                <span>•</span>
                <a href="mailto:auratech1101@gmail.com" className="hover:underline text-blue-700">auratech1101@gmail.com</a>
                <span>•</span>
                <span>Pakistan</span>
                <span>•</span>
                <a href="https://github.com/auratech01" target="_blank" rel="noreferrer" className="hover:underline text-blue-700">github.com/auratech01</a>
                <span>•</span>
                <a href="https://linkedin.com/in/auratech01" target="_blank" rel="noreferrer" className="hover:underline text-blue-700">linkedin.com/in/auratech01</a>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-xs text-slate-700 leading-normal">
                Computer Science undergraduate with hands-on experience building multi-threaded Python applications and interactive HTML5 Canvas-based web games. Comfortable combining practical software development with modern AI tools such as the Google Gemini API and computer-vision libraries like OpenCV. Seeking an internship or entry-level role in software development, applied AI, or game development to contribute, learn, and grow as a developer.
              </p>
            </div>

            {/* Education */}
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                EDUCATION
              </h2>
              <div className="flex justify-between items-start text-xs">
                <div>
                  <h3 className="font-bold text-slate-900">Bachelor of Science in Computer Science (BSCS)</h3>
                  <p className="text-slate-700 italic">Virtual University of Pakistan</p>
                  <p className="text-slate-800 font-semibold mt-0.5">Currently in 7th Semester | CGPA: 3.72</p>
                  <p className="text-slate-600 mt-0.5">
                    <span className="font-semibold text-slate-700">Core Coursework:</span> Object-Oriented Programming (C++), Database Management Systems (SQL), Web Systems & Technologies
                  </p>
                </div>
                <span className="text-slate-600 font-medium shrink-0">2023 – Present</span>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                TECHNICAL SKILLS
              </h2>
              <div className="space-y-1 text-xs text-slate-700">
                <p><strong className="text-slate-900 font-semibold">Programming Languages:</strong> Python, JavaScript (ES6+), C++, SQL, HTML5, CSS3</p>
                <p><strong className="text-slate-900 font-semibold">Web & Game Development:</strong> HTML5 Canvas (2D), Interactive Game Loops, 2D Physics & Collision Handling, Drag-and-Drop Mechanics, CSS 3D Transforms, DOM Manipulation</p>
                <p><strong className="text-slate-900 font-semibold">Frameworks & Libraries:</strong> CustomTkinter, Tkinter, OpenCV, Google Gemini API, Multi-Threading (Python)</p>
                <p><strong className="text-slate-900 font-semibold">Developer Tools:</strong> VS Code, Git, GitHub Desktop, Cisco Packet Tracer, Linux (Ubuntu), Figma</p>
              </div>
            </div>

            {/* Featured Projects */}
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                FEATURED PROJECTS
              </h2>
              
              {/* Project 1: Sentinel */}
              <div className="mb-3.5">
                <div className="flex justify-between items-baseline text-xs">
                  <h3 className="font-bold text-slate-900">
                    Project Sentinel — Desktop Security & Code-Auditing Application
                  </h3>
                  <span className="text-slate-600 italic">Personal Project, In Development</span>
                </div>
                <p className="text-[11px] text-slate-600 italic font-mono mb-1">
                  Python, CustomTkinter, OpenCV, Google Gemini API
                </p>
                <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-slate-700">
                  <li>Building a multi-threaded Python desktop application combining biometric Face ID authentication (OpenCV) with real-time system and network monitoring (CPU, RAM, network activity).</li>
                  <li>Developed an offline, pattern-based static code scanner for common vulnerability classes, with an optional Google Gemini API integration for deeper analysis and fix suggestions.</li>
                  <li>Designed a real-time face-recognition workflow with a PIN-based fallback and automated email alerts for unrecognized-user detection.</li>
                </ul>
              </div>

              {/* Project 2: Jade Lantern */}
              <div className="mb-3.5">
                <div className="flex justify-between items-baseline text-xs">
                  <h3 className="font-bold text-slate-900">
                    Jade Lantern — Interactive Restaurant Web Experience
                  </h3>
                </div>
                <p className="text-[11px] text-slate-600 italic font-mono mb-0.5">
                  HTML5, CSS3, Vanilla JavaScript
                </p>
                <p className="text-[11px] text-blue-700 mb-1">
                  Live Site: <a href="https://auratech01.github.io/jade-lantern-restaurant/" target="_blank" rel="noreferrer" className="underline font-mono">https://auratech01.github.io/jade-lantern-restaurant/</a>
                </p>
                <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-slate-700">
                  <li>Designed a fine-dining restaurant website with animated page sections and a custom 3D flip-book style interactive menu built using CSS 3D transforms.</li>
                  <li>Implemented a dynamic, JavaScript-driven menu system with fully responsive layouts and no external UI frameworks.</li>
                </ul>
              </div>

              {/* Project 3: Birthday Experience [Desktop Only] */}
              <div className="mb-2">
                <div className="flex justify-between items-baseline text-xs">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>Birthday Experience — Interactive 22-Level Web Game</span>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-1.5 py-0.5 rounded tracking-wide">
                      [DESKTOP ONLY]
                    </span>
                  </h3>
                </div>
                <p className="text-[11px] text-slate-600 italic font-mono mb-0.5">
                  HTML5 Canvas, JavaScript (ES6+), CSS3
                </p>
                <p className="text-[11px] text-blue-700 mb-1">
                  Live Site: <a href="https://auratech01.github.io/birthday-experience/" target="_blank" rel="noreferrer" className="underline font-mono">https://auratech01.github.io/birthday-experience/</a> <span className="text-slate-500 font-sans">(Desktop Only)</span>
                </p>
                <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-slate-700">
                  <li>Built a 22-level interactive escape-room-style web game (engineered exclusively for desktop displays) using vanilla JavaScript state management for level progression and screen transitions.</li>
                  <li>Implemented custom canvas-based mechanics, including physics-driven drag-and-drop mini-games and real-time particle animations (fireworks, confetti).</li>
                  <li>Deployed as a lightweight, dependency-free game directly to GitHub Pages.</li>
                </ul>
              </div>

            </div>

            {/* Independent Project Experience */}
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                INDEPENDENT PROJECT EXPERIENCE
              </h2>
              <div className="flex justify-between items-baseline text-xs mb-1">
                <h3 className="font-bold text-slate-900">
                  Self-Directed Software Developer — Personal & Academic Projects
                </h3>
                <span className="text-slate-600 font-medium shrink-0">2024 – Present</span>
              </div>
              <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-slate-700">
                <li>Developed responsive web applications, canvas-based rendering systems, and Python desktop tools independently and as part of academic coursework.</li>
                <li>Applied object-oriented programming principles in C++ and Python to build modular, maintainable code across multiple personal projects.</li>
              </ul>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                CERTIFICATIONS
              </h2>
              <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-slate-700">
                <li><strong>CCNA: Introduction to Networks</strong> — Cisco Networking Academy</li>
                <li><strong>CPA: Programming Essentials in C++</strong> — Cisco Networking Academy</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar - Clean and Simple */}
        <div className="px-4 sm:px-6 py-3 bg-slate-900/95 border-t border-cyan-500/30 flex items-center justify-between text-xs font-tech text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400">AUTHENTIC RESUME • GOOGLE DRIVE VERIFIED</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 hover:text-white cursor-pointer transition-all"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>DOWNLOAD PDF</span>
            </button>
            <a
              href={googleDriveViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300"
              title="Open original resume directly on Google Drive"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Google Drive</span>
            </a>
            <span>•</span>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
