import { useMemo } from 'react';

/** Seeded PRNG — same hex + image text → same picture */
function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type InkPath = { d: string; sw: number; op?: number };

/** Loose ukiyo-e / block-print line art — not literal; breaks up text. */
function generateImageBlockPrint(hexNumber: number, imageText: string): InkPath[] {
  const seed = hashString(`${hexNumber}\0${imageText}`) ^ (hexNumber * 2654435761);
  const rand = mulberry32(seed);
  const paths: InkPath[] = [];

  const waveLayer = (baseY: number, amp: number, freq: number, sw: number, op: number) => {
    let d = 'M 0 ' + baseY.toFixed(2);
    for (let x = 2; x <= 100; x += 2) {
      const y = baseY + Math.sin((x * freq + seed * 0.01) * 0.12 + seed) * amp;
      d += ' L ' + x + ' ' + y.toFixed(2);
    }
    paths.push({ d, sw, op });
  };

  // Distant sea (always a bit of rhythm at bottom)
  const layers = 2 + Math.floor(rand() * 4);
  for (let i = 0; i < layers; i++) {
    waveLayer(58 + i * 7 + rand() * 4, 2 + rand() * 5, 0.8 + rand(), 0.35 + rand() * 0.45, 0.35 + rand() * 0.35);
  }

  // Foreground wave (bold)
  if (rand() > 0.15) {
    waveLayer(72 + rand() * 8, 4 + rand() * 6, 1.1 + rand(), 0.7 + rand() * 0.5, 0.75 + rand() * 0.2);
  }

  // “Fuji” mass — simple curve or triangle outline
  if (rand() > 0.25) {
    const lx = 8 + rand() * 22;
    const rx = 92 - rand() * 22;
    const pk = 8 + rand() * 28;
    const d =
      rand() > 0.5
        ? `M ${lx.toFixed(1)} 88 Q 50 ${pk.toFixed(1)} ${rx.toFixed(1)} 88`
        : `M ${(lx + 8).toFixed(1)} 88 L 50 ${pk.toFixed(1)} L ${rx.toFixed(1)} 88`;
    paths.push({ d, sw: 0.5 + rand() * 0.45, op: 0.85 });
  }

  // Cloud puffs (arcs)
  const clouds = Math.floor(rand() * 4);
  for (let c = 0; c < clouds; c++) {
    const cx = 10 + rand() * 70;
    const cy = 8 + rand() * 28;
    const w = 12 + rand() * 18;
    paths.push({
      d: `M ${cx} ${cy} Q ${cx + w * 0.5} ${cy - 6 - rand() * 8} ${cx + w} ${cy}`,
      sw: 0.4 + rand() * 0.35,
      op: 0.45 + rand() * 0.35,
    });
  }

  // Birds (tiny angular marks)
  const birds = Math.floor(rand() * 4);
  for (let b = 0; b < birds; b++) {
    const x = 15 + rand() * 70;
    const y = 10 + rand() * 35;
    paths.push({
      d: `M ${x} ${y} l 4 -2 l -2 3`,
      sw: 0.35 + rand() * 0.2,
      op: 0.55 + rand() * 0.35,
    });
  }

  // Sun or moon ring
  if (rand() > 0.35) {
    const sx = 70 + rand() * 22;
    const sy = 10 + rand() * 18;
    const r = 4 + rand() * 7;
    paths.push({
      d: `M ${sx + r} ${sy} A ${r} ${r} 0 1 0 ${sx - r} ${sy} A ${r} ${r} 0 1 0 ${sx + r} ${sy}`,
      sw: 0.35 + rand() * 0.25,
      op: 0.4 + rand() * 0.35,
    });
  }

  // Vertical “rain” or texture
  if (rand() > 0.55) {
    const lines = 3 + Math.floor(rand() * 8);
    for (let i = 0; i < lines; i++) {
      const x = 5 + rand() * 90;
      const y0 = 15 + rand() * 40;
      paths.push({
        d: `M ${x.toFixed(1)} ${y0} L ${(x + 2 + rand() * 4).toFixed(1)} ${y0 + 18 + rand() * 25}`,
        sw: 0.2 + rand() * 0.2,
        op: 0.25 + rand() * 0.3,
      });
    }
  }

  // Shore / horizontal stress lines
  if (rand() > 0.4) {
    for (let i = 0; i < 2 + Math.floor(rand() * 3); i++) {
      const y = 80 + rand() * 12;
      paths.push({
        d: `M 0 ${y.toFixed(1)} L 100 ${(y + rand() * 2 - 1).toFixed(1)}`,
        sw: 0.25 + rand() * 0.2,
        op: 0.3 + rand() * 0.25,
      });
    }
  }

  // Pine / mast vertical
  if (rand() > 0.5) {
    const x = 12 + rand() * 20;
    paths.push({
      d: `M ${x.toFixed(1)} 88 L ${x.toFixed(1)} ${35 + rand() * 20}`,
      sw: 0.4 + rand() * 0.25,
      op: 0.5 + rand() * 0.35,
    });
    if (rand() > 0.5) {
      paths.push({
        d: `M ${x} 50 L ${x + 8} 58 M ${x} 58 L ${x - 6} 64`,
        sw: 0.3,
        op: 0.45,
      });
    }
  }

  // Spiral / foam (decorative)
  if (rand() > 0.65) {
    let d = `M 50 90`;
    for (let a = 0; a < 4 * Math.PI; a += 0.4) {
      const r = 2 + a * 1.2;
      d += ` L ${50 + Math.cos(a) * r} ${88 + Math.sin(a) * r * 0.4}`;
    }
    paths.push({ d, sw: 0.3 + rand() * 0.2, op: 0.35 + rand() * 0.25 });
  }

  return paths;
}

export default function ImageBlockPrint({
  hexNumber,
  imageText,
}: {
  hexNumber: number;
  imageText: string;
}) {
  const inkPaths = useMemo(
    () => generateImageBlockPrint(hexNumber, imageText),
    [hexNumber, imageText]
  );

  return (
    <div className="image-block-print-wrap">
      <svg
        className="image-block-print"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        focusable="false"
      >
        {inkPaths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill="none"
            stroke="currentColor"
            strokeWidth={p.sw}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={p.op ?? 0.9}
          />
        ))}
      </svg>
    </div>
  );
}
