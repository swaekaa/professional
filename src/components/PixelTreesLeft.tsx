import leftData from './trees-left.json';

interface LayerData {
  color: string;
  d: string;
}

const leftFireflies = [
  { id: 1, left: '25%', top: '45%', duration: '5.4s', delay: '0s', size: 2.5 },
  { id: 2, left: '55%', top: '32%', duration: '6.7s', delay: '1.5s', size: 3 },
  { id: 3, left: '75%', top: '55%', duration: '5.8s', delay: '2.8s', size: 2 },
  { id: 4, left: '40%', top: '70%', duration: '6.3s', delay: '0.8s', size: 2.5 },
];

export default function PixelTreesLeft() {
  const { totalCols, totalRows, layers } = leftData as {
    totalCols: number;
    totalRows: number;
    layers: Record<string, LayerData>;
  };

  return (
    <div
      className="fixed bottom-0 left-0 pointer-events-none select-none z-0 flex items-end justify-start overflow-hidden"
      style={{
        maxWidth: 'calc((100vw - 780px) / 2 + 30px)',
      }}
      aria-hidden="true"
    >
      <div className="relative">
        {/* Floating pixel forest motes / fireflies on left side */}
        {leftFireflies.map((f) => (
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

        {/* Left side trees: Deciduous leafy Oak & slender white Birch tree */}
        <svg
          viewBox={`0 0 ${totalCols} ${totalRows}`}
          className="w-[140px] sm:w-[180px] md:w-[220px] lg:w-[260px] xl:w-[290px] h-auto block filter drop-shadow-[0_16px_36px_rgba(0,0,0,0.95)]"
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
