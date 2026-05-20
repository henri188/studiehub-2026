/* HydrarGyrum — Dagweergave: vandaag's taken per vak, gerenderd op de homepage */
(function () {
  'use strict';

  var PLANNERS = [
    { id: 'mm', href: 'pages/planner.html?id=mm', title: 'Multimedia' },
    { id: 'ca', href: 'pages/planner.html?id=ca', title: 'Computerarchitectuur' },
    { id: 'wr', href: 'pages/planner.html?id=wr', title: 'Wetenschappelijk Rekenen' },
    { id: 'wd', href: 'pages/planner.html?id=wd', title: 'Web Development' },
    { id: 'la', href: 'pages/planner.html?id=la', title: 'Lineaire Algebra' },
  ];

  var _store = {}; // planId → { state, cfg: def, day, wi, di }

  function todayIso() {
    return new Date().toISOString().slice(0, 10);
  }

  function loadState(key) {
    try { return JSON.parse(localStorage.getItem(key)) || {}; } catch (e) { return {}; }
  }

  function persist(planId) {
    var s = _store[planId];
    if (!s) return;
    try { localStorage.setItem(s.cfg.stateKey, JSON.stringify(s.state)); } catch (e) {}
  }

  // ── Global toggle handlers (namespaced per planner) ──────────────────────────
  window.dvToggleTask = function (planId, taskId, e) {
    if (e) e.stopPropagation();
    var s = _store[planId];
    if (!s) return;
    s.state[taskId] = !s.state[taskId];
    persist(planId);
    rerenderContent(planId);
    if (window.HgSound) window.HgSound.play(s.state[taskId] ? 'task-check' : 'task-uncheck');
  };

  window.dvToggleSession = function (planId, sessId, headerEl) {
    var s = _store[planId];
    if (!s) return;
    var key = 'open_' + sessId;
    s.state[key] = !s.state[key];
    persist(planId);
    var tasksEl = document.getElementById('dv_' + planId + '_' + sessId);
    var ch = headerEl.querySelector('.chevron');
    if (tasksEl) tasksEl.classList.toggle('open', s.state[key]);
    if (ch) ch.classList.toggle('open', s.state[key]);
  };

  // ── HTML builders ────────────────────────────────────────────────────────────
  function taskHtml(planId, cfg, task, taskId, done) {
    if (cfg.renderTask === 'kanban') {
      var tm = (task.type && cfg.typeMap && cfg.typeMap[task.type]) || null;
      return '<div class="ticket' + (tm ? ' ' + tm.tk : '') + (done ? ' ticket-done' : '') + '" onclick="dvToggleTask(\'' + planId + '\',\'' + taskId + '\',event)">'
        + '<div class="task-check' + (done ? ' done' : '') + '"></div>'
        + '<div class="task-body">'
        + (tm ? '<span class="task-badge ' + tm.bk + '">' + tm.label + '</span>' : '')
        + '<div class="task-text' + (done ? ' done' : '') + '">' + task.text + '</div>'
        + '</div>'
        + (task.min > 0 ? '<span class="task-time">' + task.min + ' min</span>' : '')
        + '</div>';
    }
    return '<div class="task" onclick="dvToggleTask(\'' + planId + '\',\'' + taskId + '\',event)">'
      + '<div class="task-check' + (done ? ' done' : '') + '"></div>'
      + '<div class="task-text' + (done ? ' done' : '') + '">' + task.text + '</div>'
      + (task.min > 0 ? '<span class="task-time">' + task.min + ' min</span>' : '')
      + '</div>';
  }

  function blockContentHtml(planId) {
    var s = _store[planId];
    if (!s) return '';
    var cfg = s.cfg, state = s.state, day = s.day, wi = s.wi, di = s.di;
    var isKanban = cfg.renderTask === 'kanban';

    var total = 0, done = 0;
    day.sessions.forEach(function (sess, si) {
      sess.tasks.forEach(function (_, ti) {
        total++;
        if (state[wi + '_' + di + '_' + si + '_' + ti]) done++;
      });
    });
    var pct = total ? Math.round(done / total * 100) : 0;

    var html = '<div class="day-card today">'
      + '<div class="day-header">'
      + '<div class="today-dot"></div>'
      + '<div class="day-label">' + day.label
      + ' <span style="color:var(--graphite);font-weight:400">' + day.date + '</span></div>'
      + '<span class="day-tag ' + (day.tag || '') + '">' + (day.tagText || '') + '</span>'
      + '</div>'
      + '<div class="day-summary">'
      + '<div class="day-stat"><span class="day-stat-n">' + done + '/' + total + '</span><span class="day-stat-l">taken klaar</span></div>'
      + '<div class="day-stat"><span class="day-stat-n">' + pct + '%</span><span class="day-stat-l">voltooiing</span></div>'
      + '<div class="day-bar"><div class="day-bar-fill" style="width:' + pct + '%"></div></div>'
      + '</div>';

    day.sessions.forEach(function (sess, si) {
      if (sess.isBreak && !sess.tasks.length) {
        var t = (sess.time && sess.time !== 'rest') ? sess.time + ' — ' : '';
        html += '<div class="break-indicator">' + t + sess.title + '</div>';
        return;
      }

      var sessId = 'sess_' + wi + '_' + di + '_' + si;
      var isOpen = (state['open_' + sessId] !== undefined)
        ? state['open_' + sessId]
        : (si === 0);

      var sessDone = 0;
      sess.tasks.forEach(function (_, ti) {
        if (state[wi + '_' + di + '_' + si + '_' + ti]) sessDone++;
      });
      var complete = sess.tasks.length > 0 && sessDone === sess.tasks.length;

      html += '<div class="session">'
        + '<div class="session-header" onclick="dvToggleSession(\'' + planId + '\',\'' + sessId + '\',this)">'
        + (sess.time ? '<span class="time-badge">' + sess.time + '</span>' : '')
        + '<span class="session-title"' + (complete ? ' data-complete="true"' : '') + '>'
        + (complete ? '&#10003; ' : '') + sess.title + '</span>'
        + (sess.dur ? '<span class="session-dur">' + sess.dur + '</span>' : '')
        + (sess.tasks.length ? '<span class="chevron' + (isOpen ? ' open' : '') + '">&#9658;</span>' : '')
        + '</div>';

      if (sess.tasks.length) {
        var cls = isKanban ? 'tasks-kanban' : 'tasks';
        html += '<div class="' + cls + (isOpen ? ' open' : '') + '" id="dv_' + planId + '_' + sessId + '">';
        sess.tasks.forEach(function (task, ti) {
          var tid = wi + '_' + di + '_' + si + '_' + ti;
          html += taskHtml(planId, cfg, task, tid, !!state[tid]);
        });
        html += '</div>';
      }
      html += '</div>';
    });

    html += '</div>';
    return html;
  }

  function rerenderContent(planId) {
    var el = document.getElementById('dv-content-' + planId);
    if (el) el.innerHTML = blockContentHtml(planId);
  }

  // ── Init ─────────────────────────────────────────────────────────────────────
  async function init() {
    var section = document.getElementById('day-view-section');
    var grid = document.getElementById('day-view-grid');
    if (!grid) return;

    var today = todayIso();

    var dateEl = document.getElementById('dv-date');
    if (dateEl) {
      var d = new Date(today + 'T12:00:00');
      dateEl.textContent = d.toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' });
    }

    var fetched = await Promise.all(PLANNERS.map(async function (p) {
      try {
        var r = await fetch('js/data/' + p.id + '-planner-def.json');
        if (!r.ok) return null;
        return { meta: p, def: await r.json() };
      } catch (e) { return null; }
    }));

    var blocks = [];
    fetched.forEach(function (item) {
      if (!item) return;
      var def = item.def, meta = item.meta;

      def.weeks.forEach(function (w) {
        w.days.forEach(function (d) {
          if (!d.label) d.label = d.weekday || '';
          if (!d.date)  d.date  = d.dateDisplay || '';
        });
      });

      var found = null;
      def.weeks.forEach(function (week, wi) {
        week.days.forEach(function (day, di) {
          if (day.isoDate === today) found = { day: day, wi: wi, di: di };
        });
      });
      if (!found) return;

      _store[meta.id] = {
        state: loadState(def.stateKey),
        cfg:   def,
        day:   found.day,
        wi:    found.wi,
        di:    found.di,
      };
      blocks.push({ meta: meta, def: def });
    });

    if (!blocks.length) {
      if (section) section.style.display = 'none';
      return;
    }
    if (section) section.removeAttribute('style');

    grid.innerHTML = blocks.map(function (b) {
      return '<div class="dv-block" style="--pl-accent:' + b.def.accent + '">'
        + '<a href="' + b.meta.href + '" class="dv-block-label">'
        + b.meta.title + '<span class="dv-block-arrow">↗</span>'
        + '</a>'
        + '<div id="dv-content-' + b.meta.id + '">'
        + blockContentHtml(b.meta.id)
        + '</div>'
        + '</div>';
    }).join('');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
