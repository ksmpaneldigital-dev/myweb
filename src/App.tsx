/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { useLanguage } from './hooks/useLanguage';
import { ToastProvider } from './components/Toast';
import { Navbar } from './components/Navbar';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Services } from './components/Services';
import { Pricing } from './components/Pricing';
import { Projects } from './components/Projects';
import { CodeShowcase } from './components/CodeShowcase';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { CommandPalette } from './components/CommandPalette';
import { DevTerminal } from './components/DevTerminal';
import { SocialShareModal } from './components/SocialShareModal';
import { BackToTop } from './components/BackToTop';
import { FloatingChat } from './components/FloatingChat';
import { FadeInSection } from './components/FadeInSection';
import { useDynamicSEO } from './hooks/useDynamicSEO';
import { Terminal } from 'lucide-react';

export default function App() {
  const { theme, setTheme, resolvedTheme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  // Dynamically update document title, meta descriptions, and OpenGraph/Twitter cards based on active language and viewed section
  useDynamicSEO({ language });

  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState(false);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K for Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      // Backquote ` for Terminal (when not focusing an input or textarea)
      if (
        e.key === '`' &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement) &&
        !(e.target as HTMLElement).isContentEditable
      ) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ToastProvider>
      <div
        id="pro-servers-app"
        className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative selection:bg-indigo-500 selection:text-white"
      >
        {/* Animated Viewport Scroll Progress Bar (Framer Motion) */}
        <ScrollProgressBar />

        {/* Primary Sticky Navigation */}
        <Navbar
          theme={theme}
          resolvedTheme={resolvedTheme}
          setTheme={setTheme}
          toggleTheme={toggleTheme}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenShareCard={() => setIsShareCardOpen(true)}
          language={language}
          toggleLanguage={toggleLanguage}
          t={t}
        />

        {/* Main Content Sections */}
        <main className="flex-grow">
          {/* 1. Hero Section */}
          <Hero
            onOpenResume={() => setIsResumeOpen(true)}
            t={t}
          />

          {/* 2. About Section */}
          <FadeInSection>
            <About t={t} />
          </FadeInSection>

          {/* 3. Skills Section */}
          <FadeInSection>
            <Skills t={t} />
          </FadeInSection>

          {/* 4. Services Section */}
          <FadeInSection>
            <Services t={t} />
          </FadeInSection>

          {/* 4b. Pricing Plans Section */}
          <FadeInSection>
            <Pricing t={t} />
          </FadeInSection>

          {/* 5. Projects Section */}
          <FadeInSection>
            <Projects t={t} />
          </FadeInSection>

          {/* 6. Code & Engineering Architecture Section */}
          <FadeInSection>
            <CodeShowcase t={t} />
          </FadeInSection>

          {/* 7. Experience Timeline Section */}
          <FadeInSection>
            <Experience t={t} />
          </FadeInSection>

          {/* 8. Education & Accreditations Section */}
          <FadeInSection>
            <Education t={t} />
          </FadeInSection>

          {/* 9. Client Testimonials Section */}
          <FadeInSection>
            <Testimonials t={t} />
          </FadeInSection>

          {/* 10. Frequently Asked Questions (FAQ) Section */}
          <FadeInSection>
            <FAQ t={t} />
          </FadeInSection>

          {/* 11. Contact Section */}
          <FadeInSection>
            <Contact t={t} />
          </FadeInSection>
        </main>

        {/* Footer */}
        <Footer
          t={t}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />

        {/* Interactive Resume View & Download Modal */}
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
          t={t}
        />

        {/* Command Palette (Cmd + K) */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenShareCard={() => setIsShareCardOpen(true)}
          theme={theme}
          resolvedTheme={resolvedTheme}
          toggleTheme={toggleTheme}
          language={language}
          toggleLanguage={toggleLanguage}
          t={t}
        />

        {/* Interactive Dev Terminal CLI */}
        <DevTerminal
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
          onOpenResume={() => setIsResumeOpen(true)}
          toggleTheme={toggleTheme}
          toggleLanguage={toggleLanguage}
        />

        {/* Dynamic Social Media Sharing Card (OpenGraph) Modal */}
        <SocialShareModal
          isOpen={isShareCardOpen}
          onClose={() => setIsShareCardOpen(false)}
          language={language}
        />

        {/* Floating Instant Chat Widget */}
        <FloatingChat
          onOpenResume={() => setIsResumeOpen(true)}
          language={language}
        />

        {/* Floating Quick Actions: Back to Top & Dev Terminal */}
        <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-3 pointer-events-none">
          {/* Back to Top floating button (appears after scrolling > 500px) */}
          <BackToTop threshold={500} />

          {/* Open Interactive Terminal CLI */}
          <div className="hidden sm:block pointer-events-auto">
            <button
              type="button"
              onClick={() => setIsTerminalOpen(true)}
              className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-900 dark:bg-slate-800 text-slate-100 dark:text-slate-200 border border-slate-700 shadow-xl hover:bg-slate-800 dark:hover:bg-slate-700 hover:border-indigo-500/50 transition-all duration-200 cursor-pointer"
              title="Open Interactive Terminal CLI (Press `)"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Terminal className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-mono font-semibold">dev@terminal:~</span>
              <kbd className="text-[10px] font-mono px-1 py-0.5 rounded bg-slate-700 text-slate-300">
                `
              </kbd>
            </button>
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}
