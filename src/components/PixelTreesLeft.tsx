import leftData from './trees-left.json';

interface LayerData {
  color: string;
  d: string;
}

// Drifting cherry blossom petals
const sakuraPetals = [
  { id: 'p1', left: '38%', top: '15%', delay: '0s', duration: '7.5s', size: 3.5 },
  { id: 'p2', left: '52%', top: '22%', delay: '2.1s', duration: '8.8s', size: 3 },
  { id: 'p3', left: '68%', top: '18%', delay: '4.3s', duration: '7.2s', size: 4 },
  { id: 'p4', left: '44%', top: '35%', delay: '1.2s', duration: '9.0s', size: 3 },
  { id: 'p5', left: '60%', top: '42%', delay: '3.6s', duration: '8.1s', size: 3.5 },
  { id: 'p6', left: '76%', top: '32%', delay: '5.5s', duration: '7.8s', size: 2.5 },
];

// Drifting golden autumn leaves
const autumnLeaves = [
  { id: 'a1', left: '22%', top: '25%', delay: '1.0s', duration: '9.5s', size: 3.5, color: '#f59e0b' },
  { id: 'a2', left: '32%', top: '38%', delay: '3.8s', duration: '8.5s', size: 3, color: '#ea580c' },
  { id: 'a3', left: '18%', top: '48%', delay: '5.2s', duration: '10.2s', size: 3.5, color: '#facc15' },
];

// Floating magical fireflies
const fireflies = [
  { id: 'f1', left: '30%', top: '55%', duration: '5.4s', delay: '0.4s', size: 2.5 },
  { id: 'f2', left: '62%', top: '48%', duration: '6.7s', delay: '1.8s', size: 3 },
  { id: 'f3', left: '80%', top: '65%', duration: '5.8s', delay: '2.9s', size: 2 },
  { id: 'f4', left: '45%', top: '75%', duration: '6.3s', delay: '0.9s', size: 2.5 },
];

export default function PixelTreesLeft() {
  const { totalCols, totalRows, layers } = leftData as {
    totalCols: number;
    totalRows: number;
    layers: Record<string, LayerData>;
  };

  return (
    <div
      className="hidden md:flex fixed bottom-0 left-0 pointer-events-none select-none z-0 items-end justify-start"
      aria-hidden="true"
    >
      <div className="relative">
        {/* Falling Sakura Cherry Blossom Petals */}
        {sakuraPetals.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-none pointer-events-none"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: '#f472b6',
              boxShadow: '0 0 5px rgba(244, 114, 182, 0.75)',
              animation: `sakuraFall ${p.duration} linear infinite`,
              animationDelay: p.delay,
            }}
          />
        ))}

        {/* Drifting Golden Autumn Leaves */}
        {autumnLeaves.map((a) => (
          <div
            key={a.id}
            className="absolute rounded-none pointer-events-none"
            style={{
              left: a.left,
              top: a.top,
              width: `${a.size}px`,
              height: `${a.size}px`,
              backgroundColor: a.color,
              boxShadow: `0 0 5px ${a.color}88`,
              animation: `leafDrift ${a.duration} ease-in-out infinite`,
              animationDelay: a.delay,
            }}
          />
        ))}

        {/* Ambient forest fireflies */}
        {fireflies.map((f) => (
          <div
            key={f.id}
            className="absolute rounded-none pointer-events-none animate-pulse"
            style={{
              left: f.left,
              top: f.top,
              width: `${f.size}px`,
              height: `${f.size}px`,
              backgroundColor: '#a3e635',
              boxShadow: '0 0 7px rgba(163, 230, 53, 0.85)',
              animationDuration: f.duration,
              animationDelay: f.delay,
              opacity: 0.8,
            }}
          />
        ))}

        {/* Left side trees: Cherry Blossom Sakura + Autumn Maple + Birch + Forest Floor */}
        <svg
          viewBox={`0 0 ${totalCols} ${totalRows}`}
          className="w-[280px] sm:w-[340px] md:w-[400px] lg:w-[460px] xl:w-[520px] 2xl:w-[560px] h-auto block filter drop-shadow-[0_18px_42px_rgba(0,0,0,0.95)]"
          shapeRendering="crispEdges"
          style={{
            transformOrigin: 'bottom left',
            animation: 'pineSway 12s ease-in-out infinite alternate',
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
