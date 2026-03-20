import { useState } from 'react';
import CoinInput from './components/CoinInput';
import HexagramDisplay from './components/HexagramDisplay';
import Interpretation from './components/Interpretation';
import type { LineValue } from './lib/cast';
import {
  linesToBinary,
  linesToResultingBinary,
  binaryToHexagramNumber,
} from './lib/cast';
import { getHexagramByBinary } from './data/hexagrams';
import './App.css';

function App() {
  const [lines, setLines] = useState<LineValue[]>(
    [7, 7, 7, 7, 7, 7] as LineValue[]
  );

  const complete = true; // All 6 lines always have a value; user toggles to match their roll
  const lineValues = lines;
  const primaryBinary = complete ? linesToBinary(lineValues) : '';
  const resultingBinary = complete ? linesToResultingBinary(lineValues) : '';
  const primaryNum = complete ? binaryToHexagramNumber(primaryBinary) : 0;
  const resultingNum = complete ? binaryToHexagramNumber(resultingBinary) : 0;

  const primary = complete ? getHexagramByBinary(primaryBinary) : null;
  const resulting =
    complete && primaryNum !== resultingNum
      ? getHexagramByBinary(resultingBinary)
      : null;

  const castAnother = () => setLines([7, 7, 7, 7, 7, 7] as LineValue[]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>I Ching</h1>
        <p className="subtitle">The Book of Changes</p>
      </header>

      <main className="app-main">
        <section className="casting-section">
          <CoinInput
            lines={lines}
            onChange={setLines}
            disabled={false}
          />
        </section>

        {complete && primary && (
          <section className="results-section">
            <div className="hexagram-panel">
              <HexagramDisplay
                lines={lineValues}
                onLineClick={() => {}}
              />
              <p className="hexagram-unicode">{primary.unicode}</p>
            </div>
            <Interpretation
              primary={primary}
              resulting={resulting}
              lines={lineValues}
            />
            <button type="button" className="cast-again" onClick={castAnother}>
              Cast again
            </button>
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>Focus on your question. Record each coin toss from bottom to top.</p>
      </footer>
    </div>
  );
}

export default App;
