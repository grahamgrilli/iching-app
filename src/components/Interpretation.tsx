import { useState } from 'react';
import type { LineValue } from '../lib/cast';
import type { HexagramData } from '../data/hexagrams';
import { getSoberJudgementNote } from '../data/hexagrams';
import { isChanging } from '../lib/cast';
import ImageBlockPrint from './ImageBlockPrint';

const LINE_LABELS: Record<LineValue, string> = {
  6: 'Old Yin — Changing',
  7: 'Young Yang (solid)',
  8: 'Young Yin (broken)',
  9: 'Old Yang — Changing',
};

/** Top to bottom: line 6 … line 1 — matches hexagram drawing and coin rows */
const LINE_DISPLAY_ORDER: readonly number[] = [5, 4, 3, 2, 1, 0];

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

  const wilhelmLineText = (lineIndex: number) =>
    primary.lines[(lineIndex + 1) as 1 | 2 | 3 | 4 | 5 | 6]?.text ?? '—';

  const soberPrimary = getSoberJudgementNote(primary.number);
  const soberResulting =
    resulting != null ? getSoberJudgementNote(resulting.number) : '';

  return (
    <div className="interpretation">
      <div className="hexagram-header">
        <p className="hexagram-number-row">
          <span className="hexagram-number-badge" title="King Wen sequence (1–64), same as most I Ching books">
            No. {primary.number}
          </span>
          <span className="hexagram-number-note">
            King Wen order (1–64), same as most I Ching books.
          </span>
        </p>
        <h2>{primary.name}</h2>
        <p className="chinese">{primary.chinese} — {primary.pinyin}</p>
      </div>

      <div className="overview">
        <p className="judgement-text">{primary.judgement}</p>

        {soberPrimary.trim().length > 0 && (
          <div className="plain-read-card">
            <p className="sober-read">{soberPrimary}</p>
          </div>
        )}

        <div className="image-illustration-card">
          <div className="image-block-print-wrap">
            <ImageBlockPrint hexNumber={primary.number} imageText={primary.image} />
          </div>
          <p className="image-description">{primary.image}</p>
        </div>
      </div>

      <div className="lines-section">
        <h3>Lines</h3>
        <p className="lines-hint">
          Top = line 6, bottom = line 1 (same order as the coins and hexagram). Click a line to expand.
        </p>
        <div className="line-details">
          {LINE_DISPLAY_ORDER.map((i) => {
            const val = lines[i];
            return (
              <div
                key={i}
                className={`line-item ${expandedLine === i ? 'expanded' : ''}`}
              >
                <button
                  type="button"
                  className="line-summary"
                  onClick={() => setExpandedLine(expandedLine === i ? null : i)}
                >
                  <span className="line-summary-label">Line {i + 1}</span>
                  <span className="line-type">{LINE_LABELS[val]}</span>
                  {isChanging(val) && <span className="changing-badge">changing</span>}
                </button>
                {expandedLine === i && (
                  <div className="line-expanded">
                    <p className="line-reading">{wilhelmLineText(i)}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {hasChanging && resulting && (
        <div className="resulting-hexagram">
          <h3>Transformation</h3>
          <p className="transformation-intro">
            With changing lines, the situation transforms toward:
          </p>
          <h4>
            <span className="hexagram-number-badge hexagram-number-badge--sm">
              No. {resulting.number}
            </span>{' '}
            {resulting.name}
          </h4>
          <p className="chinese">{resulting.chinese} — {resulting.pinyin}</p>

          <p className="judgement-text">{resulting.judgement}</p>

          {soberResulting.trim().length > 0 && (
            <div className="plain-read-card">
              <p className="sober-read">{soberResulting}</p>
            </div>
          )}

          <div className="image-illustration-card">
            <div className="image-block-print-wrap">
              <ImageBlockPrint hexNumber={resulting.number} imageText={resulting.image} />
            </div>
            <p className="image-description">{resulting.image}</p>
          </div>
        </div>
      )}
    </div>
  );
}
