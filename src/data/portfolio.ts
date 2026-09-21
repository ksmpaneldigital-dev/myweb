import { PortfolioData } from '../types';

export const portfolio: PortfolioData = {
  personal: {
    name: 'KIMSAN',
    title: 'Senior Full-Stack Developer',
    role: 'Full-Stack Architect & Frontend Specialist',
    tagline: 'Crafting scalable web systems, intuitive interfaces, and high-performance software.',
    description:
      'I architect and build modern, scalable web applications and software solutions with high performance, elegant UI, and rock-solid reliability.',
    location: 'Phnom Penh, Cambodia & Remote Worldwide',
    locationImage: 'https://lh3.googleusercontent.com/d/1DXSyHl4pUCKA1tGGUu-smvOesOg4Ic0C=w1200',
    email: 'v4udevelop.app@gmail.com',
    phone: '+855 (0) 96 888 2400',
    avatar: '/images/profile.png',
    availability: 'Available for New Projects & Contracts',
    resumeUrl: '/resume.pdf',
  },

  social: {
    github: 'https://github.com/v4udevelop',
    linkedin: 'https://linkedin.com/in/kimsan-dev',
    facebook: 'https://facebook.com/v4udevelop',
    telegram: 'https://t.me/kimsandev',
    youtube: 'https://youtube.com/@proservers',
    twitter: 'https://x.com/kimsandev',
  },

  stats: [
    {
      value: '50+',
      label: 'Projects Delivered',
      description: 'Production-ready apps and enterprise solutions',
    },
    {
      value: '3+',
      label: 'Years Experience',
      description: 'Building commercial web & mobile platforms',
    },
    {
      value: '20+',
      label: 'Technologies',
      description: 'Across frontend, backend, databases, & cloud',
    },
    {
      value: '99.8%',
      label: 'Client Satisfaction',
      description: 'High customer retention & positive reviews',
    },
  ],

  about: {
    introduction:
      'I am an experienced Full-Stack Developer with a deep passion for transforming complex business logic into lightning-fast, user-friendly digital experiences.',
    background:
      'With over 3+ years of professional engineering experience, I have led frontend migrations, built enterprise backend microservices with Laravel and Node.js, and delivered responsive, high-converting web applications across fintech, e-commerce, and SaaS verticals.',
    philosophy:
      'I believe in clean architecture, type safety, accessible design systems, and writing code that is not just functional, but maintainable, testable, and pleasant for fellow engineers to collaborate on.',
    careerGoals:
      'Continuing to push the envelope in modern web engineering, architecting resilient distributed systems, and designing world-class user interfaces that bring real value to businesses and individuals.',
    highlights: [
      'Full-Stack Mastery: React, Next.js, Node.js, PHP/Laravel, and modern SQL databases',
      'Performance Obsessed: Sub-second load times, 95+ Google Lighthouse scores, and accessible UX',
      'Production Mindset: CI/CD automation, clean Git workflows, Docker containerization, and Netlify/Cloud deployments',
      'Clear Communicator: Direct collaboration with founders, product teams, and cross-functional partners',
    ],
  },

  skills: [
    // Frontend
    {
      name: 'React.js',
      category: 'frontend',
      level: 'Master',
      percentage: 95,
      experienceYears: '3+ yrs',
      icon: 'Atom',
      featured: true,
    },
    {
      name: 'JavaScript (ES6+)',
      category: 'frontend',
      level: 'Master',
      percentage: 96,
      experienceYears: '4+ yrs',
      icon: 'FileCode2',
      featured: true,
    },
    {
      name: 'HTML5 & Semantic Web',
      category: 'frontend',
      level: 'Master',
      percentage: 98,
      experienceYears: '4+ yrs',
      icon: 'Code2',
    },
    {
      name: 'CSS3 & Modern Layouts',
      category: 'frontend',
      level: 'Master',
      percentage: 95,
      experienceYears: '4+ yrs',
      icon: 'Palette',
    },
    {
      name: 'Tailwind CSS',
      category: 'frontend',
      level: 'Master',
      percentage: 96,
      experienceYears: '3+ yrs',
      icon: 'Wind',
      featured: true,
    },
    {
      name: 'Vite & Bundlers',
      category: 'frontend',
      level: 'Expert',
      percentage: 90,
      experienceYears: '3+ yrs',
      icon: 'Zap',
      featured: true,
    },
    {
      name: 'TypeScript',
      category: 'frontend',
      level: 'Expert',
      percentage: 92,
      experienceYears: '3+ yrs',
      icon: 'FileCheck',
      featured: true,
    },

    // Backend
    {
      name: 'Laravel',
      category: 'backend',
      level: 'Master',
      percentage: 94,
      experienceYears: '3+ yrs',
      icon: 'Flame',
      featured: true,
    },
    {
      name: 'PHP',
      category: 'backend',
      level: 'Expert',
      percentage: 92,
      experienceYears: '3+ yrs',
      icon: 'Server',
      featured: true,
    },
    {
      name: 'Node.js',
      category: 'backend',
      level: 'Expert',
      percentage: 90,
      experienceYears: '3+ yrs',
      icon: 'Cpu',
      featured: true,
    },
    {
      name: 'REST APIs & Webhooks',
      category: 'backend',
      level: 'Master',
      percentage: 95,
      experienceYears: '3+ yrs',
      icon: 'Network',
      featured: true,
    },
    {
      name: 'Express.js',
      category: 'backend',
      level: 'Advanced',
      percentage: 88,
      experienceYears: '2+ yrs',
      icon: 'Layers',
    },

    // Databases
    {
      name: 'MySQL',
      category: 'database',
      level: 'Master',
      percentage: 93,
      experienceYears: '3+ yrs',
      icon: 'Database',
      featured: true,
    },
    {
      name: 'PostgreSQL',
      category: 'database',
      level: 'Expert',
      percentage: 89,
      experienceYears: '2+ yrs',
      icon: 'TableProperties',
      featured: true,
    },
    {
      name: 'SQLite',
      category: 'database',
      level: 'Proficient',
      percentage: 86,
      experienceYears: '3+ yrs',
      icon: 'HardDrive',
    },
    {
      name: 'Firebase & Firestore',
      category: 'database',
      level: 'Expert',
      percentage: 88,
      experienceYears: '2+ yrs',
      icon: 'Cloud',
    },

    // Programming
    {
      name: 'Python',
      category: 'programming',
      level: 'Advanced',
      percentage: 84,
      experienceYears: '2+ yrs',
      icon: 'Terminal',
    },
    {
      name: 'C# / .NET',
      category: 'programming',
      level: 'Proficient',
      percentage: 80,
      experienceYears: '2+ yrs',
      icon: 'Boxes',
    },
    {
      name: 'TypeScript Core',
      category: 'programming',
      level: 'Expert',
      percentage: 92,
      experienceYears: '3+ yrs',
      icon: 'Binary',
      featured: true,
    },

    // Tools
    {
      name: 'Git',
      category: 'tools',
      level: 'Master',
      percentage: 95,
      experienceYears: '4+ yrs',
      icon: 'GitBranch',
      featured: true,
    },
    {
      name: 'GitHub & Actions',
      category: 'tools',
      level: 'Master',
      percentage: 94,
      experienceYears: '4+ yrs',
      icon: 'Github',
      featured: true,
    },
    {
      name: 'Docker',
      category: 'tools',
      level: 'Advanced',
      percentage: 85,
      experienceYears: '2+ yrs',
      icon: 'Container',
    },
    {
      name: 'VS Code & Productivity',
      category: 'tools',
      level: 'Master',
      percentage: 98,
      experienceYears: '4+ yrs',
      icon: 'Laptop',
    },
    {
      name: 'Postman & API Testing',
      category: 'tools',
      level: 'Expert',
      percentage: 92,
      experienceYears: '3+ yrs',
      icon: 'Send',
    },
  ],

  services: [
    {
      id: 'web-dev',
      title: 'Web Development',
      description: 'Building modern, ultra-responsive web applications with optimized performance and SEO-first architecture.',
      icon: 'Globe',
      deliverables: [
        'Single Page Applications (SPAs)',
        'Server-Side Rendering & Static Sites',
        'Lighthouse Performance 95+',
        'Cross-Browser & Mobile Compatibility',
      ],
    },
    {
      id: 'fullstack-dev',
      title: 'Full-Stack Development',
      description: 'End-to-end software engineering unifying responsive client interfaces, business APIs, and scalable databases.',
      icon: 'Layers',
      deliverables: [
        'React & Vue Frontend Systems',
        'Laravel & Node.js API Backends',
        'Relational Database Modeling',
        'Authentication & RBAC Security',
      ],
    },
    {
      id: 'admin-dashboards',
      title: 'Admin Dashboards',
      description: 'Designing intuitive, data-dense administrative control panels with real-time analytics and management tools.',
      icon: 'LayoutDashboard',
      deliverables: [
        'Interactive Charts & KPI Trackers',
        'Role-Based Permission Controls',
        'Bulk Data Export / Import',
        'Dark / Light High-Contrast Themes',
      ],
    },
    {
      id: 'api-development',
      title: 'API Development',
      description: 'Architecting robust, secure, and documented RESTful web services and third-party webhook integrations.',
      icon: 'Network',
      deliverables: [
        'RESTful & JSON:API Standards',
        'Payment Gateways (Stripe, ABA, Wing)',
        'Rate Limiting & Token Authentication',
        'Interactive Swagger / Postman Specs',
      ],
    },
    {
      id: 'ui-engineering',
      title: 'UI/UX Engineering',
      description: 'Translating Figma designs into pixel-perfect, accessible, and fluidly animated user interfaces.',
      icon: 'Sparkles',
      deliverables: [
        'Fluid Micro-Interactions (Framer Motion)',
        'WCAG AA Accessibility Standards',
        'Custom Design Systems & Tokens',
        'Mobile-First Layout Polish',
      ],
    },
    {
      id: 'automation-apps',
      title: 'Software & Automation',
      description: 'Developing workflow automation scripts, background workers, and cross-platform desktop utilities.',
      icon: 'Cpu',
      deliverables: [
        'Task & Data Scraping Pipelines',
        'Automated Email & Telegram Bots',
        'Electron Desktop Tools',
        'Batch Processing Scripts',
      ],
    },
  ],

  projects: [
    {
      id: 1,
      title: 'NexusStore — Modern E-Commerce Platform',
      description:
        'Full-featured digital storefront with multi-currency support, real-time inventory management, cart synchronization, and checkout gateway.',
      longDescription:
        'Built with React 19, Tailwind CSS, and a robust Laravel backend with MySQL. Features instantaneous product filtering, user reviews, order tracking, and invoice generation.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1200&auto=format&fit=crop',
      category: 'fullstack',
      tags: ['React', 'Laravel', 'MySQL', 'Tailwind CSS', 'REST API'],
      demoUrl: 'https://demo-nexus-store.example.com',
      githubUrl: 'https://github.com/v4udevelop/nexus-store',
      featured: true,
      metrics: '350ms Page Load • 99.9% Uptime',
    },
    {
      id: 2,
      title: 'CloudPulse — Analytics & Admin Dashboard',
      description:
        'Enterprise SaaS analytics dashboard featuring live metric streams, customizable widget boards, user roles, and report exports.',
      longDescription:
        'Engineered with React, TypeScript, and Vite. Leverages motion animations for buttery-smooth tab transitions and real-time data visualizers.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      category: 'react',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Cloud', 'Charts'],
      demoUrl: 'https://demo-cloudpulse.example.com',
      githubUrl: 'https://github.com/v4udevelop/cloudpulse-dashboard',
      featured: true,
      metrics: '12K+ Daily Events • Real-Time Sync',
    },
    {
      id: 3,
      title: 'PaySwift — FinTech Merchant API & Portal',
      description:
        'Multi-tenant payment settlement gateway with automated webhooks, reconciliation ledger, and security audited tokenization.',
      longDescription:
        'Crafted using Laravel, PostgreSQL, and Redis caching. Delivers high-throughput transaction processing with strict PCI-DSS compliant patterns.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop',
      category: 'laravel',
      tags: ['Laravel', 'PHP', 'PostgreSQL', 'Docker', 'Redis'],
      demoUrl: 'https://demo-payswift.example.com',
      githubUrl: 'https://github.com/v4udevelop/payswift-gateway',
      featured: true,
      metrics: '99.99% Transaction Reliability',
    },
    {
      id: 4,
      title: 'TaskMatrix — Agile Team Management Suite',
      description:
        'Collaborative Kanban board with drag-and-drop workflow stages, sprint velocity charts, and instant notifications.',
      longDescription:
        'Built with React, Node.js, and Firebase real-time listeners. Provides offline support, activity logs, and granular workspace permissions.',
      image: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?q=80&w=1200&auto=format&fit=crop',
      category: 'web',
      tags: ['React', 'Node.js', 'Firebase', 'Tailwind CSS'],
      demoUrl: 'https://demo-taskmatrix.example.com',
      githubUrl: 'https://github.com/v4udevelop/taskmatrix-app',
      featured: false,
      metrics: '5,000+ Active Tasks',
    },
    {
      id: 5,
      title: 'KronoDesktop — Asset Sync & Automation Tool',
      description:
        'Desktop client and background worker that monitors directory changes, parses financial spreadsheets, and syncs to cloud storage.',
      longDescription:
        'Developed with Python, C#, and Electron wrapper for seamless background execution with minimal system memory footprint.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
      category: 'app',
      tags: ['Python', 'C#', 'Cloud', 'Automation', 'SQLite'],
      demoUrl: '',
      githubUrl: 'https://github.com/v4udevelop/krono-automation',
      featured: false,
      metrics: '10x Faster Sync Speeds',
    },
    {
      id: 6,
      title: 'DevBlog CMS — Markdown Headless Publishing Engine',
      description:
        'Lightweight content management system featuring instant live Markdown preview, syntax highlighting, and edge caching.',
      longDescription:
        'Full-stack architecture combining Laravel REST API and React client with incremental static regeneration and clean SEO indexing.',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop',
      category: 'fullstack',
      tags: ['React', 'Laravel', 'MySQL', 'REST API'],
      demoUrl: 'https://demo-devblog.example.com',
      githubUrl: 'https://github.com/v4udevelop/devblog-cms',
      featured: false,
      metrics: '100/100 Lighthouse Performance',
    },
  ],

  experience: [
    {
      id: 'exp-1',
      company: 'Apex Tech Solutions',
      position: 'Senior Full-Stack Developer',
      period: '2024 - Present',
      location: 'Phnom Penh / Hybrid',
      type: 'Full-time',
      description: [
        'Lead architectural decisions and full-stack development across flagship client web applications using React, TypeScript, and Laravel.',
        'Spearheaded REST API refactoring, reducing average endpoint latency by 42% through query optimization and Redis caching.',
        'Mentored 6 junior and mid-level developers in testing best practices, clean component hierarchies, and Git CI/CD flows.',
      ],
      technologies: ['React', 'TypeScript', 'Laravel', 'MySQL', 'Docker', 'Tailwind CSS'],
    },
    {
      id: 'exp-2',
      company: 'Innovate Digital Agency',
      position: 'Full-Stack Web Developer',
      period: '2022 - 2024',
      location: 'Remote',
      type: 'Full-time',
      description: [
        'Built and deployed 25+ custom web applications, e-commerce storefronts, and internal enterprise dashboards.',
        'Engineered responsive UI systems with strict WCAG AA accessibility guidelines and optimized core web vitals.',
        'Integrated third-party payment gateways (Stripe, local QR banks) and automated billing webhook workers.',
      ],
      technologies: ['React', 'Node.js', 'PHP', 'PostgreSQL', 'Vite', 'REST APIs'],
    },
    {
      id: 'exp-3',
      company: 'Nexus Software Studio',
      position: 'Frontend Developer & UI Specialist',
      period: '2021 - 2022',
      location: 'Phnom Penh',
      type: 'Contract',
      description: [
        'Translated complex Figma and Adobe XD prototypes into clean, responsive HTML5/Tailwind/React interfaces.',
        'Collaborated directly with product managers and UX researchers to implement user feedback and increase conversion rates by 28%.',
      ],
      technologies: ['React', 'JavaScript', 'HTML5/CSS3', 'Tailwind CSS', 'Git'],
    },
  ],

  education: [
    {
      id: 'course-ai-software',
      institution: 'PRO SERVERS • AI Engineering Academy',
      degree: 'BUILD SOFTWARE WITH AI',
      field: 'Masterclass & Practical Software Engineering Roadmap',
      period: 'Active Enrollment • Comprehensive Masterclass',
      badge: 'FEATURED COURSE',
      image: 'https://lh3.googleusercontent.com/d/1symuOD31pdU1cRRlMCYEcx3Hm-Ugy67E=w1200',
      gallery: [
        'https://lh3.googleusercontent.com/d/1symuOD31pdU1cRRlMCYEcx3Hm-Ugy67E=w1200',
        'https://lh3.googleusercontent.com/d/1-QQXNp90TLMYJVQx4Qr4MJ6EHGIYEQDr=w1200',
        'https://lh3.googleusercontent.com/d/1VJUp59q21lxIyIAjBeVci1P_QU9u4sXT=w1200',
        'https://lh3.googleusercontent.com/d/18nvI9AFs8ePmD31XVOlV8h4whzHt8VTv=w1200',
        'https://lh3.googleusercontent.com/d/1W5u5VtrNBB6ng3LxBSVfledKl6p4MYOr=w1200',
      ],
      driveFolderUrl: 'https://drive.google.com/drive/folders/1StkzAUAKYQhSXAhnFCVk0Gl9VP4ruHg0',
      link: 'https://drive.google.com/file/d/1YXKf2l1o1dCC5SPxNdv1TGAAbChA9Y6K/view?usp=drivesdk',
      videoUrl: 'https://drive.google.com/file/d/1YXKf2l1o1dCC5SPxNdv1TGAAbChA9Y6K/view?usp=drivesdk',
      description:
        'Turn your ideas into real software faster with the power of Artificial Intelligence 🤖💻\n\nFrom idea → design → code → database → API → testing → production, AI can help accelerate the entire software development process.\n\n🔥 Learn. Build. Automate. Launch.',
      syllabus: [
        '💡 Generate software ideas and project plans',
        '🎨 Design modern UI/UX',
        '🧑💻 Generate and improve code',
        '🗄️ Build databases and APIs',
        '🔐 Add authentication and security',
        '⚙️ Automate repetitive development tasks',
        '🐛 Find and fix bugs',
        '🚀 Build, test, and deploy complete applications',
      ],
      tags: [
        'AI',
        'SoftwareDevelopment',
        'Coding',
        'Programming',
        'ArtificialIntelligence',
        'WebDevelopment',
        'AppDevelopment',
        'Developer',
        'BuildWithAI',
      ],
      honors: '🔥 Learn. Build. Automate. Launch.',
      isCourse: true,
    },
    {
      id: 'edu-1',
      institution: 'Royal University of Phnom Penh (RUPP)',
      degree: 'Bachelor of Science (B.Sc.)',
      field: 'Computer Science & Software Engineering',
      period: '2018 - 2022',
      description:
        'Rigorous coursework in Data Structures, Algorithms, Software Architecture, Database Management Systems, Network Security, and Distributed Computing.',
      honors: 'Graduated with Distinction (GPA 3.8/4.0)',
    },
    {
      id: 'edu-2',
      institution: 'Meta & Coursera Professional Certification',
      degree: 'Meta Certified Full-Stack Developer',
      field: 'Advanced Frontend & Backend Specialization',
      period: '2023',
      description:
        'Comprehensive professional specialization covering Advanced React, Cloud Infrastructure, REST APIs, Database Optimization, and System Design.',
      honors: 'Credential ID: META-FS-89241',
    },
  ],

  testimonials: [
    {
      id: 'test-1',
      name: 'Michael V.',
      role: 'Head of Engineering',
      company: 'Apex Digital Group',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      content:
        'Kimsan is one of the most dependable full-stack engineers I have ever managed. He took our legacy monolithic backend, restructured it into high-performance Laravel micro-endpoints, and overhauled the React frontend with exceptional speed and zero downtime.',
      rating: 5,
      projectRelation: 'E-Commerce Platform & Microservices Migration',
    },
    {
      id: 'test-2',
      name: 'Sarah Chen',
      role: 'Product Lead & Founder',
      company: 'CloudPulse Analytics',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
      content:
        'Our analytics dashboard had serious performance bottlenecks before Kimsan stepped in. He refactored our component rendering, reduced re-renders by 70%, and delivered a sleek, intuitive UI that our enterprise clients rave about.',
      rating: 5,
      projectRelation: 'CloudPulse SaaS Dashboard',
    },
    {
      id: 'test-3',
      name: 'Dara Sovann',
      role: 'Technical Director',
      company: 'Innovate Studio',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
      content:
        'Working with Kimsan on multiple fintech and payment integrations was seamless. His code is meticulously typed, self-documenting, and designed with security in mind. Any team would be lucky to have him.',
      rating: 5,
      projectRelation: 'Payment Settlement Gateway & Core APIs',
    },
  ],

  codeSnippets: [
    {
      id: 'snippet-react-hook',
      title: 'useDebouncedAsync — Resilient Debouncing & Race-Condition Guard',
      language: 'typescript',
      tabLabel: 'React Custom Hook',
      description:
        'A production-grade TypeScript custom hook for search inputs and async API calls that automatically handles abort controllers, debouncing, and state synchronization without memory leaks.',
      architectureHighlights: [
        'Automatic AbortController signal cancellation for in-flight requests',
        'Strict generic return typing with data, loading, and error states',
        'Guaranteed unmount cleanup preventing memory leaks',
      ],
      code: `import { useState, useEffect, useRef, useCallback } from 'react';

export function useDebouncedAsync<T, Args extends any[]>(
  asyncFn: (...args: Args) => Promise<T>,
  delay: number = 300
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const execute = useCallback(
    (...args: Args) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();

      const controller = new AbortController();
      abortControllerRef.current = controller;

      timerRef.current = setTimeout(async () => {
        setIsLoading(true);
        setError(null);
        try {
          const result = await asyncFn(...args);
          if (!controller.signal.aborted) {
            setData(result);
            setIsLoading(false);
          }
        } catch (err: any) {
          if (!controller.signal.aborted) {
            setError(err instanceof Error ? err : new Error(String(err)));
            setIsLoading(false);
          }
        }
      }, delay);
    },
    [asyncFn, delay]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  return { data, isLoading, error, execute };
}`,
    },
    {
      id: 'snippet-laravel-service',
      title: 'Transaction-Safe Order Service & Event Dispatcher',
      language: 'php',
      tabLabel: 'Laravel Clean Architecture',
      description:
        'Enterprise Laravel service layer demonstrating database transaction isolation, idempotent inventory reduction, and asynchronous audit event dispatching.',
      architectureHighlights: [
        'Atomic database transactions with automatic rollback on exception',
        'Pessimistic locking (lockForUpdate) preventing race condition overselling',
        'Decoupled domain event dispatching for billing and notification queues',
      ],
      code: `<?php

namespace App\\Services;

use App\\Models\\Order;
use App\\Models\\Product;
use App\\Events\\OrderPlacedEvent;
use Illuminate\\Support\\Facades\\DB;
use Illuminate\\Support\\Facades\\Log;
use App\\Exceptions\\InsufficientInventoryException;

class OrderProcessingService
{
    public function placeOrder(int $userId, array $items, string $idempotencyKey): Order
    {
        return DB::transaction(function () use ($userId, $items, $idempotencyKey) {
            // Check for existing idempotent order
            $existing = Order::where('idempotency_key', $idempotencyKey)->first();
            if ($existing) return $existing;

            $totalAmount = 0;
            $processedItems = [];

            foreach ($items as $item) {
                // Lock row to avoid race-condition stock overdraft
                $product = Product::lockForUpdate()->findOrFail($item['product_id']);
                
                if ($product->stock_quantity < $item['quantity']) {
                    throw new InsufficientInventoryException("Item {$product->name} out of stock.");
                }

                $product->decrement('stock_quantity', $item['quantity']);
                $totalAmount += $product->unit_price * $item['quantity'];
                $processedItems[] = [
                    'product_id' => $product->id,
                    'unit_price' => $product->unit_price,
                    'quantity'   => $item['quantity']
                ];
            }

            $order = Order::create([
                'user_id'         => $userId,
                'total_amount'    => $totalAmount,
                'status'          => 'pending_settlement',
                'idempotency_key' => $idempotencyKey,
            ]);

            $order->items()->createMany($processedItems);

            // Dispatch domain event to asynchronous RabbitMQ/Redis queue
            event(new OrderPlacedEvent($order));

            return $order;
        }, 3); // Retry 3 times on transient deadlock
    }
}`,
    },
    {
      id: 'snippet-typescript-guard',
      title: 'Type-Safe Result<T, E> Pattern with Exhaustive Matching',
      language: 'typescript',
      tabLabel: 'TypeScript Pattern',
      description:
        'Functional programming Result pattern avoiding unhandled runtime exceptions and ensuring compile-time exhaustive error handling across API boundaries.',
      architectureHighlights: [
        'Discriminated union type isolating Success vs. Failure states',
        'Exhaustive match helper eliminating unhandled error branches',
        'Zero external runtime dependencies with minimal byte footprint',
      ],
      code: `export type Result<T, E = Error> =
  | { success: true; value: T }
  | { success: false; error: E };

export const Ok = <T>(value: T): Result<T, never> => ({
  success: true,
  value,
});

export const Err = <E>(error: E): Result<never, E> => ({
  success: false,
  error,
});

export function match<T, E, R1, R2>(
  result: Result<T, E>,
  handlers: {
    onSuccess: (value: T) => R1;
    onError: (error: E) => R2;
  }
): R1 | R2 {
  if (result.success) {
    return handlers.onSuccess(result.value);
  }
  return handlers.onError(result.error);
}

// Example usage in API Client
export async function safeFetch<T>(endpoint: string): Promise<Result<T, string>> {
  try {
    const res = await fetch(endpoint);
    if (!res.ok) return Err(\`HTTP error: \${res.status} \${res.statusText}\`);
    const data = (await res.json()) as T;
    return Ok(data);
  } catch (err: any) {
    return Err(err.message || 'Unknown network error');
  }
}`,
    },
  ],

  faqs: [
    {
      id: 'faq-services',
      question: 'What development services and technical solutions do you provide?',
      answer:
        'I specialize in complete end-to-end full-stack software development. This includes modern reactive web applications (React, TypeScript, Next.js, Tailwind CSS), scalable backend architecture & microservices (Laravel, PHP, Node.js, Express), robust database engineering (PostgreSQL, MySQL, Redis), AI-driven application features, third-party API integrations (Stripe, Twilio, OAuth), and translating Figma UI/UX designs into pixel-perfect, accessible code.',
      category: 'services',
      highlight: 'Full-Stack Web, Robust APIs & AI Solutions',
    },
    {
      id: 'faq-process',
      question: 'What does your project development process look like from start to finish?',
      answer:
        'I employ a structured 5-stage sprint methodology:\n1. Discovery & Technical Scope: Defining user stories, acceptance criteria, and system architecture.\n2. System Design & Database Modeling: Designing ERDs, API schemas, and UI wireframes.\n3. Iterative Sprint Development: Bi-weekly milestones with continuous staging previews and Git commits.\n4. Quality Assurance & Auditing: Automated unit/feature tests, security audits, and Lighthouse performance optimization.\n5. Production Launch & Handover: Zero-downtime deployment, server setup, DNS configuration, and documentation handover.',
      category: 'process',
      highlight: 'Structured 5-Stage Agile Lifecycle',
    },
    {
      id: 'faq-communication',
      question: 'How do we communicate and track progress during an active project?',
      answer:
        'Transparency and clear expectations are central to my workflow. We establish a dedicated communication channel on Slack, Telegram, or Discord for daily updates and quick questions, supplemented with weekly Google Meet video syncs for milestone demos. Additionally, you receive access to a private GitHub repository and a password-protected staging URL to test features as they are built.',
      category: 'process',
      highlight: 'Daily Slack/Telegram Updates & Weekly Video Demos',
    },
    {
      id: 'faq-timeline',
      question: 'How long does a typical software project take to complete?',
      answer:
        'Timelines are customized based on scope and technical complexity:\n• Rapid MVPs / Landing Platforms: 2 to 4 weeks\n• Custom Web Applications / SaaS: 6 to 10 weeks\n• Complex Multi-Tenant Platforms / Enterprise Portals: 10 to 16 weeks\nEvery proposal includes a milestone schedule with clear delivery dates.',
      category: 'process',
      highlight: '2–4 Weeks for MVPs, 6–10 Weeks for Web Apps',
    },
    {
      id: 'faq-code-ownership',
      question: 'Who owns the intellectual property and source code once completed?',
      answer:
        'You own 100% of the intellectual property, source code, database schemas, and all project assets upon milestone completion and final invoice settlement. There are no vendor lock-ins or proprietary license constraints. Everything is delivered directly to your GitHub or GitLab organization with clean documentation and installation guides.',
      category: 'pricing',
      highlight: '100% Client Ownership with Zero Vendor Lock-in',
    },
    {
      id: 'faq-existing-code',
      question: 'Can you work with an existing codebase or integrate into our current team?',
      answer:
        'Yes. I frequently join existing engineering teams to accelerate roadmaps, untangle technical debt, refactor legacy Laravel/PHP or React codebases, and optimize high-latency database queries. I quickly integrate with your team’s existing branching strategies, PR review practices, and CI/CD pipelines.',
      category: 'services',
      highlight: 'Seamless Team Integration & Legacy Code Modernization',
    },
    {
      id: 'faq-warranty',
      question: 'Do you offer post-launch maintenance, monitoring, and warranty support?',
      answer:
        'Every custom project includes 30 days of complimentary post-launch support covering bug fixes, server fine-tuning, and operational guidance. Following this warranty period, I offer flexible monthly maintenance retainers for continuous feature rollouts, security patches, automated backups, and uptime monitoring.',
      category: 'services',
      highlight: '30-Day Complimentary Warranty + Flexible Retainers',
    },
    {
      id: 'faq-pricing',
      question: 'How do you structure pricing and contracts for engagements?',
      answer:
        'Engagements are structured using either:\n1. Fixed-Price Milestone Contracts: Best for clearly defined scopes. Payments are tied to verifiable milestones (e.g., 30% kickoff, 40% functional staging beta, 30% production launch).\n2. Dedicated Engineering Retainer: Best for fast-moving startups and ongoing product roadmaps, billed on a bi-weekly or monthly basis with guaranteed dedicated hours and priority turnaround.',
      category: 'pricing',
      highlight: 'Transparent Milestone Contracts or Dedicated Retainers',
    },
  ],
};
