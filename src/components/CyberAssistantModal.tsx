import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Terminal, 
  User, 
  ChevronRight, 
  ExternalLink,
  Code2,
  Mail,
  Briefcase,
  Award,
  Zap
} from 'lucide-react';
import { defaultPortfolioData } from '../data';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  quickLinks?: { label: string; url?: string; action?: () => void }[];
}

interface CyberAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
  onOpenResume?: () => void;
}

export const CyberAssistantModal: React.FC<CyberAssistantModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onOpenResume
}) => {
  const data = defaultPortfolioData;
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Greetings! I am AURA_CORE v2.5, Malaika Fatima's intelligent portfolio ambassador.\n\nI am configured with full knowledge of her Virtual University CS degree, canvas engineering feats, and technical projects. Feel free to ask anything or use the 1-Click Recruiter buttons above!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickLinks: [
        { label: '💼 Why Hire Malaika?' },
        { label: '⚡ Technical Feats' },
        { label: '🚀 Explore Projects' },
        { label: '🎓 Education & CGPA' },
        { label: '📬 Contact Info' }
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const generateAnswer = (query: string): { text: string; quickLinks?: { label: string; url?: string }[] } => {
    const q = query.toLowerCase();

    // 1. RECRUITER PITCH: Why Hire Malaika?
    if (q.includes('why') && (q.includes('hire') || q.includes('choose') || q.includes('team') || q.includes('join') || q.includes('fayda') || q.includes('kion'))) {
      return {
        text: `Here is the executive case for hiring Malaika Fatima:\n\n1. 🧠 **Solid CS Fundamentals:** Virtual University BS Computer Science (3.72/4.00 CGPA) with rigorous foundations in C++, algorithms, data structures, and Cisco certified in C++ & Networks.\n2. ⚡ **Proven Production Craftsmanship:** Unlike typical junior candidates who only follow simple templates, Malaika engineers raw HTML5 Canvas physics systems, real-time particle mechanics, and 3D web interfaces completely from scratch.\n3. 🚀 **High Speed of Learning & Adaptability:** Rapidly implements modern production workflows (React, TypeScript, Tailwind, Python, Git, applied AI integration).\n4. 💡 **User-Centric Performance Mindset:** Passionate about zero-lag performance (60 FPS, optimized bundle sizes, seamless mobile responsiveness).\n\nShe is ready to deliver immediate value as a Software Engineer, Frontend Engineer, or Creative Technologist!`,
        quickLinks: [
          { label: '📄 View Official Resume (PDF)' },
          { label: '💼 Connect on LinkedIn', url: 'https://www.linkedin.com/in/auratech01' },
          { label: '💬 Chat on WhatsApp', url: 'https://wa.me/923226898750?text=Hi%20Malaika,%20we%20reviewed%20your%20portfolio%20and%20would%20like%20to%20interview%20you!' },
          { label: '🏮 Inspect Jade Lantern' },
          { label: '🎂 Inspect Birthday Experience' }
        ]
      };
    }

    // 2. TECHNICAL ACHIEVEMENTS & COMPLEX FEATS
    if (q.includes('complex') || q.includes('feat') || q.includes('challenge') || q.includes('achievement') || q.includes('mushkil') || q.includes('technical')) {
      return {
        text: `Malaika's standout technical engineering achievements:\n\n1. 🎂 **Birthday Experience Canvas Engine:**\n- Engineered 22 custom interactive levels running on a raw HTML5 Canvas loop.\n- Optimized real-time particle physics maintaining solid 60 FPS without frame drops on both mobile and desktop.\n- Built custom memory daemons and audio API event synchronization.\n\n2. 🏮 **Jade Lantern 3D Experience:**\n- Built an interactive page-turn flipbook with zero external canvas bloat.\n- Integrated ambient mood shifts, responsive layout physics, and seamless DOM state updates.\n\n3. 🛡️ **Project Sentinel (AI Security HUD):**\n- Simulated real-time anomaly detection, threat visualization, and modular system diagnostics.\n\nBoth builds prove her ability to tackle real low-level browser performance constraints!`,
        quickLinks: [
          { label: '🏮 Jade Lantern Live Demo', url: 'https://auratech01.github.io/jade-lantern-restaurant/' },
          { label: '🎂 Birthday Experience Live Demo', url: 'https://auratech01.github.io/birthday-experience/' },
          { label: '🐙 View Code on GitHub', url: 'https://github.com/auratech01' }
        ]
      };
    }

    // 3. Projects
    if (q.includes('project') || q.includes('build') || q.includes('work') || q.includes('kam') || q.includes('jade') || q.includes('birthday') || q.includes('sentinel')) {
      return {
        text: `Malaika has built 3 flagship interactive & AI-inspired projects:\n\n1. 🏮 **Jade Lantern** — Thai & Chinese fine dining web experience featuring a 3D interactive flip-book menu and animated hero section.\n2. 🎂 **Birthday Experience** — Digital memory journey built with Canvas 2D featuring 22 unlockable levels & mini-games.\n3. 🛡️ **Project Sentinel** — AI-powered autonomous cyber defense & anomaly detection command center.\n\nAll projects emphasize code as an emotional, interactive experience!`,
        quickLinks: [
          { label: '🏮 Jade Lantern Live Demo', url: 'https://auratech01.github.io/jade-lantern-restaurant/' },
          { label: '🎂 Birthday Experience Live Demo', url: 'https://auratech01.github.io/birthday-experience/' },
          { label: '🐙 GitHub Profile', url: 'https://github.com/auratech01' }
        ]
      };
    }

    // 4. Contact
    if (q.includes('contact') || q.includes('email') || q.includes('linkedin') || q.includes('whatsapp') || q.includes('phone') || q.includes('number') || q.includes('call') || q.includes('hire') || q.includes('rabta') || q.includes('github') || q.includes('reach') || q.includes('message')) {
      return {
        text: `You can connect with Malaika Fatima directly across her professional channels:\n\n💼 **LinkedIn:** linkedin.com/in/auratech01\n💬 **WhatsApp Business:** +92 322 6898750\n📧 **Email:** auratech1101@gmail.com\n🐙 **GitHub:** github.com/auratech01\n⚡ **Status:** Open for internships, software engineering roles, and high-impact tech collaborations!`,
        quickLinks: [
          { label: '💼 Connect on LinkedIn', url: 'https://www.linkedin.com/in/auratech01' },
          { label: '💬 Chat on WhatsApp', url: 'https://wa.me/923226898750?text=Hi%20Malaika,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20connect!' },
          { label: '📧 Send Email', url: 'mailto:auratech1101@gmail.com' },
          { label: '🐙 Visit GitHub', url: 'https://github.com/auratech01' }
        ]
      };
    }

    // 5. Skills & Tools
    if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('tool') || q.includes('language') || q.includes('c++') || q.includes('python') || q.includes('vs code')) {
      return {
        text: `Here is Malaika's active technical toolkit:\n\n💻 **Core Languages:** C++, Python, TypeScript, JavaScript (ES6+), SQL\n🌐 **Web & Creative:** HTML5 Canvas, React, Tailwind CSS, DOM Manipulation, 3D Web UI, Interactive Animations\n🛠️ **Dev Workflow:** VS Code, Git & GitHub Desktop, Linux (Ubuntu), Figma\n✨ **Exploring:** Artificial Intelligence, Game Mechanics, Cybersecurity & Neural Networks.`,
        quickLinks: [
          { label: '⚡ View Interactive Lab' },
          { label: '📄 View Official Resume (PDF)' }
        ]
      };
    }

    // 6. Education
    if (q.includes('education') || q.includes('degree') || q.includes('university') || q.includes('semester') || q.includes('vu') || q.includes('study') || q.includes('padhai') || q.includes('cgpa')) {
      return {
        text: `🎓 **Education & Certifications Profile:**\n- **Degree:** Bachelor's in Computer Science (BSCS)\n- **Institution:** Virtual University of Pakistan\n- **Current Progress:** 7th Semester (6 Semesters Cleared with an impressive 3.72 / 4.00 CGPA)\n- **Certifications:** Cisco CPA (Programming Essentials in C++) & Cisco CCNA (Introduction to Networks)`,
        quickLinks: [
          { label: '📜 View Education Section' },
          { label: '📄 View Official Resume (PDF)' }
        ]
      };
    }

    // 7. Philosophy / About
    if (q.includes('about') || q.includes('who') || q.includes('philosophy') || q.includes('malaika') || q.includes('kaun') || q.includes('quote')) {
      return {
        text: `Malaika Fatima is a Computer Science student with a passionate vision:\n\n💡 *"Technology should connect, not just compute."*\n❤️ *"For me, code is not just words and symbols. It is a way to touch hearts."*\n\nShe combines algorithmic computer science fundamentals with high-craft interactive interfaces.`,
        quickLinks: [
          { label: '🚀 Explore Projects' },
          { label: '📬 Contact Info' }
        ]
      };
    }

    // Default Fallback
    return {
      text: `Malaika Fatima is a BSCS student at Virtual University (3.72 CGPA) passionate about AI, Game Dev, and Interactive Web experiences. You can ask me about her projects (Jade Lantern, Birthday Experience, Sentinel), technical skills (C++, Python, JS, Canvas), or contact info (auratech1101@gmail.com).`,
      quickLinks: [
        { label: '💼 Why Hire Malaika?' },
        { label: '🚀 Explore Projects' },
        { label: '⚡ Technical Skills' },
        { label: '📬 Contact Info' }
      ]
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAnswer(query);
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickLinks: response.quickLinks
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleQuickClick = (label: string, url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }

    if (label.includes('Resume') && onOpenResume) {
      onOpenResume();
      onClose();
      return;
    }

    if (label.includes('Jade Lantern') && onSelectProject) {
      onSelectProject('jade_lantern');
      onClose();
      return;
    }
    if (label.includes('Birthday') && onSelectProject) {
      onSelectProject('birthday_experience');
      onClose();
      return;
    }
    if (label.includes('Sentinel') && onSelectProject) {
      onSelectProject('project_sentinel');
      onClose();
      return;
    }

    if (label.includes('Projects')) {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      onClose();
      return;
    }
    if (label.includes('Contact')) {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      onClose();
      return;
    }
    if (label.includes('Education')) {
      const el = document.getElementById('education');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      onClose();
      return;
    }
    if (label.includes('Skills') || label.includes('Lab') || label.includes('Technical Feats')) {
      const el = document.getElementById('skills');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      onClose();
      return;
    }

    handleSend(label);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-slate-950 border border-cyan-400/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[590px] max-h-[90vh] box-glow-cyan z-10"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-slate-900/90 border-b border-cyan-500/30">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-300">
                  <Bot className="w-5 h-5 animate-pulse" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-orbitron font-bold text-sm text-white tracking-wider">
                      AURA_AI AMBASSADOR
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-[10px] font-tech text-cyan-300">
                      v2.5 LIVE
                    </span>
                  </div>
                  <p className="text-[11px] font-tech text-cyan-400/70">
                    24/7 Recruiter & Portfolio Guide • Virtual University CS
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/50 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Recruiter 1-Click Fast-Track Action Bar */}
            <div className="px-3 sm:px-4 py-2 bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border-b border-cyan-500/20 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-[10px] font-tech font-bold text-amber-300 uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Recruiter 1-Click:</span>
              </span>
              {[
                { label: '💼 Why Hire Malaika?', prompt: 'Why should our company hire Malaika Fatima?' },
                { label: '⚡ Top Technical Feat', prompt: 'What is Malaika\'s most complex technical project and engineering achievement?' },
                { label: '🎓 CS Degree & 3.72 CGPA', prompt: 'Tell me about her education at Virtual University and certifications' },
                { label: '💬 WhatsApp & Contact', prompt: 'How can I contact Malaika directly on WhatsApp or Email?' }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(item.prompt)}
                  className="px-2.5 py-1 rounded-full bg-cyan-950/80 hover:bg-cyan-500/20 border border-cyan-400/40 hover:border-cyan-300 text-cyan-300 hover:text-white text-[11px] font-tech whitespace-nowrap transition-all cursor-pointer shadow-sm"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 font-tech text-sm scrollbar-thin scrollbar-thumb-cyan-500/30">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0 mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[88%] rounded-xl p-3.5 ${
                      msg.sender === 'user'
                        ? 'bg-cyan-600/30 border border-cyan-400/60 text-cyan-100'
                        : 'bg-slate-900/90 border border-cyan-500/30 text-slate-200'
                    }`}
                  >
                    <div className="whitespace-pre-line leading-relaxed text-xs sm:text-sm">
                      {msg.text}
                    </div>

                    {/* Quick Link Chips */}
                    {msg.quickLinks && msg.quickLinks.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-cyan-500/20 flex flex-wrap gap-1.5">
                        {msg.quickLinks.map((ql, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleQuickClick(ql.label, ql.url)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-cyan-950/80 hover:bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[11px] font-tech transition-all hover:border-cyan-300 cursor-pointer"
                          >
                            <span>{ql.label}</span>
                            {ql.url ? <ExternalLink className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="mt-1 text-[10px] text-cyan-500/50 text-right">
                      {msg.timestamp}
                    </div>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 items-center text-cyan-400 text-xs font-tech">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                    <Bot className="w-4 h-4 animate-spin-slow" />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-cyan-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>AURA AI is formulating answer...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips */}
            <div className="px-4 py-2 bg-slate-950/90 border-t border-cyan-500/20 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-[10px] text-cyan-400 font-tech uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Quick:
              </span>
              {[
                "Tell me about Malaika",
                "Show all projects",
                "What are her skills?",
                "How to contact her?",
                "Education background"
              ].map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(sug)}
                  className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-cyan-950 border border-cyan-500/30 hover:border-cyan-400 text-[11px] font-tech text-cyan-300 whitespace-nowrap transition-colors"
                >
                  {sug}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-slate-900 border-t border-cyan-500/30 flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask AURA anything (e.g., why hire, projects, skills)..."
                  className="w-full bg-slate-950 border border-cyan-500/40 rounded-xl px-4 py-2.5 text-sm text-cyan-100 placeholder-cyan-600/60 focus:outline-none focus:border-cyan-300 font-tech"
                />
              </div>
              <button
                type="submit"
                disabled={!input.trim()}
                className="px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-orbitron font-bold text-xs tracking-wider hover:bg-cyan-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <span>SEND</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
