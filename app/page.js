import ScrollProgress from '@/components/layout/ScrollProgress';
import FloatingNav from '@/components/layout/FloatingNav';
import TopBar from '@/components/layout/TopBar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Education from '@/components/sections/Education';
import Projects from '@/components/sections/Projects';
import HonorsAwards from '@/components/sections/HonorsAwards';
import SocialLinks from '@/components/sections/SocialLinks';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      {/* Fixed UI chrome */}
      <ScrollProgress />
      <TopBar />
      <FloatingNav />

      {/* Page sections */}
      <main>
        <Hero />
        <About />
        <Education />
        <Projects />
        <HonorsAwards />
        <SocialLinks />
        <Contact />
      </main>
    </>
  );
}
