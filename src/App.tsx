import { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
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
import './index.css';

function PortfolioContent() {
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const { accent } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#E7E7E7] selection:bg-[#E45B43]/30 selection:text-white">
      {/* Ambient Accent Cursor Aura (Soft light beneath noise) */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, ${accent.glow} 0%, transparent 65%)`,
          opacity: 0.22,
        }}
        aria-hidden="true"
      />

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

      {/* Interactive Pixel Art T-Rex Companion */}
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
