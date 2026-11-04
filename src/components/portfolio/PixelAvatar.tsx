// 8-bit style full-body avatar placeholder (brief §Section 7). Built from a
// pixel grid so it reads as pixel art; swap for real avatar artwork later.
const SKIN = "#e8b88f";
const HAIR = "#2a2320";
const SHIRT = "#242424";
const PANTS = "#3a3a3a";
const SHOE = "#1c1c1c";

// Each entry: [col, row, color]. 11 cols wide grid.
const P: Array<[number, number, string]> = [];
const add = (cols: number[], row: number, color: string) =>
  cols.forEach((c) => P.push([c, row, color]));

// hair
add([4, 5, 6], 0, HAIR);
add([3, 4, 5, 6, 7], 1, HAIR);
// face
add([4, 5, 6], 2, SKIN);
add([4, 6], 2, SKIN);
add([4, 5, 6], 3, SKIN);
// neck
add([5], 4, SKIN);
// shirt / torso + arms
add([3, 4, 5, 6, 7], 5, SHIRT);
add([2, 3, 4, 5, 6, 7, 8], 6, SHIRT);
add([2, 3, 4, 5, 6, 7, 8], 7, SHIRT);
add([2, 8], 8, SKIN); // hands
add([3, 4, 5, 6, 7], 8, SHIRT);
// pants
add([3, 4, 6, 7], 9, PANTS);
add([3, 4, 6, 7], 10, PANTS);
// shoes
add([3, 4, 6, 7], 11, SHOE);

export default function PixelAvatar({ className }: { className?: string }) {
  const unit = 10;
  return (
    <svg
      viewBox={`0 0 ${11 * unit} ${12 * unit}`}
      className={className}
      shapeRendering="crispEdges"
      aria-label="Pixel avatar of Suhair Sayed"
    >
      {P.map(([c, r, color], i) => (
        <rect key={i} x={c * unit} y={r * unit} width={unit} height={unit} fill={color} />
      ))}
    </svg>
  );
}
