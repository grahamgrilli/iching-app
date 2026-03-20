/**
 * I Ching hexagram data - 64 hexagrams in King Wen order
 * Judgement/Image: condensed Wilhelm-Baynes; line texts: full Wilhelm from iching-wilhelm-dataset (MIT)
 */

import wilhelmLines from './wilhelmLines.json';
import clearyInterpretations from './clearyInterpretations.json';
import soberJudgementNotes from './soberJudgementNotes.json';

export interface HexagramData {
  number: number;
  binary: string;
  unicode: string;
  name: string;
  chinese: string;
  pinyin: string;
  judgement: string;
  image: string;
  lines: Record<1 | 2 | 3 | 4 | 5 | 6, { text: string; comment?: string }>;
}

/** Taoist-oriented text (see README: not Thomas Cleary’s copyrighted book) */
export interface TaoistInterpretationBlock {
  judgement: string;
  image: string;
  lines: Record<string, string>;
}

type ClearyFile = Record<string, TaoistInterpretationBlock>;

const clearyByHex = clearyInterpretations as ClearyFile;

// Full hexagram database - truncated for brevity; will include key hexagrams
// Source: Wilhelm/Baynes (iching-wilhelm-dataset, MIT)
const HEXAGRAMS: Omit<HexagramData, 'lines'>[] = [
  { number: 1, binary: '111111', unicode: '䷀', name: 'The Creative', chinese: '乾', pinyin: 'qián', judgement: 'THE CREATIVE works sublime success, furthering through perseverance.', image: 'The movement of heaven is full of power. Thus the superior man makes himself strong and untiring.' },
  { number: 2, binary: '000000', unicode: '䷁', name: 'The Receptive', chinese: '坤', pinyin: 'kūn', judgement: 'THE RECEPTIVE brings about sublime success, furthering through the perseverance of a mare.', image: "The earth's condition is receptive devotion. Thus the superior man who has breadth of character carries the outer world." },
  { number: 3, binary: '010001', unicode: '䷂', name: 'Difficulty at the Beginning', chinese: '屯', pinyin: 'zhūn', judgement: 'DIFFICULTY AT THE BEGINNING works supreme success, furthering through perseverance.', image: 'Clouds and thunder: the image of DIFFICULTY AT THE BEGINNING. Thus the superior man brings order out of confusion.' },
  { number: 4, binary: '100010', unicode: '䷃', name: 'Youthful Folly', chinese: '蒙', pinyin: 'méng', judgement: 'YOUTHFUL FOLLY has success. It is not I who seek the young fool; the young fool seeks me.', image: 'A spring wells up at the foot of the mountain: the image of YOUTH. Thus the superior man fosters his character by thoroughness in all that he does.' },
  { number: 5, binary: '010111', unicode: '䷄', name: 'Waiting', chinese: '需', pinyin: 'xū', judgement: 'WAITING. If you are sincere, you have light and success. Perseverance brings good fortune.', image: 'Clouds rise up to heaven: the image of WAITING. Thus the superior man eats and drinks, is joyous and of good cheer.' },
  { number: 6, binary: '111010', unicode: '䷅', name: 'Conflict', chinese: '訟', pinyin: 'sòng', judgement: 'CONFLICT. You are sincere and are being obstructed. A cautious halt halfway brings good fortune.', image: 'Heaven and water go their opposite ways: the image of CONFLICT. Thus in all his transactions the superior man carefully considers the beginning.' },
  { number: 7, binary: '000010', unicode: '䷆', name: 'The Army', chinese: '師', pinyin: 'shī', judgement: 'THE ARMY needs perseverance and a strong man. Good fortune without blame.', image: 'In the middle of the earth is water: the image of THE ARMY. Thus the superior man increases his masses by generosity toward the people.' },
  { number: 8, binary: '010000', unicode: '䷇', name: 'Holding Together', chinese: '比', pinyin: 'bǐ', judgement: 'HOLDING TOGETHER brings good fortune. Inquire of the oracle once again whether you possess sublimity.', image: 'On the earth is water: the image of HOLDING TOGETHER. Thus the kings of old bestowed the different states as fiefs and cultivated friendly relations with the feudal lords.' },
  { number: 9, binary: '110111', unicode: '䷈', name: 'The Taming Power of the Small', chinese: '小畜', pinyin: 'xiǎo chù', judgement: 'THE TAMING POWER OF THE SMALL has success. Dense clouds, no rain from our western region.', image: 'The wind drives across heaven: the image of THE TAMING POWER OF THE SMALL. Thus the superior man refines the outward aspect of his nature.' },
  { number: 10, binary: '111011', unicode: '䷉', name: 'Treading', chinese: '履', pinyin: 'lǚ', judgement: 'TREADING. Treading upon the tail of the tiger. It does not bite the man. Success.', image: 'Heaven above, the lake below: the image of TREADING. Thus the superior man discriminates between high and low, and thereby fortifies the thinking of the people.' },
  { number: 11, binary: '000111', unicode: '䷊', name: 'Peace', chinese: '泰', pinyin: 'tài', judgement: 'PEACE. The small departs, the great approaches. Good fortune. Success.', image: 'Heaven and earth unite: the image of PEACE. Thus the ruler divides and completes the course of heaven and earth, and so aids the people.' },
  { number: 12, binary: '111000', unicode: '䷋', name: 'Standstill', chinese: '否', pinyin: 'pǐ', judgement: 'STANDSTILL. Evil people do not further the perseverance of the superior man. The great departs; the small approaches.', image: "Heaven and earth do not unite: the image of STANDSTILL. Thus the superior man falls back upon his inner worth in order to escape difficulties." },
  { number: 13, binary: '111101', unicode: '䷌', name: 'Fellowship with Men', chinese: '同人', pinyin: 'tóng rén', judgement: 'FELLOWSHIP WITH MEN in the open. Success. It furthers one to cross the great water.', image: 'Heaven together with fire: the image of FELLOWSHIP WITH MEN. Thus the superior man organizes the clans and makes distinctions between things.' },
  { number: 14, binary: '101111', unicode: '䷍', name: 'Possession in Great Measure', chinese: '大有', pinyin: 'dà yǒu', judgement: 'POSSESSION IN GREAT MEASURE. Supreme success.', image: 'Fire in heaven above: the image of POSSESSION IN GREAT MEASURE. Thus the superior man curbs evil and furthers good, and thereby obeys the benevolent will of heaven.' },
  { number: 15, binary: '000100', unicode: '䷎', name: 'Modesty', chinese: '謙', pinyin: 'qiān', judgement: 'MODESTY creates success. The superior man carries things through.', image: 'Within the earth, a mountain: the image of MODESTY. Thus the superior man reduces that which is too much, and augments that which is too little.' },
  { number: 16, binary: '001000', unicode: '䷏', name: 'Enthusiasm', chinese: '豫', pinyin: 'yù', judgement: 'ENTHUSIASM. It furthers one to install helpers and to set armies marching.', image: 'Thunder comes resounding out of the earth: the image of ENTHUSIASM. Thus the ancient kings made music in order to honor merit.' },
  { number: 17, binary: '011001', unicode: '䷐', name: 'Following', chinese: '隨', pinyin: 'suí', judgement: 'FOLLOWING has supreme success. Perseverance furthers. No blame.', image: 'Thunder in the middle of the lake: the image of FOLLOWING. Thus the superior man at nightfall goes indoors for rest and recuperation.' },
  { number: 18, binary: '100110', unicode: '䷑', name: 'Work on What Has Been Spoiled', chinese: '蠱', pinyin: 'gǔ', judgement: 'WORK ON WHAT HAS BEEN SPOILED has supreme success. It furthers one to cross the great water.', image: 'The wind blows low on the mountain: the image of DECAY. Thus the superior man stirs up the people and strengthens their spirit.' },
  { number: 19, binary: '000011', unicode: '䷒', name: 'Approach', chinese: '臨', pinyin: 'lín', judgement: 'APPROACH has supreme success. Perseverance furthers. When the eighth month comes, there will be misfortune.', image: 'The earth above the lake: the image of APPROACH. Thus the superior man is inexhaustible in his will to teach, and without limits in his tolerance and protection of the people.' },
  { number: 20, binary: '110000', unicode: '䷓', name: 'Contemplation', chinese: '觀', pinyin: 'guān', judgement: 'CONTEMPLATION. The ablution has been made, but not yet the offering. Full of trust they look up to him.', image: 'The wind blows over the earth: the image of CONTEMPLATION. Thus the kings of old visited the regions of the world, contemplated the people, and gave them instruction.' },
  { number: 21, binary: '101001', unicode: '䷔', name: 'Biting Through', chinese: '噬嗑', pinyin: 'shì kè', judgement: 'BITING THROUGH has success. It is favorable to let justice be administered.', image: 'Thunder and lightning: the image of BITING THROUGH. Thus the kings of former times made firm the laws through clearly defined penalties.' },
  { number: 22, binary: '100101', unicode: '䷕', name: 'Grace', chinese: '賁', pinyin: 'bì', judgement: 'GRACE has success. In small matters it is favorable to undertake something.', image: 'At the foot of the mountain, a fire: the image of GRACE. Thus does the superior man proceed when clearing up current affairs.' },
  { number: 23, binary: '100000', unicode: '䷖', name: 'Splitting Apart', chinese: '剝', pinyin: 'bō', judgement: 'SPLITTING APART. It does not further one to go anywhere.', image: 'The mountain rests on the earth: the image of SPLITTING APART. Thus those above can ensure their position only by giving generously to those below.' },
  { number: 24, binary: '000001', unicode: '䷗', name: 'Return', chinese: '復', pinyin: 'fù', judgement: 'RETURN. Success. Going out and coming in without error. Friends come without blame.', image: 'Thunder within the earth: the image of THE TURNING POINT. Thus the kings of old closed the passes at the time of solstice.' },
  { number: 25, binary: '111001', unicode: '䷘', name: 'Innocence', chinese: '無妄', pinyin: 'wú wàng', judgement: 'INNOCENCE. Supreme success. Perseverance furthers. If someone is not as he should be, he has misfortune.', image: 'Under heaven thunder rolls: All things attain the natural state of innocence. Thus the kings of old, in rich abundance, fostered and nourished all beings.' },
  { number: 26, binary: '100111', unicode: '䷙', name: 'The Taming Power of the Great', chinese: '大畜', pinyin: 'dà chù', judgement: 'THE TAMING POWER OF THE GREAT. Perseverance furthers. Not eating at home brings good fortune.', image: 'Heaven within the mountain: the image of THE TAMING POWER OF THE GREAT. Thus the superior man learns many sayings of antiquity and many deeds of the past.' },
  { number: 27, binary: '100001', unicode: '䷚', name: 'The Corners of the Mouth', chinese: '頤', pinyin: 'yí', judgement: 'THE CORNERS OF THE MOUTH. Perseverance brings good fortune. Pay heed to the providing of nourishment.', image: 'At the foot of the mountain, thunder: the image of PROVIDING NOURISHMENT. Thus the superior man is careful of his words and temperate in eating and drinking.' },
  { number: 28, binary: '011110', unicode: '䷛', name: 'Preponderance of the Great', chinese: '大過', pinyin: 'dà guò', judgement: 'PREPONDERANCE OF THE GREAT. The ridgepole sags to the breaking point. It furthers one to have somewhere to go. Success.', image: 'The lake rises above the trees: the image of PREPONDERANCE OF THE GREAT. Thus the superior man, when he stands alone, is unconcerned, and if he has to renounce the world, he is undaunted.' },
  { number: 29, binary: '010010', unicode: '䷜', name: 'The Abysmal', chinese: '坎', pinyin: 'kǎn', judgement: 'THE ABYSMAL repeated. If you are sincere, you have success in your heart, and whatever you do succeeds.', image: 'Water flows on uninterruptedly and reaches its goal: the image of the Abysmal repeated. Thus the superior man walks in lasting virtue and carries on the business of teaching.' },
  { number: 30, binary: '101101', unicode: '䷝', name: 'The Clinging', chinese: '離', pinyin: 'lí', judgement: 'THE CLINGING. Perseverance furthers. It brings success. Care of the cow brings good fortune.', image: 'That which is bright rises twice: the image of FIRE. Thus the great man, by perpetuating this brightness, illumines the four quarters of the world.' },
  { number: 31, binary: '011100', unicode: '䷞', name: 'Influence', chinese: '咸', pinyin: 'xián', judgement: 'INFLUENCE. Success. Perseverance furthers. To take a maiden to wife brings good fortune.', image: 'A lake on the mountain: the image of INFLUENCE. Thus the superior man encourages people to approach him by his readiness to receive them.' },
  { number: 32, binary: '001110', unicode: '䷟', name: 'Duration', chinese: '恆', pinyin: 'héng', judgement: 'DURATION. Success. No blame. Perseverance furthers. It furthers one to have somewhere to go.', image: 'Thunder and wind: the image of DURATION. Thus the superior man stands firm and does not change his direction.' },
  { number: 33, binary: '111100', unicode: '䷠', name: 'Retreat', chinese: '遯', pinyin: 'dùn', judgement: 'RETREAT. Success. In small matters perseverance furthers.', image: 'Mountain under heaven: the image of RETREAT. Thus the superior man keeps the inferior man at a distance, not angrily but with reserve.' },
  { number: 34, binary: '001111', unicode: '䷡', name: 'The Power of the Great', chinese: '大壯', pinyin: 'dà zhuàng', judgement: 'THE POWER OF THE GREAT. Perseverance furthers.', image: 'Thunder in heaven above: the image of THE POWER OF THE GREAT. Thus the superior man does not tread upon paths that do not accord with established order.' },
  { number: 35, binary: '101000', unicode: '䷢', name: 'Progress', chinese: '晉', pinyin: 'jìn', judgement: 'PROGRESS. The powerful prince is honored with horses in large numbers. In a single day he is granted audience three times.', image: 'The sun rises over the earth: the image of PROGRESS. Thus the superior man himself brightens his bright virtue.' },
  { number: 36, binary: '000101', unicode: '䷣', name: 'Darkening of the Light', chinese: '明夷', pinyin: 'míng yí', judgement: 'DARKENING OF THE LIGHT. In adversity it furthers one to be persevering.', image: 'The light has sunk into the earth: the image of DARKENING OF THE LIGHT. Thus the superior man lives with the great dark: he veils his light.' },
  { number: 37, binary: '110101', unicode: '䷤', name: 'The Family', chinese: '家人', pinyin: 'jiā rén', judgement: 'THE FAMILY. Perseverance furthers.', image: 'Wind comes forth from fire: the image of THE FAMILY. Thus the superior man has substance in his words and duration in his way of life.' },
  { number: 38, binary: '101011', unicode: '䷥', name: 'Opposition', chinese: '睽', pinyin: 'kuí', judgement: 'OPPOSITION. In small matters, good fortune.', image: 'Above, fire; below, the lake: the image of OPPOSITION. Thus the superior man, in his way of life, seeks harmony but not uniformity.' },
  { number: 39, binary: '010100', unicode: '䷦', name: 'Obstruction', chinese: '蹇', pinyin: 'jiǎn', judgement: 'OBSTRUCTION. The southwest furthers. The northeast does not further. It furthers one to see the great man. Perseverance brings good fortune.', image: 'Water on the mountain: the image of OBSTRUCTION. Thus the superior man turns his attention to himself and molds his character.' },
  { number: 40, binary: '001010', unicode: '䷧', name: 'Deliverance', chinese: '解', pinyin: 'xiè', judgement: 'DELIVERANCE. The southwest furthers. If there is no longer a place where one has to go, return brings good fortune.', image: 'Thunder and rain set in: the image of DELIVERANCE. Thus the superior man pardons sins and forgives misdeeds.' },
  { number: 41, binary: '100011', unicode: '䷨', name: 'Decrease', chinese: '損', pinyin: 'sǔn', judgement: 'DECREASE combined with sincerity brings about supreme success without blame.', image: 'At the foot of the mountain, the lake: the image of DECREASE. Thus the superior man controls his anger and restrains his instincts.' },
  { number: 42, binary: '110001', unicode: '䷩', name: 'Increase', chinese: '益', pinyin: 'yì', judgement: 'INCREASE. It furthers one to undertake something. It furthers one to cross the great water.', image: 'Wind and thunder: the image of INCREASE. Thus the superior man: when he sees good, he imitates it; when he has faults, he rids himself of them.' },
  { number: 43, binary: '011111', unicode: '䷪', name: 'Break-through', chinese: '夬', pinyin: 'guài', judgement: 'BREAK-THROUGH. One must resolutely make the matter known at the court of the king. It must be announced truthfully. Danger.', image: 'The lake has risen up to heaven: the image of BREAK-THROUGH. Thus the superior man dispenses riches downward and refrains from resting on his virtue.' },
  { number: 44, binary: '111110', unicode: '䷫', name: 'Coming to Meet', chinese: '姤', pinyin: 'gòu', judgement: 'COMING TO MEET. The maiden is powerful. One should not marry such a maiden.', image: 'Under heaven, wind: the image of COMING TO MEET. Thus the king issues his commands and proclaims them to the four quarters of heaven.' },
  { number: 45, binary: '011000', unicode: '䷬', name: 'Gathering Together', chinese: '萃', pinyin: 'cuì', judgement: 'GATHERING TOGETHER. Success. The king approaches his temple. It furthers one to see the great man.', image: 'The lake rises up to heaven: the image of GATHERING TOGETHER. Thus the superior man renews his weapons in order to meet the unforeseen.' },
  { number: 46, binary: '000110', unicode: '䷭', name: 'Pushing Upward', chinese: '升', pinyin: 'shēng', judgement: 'PUSHING UPWARD has supreme success. One must see the great man. Fear not. Departure toward the south brings good fortune.', image: 'Within the earth, wood grows: the image of PUSHING UPWARD. Thus the superior man of devoted character heaps up small things in order to achieve something high and great.' },
  { number: 47, binary: '011010', unicode: '䷮', name: 'Oppression', chinese: '困', pinyin: 'kùn', judgement: 'OPPRESSION. Success. Perseverance. The great man brings good fortune. No blame. When one has something to say, it is not believed.', image: 'There is no water in the lake: the image of OPPRESSION. Thus the superior man stakes his life in order to carry out his will.' },
  { number: 48, binary: '010110', unicode: '䷯', name: 'The Well', chinese: '井', pinyin: 'jǐng', judgement: 'THE WELL. The town may be changed, but the well cannot be changed. It neither decreases nor increases.', image: 'Water over wood: the image of THE WELL. Thus the superior man encourages the people at their work, and exhorts them to help one another.' },
  { number: 49, binary: '011101', unicode: '䷰', name: 'Revolution', chinese: '革', pinyin: 'gé', judgement: 'REVOLUTION. On your own day you are believed. Supreme success, furthering through perseverance. Remorse disappears.', image: 'Fire in the lake: the image of REVOLUTION. Thus the superior man sets the calendar in order and makes the seasons clear.' },
  { number: 50, binary: '101110', unicode: '䷱', name: 'The Caldron', chinese: '鼎', pinyin: 'dǐng', judgement: 'THE CALDRON. Supreme good fortune. Success.', image: 'Fire over wood: the image of THE CALDRON. Thus the superior man consolidates his fate by making his position correct.' },
  { number: 51, binary: '001001', unicode: '䷲', name: 'The Arousing', chinese: '震', pinyin: 'zhèn', judgement: 'SHOCK brings success. Shock comes—oh, oh! Laughing words—ha, ha! The shock terrifies for a hundred miles.', image: 'Thunder repeated: the image of SHOCK. Thus in fear and trembling the superior man sets his life in order and examines himself.' },
  { number: 52, binary: '100100', unicode: '䷳', name: 'Keeping Still', chinese: '艮', pinyin: 'gèn', judgement: 'KEEPING STILL. Keeping his back still so that he no longer feels his body. He goes into his courtyard and does not see his people. No blame.', image: 'Mountains standing close together: the image of KEEPING STILL. Thus the superior man does not permit his thoughts to go beyond his situation.' },
  { number: 53, binary: '110100', unicode: '䷴', name: 'Development', chinese: '漸', pinyin: 'jiàn', judgement: 'DEVELOPMENT. The maiden is given in marriage. Good fortune. Perseverance furthers.', image: 'On the mountain, a tree: the image of DEVELOPMENT. Thus the superior man abides in dignity and virtue in order to improve the mores.' },
  { number: 54, binary: '001011', unicode: '䷵', name: 'The Marrying Maiden', chinese: '歸妹', pinyin: 'guī mèi', judgement: 'THE MARRYING MAIDEN. Undertakings bring misfortune. Nothing that would further.', image: 'Thunder over the lake: the image of THE MARRYING MAIDEN. Thus the superior man understands the transitory in the light of the eternity of the end.' },
  { number: 55, binary: '001101', unicode: '䷶', name: 'Abundance', chinese: '豐', pinyin: 'fēng', judgement: 'ABUNDANCE has success. The king attains abundance. Be not sad. Be like the sun at midday.', image: 'Both thunder and lightning come: the image of ABUNDANCE. Thus the superior man decides lawsuits and carries out punishments.' },
  { number: 56, binary: '101100', unicode: '䷷', name: 'The Wanderer', chinese: '旅', pinyin: 'lǚ', judgement: 'THE WANDERER. Success through smallness. Perseverance brings good fortune to the wanderer.', image: 'Fire on the mountain: the image of THE WANDERER. Thus the superior man is clear-minded and cautious in imposing penalties.' },
  { number: 57, binary: '110110', unicode: '䷸', name: 'The Gentle', chinese: '巽', pinyin: 'xùn', judgement: 'THE GENTLE. Success through what is small. It furthers one to have somewhere to go. It furthers one to see the great man.', image: 'Winds following one upon the other: the image of THE GENTLE. Thus the superior man spreads his commands abroad and carries out his undertakings.' },
  { number: 58, binary: '011011', unicode: '䷹', name: 'The Joyous', chinese: '兌', pinyin: 'duì', judgement: 'THE JOYOUS. Success. Perseverance is favorable.', image: 'Lakes resting one on the other: the image of THE JOYOUS. Thus the superior man joins with his friends for discussion and practice.' },
  { number: 59, binary: '110010', unicode: '䷺', name: 'Dispersion', chinese: '渙', pinyin: 'huàn', judgement: 'DISPERSION. Success. The king approaches his temple. It furthers one to cross the great water. Perseverance furthers.', image: 'Wind drives over water: the image of DISPERSION. Thus the kings of old sacrificed to the Lord and built temples.' },
  { number: 60, binary: '010011', unicode: '䷻', name: 'Limitation', chinese: '節', pinyin: 'jié', judgement: 'LIMITATION. Success. Galling limitation must not be persevered in.', image: 'Water over lake: the image of LIMITATION. Thus the superior man creates number and measure, and examines the nature of virtue and correct conduct.' },
  { number: 61, binary: '110011', unicode: '䷼', name: 'Inner Truth', chinese: '中孚', pinyin: 'zhōng fú', judgement: 'INNER TRUTH. Pigs and fishes. Good fortune. It furthers one to cross the great water. Perseverance furthers.', image: 'Wind over lake: the image of INNER TRUTH. Thus the superior man discusses criminal cases in order to delay executions.' },
  { number: 62, binary: '001100', unicode: '䷽', name: 'Preponderance of the Small', chinese: '小過', pinyin: 'xiǎo guò', judgement: 'PREPONDERANCE OF THE SMALL. Success. Perseverance furthers. Small things may be done; great things should not be done.', image: 'Thunder on the mountain: the image of PREPONDERANCE OF THE SMALL. Thus in his conduct the superior man gives preponderance to reverence.' },
  { number: 63, binary: '010101', unicode: '䷾', name: 'After Completion', chinese: '既濟', pinyin: 'jì jì', judgement: 'AFTER COMPLETION. Success in small matters. Perseverance furthers. At the beginning good fortune, at the end disorder.', image: 'Water over fire: the image of the state of AFTER COMPLETION. Thus the superior man takes thought of misfortune and arms himself against it in advance.' },
  { number: 64, binary: '101010', unicode: '䷿', name: 'Before Completion', chinese: '未濟', pinyin: 'wèi jì', judgement: 'BEFORE COMPLETION. Success. But if the little fox, after nearly completing the crossing, gets his tail in the water, there is nothing that would further.', image: 'Fire over water: the image of the state before transition. Thus the superior man is careful in the differentiation of things.' },
];

type WilhelmLinesFile = Record<string, Record<string, string>>;

const linesByHex = wilhelmLines as WilhelmLinesFile;

const LINE_FALLBACK =
  'Open the line in a printed I Ching for the exact Six/Nine wording for this place.';

function getLineText(hexNum: number, lineNum: 1 | 2 | 3 | 4 | 5 | 6): string {
  const row = linesByHex[String(hexNum)];
  const text = row?.[String(lineNum)];
  if (text && text.length > 0) return text;
  return `Line ${lineNum}: ${LINE_FALLBACK}`;
}

export function getHexagram(number: number): HexagramData {
  const base = HEXAGRAMS.find(h => h.number === number) ?? HEXAGRAMS[0];
  const lineKeys: (1 | 2 | 3 | 4 | 5 | 6)[] = [1, 2, 3, 4, 5, 6];
  const lines = Object.fromEntries(
    lineKeys.map(k => [k, { text: getLineText(number, k) }])
  ) as Record<1|2|3|4|5|6, { text: string }>;
  return { ...base, lines };
}

/** Get all 64 for lookup - extend HEXAGRAMS for full set */
export function getHexagramByBinary(binary: string): HexagramData {
  const padded = binary.padStart(6, '0');
  const num = BINARY_TO_NUMBER[padded];
  return getHexagram(num ?? 1);
}

/**
 * Taoist I Ching–oriented text (Liu Yiming / Cleary tradition in spirit).
 * Bundled copy is original summary material—not Thomas Cleary’s copyrighted wording.
 */
export function getTaoistIChingInterpretation(
  number: number
): TaoistInterpretationBlock | undefined {
  return clearyByHex[String(number)];
}

/** Even-handed gloss: friction, limits, shadows—pairs with condensed Wilhelm judgment. */
export function getSoberJudgementNote(number: number): string {
  const row = soberJudgementNotes as Record<string, string>;
  return row[String(number)] ?? '';
}

const BINARY_TO_NUMBER: Record<string, number> = {
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
