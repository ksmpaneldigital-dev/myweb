import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, Building2, CheckCircle2 } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { TranslationDictionary } from '../data/translations';

interface ExperienceProps {
  t: TranslationDictionary;
}

export const Experience: React.FC<ExperienceProps> = ({ t }) => {
  const { experience } = portfolio;

  return (
    <section
      id="experience"
      className="py-20 lg:py-28 relative bg-slate-100/50 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{t.experience.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.experience.title}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.experience.subtitle}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-8 md:pl-0">
          {/* Vertical Track for Desktop & Tablet */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-indigo-500 via-indigo-500/40 to-transparent" />
          {/* Vertical Track for Mobile */}
          <div className="md:hidden absolute left-2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-indigo-500 via-indigo-500/40 to-transparent" />

          <div className="space-y-10 sm:space-y-12">
            {experience.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot Marker (Desktop) */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 w-8 h-8 rounded-full border-4 border-white dark:border-slate-950 bg-indigo-600 text-white items-center justify-center shadow-md z-10">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                  </div>

                  {/* Timeline Dot Marker (Mobile) */}
                  <div className="md:hidden absolute -left-6 top-6 w-5 h-5 rounded-full border-2 border-white dark:border-slate-950 bg-indigo-600 text-white flex items-center justify-center shadow-md z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  </div>

                  {/* Empty Spacer Column for Desktop */}
                  <div className="hidden md:block w-1/2 px-8" />

                  {/* Experience Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="w-full md:w-1/2 px-0 md:px-8"
                  >
                    <div className="p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300">
                      {/* Period Badge & Employment Type */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{item.period}</span>
                        </span>
                        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                          {item.type}
                        </span>
                      </div>

                      {/* Position & Company */}
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {item.position}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-400 mt-1 mb-4">
                        <span className="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">
                          <Building2 className="w-3.5 h-3.5 text-indigo-500" />
                          {item.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-rose-500" />
                          {item.location}
                        </span>
                      </div>

                      {/* Responsibilities / Accomplishments */}
                      <div className="space-y-2 mb-5">
                        {item.description.map((desc, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{desc}</span>
                          </div>
                        ))}
                      </div>

                      {/* Technologies Stack Tags */}
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
