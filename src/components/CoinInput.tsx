import type { LineValue } from '../lib/cast';

function CoinKey() {
  return (
    <div className="coin-key" aria-label="Coin symbols">
      <div className="coin-key-row">
        <span className="coin-key-sample tails" aria-hidden>○</span>
        <span>Tails (empty ring)</span>
      </div>
      <div className="coin-key-row">
        <span className="coin-key-sample heads" aria-hidden>●</span>
        <span>Heads (filled)</span>
      </div>
      <div className="coin-key-row muted">
        <span>Each ● = 3 · each ○ = 2 (add the three coins → total 6–9)</span>
      </div>
      <div className="coin-key-row muted small">
        <span>6 = ○○○ (changing yin) · 7 = one ● · 8 = two ● · 9 = ●●● (changing yang)</span>
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
  // ●=3 ○=2 → 0●=6, 1●=7, 2●=8, 3●=9
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
          onClick={() => toggle(i)}
          disabled={disabled}
          aria-label={i < heads ? 'Heads (filled)' : 'Tails (empty)'}
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
