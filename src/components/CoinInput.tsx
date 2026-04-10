import type { LineSlot, LineValue } from '../lib/cast';

function CoinKey() {
  return (
    <div className="coin-key" aria-label="How to record your coins">
      <div className="coin-key-visible">
        <p className="coin-key-line coin-key-line--coins-legend">
          <span className="coin-key-legend-item">
            <span className="coin-key-sample coin-key-sample--heads" aria-hidden>
              <span className="coin-key-sample-hole" />
            </span>
            <strong>Heads</strong>
            <span className="coin-key-legend-hint">filled</span>
          </span>
          <span className="coin-key-dot" aria-hidden>
            ·
          </span>
          <span className="coin-key-legend-item">
            <span className="coin-key-sample coin-key-sample--tails" aria-hidden>
              <span className="coin-key-sample-hole" />
            </span>
            <strong>Tails</strong>
            <span className="coin-key-legend-hint">outline</span>
          </span>
        </p>
        <p className="coin-key-line coin-key-line--sub">
          Flat “cash” style coins (square hole). Lines <strong>1–6</strong> bottom to top — line 1 is your first
          toss.
        </p>
      </div>

      <details className="coin-scoring-details">
        <summary className="coin-scoring-summary">
          <span className="coin-scoring-summary-label">Scoring</span>
          <span className="coin-scoring-chevron" aria-hidden>▼</span>
        </summary>
        <div className="coin-scoring-body">
          <p>Each head counts as 3.</p>
          <p>Each tail counts as 2.</p>
          <p>Add the three coins; the total is your line value (6 through 9).</p>
          <p>6 = three tails — old yin (broken), changing</p>
          <p>7 = one head, two tails — young yang (solid)</p>
          <p>8 = two heads, one tail — young yin (broken)</p>
          <p>9 = three heads — old yang, changing</p>
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
  value: LineSlot;
  onChange: (v: LineValue) => void;
  disabled?: boolean;
}) {
  const base = value === null ? 6 : value;
  const heads = base - 6;

  const toggle = (i: number) => {
    if (disabled) return;
    let h = (value === null ? 0 : value - 6);
    if (i < h) h -= 1;
    else h += 1;
    h = Math.max(0, Math.min(3, h));
    onChange((6 + h) as LineValue);
  };

  return (
    <div className="three-coins three-coins--cash" role="group" aria-label="Three coins, left to right">
      {[0, 1, 2].map((i) => {
        const isUnset = value === null;
        const isHead = !isUnset && i < heads;
        const faceClass = isUnset
          ? 'coin-face--unset'
          : isHead
            ? 'coin-face--heads'
            : 'coin-face--tails';
        return (
          <span key={i} className="coin-slot">
            {i > 0 && (
              <span className="coin-slot-sep" aria-hidden>
                ·
              </span>
            )}
            <button
              type="button"
              className={`coin-face ${faceClass}`}
              onClick={(e) => {
                toggle(i);
                if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
                  (e.currentTarget as HTMLButtonElement).blur();
                }
              }}
              disabled={disabled}
              aria-label={
                isUnset
                  ? 'Set coin'
                  : isHead
                    ? 'Heads (filled cash coin)'
                    : 'Tails (outline cash coin)'
              }
            >
              <span className="coin-hole" aria-hidden />
            </button>
          </span>
        );
      })}
    </div>
  );
}

export default function CoinInput({
  lines,
  onChange,
  disabled,
}: {
  lines: LineSlot[];
  onChange: (lines: LineSlot[]) => void;
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
        Tap each row for your three coins — <strong>filled</strong> (brass) = heads, <strong>outline</strong> =
        tails. Dashed coins are not set yet.
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
              {lines[idx] === null ? '—' : lines[idx]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
