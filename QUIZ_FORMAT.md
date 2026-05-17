# HydrarGyrum Quiz Tool — Format Documentation

Instructions for adding a new practice tool to the HydrarGyrum Studiehub.

---

## Architecture

The site uses a **JSON-driven architecture**. Every quiz tool is one file:

| File | Purpose |
|------|---------|
| `js/data/{id}-quiz-def.json` | All questions, categories, reference cards, exam table |

The generic page `pages/quiz.html?id={id}` fetches the JSON at runtime and renders everything. **No HTML file to generate, no JS data file to generate.**

Do **not** modify `js/quiz-widgets.js`, `css/quiz.css`, or `pages/quiz.html`.

---

## Workflow

1. Create `js/data/{id}-quiz-def.json` using the schema below.
2. Add a hub card in `index.html` linking to `pages/quiz.html?id={id}`.
3. Done. Questions can be added incrementally — an empty `questions: []` shows a "coming soon" state.

---

## JSON Definition Schema

```json
{
  "id": "ca",
  "title": "CA Oefentool",
  "accent": "var(--moss)",
  "categories": [ ... ],
  "questions": [ ... ],
  "referenceCards": [ ... ],
  "examTable": { ... }
}
```

### Top-level fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | yes | Short identifier, e.g. `"ca"`, `"wr"`. |
| `title` | string | yes | Shown in topbar and `<title>`. |
| `accent` | string | yes | CSS value for `--quiz-accent`. E.g. `"var(--moss)"`. |
| `categories` | array | no | Filter options. `[]` or omit to hide the filter dropdown. |
| `questions` | array | yes | The question bank. Can be `[]` while questions are being added. |
| `referenceCards` | array | no | Quick-reference cards (second tab). Omit to hide the tab. |
| `examTable` | object | no | Exam structure table (third tab). Omit to hide the tab. |

---

### `categories` items

```json
{ "value": "Q1", "label": "Q1: Getallenstelsels" }
```

`value` must match the `cat` field on questions.

---

### `questions` items

```json
{
  "cat":    "Q1",
  "year":   "2022",
  "q":      "Question text. Use \\n for line breaks.",
  "hint":   "Optional hint. Omit or null to hide the hint button.",
  "answer": "Answer text. Rendered inside <pre> — use \\n for newlines."
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `cat` | no | Category badge; must match a `categories[].value`. |
| `year` | no | Year label top-right of the card, e.g. `"2024"` or `"general"`. |
| `q` | yes | Question text. `\n` → `<br>`, four spaces → non-breaking spaces (for code). |
| `hint` | no | Hint text. Absent or `null` → no hint button. |
| `answer` | yes | Answer shown in `<pre>` when revealed. |

---

### `referenceCards` items

```json
{
  "title": "IEEE 754 Formaten",
  "body":  "Single (FP32): 1|8|23, bias=127<br>Double (FP64): 1|11|52, bias=1023"
}
```

`body` is raw HTML. Use `<br>` for line breaks, `<b>label:</b>` for bold labels.

---

### `examTable` object

```json
{
  "title":   "Examenstructuur per jaar (2021–2025)",
  "columns": ["2021", "2022", "2023", "2024", "2025"],
  "rows": [
    { "label": "Q1 (2pt)", "cells": ["...", "...", "...", "...", "..."] }
  ]
}
```

`cells.length` must equal `columns.length`.

---

## Adding to index.html

Add a card inside `.hub-grid`:

```html
<a href="pages/quiz.html?id={id}" class="hub-card card-{id}">
  <div class="card-top">
    <div class="card-icon">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
    </div>
    <div class="card-arrow">↗</div>
  </div>
  <div>
    <div class="card-label">Oefentool</div>
    <div class="card-title">{Subject} Oefentool</div>
  </div>
  <div class="card-meta">{one-line description}</div>
  <div class="countdown-pill">
    <span class="countdown-dot"></span>Open oefentool →
  </div>
</a>
```

---

## Color palette

| Token | Appearance |
|-------|------------|
| `var(--moss)` | Dark green — CA |
| `var(--cinnabar)` | Red-orange — WR |
| `var(--graphite)` | Mid-grey |
| `var(--ink)` | Near-black / near-white |
| `var(--paper)` | Page background |
| `var(--bone)` | Card background |

---

## Reference definitions

- `js/data/ca-quiz-def.json` — complete CA quiz (questions, categories, referenceCards, examTable).
- `js/data/wr-quiz-def.json` — WR quiz stub (empty questions, categories defined).
