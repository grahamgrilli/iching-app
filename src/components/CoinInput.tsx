import type { LineValue } from '../lib/cast';

function CoinKey() {
  return (
    <div className="coin-key" aria-label="Coin symbols">
      <div className="coin-key-row">
        <span className="coin-key-sample tails" aria-hidden>O</span>
        <span>Tails = O</span>
      </div>
      <div className="coin-key-row">
        <span className="coin-key-sample heads" aria-hidden>X</span>
        <span>Heads (penny / obverse) = X</span>
      </div>
      <div className="coin-key-row muted">
        <span>Each X (heads) = 3 · each O (tails) = 2 (add the three coins → total 6–9)</span>
      </div>
      <div className="coin-key-row muted small">
        <span>
          6 = OOO (old yin, broken) · 7 = XOO (young yang, solid) · 8 = XXO (young yin, broken) · 9 = XXX (old
          yang)
        </span>
      </div>
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
    <div className="three-coins">
      {[0, 1, 2].map((i) => (
        <button
          key={i}
          type="button"
          className={`coin ${i < heads ? 'heads' : 'tails'}`}
          onClick={(e) => {
            toggle(i);
            // iOS/Android can leave a “hover” or focus state that paints over X/O until another tap
            if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
              (e.currentTarget as HTMLButtonElement).blur();
            }
          }}
          disabled={disabled}
          aria-label={i < heads ? 'Heads (X)' : 'Tails (O)'}
        >
          {i < heads ? 'X' : 'O'}
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

  // Visual order: line 6 at top, line 1 at bottom (matches hexagram)
  const displayOrder = [5, 4, 3, 2, 1, 0] as const;

  return (
    <div className="coin-input">
      <p className="coin-instruction">
        Focus on your question. Toss six times <strong>bottom to top</strong> — line <strong>1</strong> is the <strong>bottom</strong> row here.
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
            <span className="line-value">{lines[idx]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
