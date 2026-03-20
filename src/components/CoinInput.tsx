import type { LineValue } from '../lib/cast';

const LEGEND = (
  <div className="coin-legend">
    <span>Heads=3, Tails=2</span>
    <span>6=○○○ 7=●○○ 8=●●○ 9=●●●</span>
  </div>
);

function ThreeCoins({
  value,
  onChange,
  disabled,
}: {
  value: LineValue;
  onChange: (v: LineValue) => void;
  disabled?: boolean;
}) {
  // value 6=0H, 7=1H, 8=2H, 9=3H
  const heads = value === 6 ? 0 : value === 7 ? 1 : value === 8 ? 2 : 3;

  const toggle = (i: number) => {
    if (disabled) return;
    let newHeads = heads;
    if (i < heads) newHeads = heads - 1;
    else newHeads = heads + 1;
    newHeads = Math.max(0, Math.min(3, newHeads));
    const sum = newHeads * 3 + (3 - newHeads) * 2;
    onChange(sum as LineValue);
  };

  return (
    <div className="three-coins">
      {[0, 1, 2].map((i) => (
        <button
          key={i}
          type="button"
          className={`coin ${i < heads ? 'heads' : 'tails'}`}
          onClick={() => toggle(i)}
          disabled={disabled}
          aria-label={i < heads ? 'Heads' : 'Tails'}
        >
          {i < heads ? '●' : '○'}
        </button>
      ))}
    </div>
  );
}

export default function CoinInput({
  lines,
  onChange,
  disabled,
}: {
  lines: LineValue[];
  onChange: (lines: LineValue[]) => void;
  disabled?: boolean;
}) {
  const updateLine = (idx: number, v: LineValue) => {
    const next = [...lines];
    next[idx] = v;
    onChange(next);
  };

  return (
    <div className="coin-input">
      <p className="coin-instruction">
        Focus on your question. Toss your coins six times (bottom to top), then record each toss below.
      </p>
      {LEGEND}
      <div className="line-inputs">
        {[0, 1, 2, 3, 4, 5].map((idx) => (
          <div key={idx} className="line-row">
            <span className="line-label">Line {idx + 1}</span>
            <ThreeCoins
              value={lines[idx]}
              onChange={(v) => updateLine(idx, v)}
              disabled={disabled}
            />
            <span className="line-value">{lines[idx]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
