# HydrarGyrum Quiz Tool — Format Documentation

How to generate a new quiz/practice tool from a JSON definition file.  
Hand this document to Claude along with a `*-quiz-def.json` file to get a ready-to-use HTML page.

---

## Overview

A quiz tool consists of four files:

| File | Role | Generated? |
|------|------|-----------|
| `js/data/<id>-quiz.js` | Runtime data (questions, categories, reference cards, exam table) | Yes |
| `pages/<id>-oefentool.html` | Page shell (topbar, auth guard, script tags) | Yes |
| `css/quiz.css` | Shared engine styles — **do not touch** | No |
| `js/quiz-widgets.js` | Shared engine — **do not touch** | No |

The JSON definition (`js/data/<id>-quiz-def.json`) is the **source of truth**. It is not loaded at runtime.

---

## JSON Definition Schema

### Top-level fields

```json
{
  "id":           "ca",
  "title":        "CA Oefentool",
  "accent":       "var(--moss)",
  "categories":   [ ... ],
  "questions":    [ ... ],
  "referenceCards": [ ... ],
  "examTable":    { ... }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | yes | Short identifier. Used for variable names (`<id>Questions`, etc.) and file names. |
| `title` | string | yes | Shown in the topbar subtitle (e.g. "CA Oefentool"). |
| `accent` | string | yes | CSS value for `--quiz-accent`. Use a palette token like `"var(--moss)"` or a raw hex. |
| `categories` | array | no | Category filter options. Omit or set `[]` for no filter. |
| `questions` | array | yes | The question bank. |
| `referenceCards` | array | no | Quick-reference cards shown in a second tab. Omit to hide the tab. |
| `examTable` | object | no | Exam structure table shown in a third tab. Omit to hide the tab. |

---

### `categories` items

```json
{ "value": "Q1", "label": "Q1: Getallenstelsels" }
```

| Field | Type | Description |
|-------|------|-------------|
| `value` | string | Must match the `cat` field on questions. |
| `label` | string | Shown in the `<select>` dropdown. |

If `categories` is empty or absent, no filter dropdown is rendered.

---

### `questions` items

```json
{
  "cat":    "Q1",
  "year":   "2022",
  "q":      "Question text. Use \\n for line breaks, \\n\\n for blank lines.",
  "hint":   "Optional hint text. Omit or set null to hide the hint button.",
  "answer": "Answer text. Rendered inside <pre> — use \\n for newlines."
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `cat` | string | no | Category badge shown on the card. Must match a `value` in `categories`. |
| `year` | string | no | Small year label shown top-right of the card (e.g. `"2024"` or `"general"`). |
| `q` | string | yes | Question text. `\n` becomes `<br>`, four spaces become `&nbsp;` (for code indentation). |
| `hint` | string | no | Hint text. If absent or `null`, the hint button is not rendered for this question. |
| `answer` | string | yes | Answer text. Rendered as-is inside `<pre>`. Use `\n` for newlines. |

---

### `referenceCards` items

```json
{
  "title": "IEEE 754 Formaten",
  "body":  "Single (FP32): 1|8|23, bias=127<br>Double (FP64): 1|11|52, bias=1023<br><br>Waarde = (-1)^s × 1.M × 2^(E-bias)"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Card heading (rendered in accent color). |
| `body` | string | Card body — raw HTML string. Use `<br>` for line breaks, `<b>label:</b>` for bold labels. |

---

### `examTable` object

```json
{
  "title":   "Examenstructuur per jaar (2021–2025)",
  "columns": ["2021", "2022", "2023", "2024", "2025"],
  "rows": [
    {
      "label": "Q1 (2pt)",
      "cells": ["Gray, FP1|3|4...", "Octaal, bfloat16...", "...", "...", "..."]
    }
  ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Section heading above the table. Defaults to `"Examenstructuur"` if absent. |
| `columns` | array of string | Column headers (one per year/edition). |
| `rows` | array | One row per question number. |
| `rows[].label` | string | Row header (e.g. `"Q1 (2pt)"`). Rendered in accent color monospace. |
| `rows[].cells` | array of string | One cell per column. Plain text. |

`cells.length` must equal `columns.length`.

---

## Generated JS Data File

File path: `js/data/<id>-quiz.js`

```js
// <Title> vragenbank

var <id>Categories = [
  { value: 'Q1', label: 'Q1: Getallenstelsels' },
  ...
];

var <id>Questions = [
  {
    cat: 'Q1', year: '2022',
    q: 'Question text...',
    hint: 'Hint text...',
    answer: 'Answer text...'
  },
  ...
];

var <id>ReferenceCards = [
  {
    title: 'Card Title',
    body:  'Card body HTML...'
  },
  ...
];

var <id>ExamTable = {
  title:   'Examenstructuur per jaar...',
  columns: ['2021', '2022', '2023', '2024', '2025'],
  rows: [
    { label: 'Q1 (2pt)', cells: ['...', '...', '...', '...', '...'] },
    ...
  ]
};
```

**Rules:**
- Variable names: `<id>` with first letter uppercased where needed: `caCategories`, `caQuestions`, `caReferenceCards`, `caExamTable`.
- Use `var` (not `const`/`let`) — the file is loaded with `defer` and referenced by the inline `DOMContentLoaded` script.
- If `referenceCards` is absent from the JSON, omit `var <id>ReferenceCards` and pass `null` to the engine.
- If `examTable` is absent, omit `var <id>ExamTable` and pass `null` to the engine.

---

## Generated HTML Page

File path: `pages/<id>-oefentool.html`

```html
<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title} — HydrarGyrum Studiehub</title>
<meta name="description" content="{description}"/>
<meta name="robots" content="noindex, nofollow"/>
<meta name="theme-color" content="#2F4A3A" media="(prefers-color-scheme: light)"/>
<meta name="theme-color" content="#15161A" media="(prefers-color-scheme: dark)"/>
<meta name="color-scheme" content="light dark"/>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 120'%3E%3Cpath d='M50 6 C50 6,18 52,18 78 A32 32 0 1 0 82 78 C82 52,50 6,50 6 Z' fill='%232F4A3A'/%3E%3C/svg%3E"/>
<script>(function(){var s=null;try{s=localStorage.getItem('hg-theme');}catch(e){}if(!s)s=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',s);})();</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://www.gstatic.com" crossorigin>
<link rel="dns-prefetch" href="https://identitytoolkit.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;700&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300;1,6..72,400&family=JetBrains+Mono:wght@400;500&display=swap" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;700&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300;1,6..72,400&family=JetBrains+Mono:wght@400;500&display=swap"></noscript>
<link rel="stylesheet" href="../css/hg-tokens.css">
<link rel="stylesheet" href="../css/quiz.css">
<style>:root { --quiz-accent: {accent}; }</style>
<!-- HydrarGyrum auth guard -->
<style>
  #hg-auth-guard { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; background: var(--paper, #ECEBE6); z-index: 9999; transition: opacity .35s ease; }
  #hg-auth-guard svg { width: 36px; height: auto; color: var(--moss, #2F4A3A); opacity: .5; animation: hg-pulse 1.6s ease-in-out infinite alternate; }
  #hg-auth-guard.hidden { opacity: 0; pointer-events: none; }
  @keyframes hg-pulse { from { opacity: .3; transform: scale(.9); } to { opacity: .7; transform: scale(1.1); } }
</style>
<script type="module">
  import { auth } from '../js/firebase-config.js';
  import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
  function showGuard() {
    if (document.getElementById('hg-auth-guard')) return;
    var g = document.createElement('div');
    g.id = 'hg-auth-guard';
    g.setAttribute('aria-hidden', 'true');
    g.innerHTML = '<svg viewBox="0 0 100 120"><path d="M50 6 C50 6,18 52,18 78 A32 32 0 1 0 82 78 C82 52,50 6,50 6 Z" fill="currentColor"/></svg>';
    (document.body || document.documentElement).appendChild(g);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', showGuard, { once: true });
  else showGuard();
  onAuthStateChanged(auth, (user) => {
    if (!user) { window.location.replace('../login.html'); return; }
    var g = document.getElementById('hg-auth-guard');
    if (g) { g.classList.add('hidden'); setTimeout(function() { g.remove(); }, 400); }
  });
</script>
<link rel="modulepreload" href="../js/firebase-config.js">
<script defer src="../js/sound-system.js"></script>
<script defer src="../js/quiz-widgets.js"></script>
<script defer src="../js/data/{id}-quiz.js"></script>
</head>
<body>

<header class="topbar">
  <div class="topbar-inner">
    <a class="topbar-brand" href="../index.html" onclick="if(window.HgSound)window.HgSound.play('navigate')">
      <svg viewBox="0 0 100 120" aria-hidden="true">
        <path d="M50 6 C50 6,18 52,18 78 A32 32 0 1 0 82 78 C82 52,50 6,50 6 Z" fill="currentColor"/>
      </svg>
      HydrarGyrum
    </a>
    <div class="topbar-sep"></div>
    <span class="topbar-sub">{title}</span>
    <div class="topbar-right">
      <button class="topbar-btn" id="theme-btn" type="button"><span class="dot"></span><span class="theme-label">Dark</span></button>
    </div>
  </div>
</header>

<div class="container" id="quiz-root"></div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    HgQuiz.createQuiz({
      containerId:    'quiz-root',
      questions:      {id}Questions,
      categories:     {id}Categories,
      referenceCards: {id}ReferenceCards,   // null if not defined
      examTable:      {id}ExamTable         // null if not defined
    });
  });
</script>
<script>
  (function() {
    var root = document.documentElement;
    var btn  = document.getElementById('theme-btn');
    function updateLabel() {
      var lbl = btn && btn.querySelector('.theme-label');
      if (lbl) lbl.textContent = root.getAttribute('data-theme') === 'dark' ? 'Light' : 'Dark';
    }
    updateLabel();
    if (btn) btn.addEventListener('click', function() {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('hg-theme', next); } catch(e) {}
      if (window.HgSound) window.HgSound.play(next === 'dark' ? 'theme-dark' : 'theme-light');
      updateLabel();
    });
  })();
</script>
</body>
</html>
```

### Template substitutions

| Placeholder | Replace with |
|-------------|-------------|
| `{id}` | The `id` field from the JSON (e.g. `ca`, `wr`) |
| `{title}` | The `title` field (e.g. `CA Oefentool`) |
| `{accent}` | The `accent` field (e.g. `var(--moss)`) |
| `{description}` | A short SEO description of the tool |
| `{id}Questions` | Variable from the data file |
| `{id}Categories` | Variable from the data file (or empty array `[]` if no categories) |
| `{id}ReferenceCards` | Variable from the data file, or literal `null` if not defined |
| `{id}ExamTable` | Variable from the data file, or literal `null` if not defined |

---

## Palette reference

| Token | Colour | Typical use |
|-------|--------|-------------|
| `var(--moss)` | Dark green `#2F4A3A` | CA accent |
| `var(--cinnabar)` | Red-orange `#C0392B` | WR accent |
| `var(--graphite)` | Mid-grey | Secondary text |
| `var(--ink)` | Near-black | Body text |
| `var(--paper)` | Off-white / dark bg | Page background |
| `var(--bone)` | Slightly off-paper | Card backgrounds |
| `var(--line)` | Faint line | Borders |

---

## Adding the quiz to `index.html`

Add a link card in the relevant subject section of `index.html`:

```html
<a class="tool-card" href="pages/<id>-oefentool.html">
  <div class="tool-icon">📝</div>
  <div class="tool-info">
    <div class="tool-name">{Subject} Oefentool</div>
    <div class="tool-desc">Oefen met oude examenvragen</div>
  </div>
</a>
```

---

## Checklist for generating a new quiz

1. Create `js/data/<id>-quiz-def.json` with questions, categories, reference cards, exam table.
2. Generate `js/data/<id>-quiz.js` from the definition.
3. Generate `pages/<id>-oefentool.html` using the template above.
4. Add a link card to `index.html`.
5. No changes needed to `css/quiz.css` or `js/quiz-widgets.js`.
