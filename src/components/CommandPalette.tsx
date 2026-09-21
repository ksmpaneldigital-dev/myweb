import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  FileText,
  Moon,
  Sun,
  Globe,
  Mail,
  Phone,
  Github,
  ArrowRight,
  GraduationCap,
  HelpCircle,
  Code2,
  Terminal,
  ExternalLink,
  Share2,
  Send,
  Facebook,
  Linkedin,
  Youtube,
} from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { ThemeMode, Language } from '../types';
import { useToast } from './Toast';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onOpenTerminal?: () => void;
  onOpenShareCard?: () => void;
  theme: ThemeMode;
  resolvedTheme: 'dark' | 'light';
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
  t?: any;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Navigation' | 'Actions' | 'Projects' | 'Connect';
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onOpenTerminal,
  onOpenShareCard,
  theme,
  resolvedTheme,
  toggleTheme,
  language,
  toggleLanguage,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleNavigate = (hash: string) => {
    onClose();
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-home',
      title: 'Go to Home',
      category: 'Navigation',
      icon: <ArrowRight className="w-4 h-4 text-indigo-500" />,
      action: () => handleNavigate('home'),
    },
    {
      id: 'nav-about',
      title: 'Go to About Me',
      category: 'Navigation',
      icon: <ArrowRight className="w-4 h-4 text-indigo-500" />,
      action: () => handleNavigate('about'),
    },
    {
      id: 'nav-skills',
      title: 'Go to Skills & Technologies',
      category: 'Navigation',
      icon: <ArrowRight className="w-4 h-4 text-indigo-500" />,
      action: () => handleNavigate('skills'),
    },
    {
      id: 'nav-services',
      title: 'Go to Services',
      category: 'Navigation',
      icon: <ArrowRight className="w-4 h-4 text-indigo-500" />,
      action: () => handleNavigate('services'),
    },
    {
      id: 'nav-projects',
      title: 'Go to Projects Portfolio',
      category: 'Navigation',
      icon: <ArrowRight className="w-4 h-4 text-indigo-500" />,
      action: () => handleNavigate('projects'),
    },
    {
      id: 'nav-code',
      title: 'Go to Code Architecture',
      category: 'Navigation',
      icon: <Code2 className="w-4 h-4 text-indigo-500" />,
      action: () => handleNavigate('code-architecture'),
    },
    {
      id: 'nav-experience',
      title: 'Go to Career Experience',
      category: 'Navigation',
      icon: <ArrowRight className="w-4 h-4 text-indigo-500" />,
      action: () => handleNavigate('experience'),
    },
    {
      id: 'nav-education',
      title: 'Go to Courses, Learning & Education',
      category: 'Navigation',
      icon: <GraduationCap className="w-4 h-4 text-indigo-500" />,
      action: () => handleNavigate('education'),
    },
    {
      id: 'nav-testimonials',
      title: 'Go to Testimonials & Reviews',
      category: 'Navigation',
      icon: <ArrowRight className="w-4 h-4 text-indigo-500" />,
      action: () => handleNavigate('testimonials'),
    },
    {
      id: 'nav-faq',
      title: 'Go to Frequently Asked Questions (FAQ)',
      category: 'Navigation',
      icon: <HelpCircle className="w-4 h-4 text-indigo-500" />,
      action: () => handleNavigate('faq'),
    },
    {
      id: 'nav-contact',
      title: 'Go to Contact Form',
      category: 'Navigation',
      icon: <Mail className="w-4 h-4 text-indigo-500" />,
      action: () => handleNavigate('contact'),
    },

    // Actions
    {
      id: 'action-resume',
      title: 'View / Download CV Resume',
      subtitle: 'Open full interactive resume modal with print & export',
      category: 'Actions',
      icon: <FileText className="w-4 h-4 text-emerald-500" />,
      action: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      id: 'action-terminal',
      title: 'Launch Interactive CLI Terminal',
      subtitle: 'Open interactive developer shell with custom commands',
      category: 'Actions',
      icon: <Terminal className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onClose();
        onOpenTerminal?.();
      },
    },
    {
      id: 'action-share-card',
      title: 'Generate Social Sharing Card (OpenGraph)',
      subtitle: 'Create dynamic 1200x630 share image for LinkedIn, Telegram & X',
      category: 'Actions',
      icon: <Share2 className="w-4 h-4 text-cyan-400" />,
      action: () => {
        onClose();
        onOpenShareCard?.();
      },
    },
    {
      id: 'action-theme',
      title: `Toggle Theme (Currently ${resolvedTheme === 'dark' ? 'Dark' : 'Light'})`,
      subtitle: 'Switch between dark and light appearance modes',
      category: 'Actions',
      icon: resolvedTheme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />,
      action: () => {
        toggleTheme();
        showToast(`Switched theme to ${resolvedTheme === 'dark' ? 'Light' : 'Dark'} mode`);
      },
    },
    {
      id: 'action-lang',
      title: `Switch Language (Currently ${language === 'en' ? 'English 🇬🇧' : 'ខ្មែរ Khmer 🇰🇭'})`,
      subtitle: 'Toggle between English and Khmer translations',
      category: 'Actions',
      icon: <Globe className="w-4 h-4 text-cyan-400" />,
      action: () => {
        toggleLanguage();
        showToast(language === 'en' ? 'បានប្តូរទៅភាសាខ្មែរ' : 'Switched to English');
      },
    },
    {
      id: 'action-copy-email',
      title: 'Copy Email Address',
      subtitle: portfolio.personal.email,
      category: 'Actions',
      icon: <Mail className="w-4 h-4 text-indigo-400" />,
      action: () => {
        navigator.clipboard.writeText(portfolio.personal.email);
        showToast('Email address copied to clipboard!');
        onClose();
      },
    },
    {
      id: 'action-copy-phone',
      title: 'Copy Phone Number',
      subtitle: portfolio.personal.phone,
      category: 'Actions',
      icon: <Phone className="w-4 h-4 text-emerald-400" />,
      action: () => {
        navigator.clipboard.writeText(portfolio.personal.phone);
        showToast('Phone number copied to clipboard!');
        onClose();
      },
    },

    // Projects
    ...portfolio.projects.map((p) => ({
      id: `proj-${p.id}`,
      title: p.title,
      subtitle: `${p.tags.join(', ')} • ${p.metrics || ''}`,
      category: 'Projects' as const,
      icon: <Code2 className="w-4 h-4 text-indigo-400" />,
      action: () => {
        handleNavigate('projects');
      },
    })),

    // Connect
    {
      id: 'connect-telegram',
      title: 'Chat on Telegram',
      subtitle: portfolio.social.telegram,
      category: 'Connect',
      icon: <Send className="w-4 h-4 text-sky-400" />,
      action: () => {
        window.open(portfolio.social.telegram, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
    {
      id: 'connect-facebook',
      title: 'Open Facebook Profile',
      subtitle: portfolio.social.facebook,
      category: 'Connect',
      icon: <Facebook className="w-4 h-4 text-blue-500" />,
      action: () => {
        window.open(portfolio.social.facebook, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
    {
      id: 'connect-github',
      title: 'Open GitHub Profile',
      subtitle: portfolio.social.github,
      category: 'Connect',
      icon: <Github className="w-4 h-4 text-slate-400" />,
      action: () => {
        window.open(portfolio.social.github, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
    {
      id: 'connect-linkedin',
      title: 'Open LinkedIn Profile',
      subtitle: portfolio.social.linkedin,
      category: 'Connect',
      icon: <Linkedin className="w-4 h-4 text-blue-400" />,
      action: () => {
        window.open(portfolio.social.linkedin, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
    {
      id: 'connect-youtube',
      title: 'Open YouTube Channel',
      subtitle: portfolio.social.youtube,
      category: 'Connect',
      icon: <Youtube className="w-4 h-4 text-rose-500" />,
      action: () => {
        window.open(portfolio.social.youtube, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      (cmd.subtitle && cmd.subtitle.toLowerCase().includes(q)) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="command-palette-overlay"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <div
        id="command-palette-modal"
        className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, project, or section..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded">
            ESC
          </kbd>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command List */}
        <div ref={listRef} className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/50">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              No matching commands or projects found.
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-1.5 rounded-lg ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {cmd.icon}
                    </div>
                    <div className="truncate">
                      <p className={`text-xs sm:text-sm font-semibold truncate ${isSelected ? 'text-white' : ''}`}>
                        {cmd.title}
                      </p>
                      {cmd.subtitle && (
                        <p
                          className={`text-[11px] truncate ${
                            isSelected ? 'text-indigo-200' : 'text-slate-400 dark:text-slate-500'
                          }`}
                        >
                          {cmd.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-md font-mono shrink-0 ml-2 ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {cmd.category}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="font-mono text-indigo-500">PRO SERVERS Launcher</span>
        </div>
      </div>
    </div>
  );
};
