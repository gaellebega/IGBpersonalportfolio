'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navSectionKeys } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

export default function FloatingNav() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('hero');
  const [visible, setVisible]             = useState(false);
  const [hoveredLabel, setHoveredLabel]   = useState(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers = [];
    navSectionKeys.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          key="floating-nav"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-3"
          aria-label="Section navigation"
        >
          {navSectionKeys.map(({ id, labelKey }) => {
            const isActive = activeSection === id;
            return (
              <div
                key={id}
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => scrollTo(id)}
                onMouseEnter={() => setHoveredLabel(id)}
                onMouseLeave={() => setHoveredLabel(null)}
              >
                <AnimatePresence>
                  {hoveredLabel === id && (
                    <motion.span
                      initial={{ opacity: 0, x: 8, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 8, scale: 0.9 }}
                      transition={{ duration: 0.18 }}
                      className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-dark-card/90 border border-dark-border text-lime backdrop-blur-sm whitespace-nowrap"
                    >
                      {t(labelKey)}
                    </motion.span>
                  )}
                </AnimatePresence>

                <motion.div
                  animate={{
                    width: isActive ? 28 : 8,
                    backgroundColor: isActive ? '#D6F49D' : 'rgba(214,244,157,0.3)',
                    boxShadow: isActive
                      ? '0 0 10px rgba(214,244,157,0.6)'
                      : '0 0 0px transparent',
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="h-2 rounded-full flex-shrink-0"
                />
              </div>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
