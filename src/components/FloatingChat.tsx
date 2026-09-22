import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send,
  X,
  ExternalLink,
  Sparkles,
  MessageCircle,
  Copy,
  Check,
  Minimize2,
  ArrowLeftRight,
  Bot,
  User,
} from 'lucide-react';
import { portfolio } from '../data/portfolio';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: () => void }[];
}

interface FloatingChatProps {
  onOpenResume?: () => void;
  language?: 'en' | 'km';
}

export const FloatingChat: React.FC<FloatingChatProps> = ({ onOpenResume, language = 'en' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<'right' | 'left'>(() => {
    const saved = localStorage.getItem('floating_chat_pos');
    return saved === 'right' ? 'right' : 'left';
  });
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showGreetingBubble, setShowGreetingBubble] = useState(true);
  const [copied, setCopied] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { personal, social } = portfolio;
  const telegramHandle = '@kim_san145';
  const telegramUrl = 'https://t.me/kim_san145';

  const togglePosition = () => {
    const newPos = position === 'right' ? 'left' : 'right';
    setPosition(newPos);
    localStorage.setItem('floating_chat_pos', newPos);
  };

  const initialGreeting =
    language === 'km'
      ? 'សួស្តី! តើខ្ញុំអាចជួយអ្វីអ្នកបាននៅថ្ងៃនេះ?'
      : 'Hello! What can I help you today?';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: initialGreeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const quickTemplates = [
    {
      label: language === 'km' ? '👋 សួស្តី Kim San' : '👋 Say Hello to Kim San',
      text: 'Hello Kim San, I visited your portfolio and would like to connect!',
    },
    {
      label: language === 'km' ? '💼 ពិភាក្សាអំពីគម្រោង' : '💼 Discuss a New Project',
      text: 'Hi Kim San, I have an upcoming project and would like to discuss requirements.',
    },
    {
      label: language === 'km' ? '🚀 សាកសួរអំពីការងារ / ជួល' : '🚀 Inquire About Hiring',
      text: 'Hello Kim San, are you currently available for freelance or contract work?',
    },
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setShowGreetingBubble(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(telegramUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenTelegram = (customText?: string) => {
    const textParam = customText ? `?text=${encodeURIComponent(customText)}` : '';
    window.open(`${telegramUrl}${textParam}`, '_blank', 'noopener,noreferrer');
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let replyText = '';
      let quickActions: { label: string; action: () => void }[] | undefined;

      if (lower.includes('hire') || lower.includes('available') || lower.includes('project') || lower.includes('contact') || lower.includes('contract')) {
        replyText = `I am currently ${personal.availability} for projects and full-stack development. Let's chat directly on Telegram for immediate collaboration!`;
        quickActions = [
          {
            label: '💬 Chat on Telegram (t.me/kim_san145)',
            action: () => handleOpenTelegram(query),
          },
        ];
      } else if (lower.includes('tech') || lower.includes('skill') || lower.includes('stack')) {
        replyText = `I specialize in React, TypeScript, Next.js, Node.js, Express, Laravel, PostgreSQL, Docker, and Tailwind CSS.`;
        quickActions = [
          {
            label: '💬 Inquire on Telegram',
            action: () => handleOpenTelegram('Hi Kim San, I have a question about your tech stack.'),
          },
        ];
      } else {
        replyText = `Thank you for your message! You can chat with me in real-time on Telegram @kim_san145.`;
        quickActions = [
          {
            label: '🚀 Open t.me/kim_san145',
            action: () => handleOpenTelegram(query),
          },
        ];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          quickActions,
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Action Trigger on the screen */}
      <div
        className={`fixed z-40 flex items-center gap-2.5 ${
          position === 'right'
            ? 'bottom-5 sm:bottom-20 right-5 sm:right-6'
            : 'bottom-5 left-5 sm:left-6'
        }`}
      >
        {/* Animated Greeting Bubble pointing to t.me/kim_san145 */}
        <AnimatePresence>
          {!isOpen && showGreetingBubble && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 10 }}
              transition={{ duration: 0.25 }}
              className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-xl hover:border-sky-500/50 transition-all ${
                position === 'right' ? 'order-1' : 'order-2'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="text-left cursor-pointer group"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-sky-500 tracking-wide uppercase">
                    Telegram Chat
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    t.me/kim_san145
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-200 group-hover:text-sky-500 transition-colors">
                  {initialGreeting}
                </p>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowGreetingBubble(false);
                }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-md"
                title="Dismiss"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Telegram Chat Floating Icon Button */}
        <div className={`relative ${position === 'right' ? 'order-2' : 'order-1'}`}>
          <motion.button
            type="button"
            id="floating-telegram-chat-btn"
            onClick={() => setIsOpen((prev) => !prev)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#2AABEE] via-[#229ED9] to-[#0088cc] text-white shadow-xl shadow-sky-500/35 hover:shadow-sky-500/55 border border-white/25 transition-all duration-300 cursor-pointer group"
            title="Chat on Telegram: t.me/kim_san145"
            aria-label="Chat on Telegram: t.me/kim_san145"
          >
            {isOpen ? (
              <X className="w-6 h-6 transition-transform rotate-0" />
            ) : (
              <div className="relative flex items-center justify-center">
                {/* Paper plane Send icon rotated to match Telegram emblem */}
                <Send className="w-6 h-6 -translate-x-0.5 translate-y-0.5 -rotate-45 group-hover:scale-110 group-hover:-translate-x-1 group-hover:translate-y-0 transition-all duration-200" />
                <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900"></span>
                </span>
              </div>
            )}
          </motion.button>
        </div>
      </div>

      {/* Floating Chat Drawer / Telegram Launcher Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed z-50 w-[92vw] sm:w-[380px] max-w-[420px] h-[520px] max-h-[82vh] flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl ${
              position === 'right'
                ? 'bottom-20 sm:bottom-36 right-4 sm:right-6'
                : 'bottom-22 left-4 sm:left-6'
            }`}
          >
            {/* Telegram Header */}
            <div className="p-4 bg-gradient-to-r from-[#2AABEE] via-[#229ED9] to-[#0088cc] text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center font-bold text-sm tracking-wide shadow-inner">
                    KS
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#229ED9] animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold leading-tight tracking-wide">
                      {personal.name}
                    </h3>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20 font-mono font-medium">
                      {telegramHandle}
                    </span>
                  </div>
                  <p className="text-[11px] text-sky-100 flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-300"></span>
                    <span>Online on Telegram • Instant replies</span>
                  </p>
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={togglePosition}
                  className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors"
                  title={
                    position === 'right'
                      ? 'Dock to Left (ខាងឆ្វេង)'
                      : 'Dock to Right (ខាងស្តាំ)'
                  }
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors"
                  title="Minimize"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Telegram Direct Action Banner */}
            <div className="px-4 py-2.5 bg-sky-50 dark:bg-sky-950/40 border-b border-sky-100 dark:border-sky-900/50 flex items-center justify-between gap-2">
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 dark:text-sky-300 hover:text-sky-800 dark:hover:text-sky-200 transition-colors"
              >
                <Send className="w-3.5 h-3.5 -rotate-45" />
                <span>t.me/kim_san145</span>
                <ExternalLink className="w-3 h-3 text-sky-500" />
              </a>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-sky-400 transition-colors"
                title="Copy Telegram link"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-500" />
                    <span className="text-emerald-600 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick 1-Click Launch Button */}
            <div className="p-3 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#2AABEE] to-[#229ED9] hover:from-[#229ED9] hover:to-[#0088cc] text-white font-semibold text-xs shadow-md shadow-sky-500/20 hover:shadow-sky-500/35 transition-all"
              >
                <Send className="w-3.5 h-3.5 -rotate-45" />
                <span>Start Chat on Telegram (t.me/kim_san145)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>

            {/* Message Stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-slate-50/60 dark:bg-slate-900/40">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div className="flex items-end gap-2 max-w-[85%]">
                    {msg.sender === 'bot' && (
                      <div className="w-6 h-6 rounded-full bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 mb-1">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-2xl leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-sky-600 text-white rounded-br-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/70 dark:border-slate-700/60 shadow-xs rounded-bl-xs'
                      }`}
                    >
                      <p>{msg.text}</p>

                      {msg.quickActions && msg.quickActions.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-700 flex flex-wrap gap-1.5">
                          {msg.quickActions.map((qa, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={qa.action}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 dark:hover:bg-sky-900 text-sky-700 dark:text-sky-300 font-semibold text-[11px] transition-colors cursor-pointer"
                            >
                              <span>{qa.label}</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs">
                  <div className="w-6 h-6 rounded-full bg-sky-500/10 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-sky-500 animate-pulse" />
                  </div>
                  <div className="flex items-center gap-1 p-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}

              {/* Pre-filled Message Launchers for Telegram */}
              <div className="pt-2">
                <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mb-2">
                  Launch with Telegram templates:
                </p>
                <div className="flex flex-col gap-1.5">
                  {quickTemplates.map((template, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleOpenTelegram(template.text)}
                      className="text-left px-3 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950/40 border border-slate-200/80 dark:border-slate-700/70 text-slate-700 dark:text-slate-300 text-xs transition-colors cursor-pointer flex items-center justify-between group"
                    >
                      <span className="font-medium">{template.label}</span>
                      <Send className="w-3 h-3 text-sky-500 -rotate-45 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>

              <div ref={messagesEndRef} />
            </div>

            {/* Message Input: sends pre-filled text to Telegram or local chat */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (inputText.trim()) {
                  handleSendMessage();
                }
              }}
              className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  language === 'km' ? 'សរសេរសារដើម្បីផ្ញើតាម Telegram...' : 'Type message to send via Telegram...'
                }
                className="flex-1 px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => handleOpenTelegram(inputText)}
                disabled={!inputText.trim()}
                className="p-2 rounded-xl bg-gradient-to-r from-[#2AABEE] to-[#229ED9] text-white disabled:opacity-40 hover:from-[#229ED9] hover:to-[#0088cc] transition-colors cursor-pointer disabled:cursor-not-allowed shrink-0 shadow-sm"
                title="Send directly on Telegram"
              >
                <Send className="w-4 h-4 -rotate-45" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
