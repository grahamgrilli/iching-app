import type { LineValue } from '../lib/cast';

/** Brushstroke-style SVG line - yang (solid) or yin (broken), with optional changing emphasis */
function BrushLine({
  isYang,
  isChanging,
  onClick,
}: {
  isYang: boolean;
  isChanging: boolean;
  onClick?: () => void;
}) {
  const strokeClass = `brush-stroke ${isYang ? 'yang' : 'yin'} ${isChanging ? 'changing' : ''}`;
  if (isYang) {
    return (
      <path
        d="M 5 12 Q 25 8 45 12 Q 55 14 85 12"
        className={strokeClass}
        onClick={onClick}
        strokeWidth={isChanging ? 4 : 3}
      />
    );
  }
  return (
    <g onClick={onClick}>
      <path
        d="M 5 12 Q 20 10 35 12"
        className={strokeClass}
        strokeWidth={isChanging ? 4 : 3}
      />
      <path
        d="M 55 12 Q 70 14 85 12"
        className={strokeClass}
        strokeWidth={isChanging ? 4 : 3}
      />
    </g>
  );
}

export default function HexagramDisplay({
  lines,
  onLineClick,
}: {
  lines: LineValue[];
  onLineClick?: (idx: number) => void;
}) {
  // Line 1 is bottom, line 6 is top. Render top-to-bottom so line 6 at y=10, line 1 at y=70
  const ordered = [...lines].reverse();
  return (
    <svg
      className="hexagram-svg"
      viewBox="0 0 90 80"
      xmlns="http://www.w3.org/2000/svg"
    >
      {ordered.map((v, i) => {
        const idx = lines.length - 1 - i;
        const isYang = v === 7 || v === 9;
        const isChanging = v === 6 || v === 9;
        const y = 10 + i * 12;
        return (
          <g key={idx} transform={`translate(0, ${y})`}>
            <BrushLine
              isYang={isYang}
              isChanging={isChanging}
              onClick={onLineClick ? () => onLineClick(idx) : undefined}
            />
          </g>
        );
      })}
    </svg>
  );
}
