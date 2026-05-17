# HydrarGyrum Planner Format

Instructions for adding a new study planner to the HydrarGyrum Studiehub.

---

## Architecture

The site uses a **JSON-driven architecture**. Every planner is one file:

| File | Purpose |
|------|---------|
| `js/data/{id}-planner-def.json` | All planner data and config |

The generic page `pages/planner.html?id={id}` fetches the JSON at runtime and renders everything. **No HTML file to generate, no JS data file to generate.**

Do **not** modify `js/planner-widgets.js`, `css/planner.css`, `css/hg-tokens.css`, or `pages/planner.html`.

---

## Workflow

1. Create `js/data/{id}-planner-def.json` using the schema below.
2. Add a hub card in `index.html` linking to `pages/planner.html?id={id}`.
3. Done.

---

## JSON Definition Schema

```json
{
  "id": "ca",
  "title": "CA Studieplanner",
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
| `id` | string | Short lowercase identifier, e.g. `"ca"`, `"wr"`, `"mm"`. |
| `title` | string | Shown in topbar and `<title>`. |
| `accent` | string | CSS value for `--pl-accent`. Use a palette token: `"var(--moss)"`, `"var(--cinnabar)"`, etc. |
| `stateKey` | string | localStorage key for progress. Use `"{id}_planner_v1"`. |
| `firestoreKey` | string | Cloud sync key. Usually equal to `id`. |
| `examDate` | string | ISO date of the exam, e.g. `"2026-06-08"`. Drives the countdown. |
| `renderTask` | `"simple"` \| `"kanban"` | Task display mode. |
| `typeMap` | object \| null | Required for kanban mode. `null` for simple mode. |
| `weekIndex` | object | Which week tab is active by default. |
| `scienceStrip` | array \| null | Info pills at the top of the page. `null` to omit. |
| `examNote` | string \| null | Raw HTML exam-info banner below the strip. `null` to omit. |
| `weeks` | array | Array of week objects. |

---

### `typeMap` (kanban mode only)

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

All seven types above are already styled in `planner.css`. Custom types need extra CSS.

---

### `weekIndex`

**`"linear"` mode** — consecutive weekly blocks from a fixed start date:
```json
{ "mode": "linear", "startDate": "2026-05-14" }
```

**`"boundaries"` mode** — irregular schedules:
```json
{
  "mode": "boundaries",
  "dates": ["2026-05-15", "2026-05-21", "2026-06-08", "2026-06-12", "2026-06-18"],
  "default": 3
}
```
`dates` has **N+1 entries** for N weeks. Returns index `i` when `dates[i] <= today < dates[i+1]`. Falls back to `default` when no interval matches (e.g. after the last date).

---

### `scienceStrip`

```json
[
  { "strong": "🌅 9–11u: Piekconcentratie", "text": "Nieuwe moeilijke stof, harde oefeningen, analytisch werk" },
  { "strong": "📆 Spaced repetition",        "text": "Dag 0 → dag 1 → dag 3 → dag 7 → dag 14" }
]
```

---

### Week objects

```json
{
  "label": "Week 1 — Fundamenten",
  "subtitle": "Q1 + Q2 + Q3 leren, eerste aanraking",
  "days": [ ... ]
}
```

`subtitle` is optional.

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
| `weekday` | Short Dutch day: `"Ma"`, `"Di"`, `"Wo"`, `"Do"`, `"Vr"`, `"Za"`, `"Zo"` |
| `dateDisplay` | Human-readable date, e.g. `"15 mei"`, `"2 jun"` |
| `isoDate` | ISO date `"YYYY-MM-DD"` — used for today-detection |
| `tag` | CSS class for the colored chip. See **Day tags** below. |
| `tagText` | Label inside the chip, e.g. `"Q1"`, `"Theorie"`, `"EXAMEN"` |

**Day tag classes** (all in `planner.css`):

| Class | Color | Use |
|-------|-------|-----|
| `t-q1` … `t-q6` | green / red | Topic-specific sections |
| `t-th` | green | Theory day |
| `t-sa` | grey | Lab / SageMath / practical |
| `t-review` | green | Review / repetition |
| `t-exam` | red | Exam day |
| `t-mock` | red-orange | Mock exam |
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
| `title` | string | Shown in the collapsible header |
| `time` | string \| null | Time badge, e.g. `"9–10u"`. `null` for none. |
| `dur` | string | Duration label, e.g. `"45 min"`. `""` is fine. |
| `isBreak` | boolean | `true` = grey separator bar (no tasks, no timer) |
| `tasks` | array | Task objects. `[]` for breaks or timer-only sessions. |

---

### Task objects — simple mode

```json
{ "text": "Lees STUDIEHULP: sectie Q1 volledig door", "min": 10 }
```

### Task objects — kanban mode

```json
{ "type": "lees", "text": "Cursus H1: floating-point, IEEE 754", "min": 15 }
```

`type` must be a key in `typeMap`. `min: 0` hides the time badge.

---

## Adding to index.html

Add a card inside `.hub-grid`:

```html
<a href="pages/planner.html?id={id}" class="hub-card card-{id}">
  <div class="card-top">
    <div class="card-icon">
      <!-- 24×24 SVG icon -->
    </div>
    <div class="card-arrow">↗</div>
  </div>
  <div>
    <div class="card-label">Studieplanner</div>
    <div class="card-title">{Subject Name}</div>
  </div>
  <div class="card-meta">{one-line exam description}</div>
  <div class="countdown-pill" id="{id}-pill">
    <span class="countdown-dot"></span>laden…
  </div>
</a>
```

Add a `.card-{id}` rule in `css/hub.css` (copy `.card-ca` or `.card-wr` and change the color).

---

## Color palette

| Variable | Appearance |
|----------|------------|
| `var(--moss)` | Dark green |
| `var(--cinnabar)` | Red-orange |
| `var(--ink)` | Near-black / near-white |
| `var(--graphite)` | Medium grey |
| `var(--paper)` | Page background |
| `var(--bone)` | Card background |

---

## Reference definitions

- `js/data/ca-planner-def.json` — CA planner, simple task mode.
- `js/data/wr-planner-def.json` — WR planner, kanban task mode.
