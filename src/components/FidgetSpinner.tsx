import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function FidgetSpinner({
  size = 72,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  const [angle, setAngle] = useState(0);
  const [rpm, setRpm] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Physics refs
  const angleRef = useRef(0);
  const velocityRef = useRef(0); // degrees per second
  const lastPointerRef = useRef<{ angle: number; time: number } | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Main physics loop: momentum + realistic bearing friction
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!isDragging) {
        // Natural bearing friction
        velocityRef.current *= Math.pow(0.988, dt * 60);

        if (Math.abs(velocityRef.current) < 0.5) {
          velocityRef.current = 0;
        }

        angleRef.current = (angleRef.current + velocityRef.current * dt) % 360;
        setAngle(angleRef.current);
      }

      // Convert deg/s to RPM
      const currentRpm = Math.round(Math.abs(velocityRef.current) * (60 / 360));
      setRpm(currentRpm);

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isDragging]);

  // Click to spin / impulse burst
  const handleImpulse = useCallback(() => {
    const dir = velocityRef.current >= 0 ? 1 : -1;
    // Add 650 - 900 deg/s per flick/click
    const boost = (650 + Math.random() * 350) * dir;
    velocityRef.current = Math.min(Math.max(velocityRef.current + boost, -3500), 3500);
  }, []);

  // Pointer drag/flick handler
  const getPointerAngle = (clientX: number, clientY: number) => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const pAngle = getPointerAngle(e.clientX, e.clientY);
    lastPointerRef.current = { angle: pAngle, time: performance.now() };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !lastPointerRef.current) return;
    const now = performance.now();
    const pAngle = getPointerAngle(e.clientX, e.clientY);
    const dt = Math.max((now - lastPointerRef.current.time) / 1000, 0.005);

    let dAngle = pAngle - lastPointerRef.current.angle;
    // Normalize angular wrap
    if (dAngle > 180) dAngle -= 360;
    if (dAngle < -180) dAngle += 360;

    angleRef.current = (angleRef.current + dAngle) % 360;
    setAngle(angleRef.current);

    // Compute instantaneous angular velocity (deg/s)
    const instVelocity = dAngle / dt;
    velocityRef.current = velocityRef.current * 0.4 + instVelocity * 0.6;

    lastPointerRef.current = { angle: pAngle, time: now };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      lastPointerRef.current = null;
      // If was just a stationary tap without drag, trigger impulse
      if (Math.abs(velocityRef.current) < 30) {
        handleImpulse();
      }
    }
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const isFast = rpm > 600;

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Interactive Spinner Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClick={(e) => {
          // Fallback if not dragged
          if (Math.abs(velocityRef.current) < 20) handleImpulse();
          e.stopPropagation();
        }}
        title="Flick or click to spin!"
        className="relative cursor-grab active:cursor-grabbing touch-none flex items-center justify-center group"
        style={{ width: `${size + 12}px`, height: `${size + 12}px` }}
      >
        {/* Subtle circular accent speed glow behind spinning lobes */}
        <div
          className="absolute inset-1 rounded-full pointer-events-none transition-opacity duration-300"
          style={{
            backgroundColor: 'var(--accent)',
            opacity: Math.min(rpm / 2500, 0.35),
            filter: 'blur(12px)',
          }}
        />

        {/* Rotating Tri-Lobe Fidget Spinner SVG */}
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
            transform: `rotate(${angle}deg)`,
            transformOrigin: 'center center',
            willChange: 'transform',
          }}
          className="relative pointer-events-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="spinnerBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2c2c2c" />
                <stop offset="50%" stopColor="#1a1a1a" />
                <stop offset="100%" stopColor="#111111" />
              </linearGradient>

              <radialGradient id="bearingCap" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3d3d3d" />
                <stop offset="70%" stopColor="#1f1f1f" />
                <stop offset="100%" stopColor="#0a0a0a" />
              </radialGradient>
            </defs>

            {/* Tri-Lobe Body: 3 symmetrical curved lobes */}
            <g>
              {/* Lobe 1 (0 deg - top) */}
              <circle cx="50" cy="20" r="14" fill="url(#spinnerBodyGrad)" stroke="#383838" strokeWidth="1" />
              <path
                d="M 40 50 C 42 36, 38 28, 42 20 C 44 14, 56 14, 58 20 C 62 28, 58 36, 60 50 Z"
                fill="url(#spinnerBodyGrad)"
              />

              {/* Lobe 2 (120 deg - bottom right) */}
              <g transform="rotate(120 50 50)">
                <circle cx="50" cy="20" r="14" fill="url(#spinnerBodyGrad)" stroke="#383838" strokeWidth="1" />
                <path
                  d="M 40 50 C 42 36, 38 28, 42 20 C 44 14, 56 14, 58 20 C 62 28, 58 36, 60 50 Z"
                  fill="url(#spinnerBodyGrad)"
                />
              </g>

              {/* Lobe 3 (240 deg - bottom left) */}
              <g transform="rotate(240 50 50)">
                <circle cx="50" cy="20" r="14" fill="url(#spinnerBodyGrad)" stroke="#383838" strokeWidth="1" />
                <path
                  d="M 40 50 C 42 36, 38 28, 42 20 C 44 14, 56 14, 58 20 C 62 28, 58 36, 60 50 Z"
                  fill="url(#spinnerBodyGrad)"
                />
              </g>
            </g>

            {/* Outer Counterweight / Accent Rings on each lobe */}
            {/* Top lobe ring */}
            <circle cx="50" cy="20" r="8" fill="#0C0C0C" stroke="#2a2a2a" strokeWidth="1.2" />
            <circle cx="50" cy="20" r="5" fill="var(--accent)" opacity="0.85" />
            <circle cx="50" cy="20" r="2.5" fill="#050505" />

            {/* Bottom-right lobe ring */}
            <g transform="rotate(120 50 50)">
              <circle cx="50" cy="20" r="8" fill="#0C0C0C" stroke="#2a2a2a" strokeWidth="1.2" />
              <circle cx="50" cy="20" r="5" fill="var(--accent)" opacity="0.85" />
              <circle cx="50" cy="20" r="2.5" fill="#050505" />
            </g>

            {/* Bottom-left lobe ring */}
            <g transform="rotate(240 50 50)">
              <circle cx="50" cy="20" r="8" fill="#0C0C0C" stroke="#2a2a2a" strokeWidth="1.2" />
              <circle cx="50" cy="20" r="5" fill="var(--accent)" opacity="0.85" />
              <circle cx="50" cy="20" r="2.5" fill="#050505" />
            </g>

            {/* Center Bearing Hub / Grip Cap */}
            <circle cx="50" cy="50" r="15" fill="url(#bearingCap)" stroke="#383838" strokeWidth="1.2" />
            <circle cx="50" cy="50" r="10" fill="none" stroke="var(--accent)" strokeWidth="0.8" opacity="0.6" />
            <circle cx="50" cy="50" r="3.5" fill="#505050" />
            <circle cx="50" cy="50" r="1.5" fill="#FFFFFF" opacity="0.7" />
          </svg>
        </div>
      </div>

      {/* RPM Status / Feedback */}
      <div className="mt-1.5 text-center">
        <span className="font-mono text-[10px] font-semibold text-[#888888] group-hover:text-[#CCCCCC] block transition-colors">
          spinner
        </span>
        <span
          className="font-mono text-[8.5px] block transition-colors tabular-nums"
          style={{ color: rpm > 0 ? 'var(--accent)' : '#555555' }}
        >
          {rpm > 0 ? (
            <span>
              {isFast ? '⚡ ' : ''}
              {rpm.toLocaleString()} rpm
            </span>
          ) : (
            'flick to spin'
          )}
        </span>
      </div>
    </div>
  );
}

