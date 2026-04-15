'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, ArrowUpRight, CheckCircle, Send } from 'lucide-react';
import { personalInfo, socials } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

/* ── Inline SVG icons (avoids deprecated lucide imports) ───── */
function GithubIcon({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.185 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.071 1.531 1.031 1.531 1.031.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z"/>
    </svg>
  );
}
function LinkedinIcon({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}
function DribbbleIcon({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.605 4.61a8.502 8.502 0 0 1 1.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 0 0-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.803 5.662 2.121-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0 1 12 3.475zm-3.633.803a53.896 53.896 0 0 1 3.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 0 1 4.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 0 1-2.191-5.705zM12 20.547a8.482 8.482 0 0 1-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.32 35.32 0 0 1 1.823 6.475 8.4 8.4 0 0 1-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 0 1-3.655 5.715z"/>
    </svg>
  );
}
function XIcon({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

const socialIconMap = {
  GitHub:   GithubIcon,
  LinkedIn: LinkedinIcon,
  Dribbble: DribbbleIcon,
  X:        XIcon,
};

export default function Contact() {
  const { t } = useLanguage();
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [form,         setForm]         = useState({ name: '', email: '', message: '' });
  const [status,       setStatus]       = useState('idle'); // idle | sending | sent
  const [visitorCount, setVisitorCount] = useState(null);

  useEffect(() => {
    const stored = parseInt(localStorage.getItem('igb-visitors') || '0', 10);
    const visited = sessionStorage.getItem('igb-visited');
    const count = visited ? stored : stored + 1;
    if (!visited) {
      localStorage.setItem('igb-visitors', String(count));
      sessionStorage.setItem('igb-visited', '1');
    }
    setVisitorCount(count);
  }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    // Replace with real handler (Resend, Formspree, etc.)
    await new Promise((r) => setTimeout(r, 1400));
    setStatus('sent');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-28 bg-dark-surface overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dark-border to-transparent" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] opacity-[0.05]"
        style={{ background: 'radial-gradient(ellipse at bottom, #D6F49D 0%, transparent 60%)', filter: 'blur(80px)' }}
      />

      <div className="relative max-w-6xl mx-auto section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="font-mono text-xs text-lime tracking-[0.2em] uppercase">05 /</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-fg">{t('contact.title')}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-dark-border/80 to-transparent" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-muted text-sm mb-16 font-mono"
        >
          {t('contact.subtitle')}
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20" style={{ alignItems: 'stretch' }}>

          {/* Left — info + socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-fg">{t('contact.heading')}</h3>
              <p className="text-muted text-sm leading-relaxed">{t('contact.body')}</p>
            </div>

            {/* Email */}
            <a
              href={`mailto:${personalInfo.email}`}
              className="group inline-flex items-center gap-3 px-5 py-4 rounded-xl bg-dark-card/60 border border-dark-border/60 hover:border-lime/50 hover:shadow-lime-sm transition-all duration-200 w-full"
            >
              <Mail size={18} className="text-lime flex-shrink-0" />
              <span className="font-mono text-sm text-fg-muted group-hover:text-lime transition-colors truncate">
                {personalInfo.email}
              </span>
              <ArrowUpRight size={14} className="ml-auto text-muted group-hover:text-lime transition-colors flex-shrink-0" />
            </a>

            {/* Social links */}
            <div className="space-y-3">
              {socials.map((s) => {
                const Icon = socialIconMap[s.name] || ArrowUpRight;
                return (
                  <motion.a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="group flex items-center gap-3 px-5 py-4 rounded-xl bg-dark-card/60 border border-dark-border/60 hover:border-lime/50 hover:shadow-lime-sm transition-all duration-200"
                  >
                    <Icon size={18} className="text-lime flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-fg-muted group-hover:text-fg transition-colors">{s.name}</div>
                      <div className="font-mono text-xs text-muted truncate">{s.handle}</div>
                    </div>
                    <ArrowUpRight size={14} className="text-muted group-hover:text-lime transition-colors flex-shrink-0" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-4 py-20 text-center flex-1"
              >
                <CheckCircle size={48} className="text-lime" style={{ filter: 'drop-shadow(0 0 12px rgba(214,244,157,0.5))' }} />
                <h3 className="text-xl font-semibold text-fg">{t('contact.successTitle')}</h3>
                <p className="text-muted text-sm">{t('contact.successText')}</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="font-mono text-xs text-lime/70 hover:text-lime underline underline-offset-4 mt-2"
                >
                  {t('contact.sendAnother')}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-4">
                {/* Fields */}
                <div className="flex flex-col gap-4 flex-1">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-muted" htmlFor="name">
                      <span className="text-lime">const</span> {t('contact.nameLabel')}
                    </label>
                    <input
                      id="name" name="name" type="text"
                      value={form.name} onChange={handleChange}
                      placeholder={t('contact.namePlaceholder')}
                      required
                      className="w-full bg-dark-card/60 border border-dark-border/60 focus:border-lime/60 focus:ring-1 focus:ring-lime/20 outline-none rounded-xl px-4 py-3 text-sm text-fg placeholder:text-muted/50 font-mono transition-all duration-200"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-muted" htmlFor="email">
                      <span className="text-lime">const</span> {t('contact.emailLabel')}
                    </label>
                    <input
                      id="email" name="email" type="email"
                      value={form.email} onChange={handleChange}
                      placeholder={t('contact.emailPlaceholder')}
                      required
                      className="w-full bg-dark-card/60 border border-dark-border/60 focus:border-lime/60 focus:ring-1 focus:ring-lime/20 outline-none rounded-xl px-4 py-3 text-sm text-fg placeholder:text-muted/50 font-mono transition-all duration-200"
                    />
                  </div>

                  {/* Message — grows to fill remaining space */}
                  <div className="flex flex-col flex-1 space-y-1.5">
                    <label className="font-mono text-xs text-muted" htmlFor="message">
                      <span className="text-lime">const</span> {t('contact.msgLabel')}
                    </label>
                    <textarea
                      id="message" name="message"
                      value={form.message} onChange={handleChange}
                      placeholder={t('contact.msgPlaceholder')}
                      required
                      className="flex-1 w-full bg-dark-card/60 border border-dark-border/60 focus:border-lime/60 focus:ring-1 focus:ring-lime/20 outline-none rounded-xl px-4 py-3 text-sm text-fg placeholder:text-muted/50 font-mono transition-all duration-200 resize-none"
                    />
                  </div>
                </div>

                {/* Button — always at the bottom */}
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-lime text-dark-base font-semibold text-sm rounded-xl hover:bg-lime-dim disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lime-md"
                >
                  {status === 'sending' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-dark-base/40 border-t-dark-base rounded-full animate-spin" />
                      {t('contact.sending')}
                    </>
                  ) : (
                    <><Send size={15} /> {t('contact.submit')}</>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative mt-24 pt-8 border-t border-dark-border/40 max-w-6xl mx-auto section-padding"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-xs text-muted/60">
            © {new Date().getFullYear()} {t('footer.brand')}. {t('footer.credit')}
          </span>
          <div className="flex items-center gap-4">
            {visitorCount !== null && (
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-lime/70 bg-lime/10 border border-lime/20 px-3 py-1 rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-lime/60 animate-pulse" />
                {visitorCount} {visitorCount === 1 ? 'visitor' : 'visitors'}
              </span>
            )}
            <span className="font-mono text-xs text-lime/50">
              igb<span className="opacity-30">.</span>dev
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
