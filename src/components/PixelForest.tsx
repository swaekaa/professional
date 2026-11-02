// Pixel art pine forest — pure SVG, no background, fixed bottom-right

// Each character → pixel. 'X' = foliage, 'T' = trunk, ' ' = transparent
const P = 5; // pixel unit size in px

const px = (rows: string[]): Array<{ x: number; y: number; t: 'leaf' | 'trunk' }> => {
  const cells: Array<{ x: number; y: number; t: 'leaf' | 'trunk' }> = [];
  rows.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      if (ch === 'X') cells.push({ x, y, t: 'leaf' });
      else if (ch === 'T') cells.push({ x, y, t: 'trunk' });
    });
  });
  return cells;
};

// ── Pixel art pine trees ────────────────────────────────────────────────────

const TREE_A = px([
  '      X      ',
  '     XXX     ',
  '    XXXXX    ',
  '   XXXXXXX   ',
  '  XXXXXXXXX  ',
  '     XXX     ',
  '    XXXXX    ',
  '   XXXXXXX   ',
  '  XXXXXXXXX  ',
  ' XXXXXXXXXXX ',
  '     XXX     ',
  '    XXXXX    ',
  '   XXXXXXX   ',
  '  XXXXXXXXX  ',
  ' XXXXXXXXXXX ',
  'XXXXXXXXXXXXX',
  '     XXX     ',
  '    XXXXX    ',
  '   XXXXXXX   ',
  '  XXXXXXXXX  ',
  ' XXXXXXXXXXX ',
  'XXXXXXXXXXXXX',
  '      TT     ',
  '      TT     ',
  '      TT     ',
  '      TT     ',
  '      TT     ',
  '      TT     ',
]);

const TREE_B = px([
  '     X     ',
  '    XXX    ',
  '   XXXXX   ',
  '  XXXXXXX  ',
  ' XXXXXXXXX ',
  '    XXX    ',
  '   XXXXX   ',
  '  XXXXXXX  ',
  ' XXXXXXXXX ',
  'XXXXXXXXXXX',
  '    XXX    ',
  '   XXXXX   ',
  '  XXXXXXX  ',
  ' XXXXXXXXX ',
  'XXXXXXXXXXX',
  '    TT     ',
  '    TT     ',
  '    TT     ',
  '    TT     ',
  '    TT     ',
]);

const TREE_C = px([
  '    X    ',
  '   XXX   ',
  '  XXXXX  ',
  ' XXXXXXX ',
  '   XXX   ',
  '  XXXXX  ',
  ' XXXXXXX ',
  'XXXXXXXXX',
  '   XXX   ',
  '  XXXXX  ',
  ' XXXXXXX ',
  'XXXXXXXXX',
  '   TT    ',
  '   TT    ',
  '   TT    ',
  '   TT    ',
]);

const TREE_D = px([
  '   X   ',
  '  XXX  ',
  ' XXXXX ',
  '  XXX  ',
  ' XXXXX ',
  'XXXXXXX',
  '  XXX  ',
  ' XXXXX ',
  'XXXXXXX',
  '  TT   ',
  '  TT   ',
  '  TT   ',
]);

// ── Tree heights (row count) ─────────────────────────────────────────────────

const HEIGHTS: Record<string, number> = {
  A: 28, B: 21, C: 16, D: 12,
};

// ── Scene: which trees, x-offset in pixel-grid units, tree key ───────────────

const SCENE: Array<{ tree: ReturnType<typeof px>; cols: number; rows: number; gridX: number; opacity: number }> = [
  { tree: TREE_A, cols: 13, rows: HEIGHTS.A, gridX: 0,  opacity: 1    },
  { tree: TREE_C, cols:  9, rows: HEIGHTS.C, gridX: 15, opacity: 0.75 },
  { tree: TREE_B, cols: 11, rows: HEIGHTS.B, gridX: 26, opacity: 0.9  },
  { tree: TREE_D, cols:  7, rows: HEIGHTS.D, gridX: 39, opacity: 0.55 },
];

// ── SVG dimensions ────────────────────────────────────────────────────────────

const TOTAL_COLS = 47; // 39 + 7 + 1
const TOTAL_ROWS = HEIGHTS.A;
const SVG_W = TOTAL_COLS * P;
const SVG_H = TOTAL_ROWS * P;

// ── Colour palette ────────────────────────────────────────────────────────────
// Very dark muted forest greens — subtle against #050505

const LEAF_DARK   = '#162516';
const LEAF_BASE   = '#1c2e1c';
const LEAF_MID    = '#233323';
const LEAF_LIGHT  = '#2a3d2a';
const TRUNK_COLOR = '#1a1208';

const leafShade = (col: number, totalCols: number): string => {
  const t = col / (totalCols - 1);
  if (t < 0.15) return LEAF_DARK;
  if (t < 0.4)  return LEAF_BASE;
  if (t < 0.7)  return LEAF_MID;
  return LEAF_LIGHT;
};

export default function PixelForest() {
  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        bottom: 0,
        width: SVG_W,
        height: SVG_H,
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.9,
      }}
      aria-hidden="true"
    >
      <svg
        width={SVG_W}
        height={SVG_H}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', imageRendering: 'pixelated' }}
      >
        {SCENE.map(({ tree, cols, rows, gridX, opacity }) => {
          // bottom-align all trees
          const yOffset = TOTAL_ROWS - rows;
          return (
            <g key={gridX} opacity={opacity}>
              {tree.map(({ x, y, t }, i) => (
                <rect
                  key={i}
                  x={(gridX + x) * P}
                  y={(yOffset + y) * P}
                  width={P}
                  height={P}
                  fill={t === 'trunk' ? TRUNK_COLOR : leafShade(x, cols)}
                />
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
