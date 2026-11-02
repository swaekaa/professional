import forestData from './forest-paths.json';

interface LayerData {
  color: string;
  d: string;
}

const fireflies = [
  { id: 1, left: '30%', top: '48%', duration: '5.2s', delay: '0s', size: 3 },
  { id: 2, left: '52%', top: '32%', duration: '6.8s', delay: '1.8s', size: 2.5 },
  { id: 3, left: '68%', top: '50%', duration: '5.9s', delay: '3.1s', size: 3 },
  { id: 4, left: '40%', top: '68%', duration: '7.4s', delay: '0.9s', size: 2 },
  { id: 5, left: '78%', top: '62%', duration: '6.1s', delay: '2.4s', size: 2.5 },
];

export default function PixelForest() {
  const { totalCols, totalRows, layers } = forestData as {
    totalCols: number;
    totalRows: number;
    layers: Record<string, LayerData>;
  };

  return (
    <div
      className="fixed bottom-0 right-0 md:right-3 lg:right-8 pointer-events-none select-none z-0 flex items-end justify-end overflow-hidden"
      aria-hidden="true"
    >
      <div className="relative">
        {/* Floating pixel forest motes / fireflies */}
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

        {/* Handcrafted pixel art pine forest SVG with transparent background */}
        <svg
          viewBox={`0 0 ${totalCols} ${totalRows}`}
          className="w-[220px] sm:w-[280px] md:w-[340px] lg:w-[380px] xl:w-[420px] h-auto block filter drop-shadow-[0_16px_36px_rgba(0,0,0,0.95)]"
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
