import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-react';
import { ThemeMode } from '../types';

interface ThemeToggleProps {
  theme: ThemeMode;
  resolvedTheme: 'dark' | 'light';
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  compact?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  resolvedTheme,
  setTheme,
  toggleTheme,
  compact = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (compact) {
    return (
      <button
        id="theme-toggle-compact-btn"
        type="button"
        onClick={toggleTheme}
        className="relative p-2.5 rounded-xl border border-slate-700/60 dark:border-slate-700/60 bg-slate-800/80 dark:bg-slate-800/80 text-slate-200 hover:text-indigo-400 hover:border-indigo-500/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Current mode: ${theme}. Click to switch`}
      >
        {resolvedTheme === 'dark' ? (
          <Sun className="w-4 h-4 text-amber-400 animate-in fade-in zoom-in duration-300" />
        ) : (
          <Moon className="w-4 h-4 text-indigo-600 animate-in fade-in zoom-in duration-300" />
        )}
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id="theme-dropdown-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-slate-700/70 dark:border-slate-800 bg-slate-900/60 dark:bg-slate-900/60 text-slate-300 dark:text-slate-300 hover:text-white hover:border-indigo-500/50 hover:bg-slate-800/60 transition-all duration-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Theme selector"
      >
        {theme === 'dark' && <Moon className="w-3.5 h-3.5 text-indigo-400" />}
        {theme === 'light' && <Sun className="w-3.5 h-3.5 text-amber-400" />}
        {theme === 'system' && <Monitor className="w-3.5 h-3.5 text-cyan-400" />}
        <span className="capitalize tracking-wide">{theme}</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          id="theme-dropdown-menu"
          className="absolute right-0 mt-2 w-36 py-1 rounded-xl bg-slate-900 dark:bg-slate-900/95 border border-slate-800 shadow-xl backdrop-blur-md z-50 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <button
            id="theme-opt-dark"
            type="button"
            onClick={() => {
              setTheme('dark');
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left transition-colors ${
              theme === 'dark'
                ? 'bg-indigo-600/20 text-indigo-400 font-semibold'
                : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-indigo-400" />
            <span>Dark</span>
          </button>

          <button
            id="theme-opt-light"
            type="button"
            onClick={() => {
              setTheme('light');
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left transition-colors ${
              theme === 'light'
                ? 'bg-indigo-600/20 text-indigo-400 font-semibold'
                : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span>Light</span>
          </button>

          <button
            id="theme-opt-system"
            type="button"
            onClick={() => {
              setTheme('system');
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left transition-colors ${
              theme === 'system'
                ? 'bg-indigo-600/20 text-indigo-400 font-semibold'
                : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5 text-cyan-400" />
            <span>System</span>
          </button>
        </div>
      )}
    </div>
  );
};
