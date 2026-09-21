import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, ChevronRight, CornerDownLeft, Sparkles } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { ThemeMode, Language } from '../types';
import { useToast } from './Toast';
import { newsletterService } from '../services/newsletterService';

interface DevTerminalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpenResume: () => void;
  setTheme?: (theme: ThemeMode) => void;
  toggleTheme?: () => void;
  setLanguage?: (lang: Language) => void;
  toggleLanguage?: () => void;
}

interface OutputLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  content: string;
}

const COMMAND_LIST = [
  'help',
  'bio',
  'whoami',
  'skills',
  'projects',
  'experience',
  'contact',
  'hire',
  'resume',
  'newsletter',
  'subscribers',
  'theme dark',
  'theme light',
  'lang km',
  'lang en',
  'matrix',
  'quote',
  'date',
  'clear',
];

export const DevTerminal: React.FC<DevTerminalProps> = ({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
  onOpenResume,
  setTheme,
  toggleTheme,
  setLanguage,
  toggleLanguage,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const handleClose = () => {
    if (controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const { showToast } = useToast();

  const [output, setOutput] = useState<OutputLine[]>([
    {
      id: 'welcome-1',
      type: 'system',
      content: `PRO SERVERS CLI [Version 3.4.0-release]\nLogged in as visitor@proservers-host:~$ (Type 'help' for command list)`,
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output, isOpen]);

  const handleCommand = async (rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    const newHistory = [...history, trimmed];
    setHistory(newHistory);
    setHistoryIndex(-1);

    const newLines: OutputLine[] = [
      ...output,
      { id: `in-${Date.now()}`, type: 'input', content: `$ ${trimmed}` },
    ];

    const args = trimmed.toLowerCase().split(/\s+/);
    const cmd = args[0];
    const param = args.slice(1).join(' ');

    switch (cmd) {
      case 'help':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: `Available Commands:
  • help           - Display available shell commands
  • bio / whoami   - Full-stack developer profile & role summary
  • skills [cat]   - List technologies (all | frontend | backend | database | tools)
  • projects       - List flagship production web projects
  • experience     - Summary of engineering career history
  • contact        - Display direct email, phone, and messaging handles
  • hire           - Scroll directly to contact inquiry form
  • resume         - Open full interactive CV & export modal
  • subscribers    - List persisted newsletter subscribers (localStorage)
  • subscribe <em\> - Subscribe email to newsletter via Mock API
  • theme [mode]   - Change appearance (dark | light | system)
  • lang [code]    - Change language (en | km)
  • matrix         - Toggle hacker matrix visual theme
  • quote          - Inspiring software engineering quote
  • clear          - Clear terminal console screen`,
        });
        break;

      case 'whoami':
      case 'bio':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: `${portfolio.personal.name} | ${portfolio.personal.title}
Location: ${portfolio.personal.location}
Status:   ${portfolio.personal.availability}
Summary:  ${portfolio.personal.description}`,
        });
        break;

      case 'skills': {
        const cat = args[1];
        const filtered = cat
          ? portfolio.skills.filter((s) => s.category.toLowerCase() === cat)
          : portfolio.skills;

        if (filtered.length === 0) {
          newLines.push({
            id: `err-${Date.now()}`,
            type: 'error',
            content: `No skills found for category '${cat}'. Try: frontend, backend, database, programming, tools.`,
          });
        } else {
          const list = filtered
            .map((s) => `  [${s.level.padEnd(7)}] ${s.name.padEnd(20)} (${s.experienceYears})`)
            .join('\n');
          newLines.push({
            id: `out-${Date.now()}`,
            type: 'output',
            content: `Core Technical Competencies:\n${list}`,
          });
        }
        break;
      }

      case 'projects': {
        const list = portfolio.projects
          .map((p) => `  #${p.id} ${p.title}\n     Tags: ${p.tags.join(', ')}\n     Metrics: ${p.metrics || 'Production ready'}`)
          .join('\n\n');
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: `Flagship Projects:\n${list}`,
        });
        break;
      }

      case 'experience': {
        const list = portfolio.experience
          .map((e) => `  • ${e.position} @ ${e.company} (${e.period})\n    ${e.description[0]}`)
          .join('\n\n');
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: `Career Milestones:\n${list}`,
        });
        break;
      }

      case 'contact':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: `Direct Contact Channels:
  Email:    ${portfolio.personal.email}
  Phone:    ${portfolio.personal.phone}
  Telegram: ${portfolio.social.telegram}
  GitHub:   ${portfolio.social.github}`,
        });
        break;

      case 'hire': {
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'success',
          content: `Navigating to contact inquiry form...`,
        });
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        showToast('Navigated to Contact form!');
        break;
      }

      case 'resume':
      case 'cv':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'success',
          content: `Opening CV / Resume modal...`,
        });
        onOpenResume();
        break;

      case 'newsletter':
      case 'subscribers': {
        const list = newsletterService.getSavedSubscribers();
        const mySub = newsletterService.getMySubscribedEmail();
        const formatted = list
          .map((s, idx) => `  [${idx + 1}] ${s.email.padEnd(34)} ${new Date(s.timestamp).toLocaleDateString()}`)
          .join('\n');
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: `📬 Newsletter Subscribers (${list.length} persisted in localStorage):\n${formatted}\n${
            mySub ? `\n• Current Device Registered Email: ${mySub}` : ''
          }\n• Storage Key: portfolio_newsletter_subscribers (persists across page reloads)\n• Use: subscribe <email> to test subscription directly from terminal!`,
        });
        break;
      }

      case 'subscribe': {
        if (!param) {
          newLines.push({
            id: `err-${Date.now()}`,
            type: 'error',
            content: 'Usage: subscribe <email@example.com>',
          });
          break;
        }

        const res = await newsletterService.subscribe(param);
        if (res.success) {
          newLines.push({
            id: `out-${Date.now()}`,
            type: 'success',
            content: `✓ Success: Subscribed ${param} (Total subscribers: ${res.totalSubscribers})\nState saved to localStorage and synchronized.`,
          });
          showToast(`Subscribed: ${param}`);
        } else {
          newLines.push({
            id: `err-${Date.now()}`,
            type: 'error',
            content: `✗ Subscription notice: ${res.message}`,
          });
        }
        break;
      }

      case 'theme': {
        if (param === 'dark' || param === 'light' || param === 'system') {
          if (setTheme) {
            setTheme(param);
          } else if (toggleTheme) {
            toggleTheme();
          }
          newLines.push({
            id: `out-${Date.now()}`,
            type: 'success',
            content: `Application theme switched to: ${param}`,
          });
          showToast(`Theme changed to ${param}`);
        } else {
          newLines.push({
            id: `err-${Date.now()}`,
            type: 'error',
            content: `Usage: theme <dark|light|system>`,
          });
        }
        break;
      }

      case 'lang': {
        if (param === 'en' || param === 'km') {
          if (setLanguage) {
            setLanguage(param);
          } else if (toggleLanguage) {
            toggleLanguage();
          }
          newLines.push({
            id: `out-${Date.now()}`,
            type: 'success',
            content: `Language switched to: ${param === 'km' ? 'ខ្មែរ (Khmer)' : 'English'}`,
          });
          showToast(`Language set to ${param === 'km' ? 'ខ្មែរ' : 'English'}`);
        } else {
          newLines.push({
            id: `err-${Date.now()}`,
            type: 'error',
            content: `Usage: lang <en|km>`,
          });
        }
        break;
      }

      case 'matrix':
        setIsMatrixMode((prev) => !prev);
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'success',
          content: `Matrix terminal mode toggled.`,
        });
        break;

      case 'quote': {
        const quotes = [
          `"Simplicity is prerequisite for reliability." — Edsger W. Dijkstra`,
          `"Make it work, make it right, make it fast." — Kent Beck`,
          `"First, solve the problem. Then, write the code." — John Johnson`,
          `"Clean code always looks like it was written by someone who cares." — Robert C. Martin`,
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: randomQuote,
        });
        break;
      }

      case 'date':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: new Date().toUTCString(),
        });
        break;

      case 'clear':
        setOutput([]);
        setInputVal('');
        return;

      case 'sudo':
        newLines.push({
          id: `err-${Date.now()}`,
          type: 'error',
          content: `visitor is not in the sudoers file. This incident will be reported to KIMSAN! 😉`,
        });
        break;

      default:
        newLines.push({
          id: `err-${Date.now()}`,
          type: 'error',
          content: `Command not recognized: '${cmd}'. Type 'help' to see valid commands.`,
        });
        break;
    }

    setOutput(newLines);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < history.length) {
          setHistoryIndex(nextIdx);
          setInputVal(history[nextIdx]);
        } else {
          setHistoryIndex(-1);
          setInputVal('');
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Auto complete command
      const match = COMMAND_LIST.find((c) => c.startsWith(inputVal.trim().toLowerCase()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  return (
    <>
      {/* Floating CLI Toggle Pill (only if uncontrolled) */}
      {controlledIsOpen === undefined && !isOpen && (
        <button
          id="open-terminal-btn"
          type="button"
          onClick={() => setInternalIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-slate-900/90 text-indigo-400 border border-indigo-500/40 shadow-2xl backdrop-blur-md hover:bg-slate-900 hover:border-indigo-400 hover:scale-105 active:scale-95 transition-all group"
          title="Open Developer Terminal CLI"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <TerminalIcon className="w-4 h-4 text-indigo-400 group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-mono font-bold text-white tracking-wide">CLI Terminal</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-slate-800 text-slate-400 border border-slate-700 rounded">
            $
          </kbd>
        </button>
      )}

      {/* Terminal Window */}
      {isOpen && (
        <div
          id="dev-terminal-window"
          className={`fixed z-50 transition-all duration-200 flex flex-col rounded-2xl shadow-2xl overflow-hidden border backdrop-blur-xl ${
            isMatrixMode
              ? 'bg-black text-emerald-400 border-emerald-500/60 font-mono'
              : 'bg-slate-950/95 text-slate-200 border-slate-800 font-mono'
          } ${
            isExpanded
              ? 'inset-4 sm:inset-10'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[92vw] sm:w-[500px] h-[380px] sm:h-[440px]'
          }`}
        >
          {/* Terminal Titlebar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 select-none">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              </div>
              <span className="text-xs font-semibold text-slate-300 ml-2">
                kimsan@proservers-host: ~ (bash)
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title={isExpanded ? 'Restore size' : 'Maximize terminal'}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Close terminal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Terminal Content Body */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-2 text-xs leading-relaxed select-text"
            onClick={() => inputRef.current?.focus()}
          >
            {output.map((line) => (
              <div key={line.id} className="whitespace-pre-wrap">
                {line.type === 'input' && (
                  <span className="text-indigo-400 font-bold">{line.content}</span>
                )}
                {line.type === 'system' && (
                  <span className="text-slate-400">{line.content}</span>
                )}
                {line.type === 'output' && (
                  <span className={isMatrixMode ? 'text-emerald-400' : 'text-slate-300'}>
                    {line.content}
                  </span>
                )}
                {line.type === 'success' && (
                  <span className="text-emerald-400 font-semibold">{line.content}</span>
                )}
                {line.type === 'error' && (
                  <span className="text-rose-400 font-semibold">{line.content}</span>
                )}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Input Bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900/90 border-t border-slate-800">
            <span className="text-indigo-400 font-bold text-xs">visitor@proservers:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type command ('help', 'skills', 'hire', 'matrix')..."
              className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none font-mono"
            />
            <button
              type="button"
              onClick={() => handleCommand(inputVal)}
              className="p-1 text-slate-400 hover:text-indigo-400 transition-colors"
              title="Execute"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
