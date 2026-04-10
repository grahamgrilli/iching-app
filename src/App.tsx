import { useState } from 'react';
import CoinInput from './components/CoinInput';
import HexagramDisplay from './components/HexagramDisplay';
import Interpretation from './components/Interpretation';
import type { LineSlot, LineValue } from './lib/cast';
import {
  castIsComplete,
  linesToBinaryIfComplete,
  linesToResultingBinary,
  binaryToHexagramNumber,
} from './lib/cast';
import { getHexagramByBinary } from './data/hexagrams';
import CrackBackdrop from './components/CrackBackdrop';
import './App.css';

function blankCast(): LineSlot[] {
  return [null, null, null, null, null, null];
}

function App() {
  const [lines, setLines] = useState<LineSlot[]>(blankCast);

  const complete = castIsComplete(lines);
  const lineValues = lines as LineValue[];
  const primaryBinary = linesToBinaryIfComplete(lines);
  const resultingBinary = complete ? linesToResultingBinary(lineValues) : null;

  const primaryNum =
    primaryBinary != null ? binaryToHexagramNumber(primaryBinary) : null;
  const resultingNum =
    resultingBinary != null ? binaryToHexagramNumber(resultingBinary) : null;

  const primary =
    primaryBinary != null ? getHexagramByBinary(primaryBinary) : null;
  const resulting =
    complete &&
    primaryNum != null &&
    resultingNum != null &&
    primaryNum !== resultingNum
      ? getHexagramByBinary(resultingBinary!)
      : null;

  const castAgain = () => setLines(blankCast());

  return (
    <div className="app">
      <CrackBackdrop />
      <div className="app-shade" aria-hidden />
      <header className="app-header">
        <h1 className="app-title">The Book of Changes</h1>
      </header>

      <main className="app-main">
        <div className="layout-stack">
          <section className="casting-block" aria-label="Record your tosses">
            <div className="casting-panel coin-panel">
              <CoinInput lines={lines} onChange={setLines} disabled={false} />
            </div>
            <aside className="casting-panel hex-panel hex-panel--aside" aria-label="Your hexagram">
              <p className="hex-panel-label">Your hexagram</p>
              <div className="hexagram-panel-inline">
                <HexagramDisplay lines={lines} onLineClick={() => {}} />
                {complete && primary ? (
                  <>
                    <p className="hexagram-unicode">{primary.unicode}</p>
                    <p className="hex-panel-number" title="King Wen order (1–64)">
                      No. {primary.number}
                    </p>
                  </>
                ) : (
                  <p className="hex-panel-pending">Set all six lines to see the figure</p>
                )}
              </div>
              <p className="hex-panel-note">Line 1 = bottom</p>
            </aside>
          </section>

          <section className="results-section">
            {complete && primary ? (
              <>
                <Interpretation
                  primary={primary}
                  resulting={resulting}
                  lines={lineValues}
                />
                <button type="button" className="cast-again" onClick={castAgain}>
                  Cast again
                </button>
              </>
            ) : (
              <div className="interpretation interpretation--pending">
                <p className="interpretation-pending-text">
                  Fill in every row (three coins each, bottom to top). Your hexagram and reading show up here
                  when the cast is complete.
                </p>
                <button type="button" className="cast-again cast-again--secondary" onClick={castAgain}>
                  Clear all rows
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>Record each toss to match your physical coins. Changing yin shows an ✕ between segments; changing yang shows a ○ on the line.</p>
      </footer>
    </div>
  );
}

export default App;
