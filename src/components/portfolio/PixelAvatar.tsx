// 8-bit style full-body avatar placeholder (brief §Section 7). Built from a
// pixel grid so it reads as pixel art; swap for real avatar artwork later.
const SKIN = "#e8b88f";
const HAIR = "#2a2320";
const SHIRT = "#242424";
const PANTS = "#3a3a3a";
const SHOE = "#1c1c1c";
const EYE = "#1c1c1c";
const PHONE = "#ffe862";

// [col, row, color] on an 11-wide grid.
const P: Array<[number, number, string]> = [];
const add = (cols: number[], row: number, color: string) =>
  cols.forEach((c) => P.push([c, row, color]));

// hair
add([4, 5, 6], 0, HAIR);
add([3, 4, 5, 6, 7], 1, HAIR);
// face + hair sides
add([3, 7], 2, HAIR);
add([4, 5, 6], 2, SKIN);
add([4, 5, 6], 3, SKIN);
add([4, 5, 6], 4, SKIN);
// neck
add([5], 5, SKIN);
// shirt / torso
add([3, 4, 5, 6, 7], 6, SHIRT);
add([2, 3, 4, 5, 6, 7, 8], 7, SHIRT);
add([2, 3, 4, 5, 6, 7, 8], 8, SHIRT);
add([3, 4, 5, 6, 7], 9, SHIRT);
// hands
add([2, 8], 9, SKIN);
// legs
add([3, 4, 6, 7], 10, PANTS);
add([3, 4, 6, 7], 11, PANTS);
add([3, 4, 6, 7], 12, PANTS);
// shoes
add([3, 4, 6, 7], 13, SHOE);
// eyes
P.push([4, 3, EYE]);
P.push([6, 3, EYE]);
// phone in left hand
P.push([2, 8, PHONE]);

export default function PixelAvatar({ className }: { className?: string }) {
  const unit = 10;
  const cols = 11;
  const rows = 14;
  return (
    <svg
      viewBox={`0 0 ${cols * unit} ${rows * unit}`}
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
