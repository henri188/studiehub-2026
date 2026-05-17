# HydrarGyrum Planner Format

Instructions for generating a new study planner in the HydrarGyrum Studiehub codebase.
Give Claude this document plus a planner definition JSON and it will produce two ready-to-use files.

---

## What you will produce

For a new planner with id `{id}` (e.g. `mm` for Mechanica):

| File | Purpose |
|------|---------|
| `pages/{id}-planner.html` | The planner page the user opens in a browser |
| `js/data/{id}-weeks.js` | Week/day/session/task data array |

Do **not** modify `js/planner-widgets.js`, `css/planner.css`, or `css/hg-tokens.css`.

---

## The planner definition JSON

```json
{
  "id": "ca",
  "title": "CA Studieplanner",
  "subtitle": "CA Studieplanner",
  "description": "Studieplanner voor het examen Computerarchitectuur — 4 weken voorbereiding met dagelijkse taken en timers.",
  "accent": "var(--moss)",
  "stateKey": "ca_planner_v1",
  "firestoreKey": "ca",
  "examDate": "2026-06-08",
  "renderTask": "simple",
  "typeMap": null,
  "weekIndex": {
    "mode": "linear",
    "startDate": "2026-05-14"
  },
  "scienceStrip": [
    { "strong": "🌅 9–11u: Piekconcentratie", "text": "Nieuwe moeilijke stof, harde oefeningen, analytisch werk" }
  ],
  "examNote": null,
  "weeks": [ ... ]
}
```

### Top-level fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Short lowercase identifier used in filenames and Firestore. E.g. `"ca"`, `"wr"`, `"mm"`. |
| `title` | string | Text for `<title>` tag. Keep it short, e.g. `"CA Studieplanner"`. The HTML template appends ` — HydrarGyrum Studiehub`. |
| `subtitle` | string | Shown in the topbar next to the HydrarGyrum logo. |
| `description` | string | Content of `<meta name="description">`. |
| `accent` | string | CSS value for the `--pl-accent` variable. Use one of the palette values: `"var(--moss)"` (dark green), `"var(--cinnabar)"` (red-orange), or any other valid CSS color. |
| `stateKey` | string | localStorage key for progress state. Use format `"{id}_planner_v1"`. |
| `firestoreKey` | string | Cloud sync key. Keep it equal to `id` unless there's a conflict. |
| `examDate` | string | ISO date of the exam, e.g. `"2026-06-08"`. Drives the countdown timer. |
| `renderTask` | `"simple"` \| `"kanban"` | Task rendering mode. `"simple"` = plain checkbox list. `"kanban"` = colored ticket cards with type badges. |
| `typeMap` | object \| null | Required when `renderTask` is `"kanban"`. Set to `null` for simple mode. |
| `weekIndex` | object | Determines which week tab is active by default. See section below. |
| `scienceStrip` | array \| null | Info pills shown at the top of the page. Set to `null` to omit. |
| `examNote` | string \| null | Raw HTML for an exam info banner below the strip. Set to `null` to omit. |
| `weeks` | array | Array of week objects. |

---

### `typeMap` (kanban mode only)

When `renderTask` is `"kanban"`, define a type map. Each key is a task type used in task objects.

```json
{
  "lees":    { "label": "LEES",     "bk": "tb-lees",    "tk": "tk-lees"    },
  "schrijf": { "label": "SCHRIJF",  "bk": "tb-schrijf", "tk": "tk-schrijf" },
  "code":    { "label": "CODE",     "bk": "tb-code",    "tk": "tk-code"    },
  "herhaal": { "label": "HERHAAL",  "bk": "tb-herhaal", "tk": "tk-herhaal" },
  "mock":    { "label": "MOCK",     "bk": "tb-mock",    "tk": "tk-mock"    },
  "nakijk":  { "label": "NAKIJK",   "bk": "tb-nakijk",  "tk": "tk-nakijk"  },
  "spiek":   { "label": "SPIEKBL.", "bk": "tb-spiek",   "tk": "tk-spiek"   }
}
```

All seven types above are already styled in `planner.css`. You may add custom types but they will need CSS.

---

### `weekIndex`

Controls which week tab is shown by default when the user opens the planner.

**`"linear"` mode** — for planners with consecutive weekly blocks starting on a fixed date:
```json
{ "mode": "linear", "startDate": "2026-05-14" }
```
Generates: `Math.min(weeks.length - 1, Math.max(0, Math.floor((today - startDate) / 7 days)))`

**`"boundaries"` mode** — for non-consecutive or irregular schedules:
```json
{
  "mode": "boundaries",
  "dates": ["2026-05-15", "2026-05-21", "2026-06-08", "2026-06-12", "2026-06-18"],
  "default": 3
}
```
`dates` defines the start of each period boundary. Generates a loop: returns index `i` when `today >= dates[i] && today < dates[i+1]`. Falls back to `default` when no range matches.

---

### `scienceStrip`

Array of info pills rendered at the top of the page (cognitive science study tips, exam info, etc.).

```json
[
  { "strong": "🌅 9–11u: Piekconcentratie", "text": "Nieuwe moeilijke stof, harde oefeningen, analytisch werk" },
  { "strong": "📆 Spaced repetition",        "text": "Dag 0 → dag 1 → dag 3 → dag 7 → dag 14" }
]
```

`strong` is the bold header inside the pill. `text` is the body text (renders as plain text, not bold).

---

### Week objects

```json
{
  "label": "Week 1 — Fundamenten",
  "subtitle": "Q1 + Q2 + Q3 leren, eerste aanraking",
  "days": [ ... ]
}
```

`subtitle` is optional — omit the key or set it to `null` if not needed.

---

### Day objects

```json
{
  "weekday": "Vr",
  "dateDisplay": "15 mei",
  "isoDate": "2026-05-15",
  "tag": "t-q1",
  "tagText": "Q1",
  "sessions": [ ... ]
}
```

| Field | Description |
|-------|-------------|
| `weekday` | Short day name in Dutch: `"Ma"`, `"Di"`, `"Wo"`, `"Do"`, `"Vr"`, `"Za"`, `"Zo"` |
| `dateDisplay` | Human-readable date shown in the card header, e.g. `"15 mei"`, `"2 jun"`, `"1 juni"` |
| `isoDate` | ISO date string used for today-detection: `"YYYY-MM-DD"` |
| `tag` | CSS class for the colored tag chip. See **Available day tags** below. |
| `tagText` | Short label shown inside the tag chip, e.g. `"Q1"`, `"Theorie"`, `"EXAMEN"` |

**Available day tag classes** (all styled in `planner.css`):

| Class | Color | Typical use |
|-------|-------|-------------|
| `t-q1` … `t-q6` | green / red | Topic-specific sections of an exam |
| `t-th` | green | Theory study day |
| `t-sa` | grey | Lab / SageMath / practical |
| `t-review` | green | Review / repetition day |
| `t-exam` | red | Actual exam day |
| `t-mock` | red-orange | Mock exam day |
| `t-ex` | red | Exercise day |
| `t-rest` | grey | Rest day |

---

### Session objects

```json
{
  "title": "Q1: Getallenstelsels — Theorie",
  "time": "9–10u",
  "dur": "45 min",
  "isBreak": false,
  "tasks": [ ... ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Session title shown in the collapsible header |
| `time` | string \| null | Time badge text, e.g. `"9–10u"`, `"15:30"`. Use `"rest"` for a no-time break. Omit or `null` for no badge. |
| `dur` | string | Duration label, e.g. `"45 min"`, `"1u30"`. Empty string `""` is fine. |
| `isBreak` | boolean | `true` = renders as a grey separator bar (no timer, no task list). |
| `tasks` | array | Task objects. Use `[]` for breaks or timer-only sessions. |

---

### Task objects — simple mode (`renderTask: "simple"`)

```json
{ "text": "Lees STUDIEHULP: sectie Q1 volledig door", "min": 10 }
```

### Task objects — kanban mode (`renderTask: "kanban"`)

```json
{ "type": "lees", "text": "Cursus H1: floating-point, IEEE 754, machineprecisie ε_mach", "min": 15 }
```

`type` must be a key in `typeMap`. `min` is planned duration in minutes; use `0` for no time badge.

---

## Generating the HTML page

Create `pages/{id}-planner.html` using this exact template. Substitute every `{placeholder}` with the value from the definition.

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
<link rel="dns-prefetch" href="https://firestore.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;700&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300;1,6..72,400&family=JetBrains+Mono:wght@400;500&display=swap" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;700&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300;1,6..72,400&family=JetBrains+Mono:wght@400;500&display=swap"></noscript>
<link rel="stylesheet" href="../css/hg-tokens.css">
<link rel="stylesheet" href="../css/planner.css">
<style>:root { --pl-accent: {accent}; }</style>
<!-- HydrarGyrum: stub zodat niet-module scripts onReady() kunnen aanroepen vóór module laadt -->
<script>
  window._hgProgress = {
    userId: null, _pending: [],
    load: function() { return Promise.resolve(null); },
    save: function() { return Promise.resolve(false); },
    onReady: function(cb) { this._pending.push(cb); }
  };
</script>
<link rel="modulepreload" href="../js/progress.js">
<link rel="modulepreload" href="../js/firebase-config.js">
<script type="module" src="../js/progress.js"></script>
<script defer src="../js/sound-system.js"></script>
<script defer src="../js/planner-widgets.js"></script>
<script defer src="../js/data/{id}-weeks.js"></script>
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
    <span class="topbar-sub">{subtitle}</span>
    <div class="topbar-right">
      <div class="exam-countdown" id="countdown">laden…</div>
      <div class="planner-cross" id="planner-cross"></div>
      <div class="overall-progress">
        <span id="done-count">0</span>/<span id="total-count">0</span>
        <div class="overall-bar"><div class="overall-fill" id="overall-fill" style="width:0%"></div></div>
      </div>
      <span id="sync-status">○ laden…</span>
      <button class="topbar-btn" id="theme-btn" type="button"><span class="dot"></span><span class="theme-label">Dark</span></button>
    </div>
  </div>
</header>

<div class="container">

  {SCIENCE_STRIP}

  {EXAM_NOTE}

  <div class="week-tabs" id="week-tabs"></div>
  <div id="planner-weeks"></div>

</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  var EXAM_DATE = new Date('{examDate}');
  var STATE_KEY = '{stateKey}';

  {TYPE_MAP}

  HgPlanner.createPlanner({
    stateKey:     STATE_KEY,
    firestoreKey: '{firestoreKey}',
    examDate:     EXAM_DATE,
    weeks:        {id}Weeks,
    renderTask:   '{renderTask}',
    {TYPE_MAP_PARAM}getWeekIndex: {WEEK_INDEX}
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

### Substitution rules for the HTML template

**`{SCIENCE_STRIP}`** — omit the block entirely if `scienceStrip` is `null`. Otherwise:
```html
<div class="science-strip">
  <div class="sci-pill"><strong>{pill.strong}</strong>{pill.text}</div>
  <!-- one div per pill -->
</div>
```

**`{EXAM_NOTE}`** — omit the block entirely if `examNote` is `null`. Otherwise:
```html
<div class="exam-note">{examNote}</div>
```
`examNote` may contain raw HTML (e.g. `<strong>`, `&bull;`, `&mdash;`). Paste it as-is.

**`{TYPE_MAP}`** — omit entirely if `typeMap` is `null`. Otherwise emit a JS object:
```js
var TYPE = {
  lees:    { label: 'LEES',    bk: 'tb-lees',    tk: 'tk-lees'    },
  schrijf: { label: 'SCHRIJF', bk: 'tb-schrijf', tk: 'tk-schrijf' },
  // … one entry per typeMap key
};
```

**`{TYPE_MAP_PARAM}`** — omit entirely if `typeMap` is `null`. Otherwise emit: `typeMap: TYPE,` (with a trailing comma and a newline).

**`{WEEK_INDEX}`** — the `getWeekIndex` function body.

For `"linear"` mode with N weeks and `startDate`:
```js
function() {
  var today = new Date();
  return Math.min(N_MINUS_ONE, Math.max(0, Math.floor((today - new Date('STARTDATE')) / (7*24*60*60*1000))));
}
```
Replace `N_MINUS_ONE` with `weeks.length - 1` (a literal number) and `STARTDATE` with the ISO date string.

For `"boundaries"` mode:
```js
function() {
  var today = new Date();
  var bounds = [
    new Date('DATE_0'), new Date('DATE_1'),
    new Date('DATE_2'), new Date('DATE_3'),
    // … all dates
  ];
  for (var i = 0; i < bounds.length - 1; i++) {
    if (today >= bounds[i] && today < bounds[i+1]) return i;
  }
  return DEFAULT;
}
```

**`{id}Weeks`** — the camelCase weeks variable name from the data file, e.g. `caWeeks`, `wrWeeks`, `mmWeeks`.

---

## Generating the weeks data file

Create `js/data/{id}-weeks.js`:

```js
// {Uppercase ID} Studieplanner weekdata
// Vereist window.isToday (gezet door planner-widgets.js)

var {id}Weeks = [
  {
    label: "Week 1 — Fundamenten",
    subtitle: "Q1 + Q2 + Q3 leren, eerste aanraking",
    days: [
      {
        label: "Vr", date: "15 mei", tag: "t-q1", tagText: "Q1",
        today: isToday('2026-05-15'),
        sessions: [
          { title: "Q1: Getallenstelsels — Theorie", time: "9–10u", dur: "45 min", tasks: [
            { text: "Lees STUDIEHULP: sectie Q1 volledig door", min: 10 },
            { text: "Zet de formule voor 2-complement op een blaadje", min: 5 },
          ]},
          { title: "☕ Pauze", time: "10–10:15u", dur: "15 min", tasks: [], isBreak: true },
        ]
      },
    ]
  },
];
```

**Key rules:**

- Variable must be named `{id}Weeks` (camelCase id + capital W + "eeks"). E.g. `caWeeks`, `wrWeeks`, `mmWeeks`.
- Every day object must include `today: isToday('YYYY-MM-DD')`. The `isToday` function is exported by `planner-widgets.js` which is loaded before this file via `defer`.
- Use `day.dateDisplay` for `date:` and `day.isoDate` for `isToday(...)`.
- Sessions that are breaks: set `isBreak: true` and `tasks: []`.
- `isBreak: false` may be **omitted** from non-break sessions.
- For kanban tasks, include a `type:` field matching a key in `typeMap`: `{ type: 'lees', text: '...', min: 15 }`.
- For simple tasks, omit `type:`: `{ text: '...', min: 10 }`.
- `min: 0` is valid — it just hides the time badge on that task.
- If a week has no `subtitle`, omit the `subtitle:` line entirely.

---

## Color palette reference

Available CSS variables for `accent` and other styling:

| Variable | Light value | Dark value | Appearance |
|----------|-------------|------------|------------|
| `var(--moss)` | `#2F4A3A` | `#7AA08A` | Dark green |
| `var(--cinnabar)` | `#B85C3E` | `#D9805C` | Red-orange |
| `var(--ink)` | `#1F1F22` | `#ECEBE6` | Near-black / near-white |
| `var(--graphite)` | `#6B6862` | `#A7A39A` | Medium grey |
| `var(--paper)` | `#ECEBE6` | `#15161A` | Background |
| `var(--bone)` | `#E1DED7` | `#1D1E22` | Card background |

---

## Adding the planner to the hub (index.html)

After generating the files, add a card in `index.html` inside the `.hub-grid` section.
Copy an existing `<a class="hub-card card-ca">` block and adapt it:

```html
<a href="pages/{id}-planner.html" class="hub-card card-{id}">
  <div class="card-top">
    <div class="card-icon">
      <!-- Put a relevant SVG icon here (24×24 viewBox) -->
    </div>
    <div class="card-arrow">↗</div>
  </div>
  <div>
    <div class="card-label">Studieplanner</div>
    <div class="card-title">{Full Subject Name}</div>
  </div>
  <div class="card-meta">{one-line description of exam content}</div>
</a>
```

You must also add a `.card-{id}` CSS rule in `index.html`'s inline `<style>` block. Copy a `.card-ca` or `.card-wr` rule and change the color.

---

## Reference definitions

- `js/data/ca-planner-def.json` — complete definition for the CA planner (simple mode).
- `js/data/wr-planner-def.json` — complete definition for the WR planner (kanban mode).

These are the canonical examples. When in doubt, look at these files and the generated `pages/ca-planner.html` / `js/data/ca-weeks.js` to understand exactly what output is expected.
