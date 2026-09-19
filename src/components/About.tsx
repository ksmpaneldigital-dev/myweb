import React from 'react';
import { motion } from 'motion/react';
import {
  User,
  MapPin,
  Target,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { TranslationDictionary } from '../data/translations';

interface AboutProps {
  t: TranslationDictionary;
}

export const About: React.FC<AboutProps> = ({ t }) => {
  const { personal, about, stats } = portfolio;

  return (
    <section
      id="about"
      className="py-20 lg:py-28 relative bg-slate-100/50 dark:bg-slate-900/30 border-y border-slate-200/80 dark:border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-3">
            <User className="w-3.5 h-3.5" />
            <span>{t.about.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.about.title}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>

        {/* Top Grid: Bio & Personal Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          {/* Left Column: Stylized Portrait / Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group mx-auto max-w-xs sm:max-w-sm w-full">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 opacity-25 group-hover:opacity-50 blur-lg transition-all duration-300" />
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 shadow-lg">
                <div className="aspect-[4/3] sm:aspect-[16/11] rounded-xl overflow-hidden relative">
                  <img
                    src={personal.locationImage || '/images/location.png'}
                    alt={`Location & Work: ${personal.location}`}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== '/images/location.png') {
                        target.src = '/images/location.png';
                      }
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
                    <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                      Location & Work
                    </span>
                    <p className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{personal.location}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: In-depth Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Engineering with clarity, speed, and modern software principles.
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                {about.introduction}
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                {about.background}
              </p>
            </div>

            {/* Core Philosophy & Career Goals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-2.5">
                  <Target className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  {t.about.philosophyTitle}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {about.philosophy}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-2.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  {t.about.careerGoalsTitle}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {about.careerGoals}
                </p>
              </div>
            </div>

            {/* Core Highlights Checklist */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                {t.about.coreStrengths}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {about.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center shadow-sm hover:border-indigo-500/40 transition-colors"
            >
              <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                {stat.label}
              </p>
              {stat.description && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  {stat.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
