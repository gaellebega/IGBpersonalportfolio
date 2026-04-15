'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo, skills } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

const categoryColors = {
  Frontend:    'text-sky-400 border-sky-400/30 bg-sky-400/10 hover:bg-sky-400/20 hover:border-sky-400/60',
  Backend:     'text-violet-400 border-violet-400/30 bg-violet-400/10 hover:bg-violet-400/20 hover:border-violet-400/60',
  Database:    'text-orange-400 border-orange-400/30 bg-orange-400/10 hover:bg-orange-400/20 hover:border-orange-400/60',
  'Soft Skills': 'text-lime border-lime/30 bg-lime/10 hover:bg-lime/20 hover:border-lime/60',
};

function SkillBadge({ name, category, index }) {
  const colorClass = categoryColors[category] || 'text-muted border-dark-border bg-dark-border/30';
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      whileHover={{ scale: 1.06, y: -1 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-medium transition-all duration-200 cursor-default ${colorClass}`}
    >
      {name}
    </motion.span>
  );
}

export default function About() {
  const { t } = useLanguage();
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const statItems = [
    { labelKey: 'about.stat1', value: '3+'   },
    { labelKey: 'about.stat2', value: '20+'  },
    { labelKey: 'about.stat3', value: `${skills.length}+` },
    { labelKey: 'about.stat4', value: '200+' },
  ];

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-28 bg-dark-base overflow-hidden"
    >
      {/* Background accent */}
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-5"
        style={{ background: 'radial-gradient(ellipse at center, #D6F49D 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="relative max-w-6xl mx-auto section-padding">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="font-mono text-xs text-lime tracking-[0.2em] uppercase">01 /</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-fg">{t('about.title')}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-dark-border/80 to-transparent" />
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left — Bio + stats */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-5"
            >
              <p className="text-fg text-base leading-relaxed">
                {t('about.bio1')}
              </p>
              <p className="text-fg text-base leading-relaxed">
                {t('about.bio2')}
              </p>
              <p className="text-muted text-sm leading-relaxed font-mono">
                <span className="text-lime">const</span>{' '}
                <span className="text-sky-400">location</span>{' '}
                <span className="text-fg opacity-60">=</span>{' '}
                <span className="text-orange-400">"{personalInfo.location}"</span>
              </p>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="grid grid-cols-2 gap-4"
            >
              {statItems.map(({ labelKey, value }) => (
                <div
                  key={labelKey}
                  className="grad-border rounded-xl p-5 bg-dark-card/60 hover:bg-dark-card transition-colors duration-200 group cursor-default"
                >
                  <div className="text-3xl font-black text-lime group-hover:glow-text-lime transition-all">
                    {value}
                  </div>
                  <div className="text-xs text-muted mt-1 font-mono">{t(labelKey)}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-dark-card/40 backdrop-blur-sm rounded-2xl border border-dark-border/50 p-6 space-y-6">
              {/* Code-style header */}
              <div className="font-mono text-xs text-muted border-b border-dark-border/50 pb-4">
                <span className="text-lime">const</span>{' '}
                <span className="text-sky-400">skills</span>{' '}
                <span className="text-fg opacity-60">= &#123;</span>
              </div>

              {Object.entries(groupedSkills).map(([category, catSkills], catIdx) => (
                <div key={category} className="space-y-2.5">
                  <div className="font-mono text-xs text-muted/70">
                    <span className="text-orange-400/80">{category.toLowerCase()}</span>
                    <span className="text-fg opacity-40">: [</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pl-4">
                    {catSkills.map((skill, i) => (
                      <SkillBadge
                        key={skill.name}
                        name={skill.name}
                        category={skill.category}
                        index={catIdx * 4 + i}
                      />
                    ))}
                  </div>
                  <div className="font-mono text-xs text-fg opacity-40 pl-0">]</div>
                </div>
              ))}

              <div className="font-mono text-xs text-fg opacity-60 border-t border-dark-border/50 pt-4">
                &#125;
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
