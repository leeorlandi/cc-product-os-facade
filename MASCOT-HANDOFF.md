# Mascot SVG — Handoff Notes

## Status

**Open eyes: extremely close. One fix needed.**
**Squint eyes: still wrong. Needs full redo.**

---

## The character

The mascot is the Claude Code pixel-art creature. Reference images are saved at:

```
site/ref-open.png     ← open eyes state
site/ref-squint.png   ← squinting (> <) state
```

Use `site/compare.html` to diff the SVG against the reference side-by-side. There's an opacity slider for overlay comparison.

---

## What we know (measured exactly from ref-open.png)

The character is an **11 column × 8 row pixel grid**.

| Dimension | Reference pixels | SVG units |
|-----------|-----------------|-----------|
| Col width | 61px | 10 |
| Row height | 66.75px | 10.875 |
| Total w (with arms) | 678px | 110 |
| Total h | 534px | 87 |

### Grid layout

```
Col:  0  1  2  3  4  5  6  7  8  9  10
R0:   .  B  B  B  B  B  B  B  B  B  .
R1:   .  B  B  B  B  B  B  B  B  B  .
R2:   A  B  E  B  B  B  B  B  E  B  A   ← eyes (row 2 only, top half of arm section)
R3:   A  B  B  B  B  B  B  B  B  B  A   ← arms continue, no eyes
R4:   .  B  B  B  B  B  B  B  B  B  .
R5:   .  B  B  B  B  B  B  B  B  B  .
R6:   .  L  .  L  .  .  .  L  .  L  .   ← 4 legs
R7:   .  L  .  L  .  .  .  L  .  L  .
```

Key: B=body, A=arm, E=eye, L=leg, .=gap

**The character has 4 legs, not 2.** Legs at cols 1, 3, 7, 9. Center gap spans cols 4–6 (3 units wide).

### Exact SVG element values (viewBox="0 0 110 87")

```svg
<!-- body rows 0-1 -->
<rect x="10" y="0" width="90" height="21.75" fill="#c8614e"/>
<!-- body rows 2-3 -->
<rect x="10" y="21.75" width="90" height="21.75" fill="#c8614e"/>
<!-- left arm rows 2-3, col 0 -->
<rect x="0" y="21.75" width="10" height="21.75" fill="#c8614e"/>
<!-- right arm rows 2-3, col 10 -->
<rect x="100" y="21.75" width="10" height="21.75" fill="#c8614e"/>
<!-- body rows 4-5 -->
<rect x="10" y="43.5" width="90" height="21.75" fill="#c8614e"/>
<!-- 4 legs rows 6-7 -->
<rect x="10"  y="65.25" width="10" height="21.75" fill="#c8614e"/>
<rect x="30"  y="65.25" width="10" height="21.75" fill="#c8614e"/>
<rect x="70"  y="65.25" width="10" height="21.75" fill="#c8614e"/>
<rect x="90"  y="65.25" width="10" height="21.75" fill="#c8614e"/>
<!-- eyes open: col 2 and col 8, row 2 height only -->
<rect x="20" y="21.75" width="10" height="10.88" fill="#1a1a1a"/>
<rect x="80" y="21.75" width="10" height="10.88" fill="#1a1a1a"/>
```

---

## Fix 1: Open eyes — eliminate the seam lines

**Problem:** The SVG renders visible seam lines between the rect elements (rows 0-1, 2-3, 4-5 boundaries). They show as faint horizontal lines across the body, visible on the right side of image 10.

**Cause:** Floating point row boundaries (y=21.75, y=43.5, y=65.25) cause sub-pixel rendering gaps between adjacent rects at certain zoom levels.

**Fix options (try in order):**
1. **Merge overlapping rects** — instead of separate row-pair rects, draw one large body rect (rows 0-5) and then subtract / overdraw:
   ```svg
   <!-- single body block, rows 0-5 -->
   <rect x="10" y="0" width="90" height="65.25" fill="#c8614e"/>
   ```
   Then the legs are still separate. This eliminates ALL horizontal seams in the body.

2. **Add 0.5px overlap** — extend each rect's height by 0.5 to overlap the next:
   ```svg
   <rect x="10" y="0" width="90" height="22.25" fill="#c8614e"/>
   <rect x="10" y="21.75" width="90" height="22.25" fill="#c8614e"/>
   ```

3. **Use `shape-rendering="crispEdges"`** on the SVG element — forces pixel-snapped rendering.

**Recommended: Option 1.** Simplest, no rounding artifacts possible.

---

## Fix 2: Squint eyes — needs full redo

**Problem:** The squinting state (> <) is wrong. The current polyline approach produces thin, angled strokes that don't match the reference at all.

**Reference (ref-squint.png):** The squint eyes are **solid filled angular shapes**, not thin strokes. They look like thick chevrons or filled triangles — the same pixel block as the open eye (10×10.88 units) but filled with the > < shape rendered as bold, blocky pixel art.

**What to do:**
- The > shape (left eye, col 2, row 2) should be a **filled polygon** pointing right, contained within the 10×10.88 box.
- The < shape (right eye, col 8, row 2) should be a **filled polygon** pointing left, same box.

Reference for the > shape in SVG coordinates (box: x=20–30, y=21.75–32.63):
```svg
<!-- > left eye: filled right-pointing chevron -->
<polygon points="20,21.75 30,27.19 20,32.63" fill="#1a1a1a"/>

<!-- < right eye: filled left-pointing chevron -->
<polygon points="90,21.75 80,27.19 90,32.63" fill="#1a1a1a"/>
```
These are solid filled triangles. Verify against ref-squint.png in compare.html before finalizing.

The current implementation uses `stroke` polylines — remove those entirely and replace with filled polygons.

---

## CSS animations (unchanged, working correctly)

```css
/* Float */
@keyframes mascot-float { 0%,100% { translateY(0) } 50% { translateY(-10px) } }

/* Right arm wave — transform-box:fill-box, transform-origin:0% 50% on .mascot__arm */
@keyframes mascot-wave { 0% 0deg → 20% -22deg → 40% 8deg → 60% -18deg → 80% 6deg → 100% 0deg }

/* Blink cycle: open 0-88%, squint 89-95%, open 96-100% */
```

---

## File locations

| File | Purpose |
|------|---------|
| `site/index.html` | Live site — mascot SVG lives in `.hero__title-row` |
| `site/styles.css` | Mascot CSS: `.mascot`, `.mascot__arm`, `.mascot__eyes-open`, `.mascot__eyes-squint` |
| `site/compare.html` | Visual diff tool — open locally, use overlay slider |
| `site/ref-open.png` | Reference: open eyes |
| `site/ref-squint.png` | Reference: squint eyes |

## Branch

All mascot work is on `feature/theme-toggle` (PR #2). Do not PR until both states pass the compare.html overlay check.
