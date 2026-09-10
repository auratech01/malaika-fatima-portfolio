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
  FolderGit2
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
}

export const CyberAssistantModal: React.FC<CyberAssistantModalProps> = ({
  isOpen,
  onClose,
  onSelectProject
}) => {
  const data = defaultPortfolioData;
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Greetings! I am AURA_CORE v2.4, Malaika Fatima's intelligent cyber companion. I can answer questions about her projects, CS background, tech stack, philosophy, or collaboration details. What would you like to explore?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickLinks: [
        { label: '🚀 Explore Projects' },
        { label: '⚡ Technical Skills' },
        { label: '🎓 Education & Semesters' },
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

    // Projects
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

    // Contact
    if (q.includes('contact') || q.includes('email') || q.includes('linkedin') || q.includes('whatsapp') || q.includes('phone') || q.includes('number') || q.includes('call') || q.includes('hire') || q.includes('rabta') || q.includes('github') || q.includes('reach') || q.includes('message')) {
      return {
        text: `You can connect with Malaika Fatima directly across her professional channels:\n\n💼 **LinkedIn:** linkedin.com/in/auratech01\n💬 **WhatsApp Business:** +92 322 6898750\n📧 **Email:** auratech1101@gmail.com\n🐙 **GitHub:** github.com/auratech01\n⚡ **Status:** Open for internships, junior software development, and creative tech collaborations!`,
        quickLinks: [
          { label: '💼 Connect on LinkedIn', url: 'https://www.linkedin.com/in/auratech01' },
          { label: '💬 Chat on WhatsApp', url: 'https://wa.me/923226898750?text=Hi%20Malaika,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20connect!' },
          { label: '📧 Send Email', url: 'mailto:auratech1101@gmail.com' },
          { label: '🐙 Visit GitHub', url: 'https://github.com/auratech01' }
        ]
      };
    }

    // Skills & Tools
    if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('tool') || q.includes('language') || q.includes('c++') || q.includes('python') || q.includes('vs code')) {
      return {
        text: `Here is Malaika's active technical toolkit:\n\n💻 **Core Languages:** C++, Python, JavaScript (ES6+), SQL\n🌐 **Web & Creative:** HTML5 Canvas, CSS3, DOM Manipulation, 3D Web UI, Interactive Animations\n🛠️ **Dev Workflow:** VS Code, Git & GitHub Desktop, Linux (Ubuntu), Figma\n✨ **Exploring:** Artificial Intelligence, Game Mechanics, Cybersecurity & Neural Networks.`,
        quickLinks: [
          { label: '⚡ View Interactive Lab' }
        ]
      };
    }

    // Education
    if (q.includes('education') || q.includes('degree') || q.includes('university') || q.includes('semester') || q.includes('vu') || q.includes('study') || q.includes('padhai') || q.includes('cgpa')) {
      return {
        text: `🎓 **Education & Certifications Profile:**\n- **Degree:** Bachelor's in Computer Science (BSCS)\n- **Institution:** Virtual University of Pakistan\n- **Current Progress:** 7th Semester (6 Semesters Cleared with 3.72 / 4.00 CGPA)\n- **Certifications:** Cisco CPA (Programming Essentials in C++) & Cisco CCNA (Introduction to Networks)`,
        quickLinks: [
          { label: '📜 View Education Section' }
        ]
      };
    }

    // Philosophy / About
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
      text: `Malaika Fatima is a BSCS student at Virtual University passionate about AI, Game Dev, and Interactive Web experiences. You can ask me about her projects (Jade Lantern, Birthday Experience, Sentinel), technical skills (C++, Python, JS, Canvas), or contact info (auratech1101@gmail.com).`,
      quickLinks: [
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
    }, 500);
  };

  const handleQuickClick = (label: string, url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
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
    if (label.includes('Skills') || label.includes('Lab')) {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
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
            className="relative w-full max-w-2xl bg-slate-950 border border-cyan-400/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[560px] max-h-[85vh] box-glow-cyan z-10"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-cyan-500/30">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-300">
                  <Bot className="w-5 h-5 animate-pulse" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-orbitron font-bold text-sm text-white tracking-wider">
                      AURA_ASSISTANT
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-[10px] font-tech text-cyan-300">
                      LIVE_AI
                    </span>
                  </div>
                  <p className="text-[11px] font-tech text-cyan-400/70">
                    Interactive Portfolio Guide • Ask in English / Urdu
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
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
                    className={`max-w-[85%] rounded-xl p-3.5 ${
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
                    <span>AURA AI is computing answer...</span>
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
                  placeholder="Ask AURA anything (e.g., projects, skills, contact)..."
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
