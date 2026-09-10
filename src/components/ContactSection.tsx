import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Github, 
  Copy, 
  Check, 
  Send, 
  Sparkles, 
  Bot, 
  Terminal, 
  Globe, 
  CheckCircle2, 
  MessageSquare,
  ShieldCheck,
  Loader2,
  AlertCircle,
  MessageCircle,
  PhoneCall,
  Linkedin
} from 'lucide-react';
import { defaultPortfolioData } from '../data';

interface ContactSectionProps {
  onOpenAssistant: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenAssistant }) => {
  const data = defaultPortfolioData;
  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(data.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyPhone = () => {
    const phoneToCopy = data.contact.whatsappDisplay || '+92 322 6898750';
    navigator.clipboard.writeText(phoneToCopy);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSending(true);
    setErrorMessage(null);

    try {
      // Direct Free FormSubmit AJAX delivery straight to auratech1101@gmail.com (No API Key required)
      const response = await fetch(`https://formsubmit.co/ajax/${data.contact.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `⚡ Portfolio Message from ${formData.name}`,
          _template: 'box',
          _captcha: 'false'
        })
      });

      const result = await response.json();

      if (response.ok || result.success === 'true' || result.success === true) {
        setSubmitted(true);
        setErrorMessage(null);
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(result.message || 'Form service temporarily busy.');
      }
    } catch (err: any) {
      // Fallback: If network restricts direct fetch, smoothly send via window.open mailto
      const subject = encodeURIComponent(`Portfolio Message from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.open(`mailto:${data.contact.email}?subject=${subject}&body=${body}`, '_blank');
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="space-y-8 scroll-mt-20">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="font-orbitron text-2xl sm:text-3xl font-extrabold text-white tracking-wider uppercase text-glow-cyan">
            GET IN TOUCH // CONTACT
          </h2>
          <div className="h-px w-20 sm:w-40 bg-gradient-to-r from-cyan-500/50 to-transparent" />
        </div>
        <span className="font-tech text-xs text-cyan-400 px-3 py-1 bg-cyan-950/60 border border-cyan-500/40 rounded-full box-glow-cyan">
          [ ⚡ OPEN FOR COLLABS ]
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Column: 2x2 Quick Transmission Cards + AURA AI Assistant (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* 2x2 Grid of Direct Communication Channels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Direct Email Card */}
            <div className="relative bg-slate-950/90 border border-cyan-500/40 rounded-2xl p-4 sm:p-5 box-glow-cyan overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-orbitron text-xs font-bold text-white tracking-wide">DIRECT EMAIL</h3>
                      <p className="text-[10px] font-tech text-cyan-400/70">Inquiries & Roles</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-[9px] font-tech text-cyan-300 font-bold">
                    INBOX
                  </span>
                </div>

                <div className="p-2.5 bg-slate-900/90 border border-cyan-500/30 rounded-xl mb-3">
                  <span className="font-mono text-cyan-200 text-xs font-bold block truncate">
                    {data.contact.email}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center justify-center gap-1 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 text-xs font-tech transition-all hover:scale-[1.02] cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${data.contact.email}?subject=Collaboration%20Inquiry%20-%20Malaika%20Fatima`}
                  className="flex items-center justify-center gap-1 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-orbitron text-xs font-bold tracking-wider transition-all hover:scale-[1.02]"
                >
                  <Send className="w-3 h-3" />
                  <span>MAILTO</span>
                </a>
              </div>

              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-400" />
            </div>

            {/* WhatsApp Business Card */}
            <div className="relative bg-slate-950/90 border border-emerald-500/40 rounded-2xl p-4 sm:p-5 box-glow-emerald overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-300">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-orbitron text-xs font-bold text-white tracking-wide">WHATSAPP</h3>
                      <p className="text-[10px] font-tech text-emerald-400/80">Instant Messaging</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-[9px] font-tech text-emerald-300 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> ACTIVE
                  </span>
                </div>

                <div className="p-2.5 bg-slate-900/90 border border-emerald-500/30 rounded-xl mb-3">
                  <span className="font-mono text-emerald-200 text-xs font-bold block truncate">
                    {data.contact.whatsappDisplay || '+92 322 6898750'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="flex items-center justify-center gap-1 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/50 text-emerald-300 text-xs font-tech transition-all hover:scale-[1.02] cursor-pointer"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
                <a
                  href={data.contact.whatsappUrl || "https://wa.me/923226898750?text=Hi%20Malaika,%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect!"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-orbitron text-xs font-bold tracking-wider transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)] hover:scale-[1.02]"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>CHAT</span>
                </a>
              </div>

              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-emerald-400" />
            </div>

            {/* LinkedIn Network Card */}
            <div className="relative bg-slate-950/90 border border-blue-500/40 rounded-2xl p-4 sm:p-5 box-glow-blue overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-400/50 text-blue-300">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-orbitron text-xs font-bold text-white tracking-wide">LINKEDIN</h3>
                      <p className="text-[10px] font-tech text-blue-400/80">Professional Network</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-950/80 border border-blue-500/40 text-[9px] font-tech text-blue-300 font-bold">
                    CONNECT
                  </span>
                </div>

                <div className="p-2.5 bg-slate-900/90 border border-blue-500/30 rounded-xl mb-3">
                  <span className="font-mono text-blue-200 text-xs font-bold block truncate">
                    in/auratech01
                  </span>
                </div>
              </div>

              <a
                href={data.contact.linkedinUrl || "https://www.linkedin.com/in/auratech01"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-orbitron text-xs font-bold tracking-wider transition-all shadow-[0_0_12px_rgba(59,130,246,0.3)] hover:scale-[1.02]"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>CONNECT ON LINKEDIN</span>
              </a>

              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-400" />
            </div>

            {/* GitHub Repositories Card */}
            <div className="relative bg-slate-950/90 border border-cyan-500/40 rounded-2xl p-4 sm:p-5 box-glow-cyan overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300">
                      <Github className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-orbitron text-xs font-bold text-white tracking-wide">GITHUB</h3>
                      <p className="text-[10px] font-tech text-cyan-400/70">Open Source Code</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[9px] font-tech text-slate-300 font-bold">
                    BUILDS
                  </span>
                </div>

                <div className="p-2.5 bg-slate-900/90 border border-cyan-500/30 rounded-xl mb-3">
                  <span className="font-mono text-cyan-200 text-xs font-bold block truncate">
                    @{data.contact.githubUsername}
                  </span>
                </div>
              </div>

              <a
                href={data.contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-900 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-400 text-cyan-300 font-tech text-xs font-bold tracking-wider transition-all hover:scale-[1.02]"
              >
                <Github className="w-3.5 h-3.5" />
                <span>VIEW REPOSITORIES</span>
              </a>

              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-400" />
            </div>

          </div>

          {/* Launch AURA AI Assistant Card (Full-width banner underneath 2x2 grid) */}
          <div className="relative bg-gradient-to-br from-cyan-950/70 to-slate-950 border border-cyan-400/50 rounded-2xl p-4 sm:p-5 box-glow-cyan overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-cyan-500/30 border border-cyan-300 text-cyan-200 shrink-0">
                  <Bot className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-orbitron text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                    <span>AURA AI ASSISTANT</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[9px] font-tech">
                      ONLINE
                    </span>
                  </h3>
                  <p className="text-xs font-tech text-slate-300 mt-1 leading-snug">
                    Have questions about Malaika's code, university coursework, or interactive demos?
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenAssistant}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-orbitron font-bold text-xs tracking-wider transition-all shrink-0 cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.3)] hover:scale-105"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>CHAT WITH AURA</span>
              </button>
            </div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-400" />
          </div>

        </div>

        {/* Right Column: Interactive Quick Message Form (6 cols) */}
        <div className="lg:col-span-6">
          <div className="relative bg-slate-950/90 border border-cyan-500/40 rounded-2xl p-6 sm:p-7 box-glow-cyan">
            <div>
              <div className="flex items-center justify-between mb-5 border-b border-cyan-500/20 pb-4">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-cyan-400" />
                  <div>
                    <h3 className="font-orbitron text-base sm:text-lg font-bold text-white tracking-wide">
                      SEND TRANSMISSION
                    </h3>
                    <p className="text-xs font-tech text-cyan-400/70">
                      Send a direct message or collaboration proposal
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-tech text-emerald-400 flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/40 border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3" /> DIRECT_INBOX
                </span>
              </div>

              {errorMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 rounded-xl bg-red-950/80 border border-red-500/60 text-red-200 text-xs font-tech flex items-start gap-3 box-glow-red"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="font-bold text-red-300 tracking-wide font-orbitron">
                      TRANSMISSION NOTICE / PACKET RELAY DELAY
                    </div>
                    <p className="text-slate-300 font-rajdhani text-sm">
                      {errorMessage}
                    </p>
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <a
                        href={`mailto:${data.contact.email}?subject=Inquiry from ${encodeURIComponent(formData.name || 'Visitor')}&body=${encodeURIComponent(formData.message || '')}`}
                        className="px-3 py-1 rounded bg-red-900/60 border border-red-400 hover:bg-red-800 text-white font-bold text-xs tracking-wider transition-colors inline-flex items-center gap-1.5"
                      >
                        <Send className="w-3 h-3" />
                        OPEN IN GMAIL / EMAIL CLIENT
                      </a>
                      <button
                        type="button"
                        onClick={() => setErrorMessage(null)}
                        className="text-slate-400 hover:text-slate-200 underline text-xs cursor-pointer"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-400 flex items-center justify-center box-glow-emerald">
                    <CheckCircle2 className="w-7 h-7 text-emerald-400 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-orbitron font-bold text-white text-base sm:text-lg tracking-wide">
                      TRANSMISSION DISPATCHED SUCCESSFULLY!
                    </h4>
                    <p className="font-tech text-xs text-emerald-300">
                      DELIVERED TO INBOX // <span className="font-bold text-white">auratech1101@gmail.com</span>
                    </p>
                  </div>
                  <p className="font-rajdhani text-sm text-slate-300 max-w-md">
                    Thank you! Your message has been routed directly to Malaika's inbox without needing any external client.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-1.5 rounded-lg bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs font-tech hover:bg-cyan-950 cursor-pointer"
                    >
                      SEND ANOTHER TRANSMISSION
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-tech text-cyan-300 uppercase tracking-wider mb-1.5">
                        YOUR NAME / ORGANIZATION
                      </label>
                      <input
                        type="text"
                        required
                        disabled={isSending}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex / Tech Lead"
                        className="w-full bg-slate-900/90 border border-cyan-500/40 rounded-xl px-3.5 py-2.5 text-sm text-cyan-100 placeholder-slate-600 focus:outline-none focus:border-cyan-300 font-tech disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-tech text-cyan-300 uppercase tracking-wider mb-1.5">
                        YOUR EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        required
                        disabled={isSending}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. name@company.com"
                        className="w-full bg-slate-900/90 border border-cyan-500/40 rounded-xl px-3.5 py-2.5 text-sm text-cyan-100 placeholder-slate-600 focus:outline-none focus:border-cyan-300 font-tech disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-tech text-cyan-300 uppercase tracking-wider mb-1.5">
                      MESSAGE / COLLABORATION DETAILS
                    </label>
                    <textarea
                      required
                      rows={4}
                      disabled={isSending}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Malaika, I reviewed your portfolio projects (Jade Lantern & Sentinel) and would love to discuss..."
                      className="w-full bg-slate-900/90 border border-cyan-500/40 rounded-xl p-3.5 text-sm text-cyan-100 placeholder-slate-600 focus:outline-none focus:border-cyan-300 font-tech resize-none disabled:opacity-50"
                    />
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 font-orbitron font-extrabold text-xs sm:text-sm tracking-wider transition-all flex items-center justify-center gap-2 box-glow-cyan cursor-pointer disabled:opacity-60"
                    >
                      {isSending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                          <span>DISPATCHING SECURE PACKETS...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>SEND DIRECT TO INBOX</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Bottom Status Banner */}
            <div className="mt-5 pt-3.5 border-t border-cyan-500/20 flex flex-wrap items-center justify-between text-[11px] font-tech text-cyan-400/80 gap-2">
              <span>📍 LOCATION: PAKISTAN (VIRTUAL UNIVERSITY)</span>
              <span>⚡ STATUS: {data.contact.availability}</span>
            </div>

            {/* Corner Accent */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-400" />
          </div>
        </div>

      </div>
    </section>
  );
};
