'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { education } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

export default function Education() {
  const { t } = useLanguage();
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="education"
      ref={ref}
      className="relative py-28 bg-dark-surface overflow-hidden"
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(ellipse at center, #D6F49D 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="relative max-w-5xl mx-auto section-padding">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="font-mono text-xs text-lime tracking-[0.2em] uppercase">02 /</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-fg">{t('education.title')}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-dark-border/80 to-transparent" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-muted text-sm mb-16 font-mono"
        >
          {t('education.subtitle')}
        </motion.p>

        {/* Education cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {education.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              whileHover={{ y: -4 }}
              className="group bg-dark-card/50 hover:bg-dark-card border border-dark-border/50 hover:border-lime/30 rounded-2xl p-7 transition-all duration-200 hover:shadow-lime-sm"
            >
              {/* Icon + status badge */}
              <div className="flex items-start justify-between mb-5">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="w-14 h-14 rounded-2xl bg-dark-base border border-dark-border/80 flex items-center justify-center text-2xl group-hover:border-lime/40 transition-all duration-200"
                >
                  {item.icon}
                </motion.div>
                <span className="font-mono text-xs text-lime/80 bg-lime/10 border border-lime/20 px-3 py-1.5 rounded-lg">
                  {item.status}
                </span>
              </div>

              {/* Institution name */}
              <h3 className="text-lg font-semibold text-fg group-hover:text-lime transition-colors duration-200 mb-1">
                {item.institution}
              </h3>

              {/* Full name (for A2SV) */}
              {item.fullName && (
                <p className="font-mono text-xs text-muted/70 mb-3">{item.fullName}</p>
              )}

              {/* Degree / program */}
              <p className="text-sm text-muted leading-relaxed">{item.degree}</p>

              {/* Bottom accent line */}
              <div className="mt-5 flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-lime/40" />
                <div className="flex-1 h-px bg-gradient-to-r from-lime/20 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
