'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import translations from '@/lib/translations';

const SUPPORTED = ['en', 'fr', 'rw'];

const LanguageContext = createContext({
  lang: 'en',
  changeLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('portfolio-lang');
    if (stored && SUPPORTED.includes(stored)) setLang(stored);
    setMounted(true);
  }, []);

  function changeLang(l) {
    if (!SUPPORTED.includes(l)) return;
    setLang(l);
    localStorage.setItem('portfolio-lang', l);
  }

  function t(key) {
    return translations[lang]?.[key] ?? translations.en[key] ?? key;
  }

  if (!mounted) return null;

  return (
    <LanguageContext.Provider value={{ lang, changeLang, t, SUPPORTED }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
