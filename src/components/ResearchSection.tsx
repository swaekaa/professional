import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, ChevronUp, ZoomIn, ZoomOut, X, RotateCcw } from 'lucide-react';
import { GithubIcon } from './Icons';
import { research } from '../data/portfolio';

interface ZoomImageData {
  src: string;
  caption: string;
  title: string;
}

export default function ResearchSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [zoomImage, setZoomImage] = useState<ZoomImageData | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);

  const handleToggle = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const willOpen = openId !== id;
    const buttonEl = e.currentTarget;
    setOpenId(willOpen ? id : null);

    if (willOpen) {
      // Smoothly align viewport so the top of the section where it dropped down from stays in view
      setTimeout(() => {
        if (buttonEl) {
          const rect = buttonEl.getBoundingClientRect();
          const targetY = window.scrollY + rect.top - 80;
          window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
        }
      }, 40);
    }
  };

  // Handle keyboard controls (Escape to close, + / - to scale, 0 to reset)
  useEffect(() => {
    if (!zoomImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setZoomImage(null);
        setZoomScale(1);
      } else if (e.key === '+' || e.key === '=') {
        setZoomScale((s) => Math.min(2.5, +(s + 0.25).toFixed(2)));
      } else if (e.key === '-' || e.key === '_') {
        setZoomScale((s) => Math.max(1, +(s - 0.25).toFixed(2)));
      } else if (e.key === '0') {
        setZoomScale(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [zoomImage]);

  return (
    <section id="research" className="py-10 border-b border-[#181818] animate-fade-in scroll-mt-16">
      {/* Header with Accent Color */}
      <div className="flex items-center justify-between mb-5 font-mono text-[12px]">
        <div className="flex items-center gap-1.5 font-bold" style={{ color: 'var(--accent)' }}>
          <span className="uppercase tracking-wider">research</span>
        </div>
        <span className="text-[#888888] font-mono text-[11px]">empirical notes</span>
      </div>

      <div className="space-y-4">
        {research.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              data-research={item.title}
              className="group border-b border-[#181818] last:border-0 pb-4 transition-colors"
            >
              <button
                type="button"
                onClick={(e) => handleToggle(item.id, e)}
                className="w-full text-left flex items-start justify-between gap-4 cursor-pointer py-1.5 select-none"
                aria-expanded={isOpen}
              >
                <div>
                  <h3 className="text-[16px] font-bold text-white group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[13px] font-mono text-[#AAAAAA] mt-0.5 italic">
                    "{item.question}"
                  </p>
                </div>

                <div className="text-[#888888] group-hover:text-white shrink-0 mt-1 transition-colors">
                  {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </div>
              </button>

              {isOpen && (
                <div className="pt-3 pb-2 space-y-4 text-[14.5px] text-white animate-fade-in">
                  <div>
                    <h5 className="font-mono text-[10.5px] font-bold text-[#AAAAAA] uppercase tracking-wider mb-1.5">
                      EXPERIMENTAL APPROACH
                    </h5>
                    <p className="text-white leading-relaxed">{item.approach}</p>
                  </div>

                  {/* Empirical Picture Graphs & Plots with Click-to-Zoom */}
                  {'images' in item && Array.isArray(item.images) && item.images.length > 0 && (
                    <div className="space-y-2 py-1">
                      <div className={`grid grid-cols-1 ${item.images.length > 1 ? 'sm:grid-cols-2' : ''} gap-3`}>
                        {item.images.map((img: { src: string; caption: string }, idx: number) => (
                          <div
                            key={idx}
                            onClick={() => {
                              setZoomImage({ src: img.src, caption: img.caption, title: item.title });
                              setZoomScale(1);
                            }}
                            className="group/img relative rounded-xl border border-[#222222] hover:border-[#383838] bg-[#0A0C10] p-2.5 overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-200 hover:shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
                            role="button"
                            tabIndex={0}
                            aria-label={`Zoom in on ${img.caption}`}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setZoomImage({ src: img.src, caption: img.caption, title: item.title });
                                setZoomScale(1);
                              }
                            }}
                          >
                            {/* Hover Zoom Badge */}
                            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 bg-[#0C0E14]/90 border border-[#2A2E3D] text-[#CCCCCC] font-mono text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg pointer-events-none backdrop-blur-xs">
                              <ZoomIn size={12} style={{ color: 'var(--accent)' }} />
                              <span>Click to zoom</span>
                            </div>

                            <div className="flex items-center justify-center min-h-[160px] bg-[#050608] rounded-lg p-1 overflow-hidden">
                              <img
                                src={img.src}
                                alt={img.caption}
                                className="w-full h-auto max-h-[220px] object-contain group-hover/img:scale-[1.02] transition-transform duration-200"
                                loading="lazy"
                              />
                            </div>
                            <div className="flex items-center justify-between gap-2 mt-2 px-1">
                              <p className="font-mono text-[11px] text-[#BBBBBB] leading-tight">
                                {img.caption}
                              </p>
                              <span className="font-mono text-[9.5px] text-[#666666] shrink-0 uppercase tracking-wider group-hover/img:text-[var(--accent)] transition-colors">
                                [expand]
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="bg-[#090909] border border-[#1E1E1E] rounded-lg p-3">
                      <h5 className="font-mono text-[10.5px] font-bold text-[#AAAAAA] uppercase tracking-wider mb-1.5">
                        MODELS EVALUATED
                      </h5>
                      <div className="space-y-1">
                        {item.models.map((m) => (
                          <div key={m} className="font-mono text-[12px] text-white">
                            &gt; {m}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-[#090909] border border-[#1E1E1E] rounded-lg p-3">
                      <h5 className="font-mono text-[10.5px] font-bold text-[#AAAAAA] uppercase tracking-wider mb-1.5">
                        DATA & TESTBED
                      </h5>
                      <div className="space-y-1">
                        {item.datasets.map((d) => (
                          <div key={d} className="font-mono text-[12px] text-white">
                            &gt; {d}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-mono text-[10.5px] font-bold text-[#AAAAAA] uppercase tracking-wider mb-1.5">
                      KEY OBSERVATIONS
                    </h5>
                    <p className="text-white leading-relaxed font-normal">{item.observations}</p>
                  </div>

                  {item.code && (
                    <div className="pt-2">
                      <a
                        href={item.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-cyber-pop inline-flex items-center gap-2 px-3 py-1.5 bg-[#121212] border border-[#262626] rounded font-mono text-[11.5px] font-medium text-white cursor-pointer"
                      >
                        <GithubIcon size={12} />
                        <span>View Experiment Code</span>
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Interactive Lightbox / Zoom Modal rendered via Portal */}
      {zoomImage &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 backdrop-blur-md p-3 sm:p-6 animate-fade-in"
            onClick={() => {
              setZoomImage(null);
              setZoomScale(1);
            }}
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Container */}
            <div
              className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-[#07080B] border border-[#222634] rounded-2xl overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.95)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Controls Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#181C26] bg-[#0A0C12]/95 backdrop-blur-sm shrink-0">
                <div className="flex items-center gap-2.5 min-w-0 pr-4">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: 'var(--accent)' }} />
                  <div className="truncate">
                    <span className="font-mono text-[10.5px] text-[#888888] uppercase tracking-wider block">
                      {zoomImage.title}
                    </span>
                    <span className="font-mono text-[12.5px] font-bold text-white truncate block">
                      {zoomImage.caption}
                    </span>
                  </div>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setZoomScale((s) => Math.min(2.5, +(s + 0.25).toFixed(2)))}
                    className="p-1.5 rounded-lg text-[#AAAAAA] hover:text-white hover:bg-[#181C26] transition-colors cursor-pointer"
                    title="Zoom In (+)"
                    aria-label="Zoom In"
                  >
                    <ZoomIn size={16} />
                  </button>
                  <button
                    onClick={() => setZoomScale((s) => Math.max(1, +(s - 0.25).toFixed(2)))}
                    className="p-1.5 rounded-lg text-[#AAAAAA] hover:text-white hover:bg-[#181C26] transition-colors cursor-pointer"
                    title="Zoom Out (-)"
                    aria-label="Zoom Out"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <button
                    onClick={() => setZoomScale(1)}
                    className="p-1.5 rounded-lg text-[#AAAAAA] hover:text-white hover:bg-[#181C26] transition-colors font-mono text-[11px] px-2 cursor-pointer flex items-center gap-1"
                    title="Reset Zoom (0)"
                    aria-label="Reset Zoom"
                  >
                    <RotateCcw size={12} />
                    <span>{Math.round(zoomScale * 100)}%</span>
                  </button>
                  <div className="w-px h-4 bg-[#222634] mx-1" />
                  <button
                    onClick={() => {
                      setZoomImage(null);
                      setZoomScale(1);
                    }}
                    className="p-1.5 rounded-lg text-[#AAAAAA] hover:text-white hover:bg-[#222634] transition-colors cursor-pointer"
                    title="Close (Esc)"
                    aria-label="Close zoom modal"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Interactive Image Viewport */}
              <div
                className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center bg-[#050608] select-none"
                style={{
                  cursor: zoomScale > 1 ? 'zoom-out' : 'zoom-in',
                }}
                onClick={() => setZoomScale((s) => (s > 1 ? 1 : 1.75))}
              >
                <img
                  src={zoomImage.src}
                  alt={zoomImage.caption}
                  className="max-w-full max-h-[72vh] object-contain transition-transform duration-200 ease-out rounded shadow-2xl filter contrast-105"
                  style={{
                    transform: `scale(${zoomScale})`,
                    transformOrigin: 'center center',
                  }}
                  draggable={false}
                />
              </div>

              {/* Bottom Info Bar */}
              <div className="px-5 py-2.5 border-t border-[#181C26] bg-[#08090E] flex items-center justify-between font-mono text-[11px] text-[#777777]">
                <span>Click image to toggle zoom {zoomScale > 1 ? 'out' : 'in'} · Press Esc to exit</span>
                <span className="hidden sm:inline">Use + or - to scale</span>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
