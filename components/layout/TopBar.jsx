'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { navSectionKeys } from '@/lib/data';

const LANG_LABELS = { en: 'EN', fr: 'FR', rw: 'RW' };
const LANG_FULL   = { en: 'English', fr: 'Français', rw: 'Kinyarwanda' };

export default function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const { lang, changeLang, t, SUPPORTED } = useLanguage();

  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen]     = useState(false);
  const [imgError, setImgError]     = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-dark-base/88 backdrop-blur-xl border-b border-dark-border/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-10 h-14 flex items-center justify-between gap-4">

          {/* ── Left: avatar + logo ── */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Circular profile image */}
            <button
              onClick={() => scrollTo('hero')}
              className="relative flex-shrink-0 group"
              aria-label="Back to top"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden transition-all duration-200 group-hover:shadow-profile">
                {!imgError ? (
                  <Image
                    src="/profile.jpeg"
                    alt="Ishami Gaelle Bega"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                    priority
                  />
                ) : (
                  /* Monogram fallback if image not yet added */
                  <div className="w-full h-full bg-dark-card flex items-center justify-center">
                    <span className="font-bold text-lime text-xs select-none">IGB</span>
                  </div>
                )}
              </div>
            </button>

            {/* Logo */}
            <button
              onClick={() => scrollTo('hero')}
              className="font-mono text-sm font-semibold text-lime hover:glow-text-lime transition-all leading-none"
            >
              igb<span className="text-fg opacity-25">.</span>dev
            </button>
          </div>

          {/* ── Center: desktop nav ── */}
          <nav className="hidden md:flex items-center gap-7 flex-1 justify-center">
            {navSectionKeys.filter(s => s.id !== 'hero').map(({ id, labelKey }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="font-sans text-xs font-medium text-muted hover:text-lime transition-colors duration-200 tracking-wide uppercase"
              >
                {t(labelKey)}
              </button>
            ))}
          </nav>

          {/* ── Right: lang + theme + hamburger ── */}
          <div className="flex items-center gap-1.5 flex-shrink-0">

            {/* Language selector */}
            <div ref={langRef} className="relative hidden sm:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-mono text-xs font-semibold text-muted hover:text-lime hover:bg-lime/10 border border-transparent hover:border-dark-border/60 transition-all duration-200"
                aria-label="Select language"
              >
                {LANG_LABELS[lang]}
                <ChevronDown
                  size={11}
                  className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    key="lang-dropdown"
                    initial={{ opacity: 0, y: -6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-1.5 w-36 bg-dark-card border border-dark-border rounded-xl overflow-hidden shadow-xl z-50"
                    style={{ backdropFilter: 'blur(12px)' }}
                  >
                    {SUPPORTED.map((code) => (
                      <button
                        key={code}
                        onClick={() => { changeLang(code); setLangOpen(false); }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-xs transition-colors duration-150 ${
                          lang === code
                            ? 'text-lime bg-lime/10 font-semibold'
                            : 'text-muted hover:text-fg hover:bg-dark-border/30'
                        }`}
                      >
                        <span className="font-mono font-bold">{LANG_LABELS[code]}</span>
                        <span className="opacity-60 text-[10px]">{LANG_FULL[code]}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-muted hover:text-lime hover:bg-lime/10 transition-all duration-200"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <motion.div
                key={theme}
                initial={{ rotate: -30, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.22 }}
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              </motion.div>
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-muted hover:text-lime hover:bg-lime/10 transition-all duration-200"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 top-14 z-40 bg-dark-base/96 backdrop-blur-xl border-b border-dark-border/50 md:hidden"
          >
            <nav className="flex flex-col px-5 py-4 gap-3">
              {navSectionKeys.map(({ id, labelKey }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-sm text-muted hover:text-lime transition-colors text-left py-1"
                >
                  <span className="font-mono text-lime/40 mr-2">/</span>{t(labelKey)}
                </button>
              ))}

              {/* Language section */}
              <div className="border-t border-dark-border/40 mt-2 pt-3">
                <p className="font-mono text-[10px] text-muted/50 uppercase tracking-widest mb-2">Language</p>
                <div className="flex gap-2">
                  {SUPPORTED.map((code) => (
                    <button
                      key={code}
                      onClick={() => { changeLang(code); setMobileOpen(false); }}
                      className={`font-mono text-xs px-3 py-1.5 rounded-lg border transition-all duration-150 ${
                        lang === code
                          ? 'text-lime border-lime/40 bg-lime/10'
                          : 'text-muted border-dark-border hover:border-lime/30 hover:text-lime'
                      }`}
                    >
                      {LANG_LABELS[code]}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
