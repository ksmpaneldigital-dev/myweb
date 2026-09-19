import { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations, TranslationDictionary } from '../data/translations';

const LANGUAGE_STORAGE_KEY = 'devfolio_language';

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
      if (stored === 'en' || stored === 'km') {
        return stored;
      }
    } catch {
      // Ignore localStorage errors
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // Ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'km' : 'en');
  };

  const t: TranslationDictionary = translations[language] || translations.en;

  return {
    language,
    setLanguage,
    toggleLanguage,
    t,
  };
}
