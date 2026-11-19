import rightData from './trees-right.json';

interface LayerData {
  color: string;
  d: string;
}

// Drifting crystalline snowflakes
const snowflakes = [
  { id: 's1', left: '22%', top: '10%', delay: '0s', duration: '6.5s', size: 2.5 },
  { id: 's2', left: '42%', top: '18%', delay: '1.8s', duration: '7.8s', size: 3 },
  { id: 's3', left: '62%', top: '12%', delay: '3.5s', duration: '6.2s', size: 2.5 },
  { id: 's4', left: '78%', top: '24%', delay: '0.8s', duration: '8.2s', size: 3 },
  { id: 's5', left: '32%', top: '32%', delay: '4.2s', duration: '7.0s', size: 2 },
  { id: 's6', left: '55%', top: '38%', delay: '2.5s', duration: '6.8s', size: 3 },
  { id: 's7', left: '70%', top: '45%', delay: '5.1s', duration: '7.5s', size: 2.5 },
];

// Ice-blue / crystal fireflies
const rightFireflies = [
  { id: 'rf1', left: '25%', top: '55%', duration: '5.2s', delay: '0.2s', size: 2.5, color: '#bae6fd' },
  { id: 'rf2', left: '48%', top: '42%', duration: '6.8s', delay: '1.8s', size: 3, color: '#a3e635' },
  { id: 'rf3', left: '74%', top: '52%', duration: '5.9s', delay: '2.5s', size: 2.5, color: '#bae6fd' },
  { id: 'rf4', left: '60%', top: '72%', duration: '7.1s', delay: '1.1s', size: 2.5, color: '#a3e635' },
];

export default function PixelTreesRight() {
  const { totalCols, totalRows, layers } = rightData as {
    totalCols: number;
    totalRows: number;
    layers: Record<string, LayerData>;
  };

  return (
    <div
      className="hidden md:flex fixed bottom-0 right-0 pointer-events-none select-none z-0 items-end justify-end"
      aria-hidden="true"
    >
      <div className="relative">
        {/* Gently Falling Snowflakes */}
        {snowflakes.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-none pointer-events-none"
            style={{
              left: s.left,
              top: s.top,
              width: `${s.size}px`,
              height: `${s.size}px`,
              backgroundColor: '#ffffff',
              boxShadow: '0 0 4px rgba(255, 255, 255, 0.9)',
              animation: `snowFall ${s.duration} linear infinite`,
              animationDelay: s.delay,
            }}
          />
        ))}

        {/* Ambient fireflies / crystal motes */}
        {rightFireflies.map((f) => (
          <div
            key={f.id}
            className="absolute rounded-none pointer-events-none animate-pulse"
            style={{
              left: f.left,
              top: f.top,
              width: `${f.size}px`,
              height: `${f.size}px`,
              backgroundColor: f.color,
              boxShadow: `0 0 7px ${f.color}dd`,
              animationDuration: f.duration,
              animationDelay: f.delay,
              opacity: 0.85,
            }}
          />
        ))}

        {/* Right side trees: Majestic Snow-Covered Pines + Winter Forest Floor */}
        <svg
          viewBox={`0 0 ${totalCols} ${totalRows}`}
          className="w-[280px] sm:w-[340px] md:w-[400px] lg:w-[460px] xl:w-[520px] 2xl:w-[560px] h-auto block filter drop-shadow-[0_18px_42px_rgba(0,0,0,0.95)]"
          shapeRendering="crispEdges"
          style={{
            transformOrigin: 'bottom right',
            animation: 'pineSway 10s ease-in-out infinite alternate',
          }}
        >
          {Object.entries(layers).map(([key, layer]) => (
            <path key={key} d={layer.d} fill={layer.color} />
          ))}
        </svg>
      </div>
    </div>
  );
}
