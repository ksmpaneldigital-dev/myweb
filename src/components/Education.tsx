import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  Award,
  Calendar,
  ExternalLink,
  Sparkles,
  BookOpen,
  ArrowRight,
  ZoomIn,
  X,
  Play,
  Video,
  Eye,
  Film,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
  Images,
} from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { TranslationDictionary } from '../data/translations';

interface EducationProps {
  t: TranslationDictionary;
}

const COURSE_SLIDES = [
  {
    id: '1symuOD31pdU1cRRlMCYEcx3Hm-Ugy67E',
    label: 'Slide 1',
    title: 'Course Overview & AI Roadmap',
    driveUrl: 'https://lh3.googleusercontent.com/d/1symuOD31pdU1cRRlMCYEcx3Hm-Ugy67E=w1200',
    localFallback: '/images/course_slide_1.png',
  },
  {
    id: '1-QQXNp90TLMYJVQx4Qr4MJ6EHGIYEQDr',
    label: 'Slide 2',
    title: 'Idea to Modern UI & Design',
    driveUrl: 'https://lh3.googleusercontent.com/d/1-QQXNp90TLMYJVQx4Qr4MJ6EHGIYEQDr=w1200',
    localFallback: '/images/course_slide_2.png',
  },
  {
    id: '1VJUp59q21lxIyIAjBeVci1P_QU9u4sXT',
    label: 'Slide 3',
    title: 'Code Gen, APIs & Database',
    driveUrl: 'https://lh3.googleusercontent.com/d/1VJUp59q21lxIyIAjBeVci1P_QU9u4sXT=w1200',
    localFallback: '/images/course_slide_3.png',
  },
  {
    id: '18nvI9AFs8ePmD31XVOlV8h4whzHt8VTv',
    label: 'Slide 4',
    title: 'Automation, Testing & Launch',
    driveUrl: 'https://lh3.googleusercontent.com/d/18nvI9AFs8ePmD31XVOlV8h4whzHt8VTv=w1200',
    localFallback: '/images/course_slide_4.png',
  },
  {
    id: '1W5u5VtrNBB6ng3LxBSVfledKl6p4MYOr',
    label: 'Preview',
    title: 'Course Dashboard & Community Snapshot',
    driveUrl: 'https://lh3.googleusercontent.com/d/1W5u5VtrNBB6ng3LxBSVfledKl6p4MYOr=w1200',
    localFallback: '/images/screenshot.jpg',
  },
];

const DRIVE_FOLDER_URL =
  'https://drive.google.com/drive/folders/1StkzAUAKYQhSXAhnFCVk0Gl9VP4ruHg0';

export const Education: React.FC<EducationProps> = ({ t }) => {
  const { education } = portfolio;
  const featuredCourse = education.find((item) => item.isCourse);
  const formalEducation = education.filter((item) => !item.isCourse);

  const videoDriveUrl =
    featuredCourse?.videoUrl ||
    featuredCourse?.link ||
    'https://drive.google.com/file/d/1YXKf2l1o1dCC5SPxNdv1TGAAbChA9Y6K/view?usp=drivesdk';

  // Extract Google Drive ID to generate standard embed preview URL
  const extractDriveEmbedUrl = (url: string) => {
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return 'https://drive.google.com/file/d/1YXKf2l1o1dCC5SPxNdv1TGAAbChA9Y6K/preview';
  };

  const driveEmbedUrl = extractDriveEmbedUrl(videoDriveUrl);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [courseImgSrc, setCourseImgSrc] = useState(COURSE_SLIDES[0].driveUrl);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<'video' | 'image'>('image');
  const [isPlayingInline, setIsPlayingInline] = useState(false);

  const currentSlide = COURSE_SLIDES[activeSlideIndex] || COURSE_SLIDES[0];

  const handleSelectSlide = (index: number) => {
    setActiveSlideIndex(index);
    setCourseImgSrc(COURSE_SLIDES[index].driveUrl);
    setIsPlayingInline(false);
  };

  const nextSlide = () => {
    const next = (activeSlideIndex + 1) % COURSE_SLIDES.length;
    handleSelectSlide(next);
  };

  const prevSlide = () => {
    const prev = (activeSlideIndex - 1 + COURSE_SLIDES.length) % COURSE_SLIDES.length;
    handleSelectSlide(prev);
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openVideoModal = () => {
    setActiveModalTab('video');
    setIsMediaModalOpen(true);
  };

  const openImageModal = (slideIndex?: number) => {
    if (typeof slideIndex === 'number') {
      handleSelectSlide(slideIndex);
    }
    setActiveModalTab('image');
    setIsMediaModalOpen(true);
  };

  return (
    <section id="education" className="py-20 lg:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{t.education.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.education.title}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.education.subtitle}
          </p>
        </div>

        {/* 1. Featured Flagship Course: BUILD SOFTWARE WITH AI */}
        {featuredCourse && (
          <motion.div
            id="featured-ai-course-card"
            className="mb-16 rounded-3xl border border-indigo-200/80 dark:border-indigo-900/60 bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900/90 dark:to-slate-950/80 p-6 sm:p-8 lg:p-10 shadow-xl shadow-indigo-500/5 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-violet-500/10 dark:bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Media Column (Left) */}
              <div className="lg:col-span-5 flex flex-col space-y-4">
                {isPlayingInline ? (
                  /* Inline Video Player View */
                  <div
                    id="course-inline-video-container"
                    className="relative rounded-2xl overflow-hidden border border-indigo-500/50 bg-black shadow-lg"
                  >
                    <div className="aspect-video w-full">
                      <iframe
                        src={driveEmbedUrl}
                        title={`${featuredCourse.degree} Video`}
                        className="w-full h-full border-0"
                        allow="autoplay; encrypted-media; fullscreen"
                        allowFullScreen
                      />
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-900/95 border-t border-slate-800 text-xs">
                      <span className="flex items-center gap-1.5 text-slate-300 font-medium font-mono text-[11px]">
                        <Film className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Google Drive Video Stream</span>
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={openVideoModal}
                          className="px-2 py-1 rounded-md bg-indigo-600/80 hover:bg-indigo-600 text-white font-medium text-[11px] transition-colors"
                        >
                          Fullscreen
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsPlayingInline(false)}
                          className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-[11px] transition-colors"
                        >
                          Close Player
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Video Thumbnail / Poster View with Slide Switcher */
                  <div
                    id="course-image-container"
                    className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 group shadow-md"
                  >
                    <img
                      src={currentSlide.driveUrl}
                      alt={`${featuredCourse.degree} - ${currentSlide.title}`}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== currentSlide.localFallback) {
                          target.src = currentSlide.localFallback;
                        }
                      }}
                      className="w-full h-72 sm:h-84 object-contain sm:object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay & Header */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/25 to-slate-950/40 flex flex-col justify-between p-3.5 pointer-events-none">
                      <div className="flex items-center justify-between pointer-events-auto">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-md">
                          <Sparkles className="w-3 h-3 text-amber-300" />
                          {featuredCourse.badge || 'FEATURED COURSE'}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-sm text-slate-200 border border-slate-700/50">
                            <Images className="w-3 h-3 text-indigo-400" />
                            <span>
                              Slide {activeSlideIndex + 1}/{COURSE_SLIDES.length}
                            </span>
                          </span>
                        </div>
                      </div>

                      {/* Large Center Play Button Overlay */}
                      <div className="flex items-center justify-center my-auto pointer-events-auto">
                        <button
                          type="button"
                          id="play-course-video-btn"
                          onClick={openVideoModal}
                          className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-indigo-600/90 hover:bg-indigo-600 text-white shadow-2xl shadow-indigo-600/50 group-hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/40 backdrop-blur-sm cursor-pointer"
                          aria-label="Play BUILD SOFTWARE WITH AI video"
                          title="Click to play course masterclass video"
                        >
                          <span className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-30 pointer-events-none" />
                          <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white text-white translate-x-0.5" />
                        </button>
                      </div>

                      {/* Card Footer Details & Slide Navigation */}
                      <div className="pointer-events-auto space-y-1.5">
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-[11px] font-medium text-slate-300">
                              {featuredCourse.institution}
                            </p>
                            <h4 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                              <span>{featuredCourse.degree}</span>
                            </h4>
                          </div>
                          <button
                            type="button"
                            onClick={() => openImageModal(activeSlideIndex)}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-900/85 hover:bg-slate-800 text-slate-200 border border-slate-700/60 shadow-sm cursor-pointer transition-colors"
                          >
                            <ZoomIn className="w-3 h-3 text-indigo-400" />
                            <span>Expand</span>
                          </button>
                        </div>
                        <p className="text-[11px] text-indigo-200/90 font-medium truncate">
                          {currentSlide.title}
                        </p>
                      </div>
                    </div>

                    {/* Left & Right Slide Navigation Arrows on Hover */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        prevSlide();
                      }}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-indigo-600 text-white border border-white/10 opacity-75 group-hover:opacity-100 transition-all cursor-pointer backdrop-blur-sm shadow-lg"
                      title="Previous Slide"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        nextSlide();
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-indigo-600 text-white border border-white/10 opacity-75 group-hover:opacity-100 transition-all cursor-pointer backdrop-blur-sm shadow-lg"
                      title="Next Slide"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Course Slide Gallery Selector (Google Drive Folder Items) */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                      <Images className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Course Posters & Slides Gallery ({COURSE_SLIDES.length})</span>
                    </span>
                    <a
                      href={DRIVE_FOLDER_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline text-[11px]"
                      title="Open Google Drive folder with all source slide images"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      <span>Drive Folder</span>
                    </a>
                  </div>

                  <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                    {COURSE_SLIDES.map((slide, idx) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => handleSelectSlide(idx)}
                        className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all p-0.5 group/thumb ${
                          activeSlideIndex === idx
                            ? 'border-indigo-600 shadow-md shadow-indigo-600/30 scale-102 ring-2 ring-indigo-500/20'
                            : 'border-slate-200 dark:border-slate-800 hover:border-indigo-400/60 opacity-75 hover:opacity-100'
                        }`}
                        title={slide.title}
                      >
                        <img
                          src={slide.driveUrl}
                          alt={slide.title}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (target.src !== slide.localFallback) {
                              target.src = slide.localFallback;
                            }
                          }}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <span className="absolute bottom-0.5 inset-x-0.5 text-[9px] font-bold text-center py-0.5 rounded bg-slate-950/80 text-white backdrop-blur-xs truncate">
                          {slide.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Course Link & Video Direct Actions */}
                <div className="space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      id="course-watch-video-btn"
                      type="button"
                      onClick={openVideoModal}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all active:scale-95 cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Watch Video</span>
                    </button>

                    <a
                      id="course-google-drive-link"
                      href={videoDriveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-all active:scale-95 shadow-sm"
                    >
                      <ExternalLink className="w-4 h-4 text-indigo-500" />
                      <span>Open on Drive</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      id="course-inline-toggle-btn"
                      type="button"
                      onClick={() => setIsPlayingInline(!isPlayingInline)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      <Film className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{isPlayingInline ? 'Hide Inline Player' : 'Play Video Inline'}</span>
                    </button>

                    <button
                      id="course-poster-preview-btn"
                      type="button"
                      onClick={() => openImageModal(activeSlideIndex)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-300 transition-colors"
                      title="View course infographic poster"
                    >
                      <Eye className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Poster</span>
                    </button>

                    <button
                      id="course-inquire-btn"
                      type="button"
                      onClick={scrollToContact}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50 transition-colors"
                    >
                      <span>Inquire / Enroll</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content Column (Right) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Masterclass Curriculum</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    🚀 {featuredCourse.degree}
                  </h3>

                  <p className="mt-2 text-sm sm:text-base font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                    Turn your ideas into real software faster with the power of Artificial Intelligence 🤖💻
                  </p>
                </div>

                {/* What You Learn (Syllabus List) */}
                {featuredCourse.syllabus && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Learn how to use AI to:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {featuredCourse.syllabus.map((point, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200"
                        >
                          <span className="leading-snug">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Workflow Value Proposition */}
                <div className="p-4 rounded-2xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2">
                  <p className="font-semibold text-indigo-600 dark:text-indigo-400">
                    From idea → design → code → database → API → testing → production, AI can help accelerate the entire software development process.
                  </p>
                  <p className="font-bold text-slate-900 dark:text-white">
                    🔥 Learn. Build. Automate. Launch.
                  </p>
                </div>

                {/* Tags / Topics */}
                {featuredCourse.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {featuredCourse.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/70 dark:border-slate-700/60"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. Formal Academic Degrees & Professional Certifications */}
        {formalEducation.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Academic Background & Accreditations
              </h3>
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {formalEducation.map((item, idx) => (
                <motion.div
                  key={item.id}
                  className="group p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        <Calendar className="w-3 h-3" />
                        {item.period}
                      </span>
                    </div>

                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {item.degree}
                    </h4>
                    <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                      {item.field}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
                      {item.institution}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                      {item.description}
                    </p>
                  </div>

                  {item.honors && (
                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <Award className="w-4 h-4" />
                      <span>{item.honors}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Video / Full Media Lightbox Modal */}
      <AnimatePresence>
        {isMediaModalOpen && featuredCourse && (
          <motion.div
            id="course-media-modal-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMediaModalOpen(false)}
          >
            <motion.div
              className="relative max-w-4xl w-full max-h-[92vh] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/95">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex items-center rounded-lg bg-slate-800/90 p-0.5 border border-slate-700/60 text-xs">
                    <button
                      id="modal-tab-video-btn"
                      type="button"
                      onClick={() => setActiveModalTab('video')}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                        activeModalTab === 'video'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Video Player</span>
                    </button>
                    <button
                      id="modal-tab-poster-btn"
                      type="button"
                      onClick={() => setActiveModalTab('image')}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                        activeModalTab === 'image'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Images className="w-3.5 h-3.5" />
                      <span>Course Slides ({COURSE_SLIDES.length})</span>
                    </button>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white truncate hidden md:block">
                    {featuredCourse.degree}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    id="modal-google-drive-folder-link"
                    href={DRIVE_FOLDER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors shadow-sm"
                    title="Open Google Drive folder containing all 5 slide posters"
                  >
                    <FolderOpen className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="hidden sm:inline">Drive Folder</span>
                  </a>
                  <a
                    id="modal-google-drive-direct-link"
                    href={videoDriveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in Drive</span>
                  </a>
                  <button
                    id="modal-close-btn"
                    type="button"
                    onClick={() => setIsMediaModalOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-3 sm:p-5 overflow-auto flex flex-col items-center justify-center bg-slate-950/95 max-h-[85vh]">
                {activeModalTab === 'video' ? (
                  <div className="w-full aspect-video rounded-xl overflow-hidden bg-black shadow-2xl border border-slate-800 relative">
                    <iframe
                      src={driveEmbedUrl}
                      title={`${featuredCourse.degree} Video Player`}
                      className="w-full h-full border-0"
                      allow="autoplay; encrypted-media; fullscreen"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-center space-y-3">
                    {/* Slide Navigation Header Bar */}
                    <div className="w-full flex items-center justify-between px-2 text-xs">
                      <div className="flex items-center gap-2 text-slate-300">
                        <span className="px-2 py-0.5 rounded-md bg-indigo-950/80 text-indigo-400 border border-indigo-800/60 font-mono font-bold">
                          {activeSlideIndex + 1} / {COURSE_SLIDES.length}
                        </span>
                        <span className="font-semibold text-white truncate max-w-xs sm:max-w-md">
                          {currentSlide.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={prevSlide}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-white transition-colors cursor-pointer"
                          title="Previous slide"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={nextSlide}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-white transition-colors cursor-pointer"
                          title="Next slide"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Main High-Res Slide Container with Floating Arrow Buttons */}
                    <div className="relative w-full flex items-center justify-center rounded-xl bg-black/50 border border-slate-800/80 overflow-hidden group/modalimg">
                      <img
                        src={currentSlide.driveUrl}
                        alt={`${featuredCourse.degree} - ${currentSlide.title}`}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== currentSlide.localFallback) {
                            target.src = currentSlide.localFallback;
                          }
                        }}
                        className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-2xl transition-all"
                      />

                      {/* Floating Nav Buttons */}
                      <button
                        type="button"
                        onClick={prevSlide}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/75 hover:bg-indigo-600 text-white border border-white/10 opacity-70 hover:opacity-100 transition-all cursor-pointer backdrop-blur-sm"
                        title="Previous slide"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={nextSlide}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/75 hover:bg-indigo-600 text-white border border-white/10 opacity-70 hover:opacity-100 transition-all cursor-pointer backdrop-blur-sm"
                        title="Next slide"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Modal Slide Thumbnails */}
                    <div className="flex items-center justify-center gap-2 pt-1 overflow-x-auto max-w-full py-1">
                      {COURSE_SLIDES.map((slide, idx) => (
                        <button
                          key={slide.id}
                          type="button"
                          onClick={() => handleSelectSlide(idx)}
                          className={`relative rounded-lg overflow-hidden w-14 sm:w-16 h-14 sm:h-16 border-2 transition-all shrink-0 p-0.5 ${
                            activeSlideIndex === idx
                              ? 'border-indigo-500 shadow-md shadow-indigo-500/40 ring-2 ring-indigo-400/30'
                              : 'border-slate-800 hover:border-slate-600 opacity-60 hover:opacity-100'
                          }`}
                          title={slide.title}
                        >
                          <img
                            src={slide.driveUrl}
                            alt={slide.title}
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (target.src !== slide.localFallback) {
                                target.src = slide.localFallback;
                              }
                            }}
                            className="w-full h-full object-cover rounded"
                          />
                          <span className="absolute bottom-0 inset-x-0 text-[8px] font-bold text-center bg-black/80 text-white py-0.2 truncate">
                            {slide.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Media Footer Details */}
                <div className="w-full mt-3 pt-2.5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
                  <span className="font-mono text-[11px] text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                    <span>Google Drive Folder & Video Stream • BUILD SOFTWARE WITH AI</span>
                  </span>
                  <a
                    href={DRIVE_FOLDER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 underline font-mono truncate max-w-xs sm:max-w-md"
                  >
                    {DRIVE_FOLDER_URL}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
