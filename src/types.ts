export type ThemeMode = 'dark' | 'light' | 'system';

export interface PersonalInfo {
  name: string;
  title: string;
  role: string;
  tagline: string;
  description: string;
  location: string;
  locationImage?: string;
  email: string;
  phone: string;
  avatar: string;
  availability: string;
  resumeUrl: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  facebook: string;
  telegram: string;
  youtube: string;
  twitter?: string;
}

export interface StatItem {
  value: string;
  label: string;
  iconName?: string;
  description?: string;
}

export type SkillCategory = 'frontend' | 'backend' | 'database' | 'programming' | 'tools';

export interface SkillItem {
  name: string;
  category: SkillCategory;
  level: 'Master' | 'Expert' | 'Advanced' | 'Proficient';
  percentage: number; // Clearly documented as self-assessment
  experienceYears: string;
  icon: string;
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  deliverables: string[];
}

export type ProjectCategory = 'all' | 'react' | 'laravel' | 'fullstack' | 'web' | 'app';

export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  category: ProjectCategory;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  metrics?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  period: string;
  location: string;
  type: string; // e.g., 'Full-time', 'Remote', 'Contract'
  description: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  description: string;
  honors?: string;
  image?: string;
  link?: string;
  videoUrl?: string;
  badge?: string;
  syllabus?: string[];
  tags?: string[];
  isCourse?: boolean;
  gallery?: string[];
  driveFolderUrl?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  projectRelation: string;
}

export interface CodeSnippetItem {
  id: string;
  title: string;
  language: string;
  tabLabel: string;
  description: string;
  code: string;
  architectureHighlights: string[];
}

export type FAQCategory = 'all' | 'services' | 'process' | 'tech' | 'pricing';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'services' | 'process' | 'tech' | 'pricing';
  highlight?: string;
}

export type Language = 'en' | 'km';

export interface PortfolioData {
  personal: PersonalInfo;
  social: SocialLinks;
  stats: StatItem[];
  about: {
    introduction: string;
    background: string;
    philosophy: string;
    careerGoals: string;
    highlights: string[];
  };
  skills: SkillItem[];
  services: ServiceItem[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
  testimonials: TestimonialItem[];
  codeSnippets: CodeSnippetItem[];
  faqs: FAQItem[];
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  timestamp: string;
  verified?: boolean;
}

export interface NewsletterSubscriptionResult {
  success: boolean;
  code: 'SUCCESS' | 'ALREADY_SUBSCRIBED' | 'INVALID_EMAIL' | 'SERVER_ERROR';
  message: string;
  subscriber?: NewsletterSubscriber;
  totalSubscribers: number;
}
