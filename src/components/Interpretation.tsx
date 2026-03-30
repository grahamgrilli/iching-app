import { useState, type ReactNode } from 'react';
import type { LineValue } from '../lib/cast';
import type { HexagramData } from '../data/hexagrams';
import { getTaoistIChingInterpretation, getSoberJudgementNote } from '../data/hexagrams';
import { isChanging } from '../lib/cast';

const LINE_LABELS: Record<LineValue, string> = {
  6: 'Old Yin — Changing',
  7: 'Young Yang (solid)',
  8: 'Young Yin (broken)',
  9: 'Old Yang — Changing',
};

/** Top to bottom: line 6 … line 1 — matches hexagram drawing and coin rows */
const LINE_DISPLAY_ORDER: readonly number[] = [5, 4, 3, 2, 1, 0];

function TranslationStanza({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="translation-stanza">
      <p className="translation-source">{title}</p>
      <div className="translation-prose">{children}</div>
    </div>
  );
}

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

  const taoistPrimary = getTaoistIChingInterpretation(primary.number);
  const taoistResulting =
    resulting != null ? getTaoistIChingInterpretation(resulting.number) : undefined;

  const taoistJudgement = (t: typeof taoistPrimary) =>
    t?.judgement && t.judgement.trim().length > 0 ? t.judgement : '—';
  const taoistImage = (t: typeof taoistPrimary) =>
    t?.image && t.image.trim().length > 0 ? t.image : '—';

  const wilhelmLineText = (lineIndex: number) =>
    primary.lines[(lineIndex + 1) as 1 | 2 | 3 | 4 | 5 | 6]?.text ?? '—';
  const taoistLineText = (lineIndex: number) => {
    const t = taoistPrimary?.lines?.[String(lineIndex + 1)];
    return t && t.trim().length > 0 ? t : '—';
  };

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
        <h3>Judgement</h3>
        <TranslationStanza title="Wilhelm / Baynes">
          <p>{primary.judgement}</p>
        </TranslationStanza>
        <TranslationStanza title="Taoist I Ching">
          <p>{taoistJudgement(taoistPrimary)}</p>
        </TranslationStanza>

        <h3>Plain read</h3>
        <p className="sober-read">{soberPrimary}</p>

        <h3>Image</h3>
        <p className="image-gloss">
          Each hexagram is drawn as two three-line halves (below and above). The <em>Image</em> names those halves as
          familiar things from nature—water, thunder, mountain, fire, and so on—stacked into one picture (for example
          “water on the mountain”). That picture is a metaphor for what kind of situation this is. The second sentence
          usually begins “Thus the superior man…” and gives practical or moral guidance: what to cultivate, how to act,
          or what to avoid. It’s not a second prediction; it turns the picture into behavior you can try.
        </p>
        <TranslationStanza title="Wilhelm / Baynes">
          <p>{primary.image}</p>
        </TranslationStanza>
        <TranslationStanza title="Taoist I Ching">
          <p>{taoistImage(taoistPrimary)}</p>
        </TranslationStanza>
      </div>

      <div className="lines-section">
        <h3>Lines</h3>
        <p className="lines-hint">
          Top = line 6, bottom = line 1 (same order as the coins and hexagram). Click a line to expand both readings.
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
                    <TranslationStanza title="Wilhelm / Baynes">
                      <p className="line-reading">{wilhelmLineText(i)}</p>
                    </TranslationStanza>
                    <TranslationStanza title="Taoist I Ching">
                      <p className="line-reading">{taoistLineText(i)}</p>
                    </TranslationStanza>
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

          <h4 className="transformation-subheading">Judgement</h4>
          <TranslationStanza title="Wilhelm / Baynes">
            <p>{resulting.judgement}</p>
          </TranslationStanza>
          <TranslationStanza title="Taoist I Ching">
            <p>{taoistJudgement(taoistResulting)}</p>
          </TranslationStanza>

          {soberResulting && (
            <>
              <h4 className="transformation-subheading">Plain read</h4>
              <p className="sober-read">{soberResulting}</p>
            </>
          )}

          <h4 className="transformation-subheading">Image</h4>
          <TranslationStanza title="Wilhelm / Baynes">
            <p>{resulting.image}</p>
          </TranslationStanza>
          <TranslationStanza title="Taoist I Ching">
            <p>{taoistImage(taoistResulting)}</p>
          </TranslationStanza>
        </div>
      )}
    </div>
  );
}
