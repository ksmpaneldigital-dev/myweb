import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
} from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { ProjectCategory, ProjectItem } from '../types';
import { TranslationDictionary } from '../data/translations';
import { useToast } from './Toast';

interface ProjectsProps {
  t: TranslationDictionary;
}

type SortOption = 'featured' | 'newest' | 'az';

export const Projects: React.FC<ProjectsProps> = ({ t }) => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [modalTab, setModalTab] = useState<'details' | 'preview'>('details');
  const [copiedLink, setCopiedLink] = useState(false);
  const { showToast } = useToast();

  const { projects } = portfolio;

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    projects.forEach((p) => p.tags.forEach((tag) => tagsSet.add(tag)));
    return ['all', ...Array.from(tagsSet)];
  }, [projects]);

  // Filtering & Sorting
  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        // Category filter
        if (activeFilter !== 'all' && project.category !== activeFilter) {
          return false;
        }
        // Tag filter
        if (selectedTag !== 'all' && !project.tags.includes(selectedTag)) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = project.title.toLowerCase().includes(q);
          const matchDesc = project.description.toLowerCase().includes(q);
          const matchTag = project.tags.some((tag) => tag.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchTag) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
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
  }, [projects, activeFilter, selectedTag, searchQuery, sortBy]);

  const handleShareProject = (project: ProjectItem) => {
    const shareUrl = window.location.href.split('#')[0] + '#projects';
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    showToast('Project link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const filterCategories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: t.skills.allTab || 'All Projects' },
    { id: 'react', label: 'React' },
    { id: 'laravel', label: 'Laravel' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'web', label: 'Web Apps' },
    { id: 'app', label: 'Desktop & Tools' },
  ];

  const resetFilters = () => {
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
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.projects.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                {t.projects.sortBy}
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-xs sm:text-sm font-semibold bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="featured">{t.projects.sortFeatured}</option>
                <option value="newest">{t.projects.sortNewest}</option>
                <option value="az">{t.projects.sortAZ}</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100 dark:border-slate-800">
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

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8">
            <FolderGit2 className="w-10 h-10 text-slate-400 mx-auto mb-3 opacity-50" />
            <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
              {t.projects.noResults}
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
            >
              {t.projects.resetFilters}
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="h-full"
                >
                  <Tilt
                    tiltMaxAngleX={8}
                    tiltMaxAngleY={8}
                    perspective={1000}
                    scale={1.02}
                    transitionSpeed={1000}
                    gyroscope={true}
                    glareEnable={true}
                    glareMaxOpacity={0.12}
                    glareColor="#818cf8"
                    glarePosition="all"
                    glareBorderRadius="16px"
                    className="h-full rounded-2xl"
                  >
                    <div className="group flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 overflow-hidden shadow-sm hover:border-indigo-500/50 hover:shadow-2xl transition-all duration-300 h-full">
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
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {project.title}
                          </h3>
                          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                            {project.description}
                          </p>

                          {/* Tags */}
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Actions Bar */}
                      <div className="px-5 py-3.5 sm:px-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => {
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
                      {/* Banner Image */}
                      <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                        <img
                          src={selectedProject.image}
                          alt={selectedProject.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Detailed Description */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
                          Engineering Overview
                        </h4>
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
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>View Repository</span>
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedProject.demoUrl && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-md"
                      >
                        <span>Open Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
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
