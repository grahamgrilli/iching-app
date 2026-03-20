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

  const lineValues = lines;
  const primaryBinary = linesToBinary(lineValues);
  const resultingBinary = linesToResultingBinary(lineValues);
  const primaryNum = binaryToHexagramNumber(primaryBinary);
  const resultingNum = binaryToHexagramNumber(resultingBinary);

  const primary = getHexagramByBinary(primaryBinary);
  const resulting =
    primaryNum !== resultingNum
      ? getHexagramByBinary(resultingBinary)
      : null;

  const castAgain = () => setLines([7, 7, 7, 7, 7, 7] as LineValue[]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>I Ching</h1>
        <p className="subtitle">The Book of Changes</p>
      </header>

      <main className="app-main">
        <section className="casting-row">
          <div className="casting-panel coin-panel">
            <CoinInput
              lines={lines}
              onChange={setLines}
              disabled={false}
            />
          </div>
          <div className="casting-panel hex-panel">
            <p className="hex-panel-label">Your hexagram</p>
            <div className="hexagram-panel-inline">
              <HexagramDisplay lines={lineValues} onLineClick={() => {}} />
              <p className="hexagram-unicode">{primary.unicode}</p>
            </div>
            <p className="hex-panel-note">Line 1 = bottom</p>
          </div>
        </section>

        <section className="results-section">
          <Interpretation
            primary={primary}
            resulting={resulting}
            lines={lineValues}
          />
          <button type="button" className="cast-again" onClick={castAgain}>
            Cast again
          </button>
        </section>
      </main>

      <footer className="app-footer">
        <p>Record each toss to match your physical coins. Changing yin shows an ✕ between segments; changing yang shows a ○ on the line.</p>
      </footer>
    </div>
  );
}

export default App;
