#!/usr/bin/env python3
"""
Build src/data/confucianCommentaries.json from James Legge's Appendix I (Tuan Zhuan)
and Appendix II (Great Symbolism + line symbolism), fetched from sacred-texts.com
(Public domain, ~1882).

Run from repo root: python3 scripts/build_confucian_json.py
"""

from __future__ import annotations

import json
import re
from pathlib import Path

ROMAN = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",
    "XIII",
    "XIV",
    "XV",
    "XVI",
    "XVII",
    "XVIII",
    "XIX",
    "XX",
    "XXI",
    "XXII",
    "XXIII",
    "XXIV",
    "XXV",
    "XXVI",
    "XXVII",
    "XXVIII",
    "XXIX",
    "XXX",
    "XXXI",
    "XXXII",
    "XXXIII",
    "XXXIV",
    "XXXV",
    "XXXVI",
    "XXXVII",
    "XXXVIII",
    "XXXIX",
    "XL",
    "XLI",
    "XLII",
    "XLIII",
    "XLIV",
    "XLV",
    "XLVI",
    "XLVII",
    "XLVIII",
    "XLIX",
    "L",
    "LI",
    "LII",
    "LIII",
    "LIV",
    "LV",
    "LVI",
    "LVII",
    "LVIII",
    "LIX",
    "LX",
    "LXI",
    "LXII",
    "LXIII",
    "LXIV",
]


def clean_text(s: str) -> str:
    s = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", s)
    s = re.sub(r"^p\. \d+\s*$", "", s, flags=re.MULTILINE)
    s = re.sub(r"^---\s*$", "", s, flags=re.MULTILINE)
    s = re.sub(r"\n{3,}", "\n\n", s)
    return s.strip()


def strip_footnotes_section(text: str) -> str:
    """Sacred Texts pages embed ### Footnotes before end; remove each block."""
    return re.split(r"\n### Footnotes\s*\n", text, maxsplit=1)[0]


def split_appendix1(text: str) -> dict[str, str]:
    """Map Roman numeral -> full Tuan Zhuan block (numbered paragraphs)."""
    text = clean_text(text)
    blocks: dict[str, str] = {}
    for i, rom in enumerate(ROMAN):
        next_rom = ROMAN[i + 1] if i + 1 < len(ROMAN) else None
        pat = re.compile(rf"^{re.escape(rom)}\.\s+", re.MULTILINE)
        m = pat.search(text)
        if not m:
            continue
        start = m.start()
        if next_rom:
            pat_next = re.compile(rf"^{re.escape(next_rom)}\.\s+", re.MULTILINE)
            m_next = pat_next.search(text, start + 1)
            end = m_next.start() if m_next else len(text)
        else:
            end = len(text)
        blocks[rom] = clean_text(text[start:end])
    return blocks


def split_appendix2(text: str) -> dict[str, dict]:
    """
    Per hexagram: { 'image': str, 'lines': { '1': ... '6': ... } }
    Great Symbolism = text from 'ROMAN. ' until first line that matches ^\d+\.\s
    """
    text = clean_text(text)
    out: dict[str, dict] = {}
    for i, rom in enumerate(ROMAN):
        next_rom = ROMAN[i + 1] if i + 1 < len(ROMAN) else None
        pat = re.compile(rf"^{re.escape(rom)}\.\s+", re.MULTILINE)
        m = pat.search(text)
        if not m:
            continue
        start = m.start()
        if next_rom:
            pat_next = re.compile(rf"^{re.escape(next_rom)}\.\s+", re.MULTILINE)
            m_next = pat_next.search(text, start + 1)
            block_end = m_next.start() if m_next else len(text)
        else:
            block_end = len(text)
        block = text[start:block_end]
        block = clean_text(block)
        # Remove leading "ROMAN. "
        block_body = re.sub(rf"^{re.escape(rom)}\.\s+", "", block, count=1)
        # Sacred Texts typo: fifth line sometimes marked "S." instead of "5."
        block_body = re.sub(r"(?m)^S\.\s+", "5. ", block_body)
        # Split image vs line: first occurrence of "\n1. " or "1. " at start after image paragraph(s)
        line_match = re.search(r"(?:^|\n)([1-7])\.\s+", block_body)
        if not line_match:
            image = block_body
            lines_map = {}
        else:
            split_at = line_match.start()
            image = block_body[:split_at].strip()
            rest = block_body[split_at:]
            lines_map = {}
            for lm in re.finditer(r"(?:^|\n)([1-7])\.\s+", rest):
                pass
            for n in range(1, 8):
                m1 = re.search(rf"(?:^|\n){n}\.\s+", rest)
                if not m1:
                    continue
                seg_start = m1.end()
                next_n = None
                for m2 in range(n + 1, 8):
                    mnext = re.search(rf"(?:^|\n){m2}\.\s+", rest[seg_start:])
                    if mnext:
                        next_n = seg_start + mnext.start()
                        break
                if next_n is not None:
                    chunk = rest[seg_start:next_n]
                else:
                    chunk = rest[seg_start:]
                lines_map[str(n)] = clean_text(chunk)
        # Hexagrams 1–2 have 7 line entries (extra line about host of dragons)
        if rom in ("I", "II") and "7" in lines_map:
            lines_map.pop("7", None)
        out[rom] = {"image": clean_text(image), "lines": lines_map}
    return out


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    legge = root / "scripts" / "legge"
    a1 = strip_footnotes_section(
        (legge / "icap1-1.txt").read_text(encoding="utf-8", errors="replace")
    ) + "\n" + strip_footnotes_section(
        (legge / "icap1-2.txt").read_text(encoding="utf-8", errors="replace")
    )
    a2 = strip_footnotes_section(
        (legge / "icap2-1.txt").read_text(encoding="utf-8", errors="replace")
    ) + "\n" + strip_footnotes_section(
        (legge / "icap2-2.txt").read_text(encoding="utf-8", errors="replace")
    )

    tuan = split_appendix1(a1)
    sym = split_appendix2(a2)

    result: dict[str, dict] = {}
    for idx, rom in enumerate(ROMAN, start=1):
        key = str(idx)
        j = tuan.get(rom, "").strip()
        s = sym.get(rom, {})
        img = s.get("image", "").strip()
        lines = s.get("lines", {})
        result[key] = {
            "judgement": j if j else "—",
            "image": img if img else "—",
            "lines": {str(n): lines.get(str(n), "—") for n in range(1, 7)},
        }

    out_path = root / "src" / "data" / "confucianCommentaries.json"
    out_path.write_text(
        json.dumps(result, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {out_path} ({len(result)} hexagrams)")


if __name__ == "__main__":
    main()
