import type { LineValue } from '../lib/cast';

/** Straight segments with round caps (tapered-looking ends); strong yin = X in gap; strong yang = circle on solid. */
function HexLine({
  value,
  onClick,
}: {
  value: LineValue;
  onClick?: () => void;
}) {
  const isYang = value === 7 || value === 9;
  const isOld = value === 6 || value === 9;
  const stroke = 'var(--color-ink, #1a1a1a)';
  const strokeW = 3.25;

  if (isYang) {
    return (
      <g onClick={onClick} className="hex-line-group">
        <line
          x1="6"
          y1="10"
          x2="94"
          y2="10"
          stroke={stroke}
          strokeWidth={strokeW}
          strokeLinecap="round"
          className="hex-segment"
        />
        {isOld && value === 9 && (
          <circle
            cx="50"
            cy="10"
            r="3.8"
            fill="none"
            stroke={stroke}
            strokeWidth={1.8}
            className="moving-mark"
          />
        )}
      </g>
    );
  }

  // Yin: two segments
  return (
    <g onClick={onClick} className="hex-line-group">
      <line
        x1="6"
        y1="10"
        x2="39"
        y2="10"
        stroke={stroke}
        strokeWidth={strokeW}
        strokeLinecap="round"
        className="hex-segment"
      />
      <line
        x1="61"
        y1="10"
        x2="94"
        y2="10"
        stroke={stroke}
        strokeWidth={strokeW}
        strokeLinecap="round"
        className="hex-segment"
      />
      {isOld && value === 6 && (
        <path
          d="M 43 6 L 57 14 M 57 6 L 43 14"
          stroke={stroke}
          strokeWidth={1.6}
          strokeLinecap="round"
          className="moving-mark"
        />
      )}
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
  // Line 6 at top (small y), line 1 at bottom (large y) — matches I Ching reading
  const ordered = [...lines].reverse();
  return (
    <svg
      className="hexagram-svg"
      viewBox="0 0 100 84"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {ordered.map((v, i) => {
        const sourceIdx = lines.length - 1 - i;
        const y = 6 + i * 13;
        return (
          <g key={sourceIdx} transform={`translate(0, ${y})`}>
            <HexLine
              value={v}
              onClick={onLineClick ? () => onLineClick(sourceIdx) : undefined}
            />
          </g>
        );
      })}
    </svg>
  );
}
