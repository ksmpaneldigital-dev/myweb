import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code,
  Atom,
  Flame,
  Database,
  Terminal,
  Wrench,
  Sparkles,
  Server,
  Zap,
  Layers,
  Cpu,
  Github,
  GitBranch,
  Laptop,
  Send,
  Cloud,
  HardDrive,
  TableProperties,
  Binary,
  Boxes,
  Wind,
  FileCode2,
  FileCheck,
  Code2,
  Palette,
  Network,
  Container,
  Search,
  CheckCircle,
} from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { SkillCategory, SkillItem } from '../types';
import { TranslationDictionary } from '../data/translations';

interface SkillsProps {
  t: TranslationDictionary;
}

// Helper to render icon component
const renderSkillIcon = (iconName: string) => {
  const iconProps = { className: 'w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform' };
  switch (iconName) {
    case 'Atom':
      return <Atom {...iconProps} className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />;
    case 'Flame':
      return <Flame {...iconProps} className="w-5 h-5 text-rose-500 group-hover:scale-110 transition-transform" />;
    case 'Database':
      return <Database {...iconProps} className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />;
    case 'TableProperties':
      return <TableProperties {...iconProps} className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />;
    case 'HardDrive':
      return <HardDrive {...iconProps} className="w-5 h-5 text-slate-400 group-hover:scale-110 transition-transform" />;
    case 'Cloud':
      return <Cloud {...iconProps} className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />;
    case 'Wind':
      return <Wind {...iconProps} className="w-5 h-5 text-cyan-500 group-hover:scale-110 transition-transform" />;
    case 'Zap':
      return <Zap {...iconProps} className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />;
    case 'FileCheck':
      return <FileCheck {...iconProps} className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />;
    case 'FileCode2':
      return <FileCode2 {...iconProps} className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />;
    case 'Code2':
      return <Code2 {...iconProps} className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />;
    case 'Palette':
      return <Palette {...iconProps} className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />;
    case 'Server':
      return <Server {...iconProps} className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />;
    case 'Cpu':
      return <Cpu {...iconProps} className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />;
    case 'Network':
      return <Network {...iconProps} className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />;
    case 'Layers':
      return <Layers {...iconProps} className="w-5 h-5 text-violet-400 group-hover:scale-110 transition-transform" />;
    case 'Terminal':
      return <Terminal {...iconProps} className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />;
    case 'Boxes':
      return <Boxes {...iconProps} className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />;
    case 'Binary':
      return <Binary {...iconProps} className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />;
    case 'GitBranch':
      return <GitBranch {...iconProps} className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />;
    case 'Github':
      return <Github {...iconProps} className="w-5 h-5 text-slate-300 group-hover:scale-110 transition-transform" />;
    case 'Container':
      return <Container {...iconProps} className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />;
    case 'Laptop':
      return <Laptop {...iconProps} className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />;
    case 'Send':
      return <Send {...iconProps} className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />;
    default:
      return <Code {...iconProps} />;
  }
};

export const Skills: React.FC<SkillsProps> = ({ t }) => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<'all' | 'Expert' | 'Advanced' | 'Proficient'>('all');

  const { skills } = portfolio;

  const categoryTabs = [
    { id: 'all' as const, label: t.skills.allTab, icon: Sparkles },
    { id: 'frontend' as const, label: t.skills.frontendTab, icon: Atom },
    { id: 'backend' as const, label: t.skills.backendTab, icon: Server },
    { id: 'database' as const, label: t.skills.databaseTab, icon: Database },
    { id: 'programming' as const, label: t.skills.programmingTab, icon: Terminal },
    { id: 'tools' as const, label: t.skills.toolsTab, icon: Wrench },
  ];

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      // Category filter
      if (activeCategory !== 'all' && skill.category !== activeCategory) {
        return false;
      }
      // Level filter
      if (levelFilter !== 'all' && skill.level !== levelFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = skill.name.toLowerCase().includes(q);
        const matchCat = skill.category.toLowerCase().includes(q);
        if (!matchName && !matchCat) return false;
      }
      return true;
    });
  }, [skills, activeCategory, levelFilter, searchQuery]);

  return (
    <section id="skills" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>{t.skills.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.skills.title}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.skills.subtitle}
          </p>
        </div>

        {/* Search & Level Filter Controls */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.skills.searchPlaceholder}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Level Filter Pills */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs text-slate-400 font-medium mr-1 whitespace-nowrap">
                Proficiency:
              </span>
              {(['all', 'Expert', 'Advanced', 'Proficient'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevelFilter(lvl)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    levelFilter === lvl
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {lvl === 'all' ? 'All' : lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            {categoryTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`skill-tab-${tab.id}`}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
        >
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="group p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 hover:border-indigo-500/50 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      {renderSkillIcon(skill.icon)}
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        skill.level === 'Expert'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : skill.level === 'Advanced'
                          ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                          : 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20'
                      }`}
                    >
                      {skill.level}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {skill.experienceYears}
                  </p>
                </div>

                {/* Proficiency Visual Bar */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1">
                    <span>Proficiency</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {skill.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
