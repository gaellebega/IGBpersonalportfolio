'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { awards } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

export default function HonorsAwards() {
  const { t } = useLanguage();
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="awards"
      ref={ref}
      className="relative py-28 bg-dark-base overflow-hidden"
    >
      <div aria-hidden className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 w-[700px] h-[300px] opacity-[0.04]"
        style={{ background: 'radial-gradient(ellipse at top, #D6F49D 0%, transparent 60%)', filter: 'blur(60px)' }}
      />

      <div className="relative max-w-5xl mx-auto section-padding">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="font-mono text-xs text-lime tracking-[0.2em] uppercase">03 /</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-fg">{t('awards.title')}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-dark-border/80 to-transparent" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-muted text-sm mb-16 font-mono"
        >
          {t('awards.subtitle')}
        </motion.p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connector line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: 'easeInOut' }}
            className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-lime/50 via-dark-border to-transparent origin-top"
          />

          <div className="space-y-8">
            {awards.map((award, i) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                className="flex gap-6 sm:gap-10 group"
              >
                {/* Node */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-dark-card border border-dark-border/80 flex items-center justify-center text-xl sm:text-2xl group-hover:border-lime/50 group-hover:shadow-lime-sm transition-all duration-200"
                  >
                    {award.icon}
                  </motion.div>
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 bg-dark-card/50 hover:bg-dark-card border border-dark-border/50 hover:border-lime/30 rounded-2xl p-6 transition-all duration-200 hover:shadow-lime-sm mb-2"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <h3 className="text-base sm:text-lg font-semibold text-fg group-hover:text-lime transition-colors duration-200">
                      {award.title}
                    </h3>
                    <span className="font-mono text-xs text-lime/70 bg-lime/10 border border-lime/20 px-2.5 py-1 rounded-lg flex-shrink-0">
                      {award.date}
                    </span>
                  </div>
                  <p className="text-muted text-sm leading-relaxed">{award.description}</p>
                  <div className="mt-3 flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-lime/40" />
                    <span className="font-mono text-xs text-muted/60">{award.organization}</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
