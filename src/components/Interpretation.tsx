import { useState } from 'react';
import type { LineValue } from '../lib/cast';
import type { HexagramData } from '../data/hexagrams';
import { isChanging } from '../lib/cast';

const LINE_LABELS: Record<LineValue, string> = {
  6: 'Strong Yin — Changing',
  7: 'Young Yin (one ●)',
  8: 'Young Yang (two ●)',
  9: 'Strong Yang — Changing',
};

export default function Interpretation({
  primary,
  resulting,
  lines,
}: {
  primary: HexagramData;
  resulting: HexagramData | null;
  lines: LineValue[];
}) {
  const [expandedLine, setExpandedLine] = useState<number | null>(null);
  const hasChanging = lines.some(isChanging);

  return (
    <div className="interpretation">
      <div className="hexagram-header">
        <h2>{primary.name}</h2>
        <p className="chinese">{primary.chinese} — {primary.pinyin}</p>
      </div>

      <div className="overview">
        <h3>Judgement</h3>
        <p>{primary.judgement}</p>
        <h3>Image</h3>
        <p>{primary.image}</p>
      </div>

      <div className="lines-section">
        <h3>Lines</h3>
        <p className="lines-hint">Click a line to see its interpretation</p>
        <div className="line-details">
          {lines.map((val, i) => (
            <div
              key={i}
              className={`line-item ${expandedLine === i ? 'expanded' : ''}`}
            >
              <button
                type="button"
                className="line-summary"
                onClick={() => setExpandedLine(expandedLine === i ? null : i)}
              >
                <span>Line {i + 1}</span>
                <span className="line-type">{LINE_LABELS[val]}</span>
                {isChanging(val) && <span className="changing-badge">changing</span>}
              </button>
              {expandedLine === i && (
                <div className="line-text">
                  {primary.lines[(i + 1) as 1|2|3|4|5|6]?.text}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {hasChanging && resulting && (
        <div className="resulting-hexagram">
          <h3>Transformation</h3>
          <p>With changing lines, the situation transforms toward:</p>
          <h4>{resulting.name}</h4>
          <p className="chinese">{resulting.chinese} — {resulting.pinyin}</p>
          <p className="judgement">{resulting.judgement}</p>
        </div>
      )}

      <p className="attribution">
        Interpretations from the Wilhelm/Baynes I Ching translation.
      </p>
    </div>
  );
}
