import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Server, Search, Globe } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { ThemeMode, Language } from '../types';
import { TranslationDictionary } from '../data/translations';

interface NavbarProps {
  theme: ThemeMode;
  resolvedTheme: 'dark' | 'light';
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  onOpenResume: () => void;
  onOpenCommandPalette: () => void;
  language: Language;
  toggleLanguage: () => void;
  t: TranslationDictionary;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  resolvedTheme,
  setTheme,
  toggleTheme,
  onOpenResume,
  onOpenCommandPalette,
  language,
  toggleLanguage,
  t,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: t.nav.home, href: '#home', id: 'home' },
    { name: t.nav.about, href: '#about', id: 'about' },
    { name: t.nav.skills, href: '#skills', id: 'skills' },
    { name: t.nav.services, href: '#services', id: 'services' },
    { name: t.nav.projects, href: '#projects', id: 'projects' },
    { name: t.nav.code, href: '#code-architecture', id: 'code-architecture' },
    { name: t.nav.experience, href: '#experience', id: 'experience' },
    { name: t.nav.testimonials, href: '#testimonials', id: 'testimonials' },
    { name: t.nav.faq, href: '#faq', id: 'faq' },
    { name: t.nav.contact, href: '#contact', id: 'contact' },
  ];

  // Monitor scroll for header background and active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Determine active section
      const sections = navLinks.map((l) => l.id);
      const scrollPos = scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(targetId);
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-slate-950/90 border-b border-slate-200/80 dark:border-slate-800/80 shadow-md backdrop-blur-md py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          id="navbar-brand"
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group flex items-center gap-2.5 focus:outline-none"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Server className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform duration-200" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              PRO <span className="text-indigo-600 dark:text-indigo-400 font-extrabold ml-0.5">SERVERS</span>
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase font-semibold tracking-wider text-slate-400 dark:text-slate-500 -mt-1">
              Full-Stack & Cloud
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/60 p-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                id={`nav-${link.id}`}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-indigo-600 shadow-sm shadow-indigo-500/40'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Command Palette Trigger */}
          <button
            id="navbar-search-btn"
            type="button"
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/80 hover:border-indigo-500/40 text-slate-600 dark:text-slate-300 transition-colors"
            title="Open Quick Search / Command Palette (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden md:inline text-[11px] text-slate-400">Search</span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-500">
              ⌘K
            </kbd>
          </button>

          {/* Language Switcher */}
          <button
            id="navbar-lang-toggle"
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
            title="Switch Language (English / ខ្មែរ)"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-500" />
            <span>{language === 'en' ? 'KM' : 'EN'}</span>
          </button>

          {/* Resume Modal Trigger */}
          <button
            id="navbar-resume-btn"
            type="button"
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-indigo-500/40 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 transition-all duration-200"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t.nav.resume}</span>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle
            theme={theme}
            resolvedTheme={resolvedTheme}
            setTheme={setTheme}
            toggleTheme={toggleTheme}
          />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1.5 xl:hidden">
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={toggleLanguage}
            className="px-2 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-xs font-bold text-indigo-500"
            title="Language"
          >
            {language === 'en' ? 'KM' : 'EN'}
          </button>

          <ThemeToggle
            theme={theme}
            resolvedTheme={resolvedTheme}
            setTheme={setTheme}
            toggleTheme={toggleTheme}
            compact
          />

          <button
            id="mobile-menu-btn"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="xl:hidden px-4 pt-3 pb-6 bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-white"></span>}
                </a>
              );
            })}

            <div className="pt-3 mt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              <button
                id="mobile-nav-resume-btn"
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>{t.nav.resume}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
