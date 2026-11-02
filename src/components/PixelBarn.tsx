import barnData from './barn-paths.json';

interface LayerData {
  color: string;
  d: string;
}

const barnFireflies = [
  { id: 1, left: '22%', top: '48%', duration: '4.8s', delay: '0.5s', size: 2.5 },
  { id: 2, left: '72%', top: '65%', duration: '6.2s', delay: '2.1s', size: 3 },
  { id: 3, left: '38%', top: '78%', duration: '5.5s', delay: '1.2s', size: 2 },
];

export default function PixelBarn() {
  const { totalCols, totalRows, layers } = barnData as {
    totalCols: number;
    totalRows: number;
    layers: Record<string, LayerData>;
  };

  return (
    <div
      className="fixed bottom-0 left-0 md:left-2 lg:left-6 pointer-events-none select-none z-0 flex items-end justify-start overflow-hidden"
      aria-hidden="true"
    >
      <div className="relative">
        {/* Soft floating pixel fireflies around the shed */}
        {barnFireflies.map((f) => (
          <div
            key={f.id}
            className="absolute rounded-none pointer-events-none animate-pulse"
            style={{
              left: f.left,
              top: f.top,
              width: `${f.size}px`,
              height: `${f.size}px`,
              backgroundColor: '#fde047',
              boxShadow: '0 0 8px rgba(253, 224, 71, 0.9)',
              animationDuration: f.duration,
              animationDelay: f.delay,
              opacity: 0.85,
            }}
          />
        ))}

        {/* Cozy ambient glow behind the windows */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: '52%',
            top: '55%',
            width: '90px',
            height: '90px',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, rgba(245, 158, 11, 0) 70%)',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Handcrafted pixel art barn / hut shed SVG with transparent background */}
        <svg
          viewBox={`0 0 ${totalCols} ${totalRows}`}
          className="w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] xl:w-[330px] h-auto block filter drop-shadow-[0_16px_36px_rgba(0,0,0,0.95)]"
          shapeRendering="crispEdges"
        >
          {Object.entries(layers).map(([key, layer]) => (
            <path
              key={key}
              d={layer.d}
              fill={layer.color}
              className={key === 'Y' || key === 'y' ? 'animate-pulse' : undefined}
              style={
                key === 'Y' || key === 'y'
                  ? { animationDuration: '3.5s', animationIterationCount: 'infinite' }
                  : undefined
              }
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
