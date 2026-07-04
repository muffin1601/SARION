# SARION Brand Guidelines

*Work Smarter. Achieve More.*

---

## 1. Mission

To equip developers and technical teams with premium, meticulously engineered tools that compress the distance between intent and execution — starting with AI-native workflows.

## 2. Vision

A world where every developer has an enterprise-grade, AI-powered toolkit at their fingertips — no bloat, no guesswork, just clean systems that work.

## 3. Core Values

| Value | What It Means in Practice |
|---|---|
| **Premium Craft** | Every asset, document, and template is finished to a professional standard — no placeholder-quality output ships. |
| **Clarity Over Clutter** | Minimalism is a discipline. If it doesn't earn its place, it doesn't ship. |
| **Developer-First** | Built by people who write code, for people who write code. Jargon is precise, not decorative. |
| **Speed With Rigor** | Fast doesn't mean careless. Every shortcut is a tested shortcut. |
| **Trust Through Transparency** | Clear pricing, clear scope, clear documentation — no dark patterns. |

---

## 4. Voice & Tone

SARION speaks like a senior engineer mentoring a peer: confident, precise, and respectful of the reader's time. Never hype-driven, never condescending.

**Tone Attributes:** Direct · Confident · Warm-professional · Precise · Calm

| Context | ✅ Do | ❌ Don't |
|---|---|---|
| Product description | "A 231-file system for shipping faster with Claude Code." | "This INSANE kit will 10x your productivity overnight!!!" |
| Instructional copy | "Run this prompt to scaffold your test suite." | "Just smash this prompt and watch the magic happen." |
| Error/limitation | "This playbook assumes a Git-based workflow." | "Don't blame us if this doesn't work for you." |
| Marketing headline | "Work Smarter. Achieve More." | "Work Harder Than Ever Before!" |
| Support tone | "We're here to help — reach out anytime." | "Sorry, that's a you problem." |

**Rules of thumb**
- Lead with substance (what it does), not adjectives (how amazing it is).
- One exclamation mark per document, maximum — and only if it's earned.
- Emojis are used sparingly, only as functional markers (e.g., ✅/❌ in tables), never as decoration in headings or body copy.

---

## 5. Typography

| Use Case | Typeface | Notes |
|---|---|---|
| UI / Headings / Body | **Inter** (or Söhne, IBM Plex Sans as alternates) | Modern grotesque sans; excellent legibility at all sizes; use variable weight axis where available. |
| Code / Technical Snippets | **JetBrains Mono** (or Fira Code, SF Mono as alternates) | Monospace with clear character disambiguation (0 vs O, 1 vs l). |
| Display / Hero | Inter (Semibold–Bold) | Avoid condensed or display-only fonts; keep the system consistent top to bottom. |

**Type Scale (suggested)**

| Token | Size | Weight | Use |
|---|---|---|---|
| Display | 48–64px | 700 | Hero headlines |
| H1 | 32px | 700 | Page titles |
| H2 | 24px | 600 | Section headers |
| H3 | 18px | 600 | Subsection headers |
| Body | 16px | 400 | Paragraph text |
| Small | 14px | 400 | Captions, metadata |
| Code | 14px | 400 (mono) | Inline and block code |

---

## 6. Spacing System

SARION uses a strict **4px base grid** (8px as the primary rhythm unit) for all layout, padding, and margin decisions. This ensures visual consistency across every product surface.

| Token | Value | Typical Use |
|---|---|---|
| `space-1` | 4px | Icon-to-text gaps, tight inline spacing |
| `space-2` | 8px | Base unit — default gap between related elements |
| `space-3` | 12px | Compact component padding |
| `space-4` | 16px | Standard component padding |
| `space-6` | 24px | Section-internal spacing |
| `space-8` | 32px | Section-to-section spacing |
| `space-12` | 48px | Major layout blocks |
| `space-16` | 64px | Page-level separation |

**Rule:** never use arbitrary spacing values (e.g., 13px, 22px). All spacing must resolve to a multiple of 4.

---

## 7. Logo Usage

The SARION mark is a **hexagonal "S"** rendered in a blue-to-cyan gradient (Electric Blue `#2563EB` → Cyan `#22D3EE`), paired with the lowercase wordmark **"sarion"**.

| File | Background | Wordmark Color |
|---|---|---|
| `logos/dark-theme-logo-SARION.png` | Dark backgrounds (navy, black) | White |
| `logos/light-theme-logo-SARION.png` | Light backgrounds (white, light gray) | Dark Navy (`#0F1226`) |

**Clear Space**
Maintain a minimum clear space around the logo equal to the height of the hexagon mark ("1x" unit). No text, icons, or graphic elements may intrude into this zone.

**Minimum Size**
- Digital: 24px mark height minimum (favicon-level use may go to 16px, mark only).
- Print: 10mm mark height minimum.

**Selection Rule**
Always choose the logo variant that matches the background's contrast — never place the dark-theme (white wordmark) logo on a light background or vice versa.

**Misuse — Do Not:**

| ❌ Never | Why |
|---|---|
| Recolor the hexagon gradient | Breaks brand recognition and equity |
| Stretch or skew the logo | Distorts the geometric hexagon precision |
| Add drop shadows, outlines, or bevels | Conflicts with the flat, minimal aesthetic |
| Place the logo on busy photographic backgrounds | Reduces legibility and premium feel |
| Rotate the mark | The hexagon is engineered for one fixed orientation |
| Separate the mark from the wordmark in primary lockups | Use the combined lockup unless a dedicated mark-only spec applies (e.g., favicon) |

---

## 8. Color Palette

### Primary

| Color | Hex | Usage |
|---|---|---|
| Dark Navy | `#0F1226` | Primary brand color; backgrounds, wordmark on light surfaces, headings |
| Black | `#0A0A0F` | Deep backgrounds, high-contrast dark surfaces |
| White | `#FFFFFF` | Light backgrounds, text on dark surfaces |

### Accent (Gradient Pair)

| Color | Hex | Usage |
|---|---|---|
| Electric Blue | `#2563EB` | Primary CTA, links, active states, gradient start |
| Cyan | `#22D3EE` | Highlights, gradient end, hover accents |

The Electric Blue → Cyan gradient is reserved for the logo mark, hero accents, and primary CTA treatments. It should not be used as a full-page background or applied to large text blocks.

### Semantic

| Purpose | Hex | Usage |
|---|---|---|
| Success | `#22C55E` | Confirmations, completed states |
| Warning | `#F59E0B` | Cautions, non-blocking alerts |
| Error | `#EF4444` | Failures, destructive actions |
| Info | `#3B82F6` | Neutral notices, tips |
| Neutral Gray | `#64748B` | Secondary text, borders, disabled states |

**Contrast Rule:** all text/background pairings must meet WCAG AA (4.5:1 for body text, 3:1 for large text).

---

## 9. Iconography

- **Style:** Line icons only — no filled or duotone icons in primary UI.
- **Stroke weight:** Consistent 1.5–2px stroke across the entire icon set.
- **Corners:** Rounded caps and joins, matching the hexagon's soft-geometric character.
- **Grid:** Icons designed on a 24x24px grid for pixel-perfect alignment with the 4px spacing system.
- **Color:** Icons default to Dark Navy or White depending on background; accent gradient reserved for a small number of "featured" icons (e.g., AI/automation indicators).

## 10. Illustration Style

- Favor **abstract geometric compositions** (hexagons, grids, subtle gradients) over literal or cartoon illustration.
- Palette restricted to the brand palette above — no off-brand colors introduced for illustration purposes.
- Use generous negative space; illustrations support content, they don't compete with it.
- Avoid stock-photo-style imagery of "people at laptops" — it reads generic and undercuts the premium positioning.

---

## 11. Brand Rules — Do / Don't

| # | ✅ Do | ❌ Don't |
|---|---|---|
| 1 | Use the correct logo variant for the background | Use the dark-theme logo on a light background (or vice versa) |
| 2 | Keep spacing on the 4/8px grid | Use arbitrary pixel values for padding/margin |
| 3 | Use Inter (or equivalent) for all UI text | Mix in decorative or condensed display fonts |
| 4 | Use JetBrains Mono for all code | Render code in a proportional font |
| 5 | Reserve the blue-to-cyan gradient for accents | Apply the gradient to full backgrounds or body text |
| 6 | Write in a direct, confident, calm voice | Use hype language ("insane," "game-changing," "10x overnight") |
| 7 | Use emojis sparingly and functionally | Fill headings and copy with decorative emojis |
| 8 | Maintain WCAG AA contrast on all text | Place low-contrast text on gradient or photo backgrounds |
| 9 | Use line icons with consistent stroke weight | Mix filled, duotone, and line icon styles together |
| 10 | Keep the logo's clear space intact | Crowd the logo with text, icons, or busy imagery |
| 11 | Use one exclamation mark per document, at most | Stack multiple exclamation marks or all-caps phrases |
| 12 | Ground illustrations in geometric, on-brand abstraction | Use generic stock photography or off-palette colors |

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**SARION**
*Work Smarter. Achieve More.*

**Version 1.0.0**
Released July 2026

🌐 [https://trysarion.com](https://trysarion.com)
✉ [support@trysarion.com](mailto:support@trysarion.com)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
