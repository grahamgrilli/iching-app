import { useState } from 'react';
import type { LineValue } from '../lib/cast';
import type { HexagramData } from '../data/hexagrams';
import { getTaoistIChingInterpretation } from '../data/hexagrams';
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

  return (
    <div className="interpretation">
      <div className="hexagram-header">
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
      {!showWilhelm && (
        <p className="translation-note">
          Taoist-oriented notes in the spirit of Liu Yiming’s commentary (Thomas Cleary’s English in{' '}
          <em>The Taoist I Ching</em> is not reproduced here for copyright reasons). Edit{' '}
          <code className="inline-code">src/data/clearyInterpretations.json</code> to replace with your
          own or licensed excerpts.
        </p>
      )}

      <div className="overview">
        <h3>Judgement</h3>
        <p>{judgementText}</p>
        <h3>Image</h3>
        <p>{imageText}</p>
      </div>

      <div className="lines-section">
        <h3>Lines</h3>
        <p className="lines-hint">
          {showWilhelm
            ? 'Click a line to see its interpretation'
            : 'Click a line to see the Taoist-style line note'}
        </p>
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
          <h4>{resulting.name}</h4>
          <p className="chinese">{resulting.chinese} — {resulting.pinyin}</p>
          <p className="judgement">{resultingJudgement}</p>
        </div>
      )}

      <p className="attribution">
        {showWilhelm
          ? 'Judgement and Image are shortened Wilhelm/Baynes. Line texts are the full Wilhelm/Baynes translation per line. Three-coin totals use ●=2 and ○=3 so two heads gives young yang (7) and two tails gives young yin (8), matching most physical toss intuition; hexagram lookup matches King Wen order.'
          : 'Taoist I Ching tab uses bundled original summaries (not Cleary’s published wording). Wilhelm/Baynes remains available on the first tab.'}
      </p>
    </div>
  );
}
