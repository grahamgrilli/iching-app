import type { LineValue } from '../lib/cast';

function CoinKey() {
  return (
    <div className="coin-key" aria-label="How to record your coins">
      <div className="coin-key-visible">
        <p className="coin-key-line">
          <strong>Heads = X</strong>
          <span className="coin-key-dot" aria-hidden>
            ·
          </span>
          <strong>Tails = O</strong>
        </p>
        <p className="coin-key-line coin-key-line--sub">
          Lines <strong>1–6</strong> go <strong>bottom to top</strong> — line 1 is the bottom row (first roll).
        </p>
      </div>

      <details className="coin-scoring-details">
        <summary className="coin-scoring-summary">
          <span className="coin-scoring-summary-label">Scoring</span>
          <span className="coin-scoring-chevron" aria-hidden>
            ▼
          </span>
        </summary>
        <div className="coin-scoring-body">
          <p>Each head (X) counts as 3.</p>
          <p>Each tail (O) counts as 2.</p>
          <p>Add the three coins; the total is your line value (6 through 9).</p>
          <p>6 = O O O — old yin (broken), changing</p>
          <p>7 = X O O — young yang (solid)</p>
          <p>8 = X X O — young yin (broken)</p>
          <p>9 = X X X — old yang, changing</p>
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
  // X=3 O=2 → h heads: sum = 6 + h → h = value − 6
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
    <div className="three-coins three-coins--dark" role="group" aria-label="Three coins, left to right">
      {[0, 1, 2].map((i) => (
        <span key={i} className="coin-script-cell">
          {i > 0 && (
            <span className="coin-script-sep" aria-hidden>
              –
            </span>
          )}
          <button
            type="button"
            className={`coin-mark ${i < heads ? 'coin-mark--x' : 'coin-mark--o'}`}
            onClick={(e) => {
              toggle(i);
              if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
                (e.currentTarget as HTMLButtonElement).blur();
              }
            }}
            disabled={disabled}
            aria-label={i < heads ? 'Heads (X)' : 'Tails (O)'}
          >
            {i < heads ? 'X' : 'O'}
          </button>
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
        Focus on your question. Tap each row to match your three coins — left to right, like{' '}
        <span className="coin-instruction-sample">X – O – O</span>.
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
