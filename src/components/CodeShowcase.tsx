import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Code2, Copy, Check, Terminal, ShieldCheck, Zap, Layers } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { useToast } from './Toast';
import { TranslationDictionary } from '../data/translations';

interface CodeShowcaseProps {
  t: TranslationDictionary;
}

export const CodeShowcase: React.FC<CodeShowcaseProps> = ({ t }) => {
  const [activeSnippetIndex, setActiveSnippetIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const { showToast } = useToast();

  const snippets = portfolio.codeSnippets || [];
  const currentSnippet = snippets[activeSnippetIndex] || snippets[0];

  const handleCopy = () => {
    if (!currentSnippet) return;
    navigator.clipboard.writeText(currentSnippet.code);
    setIsCopied(true);
    showToast(t.code.copied || 'Snippet copied to clipboard!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (snippets.length === 0) return null;

  return (
    <section id="code-architecture" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-4">
            <Code2 className="w-3.5 h-3.5" />
            <span>{t.code.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.code.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            {t.code.subtitle}
          </p>
        </div>

        {/* Snippet Card Container */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
          {/* Top Bar with Language Tabs & Copy Button */}
          <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 gap-3">
            {/* Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              {snippets.map((snip, idx) => {
                const isActive = idx === activeSnippetIndex;
                return (
                  <button
                    key={snip.id}
                    type="button"
                    onClick={() => {
                      setActiveSnippetIndex(idx);
                      setIsCopied(false);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>{snip.tabLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-indigo-400 border border-slate-700">
                {currentSnippet.language}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors border border-slate-700"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">{t.code.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t.code.copyCode}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Snippet Context Info */}
          <div className="px-6 py-4 bg-slate-900/60 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>{currentSnippet.title}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                {currentSnippet.description}
              </p>
            </div>

            {/* Architecture Highlights */}
            {currentSnippet.architectureHighlights && (
              <div className="space-y-1 text-xs text-slate-300 shrink-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-1">
                  {t.code.architectureNotes}
                </p>
                {currentSnippet.architectureHighlights.map((highlight, hIdx) => (
                  <div key={hIdx} className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-[11px] text-slate-300">{highlight}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Code Window with Line Numbers */}
          <div className="p-4 sm:p-6 overflow-x-auto max-h-[460px] font-mono text-xs sm:text-sm text-slate-200 leading-relaxed">
            <pre className="flex">
              {/* Line numbers */}
              <div className="select-none text-slate-600 text-right pr-4 border-r border-slate-800/80 mr-4 font-mono text-xs">
                {currentSnippet.code.split('\n').map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              {/* Code content */}
              <code className="text-slate-100 flex-1 whitespace-pre">
                {currentSnippet.code}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
