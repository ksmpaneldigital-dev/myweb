export interface TranslationDictionary {
  nav: {
    home: string;
    about: string;
    skills: string;
    services: string;
    projects: string;
    experience: string;
    education: string;
    testimonials: string;
    code: string;
    faq: string;
    contact: string;
    resume: string;
  };
  hero: {
    available: string;
    greeting: string;
    roles: string[];
    viewProjects: string;
    downloadResume: string;
    copyEmail: string;
    emailCopied: string;
    quickChat: string;
    connectWithMe: string;
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    philosophyTitle: string;
    careerGoalsTitle: string;
    coreStrengths: string;
  };
  skills: {
    badge: string;
    title: string;
    subtitle: string;
    selfAssessmentNote: string;
    searchPlaceholder: string;
    allTab: string;
    frontendTab: string;
    backendTab: string;
    databaseTab: string;
    programmingTab: string;
    toolsTab: string;
    frontend: string;
    backend: string;
    database: string;
    programming: string;
    tools: string;
  };
  services: {
    badge: string;
    title: string;
    subtitle: string;
    deliverables: string;
    requestService: string;
    inquireNow: string;
  };
  projects: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    filterByTag: string;
    sortBy: string;
    sortFeatured: string;
    sortNewest: string;
    sortAZ: string;
    liveDemo: string;
    sourceCode: string;
    details: string;
    noResults: string;
    resetFilters: string;
  };
  experience: {
    badge: string;
    title: string;
    subtitle: string;
  };
  education: {
    badge: string;
    title: string;
    subtitle: string;
  };
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
    verifiedReview: string;
  };
  code: {
    badge: string;
    title: string;
    subtitle: string;
    copyCode: string;
    copied: string;
    architectureNotes: string;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allTab: string;
    servicesTab: string;
    processTab: string;
    pricingTab: string;
    expandAll: string;
    collapseAll: string;
    noResults: string;
    stillHaveQuestions: string;
    stillHaveQuestionsDesc: string;
    contactMeBtn: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    directTitle: string;
    directDesc: string;
    emailLabel: string;
    phoneLabel: string;
    telegramLabel: string;
    locationLabel: string;
    quickTurnaround: string;
    formTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabelInput: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    projectTypeLabel: string;
    budgetLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendButton: string;
    sending: string;
    successMsg: string;
    copyEmail: string;
    copiedEmail: string;
    copyPhone: string;
    copiedPhone: string;
  };
  terminal: {
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    helpPrompt: string;
  };
  resumeModal: {
    title: string;
    print: string;
    download: string;
    tabOverview: string;
    tabExperience: string;
    tabSkills: string;
    tabEducation: string;
    close: string;
  };
  footer: {
    quickNav: string;
    connect: string;
    backToTop: string;
    rights: string;
    newsletterTitle: string;
    newsletterSubtitle: string;
    newsletterPlaceholder: string;
    newsletterSubscribeBtn: string;
    newsletterSubscribing: string;
    newsletterSuccess: string;
    newsletterAlreadySubscribed: string;
    newsletterInvalidEmail: string;
    newsletterHelperInvalid: string;
    newsletterHelperValid: string;
    newsletterPrivacy: string;
  };
}

export const translations: Record<'en' | 'km', TranslationDictionary> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      services: 'Services',
      projects: 'Projects',
      experience: 'Experience',
      education: 'Education',
      testimonials: 'Testimonials',
      code: 'Code Snippets',
      faq: 'FAQ',
      contact: 'Contact',
      resume: 'CV / Resume',
    },
    hero: {
      available: 'Available for New Projects & Contracts',
      greeting: 'Hello, I am',
      roles: [
        'Senior Full-Stack Developer',
        'React & TypeScript Specialist',
        'Laravel & Distributed API Architect',
        'High-Performance UI/UX Engineer',
      ],
      viewProjects: 'View Projects',
      downloadResume: 'COURSE/LEARNING',
      copyEmail: 'Copy Email',
      emailCopied: 'Email copied to clipboard!',
      quickChat: 'Schedule a Call',
      connectWithMe: 'Connect With Me:',
    },
    about: {
      badge: 'Know Me Better',
      title: 'About My Professional Journey',
      subtitle: 'Bridging technical precision with creative problem-solving to engineer web platforms that scale.',
      philosophyTitle: 'Development Philosophy',
      careerGoalsTitle: 'Career Goals',
      coreStrengths: 'Core Strengths',
    },
    skills: {
      badge: 'Technical Mastery',
      title: 'Skills & Core Technologies',
      subtitle: 'A comprehensive overview of my tech stack across modern frontend frameworks, backend engines, databases, and DevOps pipelines.',
      selfAssessmentNote: '* Proficiency percentages are self-assessed evaluations reflecting hands-on production confidence and comfort level.',
      searchPlaceholder: 'Search technology (e.g. React, Docker, SQL)...',
      allTab: 'All Technologies',
      frontendTab: 'Frontend',
      backendTab: 'Backend',
      databaseTab: 'Databases',
      programmingTab: 'Programming',
      toolsTab: 'DevOps & Tools',
      frontend: 'Frontend',
      backend: 'Backend',
      database: 'Databases',
      programming: 'Programming',
      tools: 'DevOps & Tools',
    },
    services: {
      badge: 'What I Offer',
      title: 'Specialized Development Services',
      subtitle: 'Delivering end-to-end technical craftsmanship, from high-performance single page apps to mission-critical backend APIs and admin dashboards.',
      deliverables: 'Included Deliverables:',
      requestService: 'Request This Service',
      inquireNow: 'Inquire for This Service',
    },
    projects: {
      badge: 'Featured Portfolio',
      title: 'Recent Work & Engineering Case Studies',
      subtitle: 'Explore production web platforms, API engines, administrative dashboards, and desktop tools built with modern best practices.',
      searchPlaceholder: 'Search projects by name, keyword, or tech...',
      filterByTag: 'Filter by Tech:',
      sortBy: 'Sort by:',
      sortFeatured: 'Featured First',
      sortNewest: 'Newest First',
      sortAZ: 'Alphabetical (A-Z)',
      liveDemo: 'Live Demo',
      sourceCode: 'Source',
      details: 'Architecture Details',
      noResults: 'No projects found matching your filters.',
      resetFilters: 'Reset All Filters',
    },
    experience: {
      badge: 'Career Milestones',
      title: 'Work Experience & Timeline',
      subtitle: 'A track record of shipping scalable digital software, managing high-throughput services, and collaborating across engineering teams.',
    },
    education: {
      badge: 'Academic & Courses',
      title: 'Course, Learning & Certifications',
      subtitle: 'Formal foundations in Computer Science, specialized development courses, and continuous professional accreditations.',
    },
    testimonials: {
      badge: 'Client Endorsements',
      title: 'What Clients & Tech Leads Say',
      subtitle: 'Feedback from founders, engineering managers, and collaborators on code quality, speed, and architectural clarity.',
      verifiedReview: 'Verified Client Endorsement',
    },
    code: {
      badge: 'Architecture Craft',
      title: 'Production Code Architecture',
      subtitle: 'Interactive inspection of real design patterns, type safety implementations, and clean backend layers.',
      copyCode: 'Copy Snippet',
      copied: 'Code Copied!',
      architectureNotes: 'Why This Architecture Matters:',
    },
    faq: {
      badge: 'Frequently Asked Questions',
      title: 'Common Questions & Project Process',
      subtitle:
        'Everything you need to know about working together, from development workflows and communication to code ownership and support.',
      searchPlaceholder: 'Search questions by keyword, topic, or process...',
      allTab: 'All Questions',
      servicesTab: 'Services & Tech',
      processTab: 'Process & Timeline',
      pricingTab: 'Pricing & IP Ownership',
      expandAll: 'Expand All',
      collapseAll: 'Collapse All',
      noResults: 'No questions found matching your search term.',
      stillHaveQuestions: 'Have a specific question not covered here?',
      stillHaveQuestionsDesc:
        'Feel free to reach out directly. I am happy to discuss your specific technical needs, scope, and timeline.',
      contactMeBtn: 'Ask a Question / Get in Touch',
    },
    contact: {
      badge: 'Get in Touch',
      title: "Let's Collaborate On Your Next Project",
      subtitle: 'Have an idea, need technical leadership, or want to consult on full-stack architecture? Drop a message below.',
      directTitle: "Let's Work Together",
      directDesc: 'Have a project idea or seeking a senior engineer for contract or full-time roles? I am always open to exploring high-impact collaborations.',
      emailLabel: 'Email Address',
      phoneLabel: 'Phone / WhatsApp',
      telegramLabel: 'Telegram Instant Chat',
      locationLabel: 'Based In',
      quickTurnaround: 'Average response time is within 4–12 business hours.',
      formTitle: 'Send a Direct Message',
      nameLabel: 'Your Name',
      namePlaceholder: 'e.g. Sokha Chan',
      emailLabelInput: 'Email Address',
      emailPlaceholder: 'e.g. sokha@example.com',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'e.g. New Web Application Project Inquiry',
      projectTypeLabel: 'Project Type',
      budgetLabel: 'Estimated Budget',
      messageLabel: 'Message (Minimum 10 characters)',
      messagePlaceholder: 'Tell me about your project goals, timeline, and tech requirements...',
      sendButton: 'Send Message',
      sending: 'Sending Message...',
      successMsg: 'Thank you! Your message has been sent successfully. I will get back to you within 24 hours.',
      copyEmail: 'Copy Email',
      copiedEmail: 'Email copied to clipboard!',
      copyPhone: 'Copy Phone',
      copiedPhone: 'Phone number copied to clipboard!',
    },
    terminal: {
      title: 'Developer Terminal CLI',
      subtitle: 'Interactive shell environment for engineers and recruiters',
      inputPlaceholder: "Type 'help' for available commands...",
      helpPrompt: 'Enter commands like: help, bio, skills, projects, hire, theme dark, clear',
    },
    resumeModal: {
      title: 'Curriculum Vitae / Professional Resume',
      print: 'Print CV',
      download: 'Download TXT',
      tabOverview: 'Executive Summary',
      tabExperience: 'Work Experience',
      tabSkills: 'Core Competencies',
      tabEducation: 'Education & Degrees',
      close: 'Close',
    },
    footer: {
      quickNav: 'Navigation Links',
      connect: 'Connect With Me',
      backToTop: 'Back to Top',
      rights: 'All rights reserved.',
      newsletterTitle: 'Developer & Architecture Newsletter',
      newsletterSubtitle:
        'Stay informed with practical full-stack insights, software architecture deep dives, and early updates on new open-source projects.',
      newsletterPlaceholder: 'Enter your work or personal email...',
      newsletterSubscribeBtn: 'Subscribe',
      newsletterSubscribing: 'Subscribing...',
      newsletterSuccess: 'Thank you for subscribing! You have been added to the newsletter list.',
      newsletterAlreadySubscribed: 'This email is already subscribed to updates.',
      newsletterInvalidEmail: 'Please enter a valid email address.',
      newsletterHelperInvalid: 'Please enter a valid email format (e.g., name@example.com).',
      newsletterHelperValid: 'Email format is valid and ready to subscribe.',
      newsletterPrivacy: 'Strictly zero spam. Unsubscribe at any time.',
    },
  },
  km: {
    nav: {
      home: 'ទំព័រដើម',
      about: 'អំពីខ្ញុំ',
      skills: 'ជំនាញបច្ចេកទេស',
      services: 'សេវាកម្ម',
      projects: 'គម្រោងការងារ',
      experience: 'បទពិសោធន៍',
      education: 'ការអប់រំ',
      testimonials: 'មតិកែលម្អ',
      code: 'កូដគំរូ',
      faq: 'សំណួរញឹកញាប់',
      contact: 'ទំនាក់ទំនង',
      resume: 'ប្រវត្តិរូបសង្ខេប',
    },
    hero: {
      available: 'ត្រៀមខ្លួនរួចរាល់សម្រាប់គម្រោងថ្មី និងកិច្ចសន្យាការងារ',
      greeting: 'សួស្តី ខ្ញុំបាទគឺ',
      roles: [
        'អ្នកអភិវឌ្ឍន៍ Full-Stack ជាន់ខ្ពស់',
        'អ្នកជំនាញ React និង TypeScript',
        'ស្ថាបត្យករប្រព័ន្ធ Laravel និង Distributed APIs',
        'វិស្វករ UI/UX ដែលមានប្រសិទ្ធភាពខ្ពស់',
      ],
      viewProjects: 'មើលគម្រោងការងារ',
      downloadResume: 'COURSE/LEARNING',
      copyEmail: 'ចម្លងអ៊ីមែល',
      emailCopied: 'បានចម្លងអ៊ីមែលដោយជោគជ័យ!',
      quickChat: 'ណាត់ជួបពិភាក្សាការងារ',
      connectWithMe: 'ភ្ជាប់ទំនាក់ទំនងជាមួយខ្ញុំ៖',
    },
    about: {
      badge: 'ស្គាល់ខ្ញុំឱ្យកាន់តែច្បាស់',
      title: 'អំពីដំណើរវិជ្ជាជីវៈរបស់ខ្ញុំ',
      subtitle: 'ផ្សារភ្ជាប់ភាពសុក្រឹតខាងបច្ចេកវិទ្យា ជាមួយការដោះស្រាយបញ្ហាប្រកបដោយភាពច្នៃប្រឌិត ដើម្បីបង្កើតប្រព័ន្ធគេហទំព័រដែលអាចពង្រីកបាន។',
      philosophyTitle: 'ទស្សនវិជ្ជានៃការអភិវឌ្ឍន៍',
      careerGoalsTitle: 'គោលដៅអាជីព',
      coreStrengths: 'ចំណុចខ្លាំងស្នូល',
    },
    skills: {
      badge: 'ជំនាញបច្ចេកវិទ្យាស្នូល',
      title: 'ជំនាញ និងបច្ចេកវិទ្យាដែលប្រើប្រាស់',
      subtitle: 'ទិដ្ឋភាពទូទៅនៃបច្ចេកវិទ្យាដែលខ្ញុំស្ទាត់ជំនាញលើ Frontend, Backend, Databases និង DevOps pipelines។',
      selfAssessmentNote: '* ភាគរយនៃកម្រិតជំនាញ គឺជាការវាយតម្លៃផ្ទាល់ខ្លួនផ្អែកលើបទពិសោធន៍ និងការអនុវត្តការងារជាក់ស្តែងក្នុងផលិតកម្ម។',
      searchPlaceholder: 'ស្វែងរកបច្ចេកវិទ្យា (ឧទាហរណ៍ React, Docker, SQL)...',
      allTab: 'បច្ចេកវិទ្យាទាំងអស់',
      frontendTab: 'Frontend',
      backendTab: 'Backend',
      databaseTab: 'Databases',
      programmingTab: 'Programming',
      toolsTab: 'DevOps & ឧបករណ៍',
      frontend: 'Frontend',
      backend: 'Backend',
      database: 'Databases',
      programming: 'Programming',
      tools: 'DevOps & ឧបករណ៍',
    },
    services: {
      badge: 'អ្វីដែលខ្ញុំផ្តល់ជូន',
      title: 'សេវាកម្មអភិវឌ្ឍន៍ជំនាញវិជ្ជាជីវៈ',
      subtitle: 'ផ្តល់ជូននូវការអភិវឌ្ឍន៍ប្រព័ន្ធឌីជីថលពេញលេញ ចាប់ពីកម្មវិធីគេហទំព័រដែលមានល្បឿនលឿន រហូតដល់ Backend APIs និងផ្ទាំងគ្រប់គ្រងរដ្ឋបាល។',
      deliverables: 'លទ្ធផលដែលទទួលបាន៖',
      requestService: 'ស្នើសុំសេវាកម្មនេះ',
      inquireNow: 'សាកសួរព័ត៌មានអំពីសេវាកម្មនេះ',
    },
    projects: {
      badge: 'ផលប័ត្រស្នាដៃ',
      title: 'គម្រោងការងារថ្មីៗ និងករណីសិក្សាវិស្វកម្ម',
      subtitle: 'ស្វែងយល់ពីប្រព័ន្ធគេហទំព័រក្នុងផលិតកម្ម ម៉ាស៊ីន API ផ្ទាំងគ្រប់គ្រងរដ្ឋបាល និងឧបករណ៍ Desktop ដែលសាងសង់តាមស្តង់ដារល្អបំផុត។',
      searchPlaceholder: 'ស្វែងរកគម្រោងតាមឈ្មោះ ឬបច្ចេកវិទ្យា...',
      filterByTag: 'ច្រោះតាមបច្ចេកវិទ្យា៖',
      sortBy: 'តម្រៀបតាម៖',
      sortFeatured: 'គម្រោងលេចធ្លោមុន',
      sortNewest: 'គម្រោងថ្មីបំផុតមុន',
      sortAZ: 'តាមលំដាប់អក្សរ (A-Z)',
      liveDemo: 'មើលគេហទំព័រផ្ទាល់',
      sourceCode: 'កូដប្រភព',
      details: 'ព័ត៌មានលម្អិតអំពីស្ថាបត្យកម្ម',
      noResults: 'រកមិនឃើញគម្រោងដែលត្រូវនឹងលក្ខខណ្ឌស្វែងរកទេ។',
      resetFilters: 'កំណត់តម្រងឡើងវិញ',
    },
    experience: {
      badge: 'ដំណាក់កាលនៃអាជីព',
      title: 'បទពិសោធន៍ការងារ និងបន្ទាត់ពេលវេលា',
      subtitle: 'កំណត់ត្រានៃការបង្កើតកម្មវិធីឌីជីថល ការគ្រប់គ្រងប្រព័ន្ធដែលមានបន្ទុកខ្ពស់ និងការសហការជាក្រុមវិស្វកម្ម។',
    },
    education: {
      badge: 'វគ្គសិក្សា & ការអប់រំ',
      title: 'វគ្គសិក្សា ការរៀនសូត្រ និងវិញ្ញាបនបត្រ (Course & Learning)',
      subtitle: 'មូលដ្ឋានគ្រឹះវិទ្យាសាស្ត្រកុំព្យូទ័រ វគ្គបណ្តុះបណ្តាលឯកទេស និងវិញ្ញាបនបត្រជំនាញវិជ្ជាជីវៈ។',
    },
    testimonials: {
      badge: 'ការធានាអះអាងពីអតិថិជន',
      title: 'អ្វីដែលអតិថិជន និងអ្នកដឹកនាំបច្ចេកវិទ្យានិយាយ',
      subtitle: 'មតិកែលម្អពីស្ថាបនិក អ្នកគ្រប់គ្រងផ្នែកវិស្វកម្ម និងដៃគូសហការអំពីគុណភាពកូដ ល្បឿន និងភាពច្បាស់លាស់។',
      verifiedReview: 'ការធានាអះអាងពីអតិថិជនពិតប្រាកដ',
    },
    code: {
      badge: 'គុណភាពស្ថាបត្យកម្មកូដ',
      title: 'ស្ថាបត្យកម្មកូដផលិតកម្មកម្រិតខ្ពស់',
      subtitle: 'ការពិនិត្យមើលគំរូរចនាសម្ព័ន្ធកូដជាក់ស្តែង ការអនុវត្ត Type Safety និងស្រទាប់ Clean Architecture។',
      copyCode: 'ចម្លងកូដ',
      copied: 'បានចម្លងកូដរួចរាល់!',
      architectureNotes: 'សារៈសំខាន់នៃស្ថាបត្យកម្មនេះ៖',
    },
    faq: {
      badge: 'សំណួរដែលសួរញឹកញាប់ (FAQ)',
      title: 'សំណួរទូទៅ និងដំណើរការអភិវឌ្ឍន៍គម្រោង',
      subtitle:
        'ព័ត៌មានលម្អិតអំពីកិច្ចសហការ ចាប់ពីដំណើរការអភិវឌ្ឍន៍ ការទំនាក់ទំនង រហូតដល់កម្មសិទ្ធិបញ្ញាកូដ និងការថែទាំ។',
      searchPlaceholder: 'ស្វែងរកសំណួរតាមពាក្យគន្លឹះ ឬប្រធានបទ...',
      allTab: 'សំណួរទាំងអស់',
      servicesTab: 'សេវាកម្ម & បច្ចេកវិទ្យា',
      processTab: 'ដំណើរការ & កាលវិភាគ',
      pricingTab: 'តម្លៃ & កម្មសិទ្ធិកូដ',
      expandAll: 'ពង្រីកទាំងអស់',
      collapseAll: 'បង្រួមទាំងអស់',
      noResults: 'មិនមានសំណួរដែលត្រូវនឹងពាក្យស្វែងរករបស់អ្នកទេ។',
      stillHaveQuestions: 'តើអ្នកមានសំណួរជាក់លាក់ផ្សេងទៀតទេ?',
      stillHaveQuestionsDesc:
        'សូមទាក់ទងមកខ្ញុំដោយផ្ទាល់។ ខ្ញុំរីករាយនឹងពិភាក្សាអំពីតម្រូវការបច្ចេកវិទ្យា និងកាលវិភាគការងាររបស់អ្នក។',
      contactMeBtn: 'សួរសំណួរ / ទំនាក់ទំនងឥឡូវនេះ',
    },
    contact: {
      badge: 'ទំនាក់ទំនង',
      title: 'ចូរយើងសហការលើគម្រោងបន្ទាប់របស់អ្នក',
      subtitle: 'មានគំនិតគម្រោង ត្រូវការអ្នកដឹកនាំបច្ចេកទេស ឬចង់ពិគ្រោះយោបល់លើស្ថាបត្យកម្ម Full-Stack? សូមផ្ញើសារខាងក្រោម។',
      directTitle: 'ចូរយើងធ្វើការជាមួយគ្នា',
      directDesc: 'មានគំនិតគម្រោង ឬស្វែងរកវិស្វករជាន់ខ្ពស់សម្រាប់កិច្ចសន្យា ឬការងារពេញម៉ោង? ខ្ញុំតែងតែបើកចំហស្វាគមន៍ជានិច្ច។',
      emailLabel: 'អាសយដ្ឋានអ៊ីមែល',
      phoneLabel: 'ទូរស័ព្ទ / WhatsApp',
      telegramLabel: 'តេឡេក្រាម',
      locationLabel: 'ទីតាំងរស់នៅ',
      quickTurnaround: 'ពេលវេលាឆ្លើយតបជាមធ្យមគឺក្នុងរយៈពេល ៤ ដល់ ១២ ម៉ោងធ្វើការ។',
      formTitle: 'ផ្ញើសារផ្ទាល់មកកាន់ខ្ញុំ',
      nameLabel: 'ឈ្មោះរបស់អ្នក',
      namePlaceholder: 'ឧទាហរណ៍៖ ចាន់ សុខា',
      emailLabelInput: 'អាសយដ្ឋានអ៊ីមែល',
      emailPlaceholder: 'ឧទាហរណ៍៖ sokha@example.com',
      subjectLabel: 'ប្រធានបទ',
      subjectPlaceholder: 'ឧទាហរណ៍៖ ការសាកសួរអំពីគម្រោងកម្មវិធីគេហទំព័រថ្មី',
      projectTypeLabel: 'ប្រភេទគម្រោង',
      budgetLabel: 'ថវិកាប្រហាក់ប្រហែល',
      messageLabel: 'ខ្លឹមសារសារ (យ៉ាងតិច ១០ តួអក្សរ)',
      messagePlaceholder: 'សូមប្រាប់ខ្ញុំអំពីគោលដៅគម្រោង កាលវិភាគ និងតម្រូវការបច្ចេកទេស...',
      sendButton: 'ផ្ញើសារឥឡូវនេះ',
      sending: 'កំពុងផ្ញើសារ...',
      successMsg: 'សូមអរគុណ! សាររបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ។ ខ្ញុំនឹងទាក់ទងត្រឡប់មកវិញក្នុងរយៈពេល ២៤ ម៉ោង។',
      copyEmail: 'ចម្លងអ៊ីមែល',
      copiedEmail: 'បានចម្លងអ៊ីមែលរួចរាល់!',
      copyPhone: 'ចម្លងលេខទូរស័ព្ទ',
      copiedPhone: 'បានចម្លងលេខទូរស័ព្ទរួចរាល់!',
    },
    terminal: {
      title: 'Developer Terminal CLI',
      subtitle: 'ផ្ទាំងបញ្ជាពាក្យបញ្ជាសម្រាប់វិស្វករ និងអ្នកជ្រើសរើសបុគ្គលិក',
      inputPlaceholder: "វាយពាក្យ 'help' ដើម្បីមើលពាក្យបញ្ជា...",
      helpPrompt: 'បញ្ចូលពាក្យបញ្ជាដូចជា៖ help, bio, skills, projects, hire, theme dark, clear',
    },
    resumeModal: {
      title: 'ប្រវត្តិរូបសង្ខេបវិជ្ជាជីវៈ (Curriculum Vitae)',
      print: 'បោះពុម្ព CV',
      download: 'ទាញយក TXT',
      tabOverview: 'សេចក្តីសង្ខេបប្រតិបត្តិ',
      tabExperience: 'បទពិសោធន៍ការងារ',
      tabSkills: 'សមត្ថភាពស្នូល',
      tabEducation: 'ការអប់រំ និងសញ្ញាបត្រ',
      close: 'បិទ',
    },
    footer: {
      quickNav: 'តំណភ្ជាប់រហ័ស',
      connect: 'ភ្ជាប់ទំនាក់ទំនងជាមួយខ្ញុំ',
      backToTop: 'ត្រឡប់ទៅលើវិញ',
      rights: 'រក្សាសិទ្ធិគ្រប់យ៉ាង។',
      newsletterTitle: 'ព្រឹត្តិបត្រព័ត៌មានបច្ចេកវិទ្យា & ស្ថាបត្យកម្មកូដ',
      newsletterSubtitle:
        'ទទួលបានគន្លឹះអភិវឌ្ឍន៍ Full-Stack ស្ថាបត្យកម្មប្រព័ន្ធទំនើប និងព័ត៌មានគម្រោងថ្មីៗផ្ទាល់ទៅកាន់អ៊ីមែលរបស់អ្នក។',
      newsletterPlaceholder: 'បញ្ចូលអាសយដ្ឋានអ៊ីមែលរបស់អ្នក...',
      newsletterSubscribeBtn: 'ចុះឈ្មោះជាវ',
      newsletterSubscribing: 'កំពុងដំណើរការ...',
      newsletterSuccess: 'សូមអរគុណសម្រាប់ការជាវ! អ្នកត្រូវបានបន្ថែមទៅក្នុងបញ្ជីព្រឹត្តិបត្រព័ត៌មានដោយជោគជ័យ។',
      newsletterAlreadySubscribed: 'អ៊ីមែលនេះបានចុះឈ្មោះជាវរួចរាល់ហើយ។',
      newsletterInvalidEmail: 'សូមបញ្ចូលអាសយដ្ឋានអ៊ីមែលដែលត្រឹមត្រូវ។',
      newsletterHelperInvalid: 'សូមបញ្ចូលទម្រង់អ៊ីមែលដែលត្រឹមត្រូវ (ឧទាហរណ៍៖ name@example.com)។',
      newsletterHelperValid: 'ទម្រង់អ៊ីមែលត្រឹមត្រូវ រួចរាល់សម្រាប់ការចុះឈ្មោះ។',
      newsletterPrivacy: 'គ្មានសារឥតបានការឡើយ។ អាចឈប់ជាវបានគ្រប់ពេល។',
    },
  },
};
