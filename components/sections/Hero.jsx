'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Terminal } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

function useTypingEffect(text, startDelay = 0, speed = 42) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let timeoutId;
    timeoutId = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeoutId);
  }, [text, startDelay, speed]);

  return { displayed, done };
}

function TerminalLine({ text, prefix, lineDelay, isLast }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), lineDelay);
    return () => clearTimeout(t);
  }, [lineDelay]);

  const { displayed, done } = useTypingEffect(show ? text : '', 0, 40);
  const showCursor = !done || isLast;

  if (!show) return null;

  return (
    <div className="flex items-start gap-3 font-mono text-sm sm:text-base leading-relaxed">
      <span className={`flex-shrink-0 font-bold ${prefix === '$' ? 'text-lime/60' : 'text-lime'}`}>
        {prefix}
      </span>
      <span className="text-fg opacity-90">
        {displayed}
        {showCursor && <span className={`cursor ${done && !isLast ? 'opacity-0' : ''}`} />}
      </span>
    </div>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const [allDone, setAllDone] = useState(false);

  const lines = [
    { prefix: '$', text: t('hero.t1'), delay: 400  },
    { prefix: '>', text: t('hero.t2'), delay: 1400 },
    { prefix: '>', text: t('hero.t3'), delay: 2700 },
  ];

  useEffect(() => {
    const lastLine = lines[lines.length - 1];
    const timeout = lastLine.delay + lastLine.text.length * 40 + 600;
    const timer = setTimeout(() => setAllDone(true), timeout);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  // Reset on language change
  useEffect(() => {
    setAllDone(false);
  }, [t]);

  const scrollToAbout   = useCallback(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), []);
  const scrollToContact = useCallback(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-dark-base"
    >
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(ellipse at center, #D6F49D 0%, transparent 70%)', filter: 'blur(80px)' }}
      />
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-5"
        style={{ background: 'radial-gradient(ellipse at center, #D6F49D 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      {/* Subtle grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(214,244,157,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(214,244,157,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto section-padding flex flex-col gap-12">

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Chrome bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-dark-card/80 backdrop-blur-sm rounded-t-xl border border-dark-border/80 border-b-0">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <div className="flex items-center gap-1.5 ml-3 text-muted">
              <Terminal size={12} />
              <span className="font-mono text-xs">portfolio — terminal</span>
            </div>
          </div>

          {/* Body */}
          <div className="bg-dark-card/60 backdrop-blur-sm border border-dark-border/80 rounded-b-xl px-6 py-6 space-y-3 scanlines relative overflow-hidden">
            {lines.map((line, i) => (
              <TerminalLine
                key={`${i}-${line.text}`}
                prefix={line.prefix}
                text={line.text}
                lineDelay={line.delay}
                isLast={i === lines.length - 1}
              />
            ))}
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={allDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none">
            <span className="text-fg">{personalInfo.name.split(' ')[0]} </span>
            <span className="text-fg">{personalInfo.name.split(' ')[1]} </span>
            <br />
            <span className="shimmer-text">{personalInfo.name.split(' ')[2]}</span>
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 max-w-[48px] bg-lime/40" />
            <span className="font-mono text-sm text-muted tracking-widest uppercase">
              {personalInfo.title}
            </span>
            {personalInfo.available && (
              <span className="flex items-center gap-1.5 font-mono text-xs text-lime bg-lime/10 border border-lime/30 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                {t('hero.available')}
              </span>
            )}
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={allDone ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center gap-4"
        >
          <button
            onClick={scrollToAbout}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-lime text-dark-base font-semibold text-sm rounded-xl hover:bg-lime-dim transition-all duration-200 hover:shadow-lime-md"
          >
            {t('hero.cta')}
            <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
          </button>
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 px-6 py-3 border border-dark-border/80 text-muted hover:border-lime/50 hover:text-lime text-sm font-mono rounded-xl transition-all duration-200"
          >
            {t('hero.reach')}
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={allDone ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-muted/60 tracking-widest uppercase">{t('hero.scroll')}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-lime/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
