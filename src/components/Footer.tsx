import React, { useState, useEffect } from 'react';
import {
  Server,
  ArrowUp,
  Github,
  Linkedin,
  Facebook,
  Send,
  Youtube,
  Mail,
  Heart,
  Terminal,
  Search,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { TranslationDictionary } from '../data/translations';
import { newsletterService } from '../services/newsletterService';
import { visitorActivityService } from '../services/visitorActivityService';
import { NewsletterSubscriber } from '../types';

interface FooterProps {
  t: TranslationDictionary;
  onOpenTerminal: () => void;
  onOpenCommandPalette: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  t,
  onOpenTerminal,
  onOpenCommandPalette,
}) => {
  const { personal, social } = portfolio;

  const EMAIL_SYNTAX_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'already'>('idle');
  const [message, setMessage] = useState('');
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(() =>
    newsletterService.getSavedSubscribers()
  );
  const [mySubscribedEmail, setMySubscribedEmail] = useState<string | null>(() =>
    newsletterService.getMySubscribedEmail()
  );
  const [visitorStats, setVisitorStats] = useState(() =>
    visitorActivityService.getVisitorStats()
  );

  // Synchronize state with persistent localStorage across browser refreshes and tabs
  useEffect(() => {
    // Read persisted subscribers asynchronously on mount
    newsletterService.getSubscribers().then((list) => {
      setSubscribers(list);
      setMySubscribedEmail(newsletterService.getMySubscribedEmail());
    });

    // Real-time synchronization listener for cross-tab and in-window storage changes
    const unsubscribe = newsletterService.onSubscribersChange((updatedList) => {
      setSubscribers(updatedList);
      setMySubscribedEmail(newsletterService.getMySubscribedEmail());
    });

    const unsubStats = visitorActivityService.onStatsChange((stats) => {
      setVisitorStats(stats);
    });

    return () => {
      unsubscribe();
      unsubStats();
    };
  }, []);

  // Real-time syntax validation computations
  const trimmedEmail = email.trim();
  const isDirty = trimmedEmail.length > 0;
  const isEmailValid = EMAIL_SYNTAX_REGEX.test(trimmedEmail);
  const showInvalidHelper = isDirty && !isEmailValid;
  const showValidHelper = isDirty && isEmailValid;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    // Syntax validation check
    if (!normalizedEmail || !EMAIL_SYNTAX_REGEX.test(normalizedEmail)) {
      setStatus('error');
      setMessage(t.footer.newsletterInvalidEmail);
      return;
    }

    setStatus('loading');

    try {
      const result = await newsletterService.subscribe(normalizedEmail);
      if (result.success) {
        setStatus('success');
        setMessage(t.footer.newsletterSuccess);
        setEmail('');
        setMySubscribedEmail(normalizedEmail);
      } else if (result.code === 'ALREADY_SUBSCRIBED') {
        setStatus('already');
        setMessage(t.footer.newsletterAlreadySubscribed);
      } else {
        setStatus('error');
        setMessage(result.message || t.footer.newsletterInvalidEmail);
      }
    } catch (err) {
      console.error('[Newsletter Service Failure]', err);
      setStatus('error');
      setMessage('Failed to register subscription. Please try again.');
    }
  };

  const quickLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.skills, href: '#skills' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.code, href: '#code-architecture' },
    { name: t.nav.experience, href: '#experience' },
    { name: t.nav.testimonials, href: '#testimonials' },
    { name: t.nav.faq, href: '#faq' },
    { name: t.nav.contact, href: '#contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Newsletter Subscription Banner */}
        <div
          id="footer-newsletter-section"
          className="mb-12 p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 dark:from-slate-900/90 dark:via-slate-900/60 dark:to-indigo-950/20 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-6 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Mail className="w-3.5 h-3.5" />
                <span>Tech & Architecture Newsletter</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {t.footer.newsletterTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                {t.footer.newsletterSubtitle}
              </p>
            </div>

            <div className="lg:col-span-6">
              <form id="newsletter-form" onSubmit={handleSubscribe} className="space-y-2.5">
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5">
                    <div className="relative flex-1">
                      <Mail
                        className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors ${
                          showInvalidHelper
                            ? 'text-rose-500 dark:text-rose-400'
                            : showValidHelper
                            ? 'text-emerald-500 dark:text-emerald-400'
                            : 'text-slate-400'
                        }`}
                      />
                      <input
                        id="newsletter-email-input"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status !== 'idle') setStatus('idle');
                          if (message) setMessage('');
                        }}
                        placeholder={t.footer.newsletterPlaceholder}
                        aria-invalid={showInvalidHelper}
                        aria-describedby={showInvalidHelper ? 'newsletter-email-helper' : undefined}
                        className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-all shadow-sm ${
                          showInvalidHelper
                            ? 'border-rose-400 dark:border-rose-500/80 bg-rose-50/40 dark:bg-rose-950/20 focus:ring-2 focus:ring-rose-400/50'
                            : showValidHelper
                            ? 'border-emerald-400 dark:border-emerald-500/80 bg-emerald-50/30 dark:bg-emerald-950/20 focus:ring-2 focus:ring-emerald-400/50'
                            : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                        }`}
                        disabled={status === 'loading'}
                      />

                      {/* Right-hand real-time validation indicator */}
                      {isDirty && (
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                          {isEmailValid ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 animate-in fade-in zoom-in-75 duration-200" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-rose-500 animate-in fade-in zoom-in-75 duration-200" />
                          )}
                        </div>
                      )}
                    </div>

                    <button
                      id="newsletter-subscribe-btn"
                      type="submit"
                      disabled={status === 'loading' || showInvalidHelper || !isDirty}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{t.footer.newsletterSubscribing}</span>
                        </>
                      ) : (
                        <>
                          <span>{t.footer.newsletterSubscribeBtn}</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Real-time Validation Helper Text */}
                  {showInvalidHelper && (
                    <div
                      id="newsletter-email-helper"
                      role="alert"
                      className="flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 pl-1 pt-0.5 animate-in fade-in duration-150"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{t.footer.newsletterHelperInvalid}</span>
                    </div>
                  )}

                  {showValidHelper && !message && (
                    <div
                      id="newsletter-email-valid-helper"
                      className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 pl-1 pt-0.5 animate-in fade-in duration-150"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{t.footer.newsletterHelperValid}</span>
                    </div>
                  )}
                </div>

                {/* Status Feedback Notice */}
                {message && (
                  <div
                    id="newsletter-status-alert"
                    className={`flex items-center gap-2 text-xs font-medium px-3.5 py-2.5 rounded-xl transition-all ${
                      status === 'success'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {status === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0" />
                    )}
                    <span>{message}</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{t.footer.newsletterPrivacy}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    {mySubscribedEmail && (
                      <span
                        id="newsletter-device-status"
                        className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/20"
                        title={`Subscribed on this browser: ${mySubscribedEmail}`}
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        <span>Subscribed on this device</span>
                      </span>
                    )}
                    {subscribers.length > 0 && (
                      <span id="newsletter-subscriber-counter" className="font-mono text-slate-400 dark:text-slate-500 text-[10px]">
                        {subscribers.length} {subscribers.length === 1 ? 'reader subscribed' : 'readers subscribed'}
                      </span>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-200 dark:border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-lg shadow-indigo-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Server className="w-5 h-5 text-indigo-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  PRO <span className="text-indigo-600 dark:text-indigo-400 font-extrabold ml-0.5">SERVERS</span>
                </span>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  {personal.name} — {personal.title}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              {personal.description}
            </p>

            {/* Interactive Tool Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={onOpenTerminal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                title="Open Interactive Developer CLI"
              >
                <Terminal className="w-3.5 h-3.5 text-indigo-500" />
                <span>Launch CLI Terminal</span>
              </button>

              <button
                type="button"
                onClick={onOpenCommandPalette}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                title="Open Command Palette"
              >
                <Search className="w-3.5 h-3.5 text-indigo-500" />
                <span>Command Palette</span>
                <kbd className="text-[10px] font-mono px-1 rounded bg-slate-200 dark:bg-slate-800">⌘K</kbd>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              {t.footer.quickNav}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-1"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links & Back to Top */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                {t.footer.connect}
              </h4>
              <div className="flex items-center gap-2">
                {social.github && (
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/40 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/40 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {social.telegram && (
                  <a
                    href={social.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-sky-500 hover:border-sky-500/40 transition-colors"
                    aria-label="Telegram"
                  >
                    <Send className="w-4 h-4" />
                  </a>
                )}
                {social.facebook && (
                  <a
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:border-blue-500/40 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {social.youtube && (
                  <a
                    href={social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-rose-500 hover:border-rose-500/40 transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            <div className="pt-6">
              <button
                id="footer-back-to-top-btn"
                type="button"
                onClick={scrollToTop}
                className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
              >
                <span>{t.footer.backToTop}</span>
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:-translate-y-1 transition-transform">
                  <ArrowUp className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Copyright and Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>
            © {new Date().getFullYear()} {personal.name}. {t.footer.rights}
          </p>

          {/* Live Visitor Stats & Status Badge */}
          <div className="flex items-center gap-3 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px]">
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{visitorStats.active} active now</span>
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="font-mono text-slate-600 dark:text-slate-400">
              {visitorStats.total.toLocaleString()} visitors
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span>Built with precision in React, Vite & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
