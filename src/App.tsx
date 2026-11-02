import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import SidebarNavigation from './components/SidebarNavigation';
import HeroSection from './components/HeroSection';
import GithubHeatmap from './components/GithubHeatmap';
import LeetCodeStats from './components/LeetCodeStats';
import ExperienceTimeline from './components/ExperienceTimeline';
import ProjectList from './components/ProjectList';
import ResearchSection from './components/ResearchSection';
import WritingSection from './components/WritingSection';
import CommunityAndJourney from './components/CommunityAndJourney';
import ContactAndNote from './components/ContactAndNote';
import Footer from './components/Footer';
import PixelTrex from './components/PixelTrex';
import DitherVeil from './components/DitherVeil';
import './index.css';

function PortfolioContent() {
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#E7E7E7] selection:bg-[#E45B43]/30 selection:text-white">
      {/* Tactile Dark Film Grain / Noise Texture Background */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Scroll Progress Indicator */}
      <div
        id="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Subtle CRT Scanlines & Vignette Overlay */}
      <div className="scanlines-overlay" aria-hidden="true" />
      <div className="vignette-overlay" aria-hidden="true" />

      {/* DitherVeil WebGL dithered art — right side, always-visible stipple on dark bg */}
      <div
        className="fixed right-0 top-0 h-screen pointer-events-none"
        style={{ width: '55%', zIndex: 0, opacity: 0.82 }}
        aria-hidden="true"
      >
        <DitherVeil
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1400&auto=format&fit=crop"
          pattern="noise"
          pixelSize={1.5}
          inkColor="#050505"
          paperColor="#c8c8c8"
          revealRadius={0}
          softness={0}
          linger={0}
          fit="contain"
          palette="mono"
          levels={3}
          contrast={1.4}
          brightness={0.05}
          rim={0}
          reverse={false}
          wander={false}
          clickBurst={false}
        />
      </div>

      {/* Interactive Pixel Art T-Rex Companion Following Cursor (Bottom-Right) */}
      <PixelTrex />

      {/* Centered Desktop Layout Container with Generous Negative Space */}
      <div className="relative z-10 max-w-[780px] mx-auto px-5 sm:px-8 min-h-screen flex flex-col md:flex-row gap-8 lg:gap-14 pt-6 md:pt-14 pb-20">
        {/* Understated Left Navigation with Accent Color Picker */}
        <SidebarNavigation onOpenNoteModal={() => setIsNoteModalOpen(true)} />

        {/* Main Content Column (Restrained narrow width: ~500–540px, journal style) */}
        <main className="w-full md:max-w-[540px] flex-1 min-w-0">
          <HeroSection />
          <GithubHeatmap />
          <LeetCodeStats />
          <ExperienceTimeline />
          <ProjectList />
          <ResearchSection />
          <WritingSection />
          <CommunityAndJourney />
          <ContactAndNote
            isNoteModalOpen={isNoteModalOpen}
            onCloseNoteModal={() => setIsNoteModalOpen(false)}
          />
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
}
