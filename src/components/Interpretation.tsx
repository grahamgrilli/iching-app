import { useState, type ReactNode } from 'react';
import type { LineValue } from '../lib/cast';
import type { HexagramData } from '../data/hexagrams';
import { getSoberJudgementNote } from '../data/hexagrams';
import { isChanging } from '../lib/cast';
import ImageBlockPrint from './ImageBlockPrint';

const LINE_LABELS: Record<LineValue, string> = {
  6: 'Changing yin',
  7: 'Young yang (solid)',
  8: 'Young yin (broken)',
  9: 'Changing yang',
};

/** Top to bottom: line 6 … line 1 — matches hexagram drawing and coin rows */
const LINE_DISPLAY_ORDER: readonly number[] = [5, 4, 3, 2, 1, 0];

const POSITION_CONTEXT: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
  1: 'you are just entering this situation',
  2: 'you are in the thick of it and need steadiness',
  3: 'friction is rising and choices have consequences',
  4: 'you are near a turning point',
  5: 'you carry influence and responsibility',
  6: 'this pattern has reached an extreme',
};

const GLOSSARY: Array<{ term: string; plain: string }> = [
  { term: 'perseverance', plain: 'steady effort over time' },
  { term: 'good fortune', plain: 'likely positive outcome if you stay aligned' },
  { term: 'misfortune', plain: 'likely setback unless you adjust' },
  { term: 'cross the great water', plain: 'take a major step or transition' },
  { term: 'superior man', plain: 'your wisest, most disciplined self' },
  { term: 'no blame', plain: 'you are not out of alignment here' },
];

function adviceFromNote(note: string): { doNow: string; avoidNow: string; watchFor: string } {
  const n = note.toLowerCase();

  if (/(danger|risk|opposition|conflict|obstruction|strain|oppression)/.test(n)) {
    return {
      doNow: 'Reduce exposure and make one careful move at a time.',
      avoidNow: 'Escalating pressure just to feel in control.',
      watchFor: 'Reactive decisions made from fear or urgency.',
    };
  }

  if (/(waiting|patience|gradual|step by step|small|timing)/.test(n)) {
    return {
      doNow: 'Work the next smallest clear step and let momentum build.',
      avoidNow: 'Forcing a big leap before conditions are ready.',
      watchFor: 'Impatience disguised as “decisiveness.”',
    };
  }

  if (/(family|alliance|fellowship|gathering|group|household)/.test(n)) {
    return {
      doNow: 'Clarify roles and align around one shared priority.',
      avoidNow: 'Assuming agreement without explicit communication.',
      watchFor: 'Silent resentments, split commitments, or mixed loyalties.',
    };
  }

  if (/(abundance|increase|advance|progress|strength|creative)/.test(n)) {
    return {
      doNow: 'Channel energy into one meaningful priority and execute cleanly.',
      avoidNow: 'Overreaching because momentum feels strong.',
      watchFor: 'Ego growth outpacing practical capacity.',
    };
  }

  return {
    doNow: 'Choose one grounded action and follow through with consistency.',
    avoidNow: 'Trying to solve everything at once.',
    watchFor: 'Losing clarity through overthinking or scattered effort.',
  };
}

function lineIfThen(lineText: string, lineNumber: 1 | 2 | 3 | 4 | 5 | 6): { ifText: string; thenText: string } {
  const cleaned = lineText.replace(/\s+/g, ' ').trim();
  const low = cleaned.toLowerCase();

  let thenText = 'then take one measured step and keep your integrity.';
  if (/(misfortune|danger|humiliation|blame|regret|pitfall)/.test(low)) {
    thenText = 'then slow down, reduce risk, and adjust course before acting further.';
  } else if (/(good fortune|success|no blame|favorable)/.test(low)) {
    thenText = 'then continue steadily and avoid overextending what is already working.';
  } else if (/perseverance/.test(low)) {
    thenText = 'then hold a disciplined rhythm rather than forcing a quick result.';
  }

  return {
    ifText: `If ${POSITION_CONTEXT[lineNumber]},`,
    thenText,
  };
}

function withGlossary(text: string): ReactNode {
  const escapedTerms = GLOSSARY.map((g) => g.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const rx = new RegExp(`\\b(${escapedTerms.join('|')})\\b`, 'gi');
  const parts = text.split(rx);

  return parts.map((part, idx) => {
    const item = GLOSSARY.find((g) => g.term.toLowerCase() === part.toLowerCase());
    if (!item) return <span key={idx}>{part}</span>;
    return (
      <span key={idx} className="glossary-term" title={item.plain}>
        {part}
      </span>
    );
  });
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
  const [showTransformation, setShowTransformation] = useState(false);
  const hasChanging = lines.some(isChanging);

  const wilhelmLineText = (lineIndex: number) =>
    primary.lines[(lineIndex + 1) as 1 | 2 | 3 | 4 | 5 | 6]?.text ?? '—';

  const soberPrimary = getSoberJudgementNote(primary.number);
  const soberResulting =
    resulting != null ? getSoberJudgementNote(resulting.number) : '';
  const practical = adviceFromNote(soberPrimary);
  const changingLineIndices = LINE_DISPLAY_ORDER.filter((i) => isChanging(lines[i]));

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
        <h3>Plain meaning</h3>
        <p className="judgement-text">{withGlossary(soberPrimary)}</p>

        <h3>Practical advice</h3>
        <div className="practical-grid">
          <div className="practical-card">
            <p className="practical-label">Do now</p>
            <p>{withGlossary(practical.doNow)}</p>
          </div>
          <div className="practical-card">
            <p className="practical-label">Avoid now</p>
            <p>{withGlossary(practical.avoidNow)}</p>
          </div>
          <div className="practical-card">
            <p className="practical-label">Watch for</p>
            <p>{withGlossary(practical.watchFor)}</p>
          </div>
        </div>

        <div className="image-illustration-card">
          <div className="image-block-print-wrap">
            <ImageBlockPrint hexNumber={primary.number} imageText={primary.image} />
          </div>
          <p className="image-description">{primary.image}</p>
        </div>
      </div>

      <div className="lines-section">
        <h3>Changing lines</h3>
        <p className="lines-hint">
          Only changing lines are shown here. Top = line 6, bottom = line 1.
        </p>
        <div className="line-details">
          {changingLineIndices.map((i) => {
            const val = lines[i];
            const lineNum = (i + 1) as 1 | 2 | 3 | 4 | 5 | 6;
            const mapped = lineIfThen(wilhelmLineText(i), lineNum);
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
                    <p className="line-reading">
                      <strong>{mapped.ifText}</strong> {mapped.thenText}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
          {changingLineIndices.length === 0 && (
            <p className="lines-hint">
              No changing lines this cast, so the plain meaning and practical advice are your main read.
            </p>
          )}
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
          <p className="chinese">{resulting.chinese} - {resulting.pinyin}</p>

          {!showTransformation ? (
            <button
              type="button"
              className="reveal-button"
              onClick={() => setShowTransformation(true)}
            >
              Read transformation
            </button>
          ) : (
            <div className="transformation-body">
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
      )}

      <details className="original-text-panel">
        <summary>Show original text</summary>
        <div className="original-text-body">
          <h4>Primary: No. {primary.number} {primary.name}</h4>
          <p className="judgement-text">{primary.judgement}</p>
          <p className="image-description">{primary.image}</p>
          <div className="original-lines">
            {LINE_DISPLAY_ORDER.map((i) => (
              <p key={`primary-line-${i}`}>
                <strong>Line {i + 1}:</strong> {wilhelmLineText(i)}
              </p>
            ))}
          </div>

          {resulting && (
            <>
              <h4>Transformation: No. {resulting.number} {resulting.name}</h4>
              <p className="judgement-text">{resulting.judgement}</p>
              <p className="image-description">{resulting.image}</p>
              <div className="original-lines">
                {LINE_DISPLAY_ORDER.map((i) => (
                  <p key={`resulting-line-${i}`}>
                    <strong>Line {i + 1}:</strong> {resulting.lines[(i + 1) as 1 | 2 | 3 | 4 | 5 | 6]?.text ?? '—'}
                  </p>
                ))}
              </div>
            </>
          )}
        </div>
      </details>
    </div>
  );
}
