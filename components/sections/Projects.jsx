'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ArrowRight } from 'lucide-react';

function GithubIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.185 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.071 1.531 1.031 1.531 1.031.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z"/>
    </svg>
  );
}
import { projects } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

function ProjectCard({ project, index, onClick, t }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      onClick={() => onClick(project)}
      className="group relative cursor-pointer rounded-2xl overflow-hidden border border-dark-border/60 hover:border-lime/50 transition-all duration-300 hover:shadow-lime-md"
    >
      {/* Background */}
      <div
        className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
        style={{
          background: project.bgImage
            ? `url(${project.bgImage}) center/cover no-repeat`
            : `linear-gradient(135deg, ${project.bgColor} 0%, var(--color-base) 100%)`,
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-base via-dark-base/70 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(214,244,157,0.08) 0%, transparent 60%)' }}
      />

      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col h-full min-h-[260px] justify-end">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-fg group-hover:text-lime transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-sm text-muted leading-relaxed line-clamp-2">{project.description}</p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((tag) => (
              <span key={tag} className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-dark-base/60 text-fg opacity-50 border border-dark-border/50">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="font-mono text-xs text-lime flex items-center gap-1.5">
              {t('projects.view')} <ArrowRight size={12} />
            </span>
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-dark-base/60 text-muted hover:text-lime hover:bg-lime/10 transition-all">
                  <GithubIcon size={14} />
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-dark-base/60 text-muted hover:text-lime hover:bg-lime/10 transition-all">
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark-base/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-dark-card border border-dark-border/80 rounded-2xl overflow-hidden grad-border"
      >
        <div className="h-56 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${project.bgColor} 0%, var(--color-base) 100%)` }}>
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent/30 to-transparent" />
          <div className="absolute inset-0 opacity-10"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, #D6F49D 0%, transparent 60%)' }}
          />
        </div>
        <div className="p-8 space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold text-fg">{project.title}</h3>
            </div>
            <button onClick={onClose}
              className="p-2 rounded-xl text-muted hover:text-fg hover:bg-dark-border/50 transition-all">
              <X size={18} />
            </button>
          </div>
          <p className="text-fg-muted text-base leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="font-mono text-xs px-3 py-1.5 rounded-lg bg-lime/10 text-lime border border-lime/30">{tag}</span>
            ))}
          </div>
          <div className="flex gap-3 pt-2">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-dark-border/60 hover:bg-dark-border text-fg text-sm font-medium rounded-xl transition-all border border-dark-border hover:border-lime/40">
                <GithubIcon size={15} /> GitHub
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-lime text-dark-base text-sm font-semibold rounded-xl hover:bg-lime-dim transition-all hover:shadow-lime-md">
                <ExternalLink size={15} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <section
        id="projects"
        ref={ref}
        className="relative py-28 bg-dark-surface overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dark-border to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dark-border to-transparent" />
        <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(ellipse, #D6F49D 0%, transparent 70%)', filter: 'blur(80px)' }}
        />

        <div className="relative max-w-6xl mx-auto section-padding">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="font-mono text-xs text-lime tracking-[0.2em] uppercase">02 /</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-fg">{t('projects.title')}</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-dark-border/80 to-transparent" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-muted text-sm mb-14 font-mono"
          >
            {t('projects.subtitle')}
          </motion.p>

          {/* Collaborated Projects */}
          <div className="mb-12">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="font-mono text-xs text-lime/70 tracking-widest uppercase mb-5 flex items-center gap-3"
            >
              <span>{t('projects.collab')}</span>
              <span className="flex-1 h-px bg-dark-border/50" />
            </motion.h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {projects.filter(p => p.type === 'collab').map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onClick={setSelectedProject}
                  t={t}
                />
              ))}
            </div>
          </div>

          {/* Personal Projects */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="font-mono text-xs text-lime/70 tracking-widest uppercase mb-5 flex items-center gap-3"
            >
              <span>{t('projects.personal')}</span>
              <span className="flex-1 h-px bg-dark-border/50" />
            </motion.h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {projects.filter(p => p.type === 'personal').map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onClick={setSelectedProject}
                  t={t}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
