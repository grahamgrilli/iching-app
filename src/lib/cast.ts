/**
 * I Ching three-coin method
 * Each ● (heads) = 2, each ○ (tails) = 3 — so “more heads → yang”, “more tails → yin”, matching common intuition.
 * 6 = ●●● old yin (changing) · 7 = ●●○ young yang · 8 = ●○○ young yin · 9 = ○○○ old yang (changing)
 * Line type for hexagram: 7 and 9 = yang (solid); 6 and 8 = yin (broken) — matches Wilhelm / King Wen lookup.
 *
 * Note: Some books use ●=3, ○=2 instead; that inverts which toss (2H vs 2T) gives 7 vs 8. We use ●=2, ○=3 here.
 */

export type LineValue = 6 | 7 | 8 | 9;
export type LineType = 'old-yin' | 'young-yang' | 'young-yin' | 'old-yang';

export function getLineType(value: LineValue): LineType {
  switch (value) {
    case 6: return 'old-yin';
    case 7: return 'young-yang';
    case 8: return 'young-yin';
    case 9: return 'old-yang';
  }
}

export function isChanging(value: LineValue): boolean {
  return value === 6 || value === 9;
}

/** Number of heads (●); each ● = 2, each ○ = 3 → sum 6–9 */
export function coinsToLine(heads: number): LineValue {
  const tails = 3 - heads;
  const sum = heads * 2 + tails * 3;
  return sum as LineValue;
}

/** Classical yin/yang bit: 6,8 yin; 7,9 yang */
export function lineToBinary(value: LineValue): 0 | 1 {
  return (value === 7 || value === 9) ? 1 : 0;
}

/** When changing: 6 → yang; 9 → yin */
export function changingLineToBinary(value: LineValue): 0 | 1 {
  if (value === 6) return 1;
  if (value === 9) return 0;
  return lineToBinary(value);
}

export function linesToBinary(lines: LineValue[]): string {
  return lines.map(lineToBinary).reverse().join('');
}

export function linesToResultingBinary(lines: LineValue[]): string {
  return lines.map(changingLineToBinary).reverse().join('');
}

function padBinary(bin: string): string {
  return bin.padStart(6, '0');
}

export function binaryToHexagramNumber(binary: string): number {
  const padded = padBinary(binary);
  const kingWenOrder: Record<string, number> = {
    '111111': 1, '000000': 2, '010001': 3, '100010': 4, '010111': 5, '111010': 6,
    '000010': 7, '010000': 8, '110111': 9, '111011': 10, '000111': 11, '111000': 12,
    '111101': 13, '101111': 14, '000100': 15, '001000': 16, '011001': 17, '100110': 18,
    '000011': 19, '110000': 20, '101001': 21, '100101': 22, '100000': 23, '000001': 24,
    '111001': 25, '100111': 26, '100001': 27, '011110': 28, '010010': 29, '101101': 30,
    '011100': 31, '001110': 32, '111100': 33, '001111': 34, '101000': 35, '000101': 36,
    '110101': 37, '101011': 38, '010100': 39, '001010': 40, '100011': 41, '110001': 42,
    '011111': 43, '111110': 44, '011000': 45, '000110': 46, '011010': 47, '010110': 48,
    '011101': 49, '101110': 50, '001001': 51, '100100': 52, '110100': 53, '001011': 54,
    '001101': 55, '101100': 56, '110110': 57, '011011': 58, '110010': 59, '010011': 60,
    '110011': 61, '001100': 62, '010101': 63, '101010': 64,
  };
  return kingWenOrder[padded] ?? 1;
}
