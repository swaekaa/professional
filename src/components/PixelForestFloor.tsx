import { useEffect, useRef } from 'react';

const P = 3; // Pixel block size in px
const FLOOR_HEIGHT = 24; // Canvas height in px

export default function PixelForestFloor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = window.innerWidth;
      const height = FLOOR_HEIGHT;

      // Handle high-DPI displays
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / P);
      const rows = Math.ceil(height / P);

      // Deterministic PRNG helper
      const pseudoRand = (seed: number) => {
        const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
        return x - Math.floor(x);
      };

      for (let c = 0; c < cols; c++) {
        const t = c / Math.max(1, cols - 1); // 0.0 (left: Spring/Autumn) to 1.0 (right: Winter Snow)
        const randVal = pseudoRand(c * 17 + 31);
        const randVal2 = pseudoRand(c * 37 + 89);
        const randVal3 = pseudoRand(c * 53 + 107);

        // Gentle rolling terrain elevation (3 to 6 rows tall)
        const elev = Math.round(
          Math.sin(c * 0.07) * 1.6 +
          Math.cos(c * 0.14) * 1.1 +
          Math.sin(c * 0.03) * 0.8 +
          4.2
        );
        const topRow = Math.max(1, rows - elev);

        // 1. Draw turf / snow body from topRow down to the bottom
        for (let r = topRow; r < rows; r++) {
          const depth = r - topRow;
          let fillColor: string;

          if (t < 0.35) {
            // --- Spring / Sakura / Autumn (Left) ---
            if (depth === 0) fillColor = '#22c55e'; // Bright spring grass
            else if (depth === 1) fillColor = '#15803d'; // Lush turf
            else fillColor = '#14532d'; // Deep earth
          } else if (t < 0.65) {
            // --- Center Woodland Transition (Middle) ---
            const centerBlend = (t - 0.35) / 0.30;
            if (depth === 0) fillColor = centerBlend > 0.5 ? '#16a34a' : '#22c55e';
            else if (depth === 1) fillColor = '#166534';
            else fillColor = '#14532d';
          } else if (t < 0.82) {
            // --- Frost Transition ---
            if (depth === 0) {
              fillColor = randVal > 0.4 ? '#ffffff' : (randVal > 0.2 ? '#bae6fd' : '#86efac');
            } else if (depth === 1) {
              fillColor = randVal > 0.5 ? '#cbd5e1' : '#1e3a2b';
            } else {
              fillColor = '#0f291e';
            }
          } else {
            // --- Winter Snow Bank (Right) ---
            if (depth === 0) fillColor = '#ffffff'; // Pure white snow crest
            else if (depth === 1) fillColor = randVal > 0.3 ? '#f0f9ff' : '#bae6fd'; // Soft snow
            else if (depth === 2) fillColor = '#bae6fd'; // Glacial blue shadow
            else fillColor = '#092114'; // Frozen ground
          }

          ctx.fillStyle = fillColor;
          ctx.fillRect(c * P, r * P, P, P);
        }

        // 2. Details poking 1-2 pixels above the topRow (Grass blades, flowers, petals, mushrooms, snow)
        if (topRow - 1 >= 0) {
          const aboveY = (topRow - 1) * P;
          const px = c * P;

          if (t < 0.35) {
            // --- Left details ---
            if (randVal > 0.88) {
              // Little red-capped toadstool mushroom with white spot
              ctx.fillStyle = '#ef4444'; // Red cap
              ctx.fillRect(px, aboveY, P, P);
              if (topRow - 2 >= 0) {
                ctx.fillStyle = '#ffffff'; // White top dot
                ctx.fillRect(px, (topRow - 2) * P, P, P);
              }
            } else if (randVal > 0.76) {
              // Fallen pink sakura petal
              ctx.fillStyle = randVal2 > 0.5 ? '#f472b6' : '#fbcfe8';
              ctx.fillRect(px, aboveY, P, P);
            } else if (randVal > 0.65) {
              // Golden autumn leaf
              ctx.fillStyle = randVal2 > 0.5 ? '#f59e0b' : '#ea580c';
              ctx.fillRect(px, aboveY, P, P);
            } else if (randVal > 0.52) {
              // Red poppy or golden buttercup
              ctx.fillStyle = randVal2 > 0.5 ? '#ef4444' : '#facc15';
              ctx.fillRect(px, aboveY, P, P);
            } else if (randVal > 0.25) {
              // Spring grass blade
              ctx.fillStyle = '#4ade80';
              ctx.fillRect(px, aboveY, P, P);
              if (randVal3 > 0.6 && topRow - 2 >= 0) {
                ctx.fillRect(px, (topRow - 2) * P, P, P);
              }
            }
          } else if (t < 0.65) {
            // --- Center details ---
            if (randVal > 0.86) {
              // Lavender wildflower or blue forget-me-not
              ctx.fillStyle = randVal2 > 0.5 ? '#c084fc' : '#38bdf8';
              ctx.fillRect(px, aboveY, P, P);
            } else if (randVal > 0.74) {
              // Smooth mossy pebble
              ctx.fillStyle = randVal2 > 0.5 ? '#64748b' : '#475569';
              ctx.fillRect(px, aboveY, P, P);
            } else if (randVal > 0.62) {
              // Buttercup
              ctx.fillStyle = '#facc15';
              ctx.fillRect(px, aboveY, P, P);
            } else if (randVal > 0.22) {
              // Woodland grass blade
              ctx.fillStyle = '#22c55e';
              ctx.fillRect(px, aboveY, P, P);
              if (randVal3 > 0.65 && topRow - 2 >= 0) {
                ctx.fillRect(px, (topRow - 2) * P, P, P);
              }
            }
          } else if (t < 0.82) {
            // --- Frost details ---
            if (randVal > 0.78) {
              // White frost speck / snowdrop
              ctx.fillStyle = '#ffffff';
              ctx.fillRect(px, aboveY, P, P);
            } else if (randVal > 0.6) {
              // Ice crystal
              ctx.fillStyle = '#bae6fd';
              ctx.fillRect(px, aboveY, P, P);
            } else if (randVal > 0.3) {
              // Frosted grass blade
              ctx.fillStyle = randVal2 > 0.5 ? '#e2e8f0' : '#86efac';
              ctx.fillRect(px, aboveY, P, P);
            }
          } else {
            // --- Winter snow details ---
            if (randVal > 0.82) {
              // Snowdrop winter flower
              ctx.fillStyle = '#ffffff';
              ctx.fillRect(px, aboveY, P, P);
              if (topRow - 2 >= 0 && randVal2 > 0.5) {
                ctx.fillStyle = '#bae6fd';
                ctx.fillRect(px, (topRow - 2) * P, P, P);
              }
            } else if (randVal > 0.68) {
              // Ice blue crystal sparkle
              ctx.fillStyle = '#7dd3fc';
              ctx.fillRect(px, aboveY, P, P);
            } else if (randVal > 0.35) {
              // Pure white snow crest tip
              ctx.fillStyle = '#ffffff';
              ctx.fillRect(px, aboveY, P, P);
            }
          }
        }
      }

      ctx.restore();
    };

    render();

    const handleResize = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed bottom-0 left-0 right-0 w-full pointer-events-none select-none z-0"
      style={{
        imageRendering: 'pixelated',
        height: `${FLOOR_HEIGHT}px`,
      }}
      aria-hidden="true"
    />
  );
}
