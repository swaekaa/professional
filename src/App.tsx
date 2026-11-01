import { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import DotShader from './components/ui/dot-shader';
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#E7E7E7] selection:bg-[#E45B43]/30 selection:text-white">
      {/* Interactive Dot Shader GPU Background — Subtle & Fine Minimalist Grid */}
      <DotShader
        className="fixed inset-0 pointer-events-none z-0"
        dotColor="rgba(255, 255, 255, 0.05)"
        accentColor={accent.primary}
        dotSize={0.95}
        spacing={26}
        cursorRadius={110}
        distortionStrength={0.08}
        maxScale={1.28}
        waveIntensity={0.1}
        speed={0.6}
        interactive={true}
        overlay={false}
      />

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
