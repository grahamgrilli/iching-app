import type { LineValue } from '../lib/cast';

function CoinKey() {
  return (
    <div className="coin-key" aria-label="How to record your coins">
      <div className="coin-key-visible">
        <p className="coin-key-line coin-key-line--coins-legend">
          <span className="coin-key-legend-item">
            <span className="coin-key-sample coin-key-sample--heads" aria-hidden />
            <strong>Heads</strong> (solid)
          </span>
          <span className="coin-key-dot" aria-hidden>
            ·
          </span>
          <span className="coin-key-legend-item">
            <span className="coin-key-sample coin-key-sample--tails" aria-hidden />
            <strong>Tails</strong> (ring)
          </span>
        </p>
        <p className="coin-key-line coin-key-line--sub">
          Lines <strong>1–6</strong> go <strong>bottom to top</strong> — line 1 is the bottom row (first roll).
        </p>
      </div>

      <details className="coin-scoring-details">
        <summary className="coin-scoring-summary">
          <span className="coin-scoring-summary-label">Scoring</span>
          <span className="coin-scoring-chevron" aria-hidden>▼</span>
        </summary>
        <div className="coin-scoring-body">
          <p>Each head (solid) counts as 3.</p>
          <p>Each tail (ring) counts as 2.</p>
          <p>Add the three coins; the total is your line value (6 through 9).</p>
          <p>6 = three rings — old yin (broken), changing</p>
          <p>7 = one solid, two rings — young yang (solid)</p>
          <p>8 = two solids, one ring — young yin (broken)</p>
          <p>9 = three solids — old yang, changing</p>
        </div>
      </details>
    </div>
  );
}

function ThreeCoins({
  value,
  onChange,
  disabled,
}: {
  value: LineValue;
  onChange: (v: LineValue) => void;
  disabled?: boolean;
}) {
  const heads = value - 6;

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
    <div className="three-coins three-coins--traditional" role="group" aria-label="Three coins, left to right">
      {[0, 1, 2].map((i) => (
        <span key={i} className="coin-slot">
          {i > 0 && (
            <span className="coin-slot-sep" aria-hidden>
              ·
            </span>
          )}
          <button
            type="button"
            className={`coin-face ${i < heads ? 'coin-face--heads' : 'coin-face--tails'}`}
            onClick={(e) => {
              toggle(i);
              if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
                (e.currentTarget as HTMLButtonElement).blur();
              }
            }}
            disabled={disabled}
            aria-label={i < heads ? 'Heads (solid coin)' : 'Tails (open ring)'}
          />
        </span>
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

  const displayOrder = [5, 4, 3, 2, 1, 0] as const;

  return (
    <div className="coin-input">
      <p className="coin-instruction">
        Tap each row to match your three tosses — <strong>solid</strong> = heads, <strong>ring</strong> = tails,
        left to right.
      </p>
      <CoinKey />
      <div className="line-inputs">
        {displayOrder.map((idx) => (
          <div key={idx} className="line-row">
            <span className="line-label">#{idx + 1}</span>
            <ThreeCoins
              value={lines[idx]}
              onChange={(v) => updateLine(idx, v)}
              disabled={disabled}
            />
            <span className="line-value" title="Line value (optional check)">
              {lines[idx]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
