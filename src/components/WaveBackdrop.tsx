/** Thin linework waves — continuous curves, nautical / vintage print feel */
export default function WaveBackdrop() {
  const w = 1.15;

  const paths = [
    'M-80,168 Q320,142 720,168 T1520,168',
    'M-80,228 Q340,198 720,228 T1520,228',
    'M-80,292 Q300,268 720,292 T1520,310',
    'M-80,358 Q360,332 700,356 T1520,348',
    'M-80,428 Q280,398 720,428 T1520,412',
    'M-80,498 Q380,470 700,492 T1520,488',
    'M-80,572 Q320,542 740,568 T1520,548',
    'M-80,648 Q400,618 680,642 T1520,628',
    'M-80,722 Q340,702 720,718 T1520,702',
    'M-80,792 Q420,762 660,786 T1520,768',
    'M-80,112 Q360,88 680,108 T1520,92',
    'M-80,52 Q280,32 760,58 T1520,42',
  ];

  const opacities = [0.07, 0.055, 0.065, 0.05, 0.075, 0.06, 0.045, 0.07, 0.055, 0.065, 0.05, 0.08];

  return (
    <svg
      className="wave-backdrop"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 880"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <g fill="none" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" className="wave-backdrop-strokes">
        {paths.map((d, i) => (
          <path key={i} d={d} opacity={opacities[i % opacities.length]} />
        ))}
      </g>
    </svg>
  );
}
