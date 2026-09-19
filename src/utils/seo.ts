import { Language } from '../types';

export interface SectionSEO {
  title: string;
  description: string;
}

export interface SEOConfig {
  title: string;
  description: string;
  language?: Language;
  image?: string;
  url?: string;
}

export const BASE_BRAND = 'PRO SERVERS';

export const SECTION_SEO_MAP: Record<
  Language,
  Record<string, SectionSEO>
> = {
  en: {
    home: {
      title: 'PRO SERVERS — Professional Full-Stack Developer & Cloud Systems Portfolio',
      description:
        'PRO SERVERS — Professional Full-Stack Developer & Cloud Systems Portfolio showcasing modern web apps, scalable architecture, and clean engineering.',
    },
    about: {
      title: `About Me — ${BASE_BRAND}`,
      description:
        'Learn about PRO SERVERS, Senior Full-Stack Developer & Software Architect crafting modern scalable web applications and cloud solutions.',
    },
    skills: {
      title: `Skills & Tech Stack — ${BASE_BRAND}`,
      description:
        'Explore technical competencies in React, TypeScript, Node.js, Cloud Architecture, DevOps, PostgreSQL, and high-performance frontend engineering.',
    },
    services: {
      title: `Services & Solutions — ${BASE_BRAND}`,
      description:
        'Professional engineering services: Full-Stack Web Development, Backend & Cloud APIs, UI/UX Engineering, and Technical Architecture Consulting.',
    },
    projects: {
      title: `Projects & Flagship Apps — ${BASE_BRAND}`,
      description:
        'Explore production-grade flagship applications, SaaS platforms, developer tools, and scalable cloud systems built with modern stacks.',
    },
    'code-architecture': {
      title: `Architecture & Code Showcase — ${BASE_BRAND}`,
      description:
        'Interactive code samples, algorithms, and clean software architecture patterns demonstrating enterprise-grade development standards.',
    },
    experience: {
      title: `Work Experience — ${BASE_BRAND}`,
      description:
        'Professional career timeline, company milestones, technical leadership roles, and measurable engineering impact across high-traffic platforms.',
    },
    education: {
      title: `Education & Certifications — ${BASE_BRAND}`,
      description:
        'Academic background in Computer Science, verified cloud accreditations, software engineering certificates, and continuous learning journey.',
    },
    testimonials: {
      title: `Testimonials & Endorsements — ${BASE_BRAND}`,
      description:
        'Client recommendations and professional endorsements on code quality, communication, engineering reliability, and project delivery.',
    },
    faq: {
      title: `Frequently Asked Questions — ${BASE_BRAND}`,
      description:
        'Answers to common questions regarding technical stacks, contract availability, project timelines, code audits, and collaboration processes.',
    },
    contact: {
      title: `Contact & Collaboration — ${BASE_BRAND}`,
      description:
        'Get in touch with PRO SERVERS for software engineering opportunities, cloud consulting, freelance inquiries, and full-stack project builds.',
    },
  },
  km: {
    home: {
      title: 'PRO SERVERS — ផលប័ត្រអ្នកអភិវឌ្ឍន៍ Full-Stack និង Cloud Systems អាជីព',
      description:
        'PRO SERVERS — ផលប័ត្រអ្នកអភិវឌ្ឍន៍ Full-Stack និងប្រព័ន្ធ Cloud ប្រកបដោយវិជ្ជាជីវៈ បង្ហាញកម្មវិធីគេហទំព័រទំនើប និងស្ថាបត្យកម្មកូដរឹងមាំ។',
    },
    about: {
      title: `អំពីខ្ញុំ — ${BASE_BRAND}`,
      description:
        'ស្វែងយល់បន្ថែមអំពី PRO SERVERS អ្នកអភិវឌ្ឍន៍ Full-Stack និង Software Architect ដែលបង្កើតកម្មវិធីគេហទំព័រទំនើប និងដំណោះស្រាយ Cloud។',
    },
    skills: {
      title: `ជំនាញបច្ចេកវិទ្យា — ${BASE_BRAND}`,
      description:
        'ស្វែងយល់ពីជំនាញបច្ចេកទេសក្នុង React, TypeScript, Node.js, Cloud Architecture, DevOps, PostgreSQL និងការរចនា UI/UX កម្រិតខ្ពស់។',
    },
    services: {
      title: `សេវាកម្ម និងដំណោះស្រាយ — ${BASE_BRAND}`,
      description:
        'សេវាកម្មវិស្វកម្មកម្មវិធីប្រកបដោយវិជ្ជាជីវៈ៖ ការបង្កើតគេហទំព័រ Full-Stack, ប្រព័ន្ធ API & Cloud, និងការប្រឹក្សាយោបល់ផ្នែកស្ថាបត្យកម្មកូដ។',
    },
    projects: {
      title: `គម្រោងការងារ និងស្នាដៃ — ${BASE_BRAND}`,
      description:
        'ស្វែងយល់ពីគម្រោងកម្មវិធីពិតប្រាកដ ប្រព័ន្ធ SaaS ឧបករណ៍អភិវឌ្ឍន៍ និងប្រព័ន្ធ Cloud មាត្រដ្ឋានខ្ពស់។',
    },
    'code-architecture': {
      title: `រចនាសម្ព័ន្ធកូដ និងស្ថាបត្យកម្ម — ${BASE_BRAND}`,
      description:
        'កូដគំរូអន្តរកម្ម ក្បួនដោះស្រាយ និងទម្រង់ស្ថាបត្យកម្មកម្មវិធីស្អាតស្អំ ស្របតាមស្តង់ដារវិស្វកម្មកូដកម្រិតសហគ្រាស។',
    },
    experience: {
      title: `បទពិសោធន៍ការងារ — ${BASE_BRAND}`,
      description:
        'ប្រវត្តិការងារវិជ្ជាជីវៈ សមិទ្ធផលក្រុមហ៊ុន តួនាទីដឹកនាំបច្ចេកវិទ្យា និងឥទ្ធិពលវិស្វកម្មលើប្រព័ន្ធដំណើរការទ្រង់ទ្រាយធំ។',
    },
    education: {
      title: `ការអប់រំ និងសញ្ញាបត្រ — ${BASE_BRAND}`,
      description:
        'ប្រវត្តិការសិក្សាផ្នែកវិទ្យាសាស្ត្រកុំព្យូទ័រ វិញ្ញាបនបត្រ Cloud ដែលមានការបញ្ជាក់ និងការអភិវឌ្ឍជំនាញបច្ចេកវិទ្យាជាបន្តបន្ទាប់។',
    },
    testimonials: {
      title: `ការវាយតម្លៃ និងមតិអតិថិជន — ${BASE_BRAND}`,
      description:
        'មតិកែលម្អ និងការវាយតម្លៃពីអតិថិជន និងសហសេវិកលើគុណភាពកូដ ការទំនាក់ទំនង និងការបញ្ចប់គម្រោងទាន់ពេលវេលា។',
    },
    faq: {
      title: `សំណួរដែលសួរញឹកញាប់ — ${BASE_BRAND}`,
      description:
        'ចម្លើយចំពោះសំណួរទូទៅអំពីបច្ចេកវិទ្យា ពេលវេលាគម្រោង ការប៉ាន់ស្មានតម្លៃ និងដំណើរការសហការការងារ។',
    },
    contact: {
      title: `ទំនាក់ទំនងការងារ — ${BASE_BRAND}`,
      description:
        'ទាក់ទងមក PRO SERVERS សម្រាប់ឱកាសការងារ ការប្រឹក្សាយោបល់ប្រព័ន្ធ Cloud និងការអភិវឌ្ឍគម្រោងកម្មវិធី Full-Stack។',
    },
  },
};

/**
 * Safely updates or creates a meta tag in the DOM document head.
 */
export function setMetaTag(
  selector: string,
  attributeName: string,
  attributeValue: string,
  content: string
): void {
  if (typeof document === 'undefined') return;

  let element = document.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Updates page title, meta description, OpenGraph, Twitter card, and html lang tag.
 */
export function updateDocumentMetadata(config: SEOConfig): void {
  if (typeof document === 'undefined') return;

  const { title, description, language = 'en' } = config;

  // 1. Update Document Title
  if (title && document.title !== title) {
    document.title = title;
  }

  // 2. Update Standard Meta Description
  if (description) {
    setMetaTag('meta[name="description"]', 'name', 'description', description);
  }

  // 3. Update OpenGraph Tags
  if (title) {
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
  }
  if (description) {
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
  }

  // 4. Update Twitter Card Tags
  if (title) {
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
  }
  if (description) {
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
  }

  // 5. Update HTML lang attribute
  if (document.documentElement) {
    document.documentElement.lang = language;
  }
}

/**
 * Retrieves the specific SEO configuration for a given section and language.
 */
export function getSectionSEO(sectionId: string, language: Language = 'en'): SectionSEO {
  const langMap = SECTION_SEO_MAP[language] || SECTION_SEO_MAP.en;
  return langMap[sectionId] || langMap.home;
}
