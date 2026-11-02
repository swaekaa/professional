import forestData from './forest-paths.json';

interface LayerData {
  color: string;
  d: string;
}

const fireflies = [
  { id: 1, left: '12%', top: '68%', duration: '5.2s', delay: '0s', size: 2.5 },
  { id: 2, left: '26%', top: '52%', duration: '6.8s', delay: '1.8s', size: 3 },
  { id: 3, left: '42%', top: '40%', duration: '5.9s', delay: '3.1s', size: 2.5 },
  { id: 4, left: '56%', top: '30%', duration: '7.4s', delay: '0.9s', size: 3 },
  { id: 5, left: '70%', top: '46%', duration: '6.1s', delay: '2.4s', size: 2.5 },
  { id: 6, left: '84%', top: '58%', duration: '5.6s', delay: '1.2s', size: 3 },
  { id: 7, left: '32%', top: '76%', duration: '6.5s', delay: '2.8s', size: 2 },
  { id: 8, left: '62%', top: '70%', duration: '7.1s', delay: '0.4s', size: 2.5 },
];

export default function PixelForest() {
  const { totalCols, totalRows, layers } = forestData as {
    totalCols: number;
    totalRows: number;
    layers: Record<string, LayerData>;
  };

  return (
    <div
      className="fixed bottom-0 right-0 pointer-events-none select-none z-0 flex items-end justify-end overflow-hidden"
      style={{
        maxWidth: '100vw',
      }}
      aria-hidden="true"
    >
      <div className="relative">
        {/* Floating pixel forest motes / fireflies scattered across the grove */}
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

        {/* Handcrafted expansive pixel art pine forest SVG overlapping right side of main page */}
        <svg
          viewBox={`0 0 ${totalCols} ${totalRows}`}
          className="w-[420px] sm:w-[520px] md:w-[620px] lg:w-[720px] xl:w-[800px] 2xl:w-[880px] h-auto block filter drop-shadow-[0_16px_36px_rgba(0,0,0,0.95)]"
          shapeRendering="crispEdges"
          style={{
            transformOrigin: 'bottom right',
            animation: 'pineSway 11s ease-in-out infinite alternate',
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
