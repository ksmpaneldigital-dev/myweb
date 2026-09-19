import { useEffect, useState, useCallback, useRef } from 'react';
import { Language } from '../types';
import {
  SECTION_SEO_MAP,
  SectionSEO,
  SEOConfig,
  updateDocumentMetadata,
  getSectionSEO,
} from '../utils/seo';

export interface UseDynamicSEOOptions {
  language: Language;
  activeSection?: string;
  autoObserve?: boolean;
  sectionOffset?: number;
}

export const MONITORED_SECTION_IDS = [
  'home',
  'about',
  'skills',
  'services',
  'projects',
  'code-architecture',
  'experience',
  'education',
  'testimonials',
  'faq',
  'contact',
];

export function useDynamicSEO({
  language,
  activeSection: manualActiveSection,
  autoObserve = true,
  sectionOffset = 180,
}: UseDynamicSEOOptions) {
  const [currentSection, setCurrentSection] = useState<string>(
    manualActiveSection || 'home'
  );
  const customOverrideRef = useRef<SEOConfig | null>(null);

  // If manualActiveSection is provided and changes, update immediately
  useEffect(() => {
    if (manualActiveSection) {
      setCurrentSection(manualActiveSection);
    }
  }, [manualActiveSection]);

  // Automatic scroll & hash detection if autoObserve is active and manualActiveSection is not pinned
  useEffect(() => {
    if (!autoObserve || manualActiveSection) return;

    let rafId: number | null = null;

    const handleScrollOrHash = () => {
      // Prioritize hash if present and user just clicked anchor
      const hash = window.location.hash.replace('#', '');
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      // If at top of the page, always set to home
      if (scrollY < 120) {
        setCurrentSection('home');
        return;
      }

      // Check sections from bottom to top
      const scrollPosition = scrollY + sectionOffset;
      let matchedSection = 'home';

      for (let i = MONITORED_SECTION_IDS.length - 1; i >= 0; i--) {
        const id = MONITORED_SECTION_IDS[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            matchedSection = id;
            break;
          }
        }
      }

      setCurrentSection(matchedSection);
    };

    const onScrollThrottled = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScrollOrHash);
    };

    window.addEventListener('scroll', onScrollThrottled, { passive: true });
    window.addEventListener('hashchange', handleScrollOrHash);

    // Initial check
    handleScrollOrHash();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollThrottled);
      window.removeEventListener('hashchange', handleScrollOrHash);
    };
  }, [autoObserve, manualActiveSection, sectionOffset]);

  // Sync document title and meta description tags whenever currentSection or language changes
  useEffect(() => {
    if (customOverrideRef.current) {
      updateDocumentMetadata(customOverrideRef.current);
      return;
    }

    const seo = getSectionSEO(currentSection, language);
    updateDocumentMetadata({
      title: seo.title,
      description: seo.description,
      language,
    });
  }, [currentSection, language]);

  // Optional manual override function
  const setCustomSEO = useCallback((config: SEOConfig) => {
    customOverrideRef.current = config;
    updateDocumentMetadata(config);
  }, []);

  const resetCustomSEO = useCallback(() => {
    customOverrideRef.current = null;
    const seo = getSectionSEO(currentSection, language);
    updateDocumentMetadata({
      title: seo.title,
      description: seo.description,
      language,
    });
  }, [currentSection, language]);

  const currentSEO: SectionSEO = getSectionSEO(currentSection, language);

  return {
    activeSection: currentSection,
    currentSEO,
    setCustomSEO,
    resetCustomSEO,
  };
}
