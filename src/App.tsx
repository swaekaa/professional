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
import PixelTreesLeft from './components/PixelTreesLeft';
import PixelTreesRight from './components/PixelTreesRight';
import FadeContent from './components/FadeContent';
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

      {/* Diverse pixel art trees flanking both sides — non-overlapping side gutters */}
      <PixelTreesLeft />
      <PixelTreesRight />

      {/* Interactive Pixel Art T-Rex Companion Following Cursor (Bottom-Right) */}
      <PixelTrex />

      {/* Centered Desktop Layout Container with Generous Negative Space */}
      <div className="relative z-10 max-w-[780px] mx-auto px-5 sm:px-8 min-h-screen flex flex-col md:flex-row gap-8 lg:gap-14 pt-6 md:pt-14 pb-20">
        {/* Understated Left Navigation with Accent Color Picker */}
        <SidebarNavigation onOpenNoteModal={() => setIsNoteModalOpen(true)} />

        {/* Main Content Column (Restrained narrow width: ~500–540px, journal style) */}
        <main className="w-full md:max-w-[540px] flex-1 min-w-0">
          <FadeContent trigger="mount" duration={1} blur={false}>
            <HeroSection />
          </FadeContent>
          <FadeContent threshold={0.12} duration={1}>
            <GithubHeatmap />
          </FadeContent>
          <FadeContent threshold={0.12} duration={1}>
            <LeetCodeStats />
          </FadeContent>
          <FadeContent threshold={0.12} duration={1}>
            <ExperienceTimeline />
          </FadeContent>
          <FadeContent threshold={0.12} duration={1}>
            <ProjectList />
          </FadeContent>
          <FadeContent threshold={0.12} duration={1}>
            <ResearchSection />
          </FadeContent>
          <FadeContent threshold={0.12} duration={1}>
            <WritingSection />
          </FadeContent>
          <FadeContent threshold={0.12} duration={1}>
            <CommunityAndJourney />
          </FadeContent>
          <FadeContent threshold={0.12} duration={1}>
            <ContactAndNote
              isNoteModalOpen={isNoteModalOpen}
              onCloseNoteModal={() => setIsNoteModalOpen(false)}
            />
          </FadeContent>
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
