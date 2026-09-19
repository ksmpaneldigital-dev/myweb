import React, { useState, useEffect } from 'react';
import {
  Share2,
  Download,
  Copy,
  Check,
  Send,
  Linkedin,
  Twitter,
  Facebook,
  ExternalLink,
  Sparkles,
  Layers,
  Image as ImageIcon,
  Loader2,
  RefreshCw,
  X,
} from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { Language } from '../types';
import { generateSocialCard, downloadSocialCard, OGCardOptions } from '../utils/ogImage';
import { useToast } from './Toast';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currentSection?: string;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  language,
  currentSection = 'home',
}) => {
  const { personal, social } = portfolio;
  const { showToast } = useToast();

  const [previewDataUrl, setPreviewDataUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [activePlatform, setActivePlatform] = useState<'linkedin' | 'telegram' | 'twitter' | 'facebook'>('linkedin');

  // Configurable card fields
  const [customName, setCustomName] = useState(personal.name);
  const [customTitle, setCustomTitle] = useState(personal.title);
  const [customBadge, setCustomBadge] = useState('Portfolio Showcase');
  const [selectedStyle, setSelectedStyle] = useState<'default' | 'architect' | 'fullstack'>('default');

  // Regenerate card whenever options change
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setIsLoading(true);

    const styleHighlights: Record<string, string[]> = {
      default: ['React & TypeScript', 'Laravel & Node.js', 'Distributed Cloud APIs', 'UI/UX Engineering'],
      architect: ['Distributed Systems', 'PostgreSQL & Redis', 'Kubernetes & Docker', 'System Design'],
      fullstack: ['Next.js & Vite', 'REST & GraphQL', 'Tailwind CSS & Motion', 'CI/CD Pipelines'],
    };

    const options: OGCardOptions = {
      name: customName,
      title: customTitle,
      subtitle:
        language === 'km'
          ? 'ស្វែងយល់ពីផលប័ត្រវិស្វកម្មកម្មវិធី កម្មវិធីគេហទំព័រទំនើប និងស្ថាបត្យកម្ម Cloud មាត្រដ្ឋានខ្ពស់។'
          : 'Explore modern web applications, production systems, and clean scalable architecture.',
      sectionBadge: customBadge,
      avatarUrl: personal.avatar || '/images/profile.png',
      highlights: styleHighlights[selectedStyle],
      websiteUrl: typeof window !== 'undefined' ? window.location.host : 'pro-servers.dev',
    };

    generateSocialCard(options)
      .then((url) => {
        if (isMounted) {
          setPreviewDataUrl(url);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, customName, customTitle, customBadge, selectedStyle, language, personal.avatar]);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://pro-servers.dev';
  const shareText = `Check out ${customName} — ${customTitle}! Specializing in high-performance web systems and modern cloud architectures.`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    showToast('Portfolio link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownload = () => {
    downloadSocialCard(
      {
        name: customName,
        title: customTitle,
        sectionBadge: customBadge,
        avatarUrl: personal.avatar,
      },
      `${customName.toLowerCase()}-social-card.png`
    );
    showToast('Social sharing image downloaded (1200x630 PNG)!');
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareToTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="social-share-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="social-share-modal-container"
        className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[1.5px] flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Share2 className="w-4 h-4 text-indigo-400" />
              </div>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Social Media Share Card
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  OpenGraph 1200x630
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Optimized high-res preview cards for LinkedIn, Telegram, Twitter & Messaging apps
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Card Preview Screen */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
                Live Card Rendering
              </span>
              <div className="flex items-center gap-2">
                {/* Platform tabs */}
                <button
                  type="button"
                  onClick={() => setActivePlatform('linkedin')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    activePlatform === 'linkedin'
                      ? 'bg-blue-600/30 text-blue-400 border border-blue-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  LinkedIn
                </button>
                <button
                  type="button"
                  onClick={() => setActivePlatform('telegram')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    activePlatform === 'telegram'
                      ? 'bg-sky-600/30 text-sky-400 border border-sky-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Telegram
                </button>
                <button
                  type="button"
                  onClick={() => setActivePlatform('twitter')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    activePlatform === 'twitter'
                      ? 'bg-slate-700 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  X / Twitter
                </button>
              </div>
            </div>

            {/* Platform mock wrapper */}
            <div className="p-3 sm:p-4 rounded-xl bg-slate-950 border border-slate-800/80">
              {/* Simulated Social Card */}
              <div className="relative aspect-[1200/630] w-full rounded-lg overflow-hidden border border-slate-800 shadow-xl bg-slate-900 flex items-center justify-center">
                {isLoading ? (
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                    <span className="text-xs font-mono">Rendering dynamic canvas card...</span>
                  </div>
                ) : (
                  <img
                    src={previewDataUrl}
                    alt={`${customName} Social Share Card`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>

              {/* Social Link preview metadata simulate */}
              <div className="mt-3 pt-3 border-t border-slate-900 flex items-center justify-between text-xs text-slate-400">
                <span className="truncate font-mono text-[11px] text-slate-500">
                  {currentUrl}
                </span>
                <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  og:image ready (1200×630px)
                </span>
              </div>
            </div>
          </div>

          {/* Quick Customization Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Professional Title
              </label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Section / Context Badge
              </label>
              <select
                value={customBadge}
                onChange={(e) => setCustomBadge(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Portfolio Showcase">Portfolio Showcase</option>
                <option value="Senior Full-Stack Developer">Senior Full-Stack Developer</option>
                <option value="Cloud Architect & DevOps">Cloud Architect & DevOps</option>
                <option value="Featured Projects">Featured Projects</option>
                <option value="Architecture & Code">Architecture & Code</option>
                <option value="Open for Contracts">Open for Contracts</option>
              </select>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              Focus Presets:
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedStyle('default');
                setCustomTitle('Senior Full-Stack Developer & Software Architect');
                setCustomBadge('Portfolio Showcase');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedStyle === 'default'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              Full-Stack & Cloud
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedStyle('architect');
                setCustomTitle('Cloud Systems Architect & Distributed Systems Lead');
                setCustomBadge('Cloud Architect');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedStyle === 'architect'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              Software Architect
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedStyle('fullstack');
                setCustomTitle('Modern Frontend & Full-Stack React Specialist');
                setCustomBadge('Frontend Specialist');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedStyle === 'fullstack'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              React & UI/UX Specialist
            </button>
          </div>
        </div>

        {/* Modal Footer with One-Click Share Buttons & Download */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/60 flex flex-wrap items-center justify-between gap-3">
          {/* Direct Social Media Triggers */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={shareToLinkedIn}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#0A66C2] hover:bg-[#084e96] text-white shadow-sm transition-all"
            >
              <Linkedin className="w-3.5 h-3.5 fill-current" />
              <span>Share on LinkedIn</span>
            </button>

            <button
              type="button"
              onClick={shareToTelegram}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#229ED9] hover:bg-[#1a85b9] text-white shadow-sm transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Share on Telegram</span>
            </button>

            <button
              type="button"
              onClick={shareToTwitter}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all"
            >
              <Twitter className="w-3.5 h-3.5" />
              <span>Post to X</span>
            </button>

            <button
              type="button"
              onClick={shareToFacebook}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#1877F2] hover:bg-[#125ec5] text-white shadow-sm transition-all"
            >
              <Facebook className="w-3.5 h-3.5 fill-current" />
              <span>Facebook</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied Link' : 'Copy Link'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-lg shadow-indigo-500/20 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Card (PNG)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
