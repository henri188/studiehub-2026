/* HydrarGyrum — Dagweergave: één widget met alle vakken voor vandaag */
(function () {
  'use strict';

  var PLANNERS = [
    { id: 'mm', href: 'pages/planner.html?id=mm', title: 'Multimedia' },
    { id: 'ca', href: 'pages/planner.html?id=ca', title: 'Computerarchitectuur' },
    { id: 'wr', href: 'pages/planner.html?id=wr', title: 'Wetenschappelijk Rekenen' },
    { id: 'wd', href: 'pages/planner.html?id=wd', title: 'Web Development' },
    { id: 'la', href: 'pages/planner.html?id=la', title: 'Lineaire Algebra' },
  ];

  var _store = {}; // planId → { state, cfg, day, wi, di }

  function todayIso() {
    return new Date().toISOString().slice(0, 10);
  }

  function loadState(key) {
    try { return JSON.parse(localStorage.getItem(key)) || {}; } catch (e) { return {}; }
  }

  // ── Tijdherkenning ────────────────────────────────────────────────────────
  function nowMinutes() {
    var n = new Date();
    return n.getHours() * 60 + n.getMinutes();
  }

  function parseTimeRange(str) {
    if (!str) return null;
    // Matcht "9–9:50u", "9:50–10:05u", "14:30–15:15u" — minuten zijn optioneel
    var m = str.match(/(\d{1,2})(?::(\d{2}))?[–\-](\d{1,2})(?::(\d{2}))?/);
    if (!m) return null;
    return {
      start: parseInt(m[1]) * 60 + (m[2] ? parseInt(m[2]) : 0),
      end:   parseInt(m[3]) * 60 + (m[4] ? parseInt(m[4]) : 0),
    };
  }

  function sessionStatus(timeStr) {
    var r = parseTimeRange(timeStr);
    var now = nowMinutes();
    if (!r) return 'none';
    if (now >= r.start && now < r.end) return 'now';
    if (now < r.start) return 'upcoming';
    return 'past';
  }

  function findCurrentSessIdx(sessions) {
    // Zoek eerste actieve sessie; als geen, eerste toekomstige
    var firstUpcoming = -1;
    for (var i = 0; i < sessions.length; i++) {
      var s = sessions[i].time ? sessionStatus(sessions[i].time) : 'none';
      if (s === 'now') return i;
      if (s === 'upcoming' && firstUpcoming === -1) firstUpcoming = i;
    }
    return firstUpcoming; // -1 als alles voorbij
  }

  function persist(planId) {
    var s = _store[planId];
    if (!s) return;
    try { localStorage.setItem(s.cfg.stateKey, JSON.stringify(s.state)); } catch (e) {}
  }

  // ── Global toggle handlers ─────────────────────────────────────────────────
  window.dvToggleTask = function (planId, taskId, e) {
    if (e) e.stopPropagation();
    var s = _store[planId];
    if (!s) return;
    s.state[taskId] = !s.state[taskId];
    persist(planId);
    rerenderWidget();
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

  // ── HTML builders ──────────────────────────────────────────────────────────
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

  function subjectHtml(planId, meta) {
    var s = _store[planId];
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

    var html = '<div class="dv-subject" style="--pl-accent:' + cfg.accent + '">'
      + '<div class="dv-subject-header">'
      + '<a href="' + meta.href + '" class="dv-subject-title">'
      + meta.title + '<span class="dv-block-arrow">↗</span>'
      + '</a>'
      + '<span class="day-tag ' + (day.tag || '') + '">' + (day.tagText || '') + '</span>'
      + '<div class="dv-subject-prog">'
      + '<div class="dv-subject-bar"><div class="day-bar-fill" style="width:' + pct + '%"></div></div>'
      + '<span class="dv-subject-frac">' + done + '/' + total + '</span>'
      + '</div>'
      + '</div>';

    var autoOpenIdx = findCurrentSessIdx(day.sessions);
    day.sessions.forEach(function (sess, si) {
      if (sess.isBreak && !sess.tasks.length) {
        var t = (sess.time && sess.time !== 'rest') ? sess.time + ' — ' : '';
        html += '<div class="break-indicator">' + t + sess.title + '</div>';
        return;
      }

      var sessId = 'sess_' + wi + '_' + di + '_' + si;
      var status = sess.time ? sessionStatus(sess.time) : 'none';
      var isNow  = status === 'now';

      var isOpen;
      if (state['open_' + sessId] !== undefined) {
        isOpen = state['open_' + sessId];
      } else {
        isOpen = (autoOpenIdx === -1 ? si === 0 : si === autoOpenIdx);
      }

      var sessDone = 0;
      sess.tasks.forEach(function (_, ti) {
        if (state[wi + '_' + di + '_' + si + '_' + ti]) sessDone++;
      });
      var complete = sess.tasks.length > 0 && sessDone === sess.tasks.length;

      html += '<div class="session' + (isNow ? ' session-now' : '') + '">'
        + '<div class="session-header" onclick="dvToggleSession(\'' + planId + '\',\'' + sessId + '\',this)">'
        + (sess.time ? '<span class="time-badge">' + sess.time + '</span>' : '')
        + (isNow ? '<span class="session-now-badge">nu</span>' : '')
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

    html += '</div>'; // .dv-subject
    return html;
  }

  function widgetHtml(blocks) {
    // Overall progress across all planners
    var totalAll = 0, doneAll = 0;
    blocks.forEach(function (b) {
      var s = _store[b.meta.id];
      var state = s.state, day = s.day, wi = s.wi, di = s.di;
      day.sessions.forEach(function (sess, si) {
        sess.tasks.forEach(function (_, ti) {
          totalAll++;
          if (state[wi + '_' + di + '_' + si + '_' + ti]) doneAll++;
        });
      });
    });
    var pctAll = totalAll ? Math.round(doneAll / totalAll * 100) : 0;

    var html = '<div class="dv-widget">'
      + '<div class="dv-widget-top">'
      + '<span class="dv-widget-stat">' + doneAll + ' van ' + totalAll + ' taken klaar</span>'
      + '<div class="dv-widget-bar"><div class="dv-widget-fill" style="width:' + pctAll + '%"></div></div>'
      + '<span class="dv-widget-pct">' + pctAll + '%</span>'
      + '</div>';

    blocks.forEach(function (b) {
      html += subjectHtml(b.meta.id, b.meta);
    });

    html += '</div>';
    return html;
  }

  function rerenderWidget() {
    var el = document.getElementById('day-view-widget');
    if (!el || !el._blocks) return;
    el.innerHTML = widgetHtml(el._blocks);
  }

  // ── Init ───────────────────────────────────────────────────────────────────
  async function init() {
    var section = document.getElementById('day-view-section');
    var widgetEl = document.getElementById('day-view-widget');
    if (!widgetEl) return;

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
      _store[meta.id] = { state: loadState(def.stateKey), cfg: def, day: found.day, wi: found.wi, di: found.di };
      blocks.push({ meta: meta, def: def });
    });

    if (!blocks.length) {
      if (section) section.style.display = 'none';
      return;
    }
    if (section) section.removeAttribute('style');

    widgetEl._blocks = blocks;
    widgetEl.innerHTML = widgetHtml(blocks);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
