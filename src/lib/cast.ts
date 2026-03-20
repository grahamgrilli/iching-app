/**
 * I Ching three-coin method (classical scoring)
 * Filled ● = 3 (yang / "heads"), empty ○ = 2 (yin / "tails")
 * Sum: 6 (○○○) = old yin — changing; 7 = one ●; 8 = two ●; 9 (●●●) = old yang — changing
 * For drawing + hexagram binary we treat 7 as yin (broken) and 8 as yang (solid): majority ● → unbroken line.
 */

export type LineValue = 6 | 7 | 8 | 9;
export type LineType = 'old-yin' | 'young-yang' | 'young-yin' | 'old-yang';

export function getLineType(value: LineValue): LineType {
  switch (value) {
    case 6: return 'old-yin';
    case 7: return 'young-yin';
    case 8: return 'young-yang';
    case 9: return 'old-yang';
  }
}

export function isChanging(value: LineValue): boolean {
  return value === 6 || value === 9;
}

/** Number of filled coins (●); each ● = 3, each ○ = 2 */
export function coinsToLine(heads: number): LineValue {
  const tails = 3 - heads;
  const sum = heads * 3 + tails * 2;
  return sum as LineValue;
}

/** Yin/yang for hexagram: 6,7 = yin; 8,9 = yang (matches line drawing: one ● = broken, two ● = solid). */
export function lineToBinary(value: LineValue): 0 | 1 {
  return (value === 8 || value === 9) ? 1 : 0;
}

/** When changing: 6 (old yin) -> yang (1), 9 (old yang) -> yin (0) */
export function changingLineToBinary(value: LineValue): 0 | 1 {
  if (value === 6) return 1; // old yin becomes yang
  if (value === 9) return 0; // old yang becomes yin
  return lineToBinary(value);
}

/** Build 6-digit binary string from bottom to top (line 1 = LSB) */
export function linesToBinary(lines: LineValue[]): string {
  return lines.map(lineToBinary).reverse().join('');
}

/** Build resulting hexagram binary when lines change */
export function linesToResultingBinary(lines: LineValue[]): string {
  return lines.map(changingLineToBinary).reverse().join('');
}

/** Pad binary to 6 digits for lookup (e.g. "111" -> "000111") */
function padBinary(bin: string): string {
  return bin.padStart(6, '0');
}

/** Find hexagram number (1-64) from binary string in King Wen order */
export function binaryToHexagramNumber(binary: string): number {
  const padded = padBinary(binary);
  // King Wen sequence: binary maps to hexagram index
  // Use lookup table - binary is read bottom to top
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
