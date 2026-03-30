import { useState } from 'react';
import type { LineValue } from '../lib/cast';
import type { HexagramData } from '../data/hexagrams';
import { getTaoistIChingInterpretation, getSoberJudgementNote } from '../data/hexagrams';
import { isChanging } from '../lib/cast';

type TranslationSource = 'wilhelm' | 'taoist';

const LINE_LABELS: Record<LineValue, string> = {
  6: 'Old Yin — Changing',
  7: 'Young Yang (solid)',
  8: 'Young Yin (broken)',
  9: 'Old Yang — Changing',
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
  const [source, setSource] = useState<TranslationSource>('wilhelm');
  const hasChanging = lines.some(isChanging);

  const taoistPrimary = getTaoistIChingInterpretation(primary.number);
  const taoistResulting =
    resulting != null ? getTaoistIChingInterpretation(resulting.number) : undefined;

  const showWilhelm = source === 'wilhelm';
  const judgementText = showWilhelm
    ? primary.judgement
    : (taoistPrimary?.judgement ?? '—');
  const imageText = showWilhelm ? primary.image : (taoistPrimary?.image ?? '—');
  const lineBody = (lineIndex: number) => {
    if (showWilhelm) {
      return primary.lines[(lineIndex + 1) as 1 | 2 | 3 | 4 | 5 | 6]?.text;
    }
    const t = taoistPrimary?.lines?.[String(lineIndex + 1)];
    return t && t.length > 0 ? t : '—';
  };

  const resultingJudgement =
    showWilhelm
      ? resulting?.judgement
      : (taoistResulting?.judgement ?? resulting?.judgement);

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

      <div className="translation-tabs" role="tablist" aria-label="Translation source">
        <button
          type="button"
          role="tab"
          aria-selected={showWilhelm}
          className={`translation-tab ${showWilhelm ? 'active' : ''}`}
          onClick={() => setSource('wilhelm')}
        >
          Wilhelm / Baynes
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={!showWilhelm}
          className={`translation-tab ${!showWilhelm ? 'active' : ''}`}
          onClick={() => setSource('taoist')}
        >
          Taoist I Ching
        </button>
      </div>

      <div className="overview">
        <h3>Judgement</h3>
        <p>{judgementText}</p>
        <h3>Plain read</h3>
        <p className="sober-read">{soberPrimary}</p>
        <h3>Image</h3>
        <p>{imageText}</p>
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
                <div className="line-text">{lineBody(i)}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {hasChanging && resulting && (
        <div className="resulting-hexagram">
          <h3>Transformation</h3>
          <p>With changing lines, the situation transforms toward:</p>
          <h4>
            <span className="hexagram-number-badge hexagram-number-badge--sm">
              No. {resulting.number}
            </span>{' '}
            {resulting.name}
          </h4>
          <p className="chinese">{resulting.chinese} — {resulting.pinyin}</p>
          <p className="judgement">{resultingJudgement}</p>
          {soberResulting && (
            <>
              <h4 className="transformation-subheading">Plain read (resulting)</h4>
              <p className="sober-read">{soberResulting}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
