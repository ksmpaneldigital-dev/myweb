import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import {
  FolderGit2,
  ExternalLink,
  Github,
  Sparkles,
  Layers,
  CheckCircle2,
  Info,
  X,
  Search,
  SlidersHorizontal,
  Smartphone,
  Tablet,
  Monitor,
  Share2,
  Check,
  RefreshCw,
  Code2,
  Server,
  Cloud,
  Terminal as TerminalIcon,
  Clock,
  LayoutGrid,
  List,
  ListChecks,
  Lightbulb,
  Wrench,
} from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { ProjectCategory, ProjectItem } from '../types';
import { TranslationDictionary } from '../data/translations';
import { useToast } from './Toast';
import { calculateReadingTime } from '../utils/readingTime';
import { fuzzySearchProjects } from '../utils/fuzzySearch';

interface ProjectsProps {
  t: TranslationDictionary;
}

type SortOption = 'featured' | 'newest' | 'az';
export type TechStackFilter = 'all' | 'react' | 'nodejs' | 'cloud' | 'laravel' | 'python';
export type ViewMode = 'grid' | 'list';

interface TechStackOption {
  id: TechStackFilter;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  activeBg: string;
  activeBorder: string;
  keywords: string[];
}

// Staggered entrance animation variants for project cards (sliding gracefully from the bottom)
const projectGridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

const projectCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 24,
      mass: 0.8,
      delay: Math.min(index * 0.08, 0.64),
    },
  }),
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

const projectListContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

const projectListCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 24,
      mass: 0.8,
      delay: Math.min(index * 0.06, 0.48),
    },
  }),
  exit: {
    opacity: 0,
    y: 15,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

export const Projects: React.FC<ProjectsProps> = ({ t }) => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const [selectedTechStack, setSelectedTechStack] = useState<TechStackFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('proservers_projects_view_mode');
        if (saved === 'grid' || saved === 'list') return saved;
      } catch {}
    }
    return 'grid';
  });
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [modalTab, setModalTab] = useState<'details' | 'preview'>('details');
  const [copiedLink, setCopiedLink] = useState(false);
  const { showToast } = useToast();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input when user presses '/' anywhere outside editable fields
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll and listen for Escape key when project modal is open
  useEffect(() => {
    const handleModalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
      }
    };

    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleModalKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleModalKeyDown);
    };
  }, [selectedProject]);

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    try {
      localStorage.setItem('proservers_projects_view_mode', mode);
    } catch {}
  };

  const { projects } = portfolio;

  // Curated Tech Stacks for quick targeted narrowing
  const techStackOptions: TechStackOption[] = useMemo(
    () => [
      {
        id: 'all',
        label: t.projects.allStacks || 'All Stacks',
        icon: Code2,
        color: 'text-indigo-500',
        activeBg: 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30',
        activeBorder: 'border-indigo-500',
        keywords: [],
      },
      {
        id: 'react',
        label: 'React',
        icon: Code2,
        color: 'text-cyan-500',
        activeBg: 'bg-cyan-600 text-white shadow-sm shadow-cyan-600/30',
        activeBorder: 'border-cyan-500',
        keywords: ['react', 'next.js', 'vite'],
      },
      {
        id: 'nodejs',
        label: 'Node.js',
        icon: Server,
        color: 'text-emerald-500',
        activeBg: 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30',
        activeBorder: 'border-emerald-500',
        keywords: ['node.js', 'node', 'express', 'nestjs'],
      },
      {
        id: 'cloud',
        label: 'Cloud',
        icon: Cloud,
        color: 'text-blue-500',
        activeBg: 'bg-blue-600 text-white shadow-sm shadow-blue-600/30',
        activeBorder: 'border-blue-500',
        keywords: ['cloud', 'firebase', 'docker', 'redis', 'postgresql', 'aws', 'gcp'],
      },
      {
        id: 'laravel',
        label: 'Laravel',
        icon: Server,
        color: 'text-rose-500',
        activeBg: 'bg-rose-600 text-white shadow-sm shadow-rose-600/30',
        activeBorder: 'border-rose-500',
        keywords: ['laravel', 'php'],
      },
      {
        id: 'python',
        label: 'Python',
        icon: TerminalIcon,
        color: 'text-amber-500',
        activeBg: 'bg-amber-600 text-white shadow-sm shadow-amber-600/30',
        activeBorder: 'border-amber-500',
        keywords: ['python', 'automation', 'c#', 'sqlite'],
      },
    ],
    [t.projects.allStacks]
  );

  // Calculate project count for each tech stack
  const stackCounts = useMemo(() => {
    const counts: Record<TechStackFilter, number> = {
      all: projects.length,
      react: 0,
      nodejs: 0,
      cloud: 0,
      laravel: 0,
      python: 0,
    };

    projects.forEach((project) => {
      const allText = [
        ...project.tags,
        project.category,
        project.title,
        project.description,
        project.longDescription || '',
      ]
        .join(' ')
        .toLowerCase();

      techStackOptions.forEach((option) => {
        if (option.id === 'all') return;
        const matches = option.keywords.some((kw) => allText.includes(kw));
        if (matches) {
          counts[option.id] += 1;
        }
      });
    });

    return counts;
  }, [projects, techStackOptions]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    projects.forEach((p) => p.tags.forEach((tag) => tagsSet.add(tag)));
    return ['all', ...Array.from(tagsSet)];
  }, [projects]);

  // Filtering & Fuzzy Sorting
  const filteredProjects = useMemo(() => {
    // 1. Initial filter by stack, category, and tag
    let candidates = projects.filter((project) => {
      // Tech Stack filter
      if (selectedTechStack !== 'all') {
        const targetOption = techStackOptions.find((o) => o.id === selectedTechStack);
        if (targetOption && targetOption.keywords.length > 0) {
          const projectText = [
            ...project.tags,
            project.category,
            project.title,
            project.description,
            project.longDescription || '',
          ]
            .join(' ')
            .toLowerCase();

          const matchesStack = targetOption.keywords.some((kw) => projectText.includes(kw));
          if (!matchesStack) return false;
        }
      }

      // Category filter
      if (activeFilter !== 'all' && project.category !== activeFilter) {
        return false;
      }
      // Tag filter
      if (selectedTag !== 'all' && !project.tags.includes(selectedTag)) {
        return false;
      }

      return true;
    });

    const scoresMap = new Map<number, number>();

    // 2. Fuzzy Search on title, description, and keywords
    if (searchQuery.trim()) {
      const fuzzyResults = fuzzySearchProjects(searchQuery, candidates);
      fuzzyResults.forEach((res) => {
        scoresMap.set(res.item.id, res.score);
      });
      candidates = fuzzyResults.map((r) => r.item);
    }

    // 3. Sorting (relevance prioritized when search query is typed, or user-selected criteria)
    return candidates.sort((a, b) => {
      if (searchQuery.trim() && sortBy === 'featured') {
        const scoreA = scoresMap.get(a.id) || 0;
        const scoreB = scoresMap.get(b.id) || 0;
        if (scoreB !== scoreA) {
          return scoreB - scoreA;
        }
      }

      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.id - b.id;
      } else if (sortBy === 'newest') {
        return b.id - a.id;
      } else if (sortBy === 'az') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [projects, selectedTechStack, activeFilter, selectedTag, searchQuery, sortBy, techStackOptions]);

  const handleShareProject = (project: ProjectItem) => {
    const shareUrl = window.location.href.split('#')[0] + '#projects';
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    showToast('Project link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const filterCategories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: t.skills.allTab || 'All Categories' },
    { id: 'react', label: 'React' },
    { id: 'laravel', label: 'Laravel' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'web', label: 'Web Apps' },
    { id: 'app', label: 'Desktop & Tools' },
  ];

  const resetFilters = () => {
    setSelectedTechStack('all');
    setActiveFilter('all');
    setSelectedTag('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <section id="projects" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>{t.projects.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.projects.title}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Search, Filter & Sort Control Bar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Fuzzy Search Bar */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setSearchQuery('');
                    searchInputRef.current?.blur();
                  }
                }}
                placeholder={t.projects.searchPlaceholder}
                className="w-full pl-10 pr-20 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
              />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    title={t.projects.clearSearch}
                    aria-label={t.projects.clearSearch}
                    className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => searchInputRef.current?.focus()}
                    title="Press / to search"
                    className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-semibold text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-xs hover:border-slate-300 dark:hover:border-slate-600 transition-colors cursor-pointer"
                  >
                    /
                  </button>
                )}
              </div>
            </div>

            {/* Controls: Sort & View Mode Toggle */}
            <div className="flex items-center gap-3 shrink-0 flex-wrap justify-between sm:justify-end">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                  {t.projects.sortBy}
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="text-xs sm:text-sm font-semibold bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="featured">{t.projects.sortFeatured}</option>
                  <option value="newest">{t.projects.sortNewest}</option>
                  <option value="az">{t.projects.sortAZ}</option>
                </select>
              </div>

              {/* View Mode Toggle: Grid vs List */}
              <div
                className="inline-flex items-center p-1 bg-slate-100 dark:bg-slate-800/90 rounded-xl border border-slate-200/80 dark:border-slate-700/80"
                role="group"
                aria-label="View Mode Toggle"
              >
                <button
                  id="projects-view-grid-btn"
                  type="button"
                  onClick={() => handleViewModeChange('grid')}
                  aria-pressed={viewMode === 'grid'}
                  title={t.projects.gridView}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>{t.projects.gridView}</span>
                </button>
                <button
                  id="projects-view-list-btn"
                  type="button"
                  onClick={() => handleViewModeChange('list')}
                  aria-pressed={viewMode === 'list'}
                  title={t.projects.listView}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>{t.projects.listView}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Fuzzy Search Status Indicator */}
          {searchQuery.trim() && (
            <div className="flex items-center justify-between text-xs px-1 py-1.5 bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 rounded-xl">
              <div className="flex items-center gap-2 flex-wrap px-2">
                <span className="inline-flex items-center gap-1 font-semibold text-indigo-700 dark:text-indigo-300">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
                  <span>{t.projects.fuzzySearchActive}</span>
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="text-slate-600 dark:text-slate-400">
                  Matches found:{' '}
                  <strong className="text-slate-900 dark:text-white font-bold">
                    {filteredProjects.length}
                  </strong>{' '}
                  {filteredProjects.length === 1 ? 'project' : 'projects'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="px-2.5 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors cursor-pointer"
              >
                {t.projects.clearSearch}
              </button>
            </div>
          )}

          {/* Primary Tech Stack Filter System (React, Node.js, Cloud, etc.) */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                  {t.projects.filterByStack || 'Tech Stack Filter:'}
                </span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                  (Click to toggle tech stack)
                </span>
              </div>
              {selectedTechStack !== 'all' && (
                <button
                  type="button"
                  onClick={() => setSelectedTechStack('all')}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline self-start sm:self-auto inline-flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Clear Tech Filter</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {techStackOptions.map((stack) => {
                const isActive = selectedTechStack === stack.id;
                const Icon = stack.icon;
                const count = stackCounts[stack.id] || 0;

                return (
                  <button
                    key={stack.id}
                    id={`project-stack-${stack.id}`}
                    type="button"
                    onClick={() => setSelectedTechStack(stack.id)}
                    className={`group flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                      isActive
                        ? `${stack.activeBg} ${stack.activeBorder}`
                        : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-white' : stack.color
                      }`}
                    />
                    <span>{stack.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-200/70 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1 shrink-0">
              Category:
            </span>
            {filterCategories.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  id={`project-filter-${filter.id}`}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* Tech Tag Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 shrink-0">
              {t.projects.filterByTag}
            </span>
            {allTags.slice(0, 10).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap transition-colors ${
                  selectedTag === tag
                    ? 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/50 font-bold'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tag === 'all' ? 'All Tags' : `#${tag}`}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Display: Empty State or Grid/List */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8">
            <Search className="w-10 h-10 text-slate-400 mx-auto mb-3 opacity-50" />
            <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
              {t.projects.noResults}
            </p>
            {searchQuery && (
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                No matching projects found for &ldquo;{searchQuery}&rdquo;.
              </p>
            )}
            <div className="mt-4 flex items-center justify-center gap-2">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  {t.projects.clearSearch}
                </button>
              )}
              <button
                type="button"
                onClick={resetFilters}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors cursor-pointer"
              >
                {t.projects.resetFilters}
              </button>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <motion.div
            key="projects-grid-view"
            layout
            variants={projectGridContainerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  custom={index}
                  variants={projectCardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{
                    y: -6,
                    scale: 1.025,
                    transition: { type: 'spring', stiffness: 350, damping: 22 },
                  }}
                  className="h-full transform-gpu"
                >
                  <Tilt
                    tiltMaxAngleX={6}
                    tiltMaxAngleY={6}
                    perspective={1000}
                    scale={1.01}
                    transitionSpeed={500}
                    gyroscope={true}
                    glareEnable={true}
                    glareMaxOpacity={0.12}
                    glareColor="#818cf8"
                    glarePosition="all"
                    glareBorderRadius="16px"
                    className="h-full rounded-2xl"
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        setSelectedProject(project);
                        setModalTab('details');
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedProject(project);
                          setModalTab('details');
                        }
                      }}
                      className="group flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 overflow-hidden shadow-sm hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 h-full cursor-pointer"
                    >
                      <div>
                        {/* Project Image Preview with Overlay */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                          {/* Featured Star Badge */}
                          {project.featured && (
                            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-indigo-600/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              <span>Featured</span>
                            </div>
                          )}

                          {/* Metrics Pill */}
                          {project.metrics && (
                            <div className="absolute bottom-3 left-3 right-3 px-2.5 py-1 rounded-lg bg-slate-900/85 backdrop-blur-md border border-slate-700/60 text-[11px] font-medium text-emerald-400 truncate">
                              {project.metrics}
                            </div>
                          )}
                        </div>

                        {/* Content Body */}
                        <div className="p-5 sm:p-6">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {project.title}
                            </h3>
                            {(() => {
                              const readTime = calculateReadingTime(
                                [
                                  project.title,
                                  project.longDescription || project.description,
                                  project.metrics,
                                  ...project.tags,
                                ],
                                200,
                                t.projects.readTimeSuffix || 'min read'
                              );
                              return (
                                <span
                                  className="shrink-0 inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/90 px-2 py-0.5 rounded-md border border-slate-200/80 dark:border-slate-700/80"
                                  title={`Estimated reading time: ~${readTime.words} words`}
                                >
                                  <Clock className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                                  <span>{readTime.text}</span>
                                </span>
                              );
                            })()}
                          </div>
                          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                            {project.description}
                          </p>

                          {/* Tags */}
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {project.tags.map((tag) => {
                              const isTagSelected = selectedTag === tag;
                              return (
                                <button
                                  key={tag}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedTag(isTagSelected ? 'all' : tag);
                                  }}
                                  className={`px-2 py-0.5 rounded-md text-[10px] font-mono transition-colors cursor-pointer border ${
                                    isTagSelected
                                      ? 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/60 font-bold'
                                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700/60 hover:border-indigo-400 dark:hover:border-indigo-500'
                                  }`}
                                  title={`Filter by tag #${tag}`}
                                >
                                  #{tag}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Actions Bar */}
                      <div className="px-5 py-3.5 sm:px-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                            setModalTab('details');
                          }}
                          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                        >
                          <Info className="w-3.5 h-3.5" />
                          <span>{t.projects.details}</span>
                        </button>

                        <div className="flex items-center gap-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                              title="View Source on GitHub"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-sm"
                            >
                              <span>{t.projects.liveDemo}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* List View */
          <motion.div
            key="projects-list-view"
            layout
            variants={projectListContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4 sm:gap-5"
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => {
                const readTime = calculateReadingTime(
                  [
                    project.title,
                    project.longDescription || project.description,
                    project.metrics,
                    ...project.tags,
                  ],
                  200,
                  t.projects.readTimeSuffix || 'min read'
                );

                return (
                  <motion.div
                    key={project.id}
                    layout
                    custom={index}
                    variants={projectListCardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover={{
                      y: -3,
                      scale: 1.012,
                      transition: { type: 'spring', stiffness: 350, damping: 22 },
                    }}
                    className="w-full transform-gpu"
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        setSelectedProject(project);
                        setModalTab('details');
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedProject(project);
                          setModalTab('details');
                        }
                      }}
                      className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 overflow-hidden shadow-sm hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 p-4 sm:p-5 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between cursor-pointer"
                    >
                      {/* Left Image Thumbnail */}
                      <div
                        className="relative w-full md:w-60 lg:w-72 aspect-[16/10] overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0"
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                        {/* Featured Star Badge */}
                        {project.featured && (
                          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-indigo-600/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            <span>Featured</span>
                          </div>
                        )}

                        {/* Category Badge */}
                        <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-slate-900/80 text-slate-200 text-[10px] font-mono uppercase tracking-wider backdrop-blur-md">
                          {project.category}
                        </div>
                      </div>

                      {/* Middle Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <h3
                            onClick={() => {
                              setSelectedProject(project);
                              setModalTab('details');
                            }}
                            className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors cursor-pointer"
                          >
                            {project.title}
                          </h3>

                          {/* Metrics Pill */}
                          {project.metrics && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>{project.metrics}</span>
                            </span>
                          )}

                          {/* Reading Time */}
                          <span
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/90 px-2 py-0.5 rounded-md border border-slate-200/80 dark:border-slate-700/80"
                            title={`Estimated reading time: ~${readTime.words} words`}
                          >
                            <Clock className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                            <span>{readTime.text}</span>
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 md:line-clamp-3 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => {
                            const isTagSelected = selectedTag === tag;
                            return (
                              <button
                                key={tag}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedTag(isTagSelected ? 'all' : tag);
                                }}
                                className={`px-2 py-0.5 rounded-md text-[10px] font-mono transition-colors cursor-pointer border ${
                                  isTagSelected
                                    ? 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/60 font-bold'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700/60 hover:border-indigo-400 dark:hover:border-indigo-500'
                                }`}
                                title={`Filter by tag #${tag}`}
                              >
                                #{tag}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right Actions */}
                      <div className="shrink-0 flex flex-row md:flex-col items-center md:items-stretch justify-between md:justify-center gap-2 w-full md:w-44 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-sm"
                          >
                            <span>{t.projects.liveDemo}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                            setModalTab('details');
                          }}
                          className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                        >
                          <Info className="w-3.5 h-3.5 text-indigo-500" />
                          <span>{t.projects.details}</span>
                        </button>

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="View Source on GitHub"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>{t.projects.sourceCode}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Project Detail & Live Frame Simulator Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div
              id="project-detail-modal-overlay"
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                id="project-detail-modal-container"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg truncate">
                      {selectedProject.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Share button */}
                    <button
                      type="button"
                      onClick={() => handleShareProject(selectedProject)}
                      className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                      title="Share Project Link"
                    >
                      {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                    </button>
                    {/* Close button */}
                    <button
                      type="button"
                      onClick={() => setSelectedProject(null)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Modal Tabs Bar */}
                <div className="flex items-center justify-between px-6 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-950/40">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setModalTab('details')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        modalTab === 'details'
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Architecture & Overview
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalTab('preview')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        modalTab === 'preview'
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Interactive Frame Simulator
                    </button>
                  </div>

                  {modalTab === 'preview' && (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setPreviewDevice('desktop')}
                        className={`p-1.5 rounded ${previewDevice === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                        title="Desktop Preview"
                      >
                        <Monitor className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewDevice('tablet')}
                        className={`p-1.5 rounded ${previewDevice === 'tablet' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                        title="Tablet Preview"
                      >
                        <Tablet className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewDevice('mobile')}
                        className={`p-1.5 rounded ${previewDevice === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                        title="Mobile Preview"
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Modal Scrollable Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {modalTab === 'details' ? (
                    <>
                      {/* Banner Image & Direct Action Bar */}
                      <div className="space-y-4">
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900">
                          <img
                            src={selectedProject.image}
                            alt={selectedProject.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />

                          {/* Category & Featured Pills */}
                          <div className="absolute top-3 left-3 flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-mono uppercase tracking-wider border border-slate-700/60">
                              {selectedProject.category}
                            </span>
                            {selectedProject.featured && (
                              <span className="px-2.5 py-1 rounded-lg bg-indigo-600/90 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                <span>Featured</span>
                              </span>
                            )}
                          </div>

                          {/* Direct Links Floating on Banner */}
                          <div className="absolute bottom-3 right-3 flex items-center gap-2">
                            {selectedProject.githubUrl && (
                              <a
                                href={selectedProject.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700/80 backdrop-blur-md transition-colors"
                              >
                                <Github className="w-3.5 h-3.5" />
                                <span>Source Code</span>
                              </a>
                            )}
                            {selectedProject.demoUrl && (
                              <a
                                href={selectedProject.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 backdrop-blur-md transition-colors"
                              >
                                <span>Live Demo</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Detailed Description */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                            Engineering Overview
                          </h4>
                          {(() => {
                            const modalReadingTime = calculateReadingTime(
                              [
                                selectedProject.title,
                                selectedProject.longDescription || selectedProject.description,
                                selectedProject.metrics,
                                ...(selectedProject.features || []),
                                ...(selectedProject.challenges?.map(c => `${c.challenge} ${c.solution}`) || []),
                                ...selectedProject.tags,
                              ],
                              190,
                              t.projects.readTimeSuffix || 'min read'
                            );
                            return (
                              <span
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                                title="Estimated reading time for this case study"
                              >
                                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                                <span>{modalReadingTime.text}</span>
                                <span className="text-slate-300 dark:text-slate-600">•</span>
                                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                                  ~{modalReadingTime.words} words
                                </span>
                              </span>
                            );
                          })()}
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          {selectedProject.longDescription || selectedProject.description}
                        </p>
                      </div>

                      {/* Performance / Metrics */}
                      {selectedProject.metrics && (
                        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          <div>
                            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                              Production Metrics
                            </p>
                            <p className="text-xs text-emerald-600 dark:text-emerald-300">
                              {selectedProject.metrics}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Key Features & Capabilities */}
                      {selectedProject.features && selectedProject.features.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="p-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                              <ListChecks className="w-4 h-4" />
                            </div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                              Key Features & Functional Highlights
                            </h4>
                          </div>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {selectedProject.features.map((feature, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-snug"
                              >
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Technical Challenges Overcome */}
                      {selectedProject.challenges && selectedProject.challenges.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="p-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
                              <Lightbulb className="w-4 h-4" />
                            </div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                              Technical Challenges & Engineering Solutions
                            </h4>
                          </div>
                          <div className="space-y-3">
                            {selectedProject.challenges.map((item, idx) => (
                              <div
                                key={idx}
                                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-2.5"
                              >
                                <div className="flex items-start gap-2.5">
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 shrink-0">
                                    Challenge
                                  </span>
                                  <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                                    {item.challenge}
                                  </p>
                                </div>
                                <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 shrink-0">
                                    Solution
                                  </span>
                                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {item.solution}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Technologies Employed */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
                          Technologies & Frameworks
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Interactive Frame Simulator */
                    <div className="flex flex-col items-center justify-center py-4">
                      {/* Browser Mock Chrome */}
                      <div
                        className={`w-full transition-all duration-300 border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden shadow-xl bg-slate-950 ${
                          previewDevice === 'mobile'
                            ? 'max-w-xs'
                            : previewDevice === 'tablet'
                            ? 'max-w-lg'
                            : 'max-w-full'
                        }`}
                      >
                        {/* URL Bar */}
                        <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                          </div>
                          <div className="flex-1 mx-3 px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono text-slate-300 truncate text-center">
                            {selectedProject.demoUrl || 'https://demo.proservers.dev'}
                          </div>
                          <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                        </div>

                        {/* Embedded Mock View */}
                        <div className="aspect-[16/10] relative bg-slate-900 overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                          <img
                            src={selectedProject.image}
                            alt={selectedProject.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-30"
                          />
                          <div className="relative z-10 p-6 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800 max-w-sm">
                            <Layers className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                            <h4 className="text-sm font-bold text-white mb-1">
                              {selectedProject.title}
                            </h4>
                            <p className="text-xs text-slate-400 mb-4">
                              Interactive sandbox preview container configured for {previewDevice} mode.
                            </p>
                            {selectedProject.demoUrl ? (
                              <a
                                href={selectedProject.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-md"
                              >
                                <span>Launch Live Instance</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            ) : (
                              <span className="text-xs text-slate-500">
                                Internal tool or desktop deployment
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90">
                  <div className="flex items-center gap-2">
                    {selectedProject.githubUrl ? (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400 font-mono">
                        Proprietary / Internal Repository
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(null)}
                      className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                    >
                      Close
                    </button>
                    {selectedProject.demoUrl && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-md shadow-indigo-600/20"
                      >
                        <span>Open Live Demo</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
