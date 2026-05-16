/* HydrarGyrum Planner Widgets — shared logic for all study planners */
(function(global) {
  'use strict';

  // ── Utilities ─────────────────────────────────────────────────────────────
  function isToday(d) {
    return new Date(d).toDateString() === new Date().toDateString();
  }

  function showWeek(idx) {
    document.querySelectorAll('.week-content').forEach(function(el, i) {
      el.classList.toggle('active', i === idx);
    });
    document.querySelectorAll('.week-tab').forEach(function(el, i) {
      el.classList.toggle('active', i === idx);
    });
  }

  function updateCountdown(examDate) {
    var el = document.getElementById('countdown');
    if (!el) return;
    var diff = Math.ceil((examDate - new Date()) / 86400000);
    if (diff > 0)     el.textContent = '📅 Examen over ' + diff + ' dag' + (diff !== 1 ? 'en' : '');
    else if (!diff)   el.textContent = '🎯 VANDAAG is het examen!';
    else              el.textContent = '✅ Examen voorbij';
  }

  function setSyncStatus(s) {
    var el = document.getElementById('sync-status');
    if (!el) return;
    var map = {
      syncing: ['↻ Synchroniseren...', '#fbbf24'],
      synced:  ['☁ Gesynchroniseerd',  '#4ade80'],
      offline: ['○ Lokaal opgeslagen', '#94a3b8'],
    };
    var v = map[s] || ['⚠ Sync mislukt', '#f87171'];
    el.textContent = v[0];
    el.style.color = v[1];
  }

  function tid(wi, di, si, ti) {
    return wi + '_' + di + '_' + si + '_' + ti;
  }

  // ── HTML builders ─────────────────────────────────────────────────────────
  function breakHtml(sess) {
    var t = (sess.time && sess.time !== 'rest') ? sess.time + ' &mdash; ' : '';
    return '<div class="break-indicator">' + t + sess.title + '</div>';
  }

  function simpleTaskHtml(task, taskId, done) {
    return '<div class="task" onclick="toggleTask(\'' + taskId + '\')">'
      + '<div class="task-check' + (done ? ' done' : '') + '"></div>'
      + '<div class="task-text' + (done ? ' done' : '') + '">' + task.text + '</div>'
      + (task.min > 0 ? '<span class="task-time">' + task.min + ' min</span>' : '')
      + '</div>';
  }

  function kanbanTaskHtml(task, taskId, done, typeMap) {
    var tm = (task.type && typeMap[task.type]) || null;
    return '<div class="ticket' + (tm ? ' ' + tm.tk : '') + (done ? ' ticket-done' : '') + '" onclick="toggleTask(\'' + taskId + '\',event)">'
      + '<div class="task-check' + (done ? ' done' : '') + '"></div>'
      + '<div class="task-body">'
      + (tm ? '<span class="task-badge ' + tm.bk + '">' + tm.label + '</span>' : '')
      + '<div class="task-text' + (done ? ' done' : '') + '">' + task.text + '</div>'
      + '</div>'
      + (task.min > 0 ? '<span class="task-time">' + task.min + ' min</span>' : '')
      + '</div>';
  }

  // ── Render ────────────────────────────────────────────────────────────────
  function renderAll(cfg, state) {
    var weeks    = cfg.weeks;
    var isKanban = cfg.renderTask === 'kanban';
    var typeMap  = cfg.typeMap || {};
    var totalTasks = 0, doneTasks = 0;

    weeks.forEach(function(week, wi) {
      var container = document.getElementById('week-' + wi);
      if (!container) return;

      var weekTotal = 0, weekDone = 0;
      week.days.forEach(function(day, di) {
        day.sessions.forEach(function(sess, si) {
          sess.tasks.forEach(function(_, ti) {
            weekTotal++;
            if (state[tid(wi, di, si, ti)]) weekDone++;
          });
        });
      });
      totalTasks += weekTotal;
      doneTasks  += weekDone;
      var pct = weekTotal ? Math.round(weekDone / weekTotal * 100) : 0;
      var wpEl = document.getElementById('wp' + wi);
      if (wpEl) wpEl.textContent = pct + '%';

      var html = '<div class="week-stats">'
        + '<div class="wstat"><div class="wstat-n">' + weekDone + '/' + weekTotal + '</div><div class="wstat-label">taken klaar</div></div>'
        + '<div class="wstat"><div class="wstat-n">' + pct + '%</div><div class="wstat-label">voltooiing</div></div>'
        + '<div class="wstat"><div class="wstat-n">' + week.days.length + '</div><div class="wstat-label">studiedagen</div></div>'
        + (week.subtitle ? '<div class="wstat wstat-sub"><div class="wstat-n">' + week.subtitle + '</div></div>' : '')
        + '</div><div class="day-grid">';

      week.days.forEach(function(day, di) {
        html += '<div class="day-card' + (day.today ? ' today' : '') + '">'
          + '<div class="day-header">'
          + (day.today ? '<div class="today-dot"></div>' : '')
          + '<div class="day-label">' + day.label
          + ' <span style="color:var(--graphite);font-weight:400">' + day.date + '</span></div>'
          + '<span class="day-tag ' + day.tag + '">' + day.tagText + '</span>'
          + '</div>';

        day.sessions.forEach(function(sess, si) {
          if (sess.isBreak && !sess.tasks.length) {
            html += breakHtml(sess);
            return;
          }

          var sessId  = 'sess_' + wi + '_' + di + '_' + si;
          var isOpen  = state['open_' + sessId] !== undefined
            ? state['open_' + sessId]
            : (day.today && si === 0);
          var sessDone = 0;
          sess.tasks.forEach(function(_, ti) { if (state[tid(wi, di, si, ti)]) sessDone++; });
          var complete = sess.tasks.length > 0 && sessDone === sess.tasks.length;

          html += '<div class="session">'
            + '<div class="session-header" onclick="toggleSession(\'' + sessId + '\',this)">'
            + (sess.time ? '<span class="time-badge">' + sess.time + '</span>' : '')
            + '<span class="session-title"' + (complete ? ' data-complete="true"' : '') + '>'
            + (complete ? '&#10003; ' : '') + sess.title + '</span>'
            + (sess.dur ? '<span class="session-dur">' + sess.dur + '</span>' : '')
            + (sess.tasks.length ? '<span class="chevron' + (isOpen ? ' open' : '') + '">&#9658;</span>' : '')
            + '</div>';

          if (sess.tasks.length) {
            var cls = isKanban ? 'tasks-kanban' : 'tasks';
            html += '<div class="' + cls + (isOpen ? ' open' : '') + '" id="' + sessId + '">';
            sess.tasks.forEach(function(task, ti) {
              var taskId = tid(wi, di, si, ti);
              var done = !!state[taskId];
              html += isKanban
                ? kanbanTaskHtml(task, taskId, done, typeMap)
                : simpleTaskHtml(task, taskId, done);
            });
            html += '</div>';
          }
          html += '</div>';
        });

        html += '</div>';
      });

      html += '</div>';
      container.innerHTML = html;
    });

    var overallPct = totalTasks ? Math.round(doneTasks / totalTasks * 100) : 0;
    var dEl = document.getElementById('done-count');
    var tEl = document.getElementById('total-count');
    var fEl = document.getElementById('overall-fill');
    if (dEl) dEl.textContent = doneTasks;
    if (tEl) tEl.textContent = totalTasks;
    if (fEl) fEl.style.width = overallPct + '%';
  }

  // ── createPlanner ─────────────────────────────────────────────────────────
  function createPlanner(cfg) {
    var state = {};
    var syncTimer;

    // Build week tab buttons and week-content divs from cfg.weeks
    var tabsEl  = document.getElementById('week-tabs');
    var weeksEl = document.getElementById('planner-weeks');
    cfg.weeks.forEach(function(week, i) {
      if (tabsEl) {
        var tab = document.createElement('div');
        tab.className = 'week-tab';
        tab.setAttribute('onclick', 'showWeek(' + i + ')');
        tab.innerHTML = week.label + '<br><span class="wprog" id="wp' + i + '">0%</span>';
        tabsEl.appendChild(tab);
      }
      if (weeksEl) {
        var div = document.createElement('div');
        div.id = 'week-' + i;
        div.className = 'week-content';
        weeksEl.appendChild(div);
      }
    });

    function saveState() {
      try { localStorage.setItem(cfg.stateKey, JSON.stringify(state)); } catch(e) {}
      if (!window._hgProgress || !window._hgProgress.userId) {
        setSyncStatus('offline');
        return;
      }
      setSyncStatus('syncing');
      clearTimeout(syncTimer);
      syncTimer = setTimeout(async function() {
        var ok = await window._hgProgress.save(cfg.firestoreKey, state);
        setSyncStatus(ok ? 'synced' : 'error');
      }, 1500);
    }

    global.toggleTask = function(taskId, e) {
      if (e) e.stopPropagation();
      state[taskId] = !state[taskId];
      saveState();
      renderAll(cfg, state);
    };

    global.toggleSession = function(sessId, headerEl) {
      var key = 'open_' + sessId;
      state[key] = !state[key];
      saveState();
      var el = document.getElementById(sessId);
      var ch = headerEl.querySelector('.chevron');
      if (el) el.classList.toggle('open', state[key]);
      if (ch) ch.classList.toggle('open', state[key]);
    };

    global.showWeek = showWeek;

    updateCountdown(cfg.examDate);

    window._hgProgress.onReady(async function() {
      var cloud = await window._hgProgress.load(cfg.firestoreKey);
      if (cloud) {
        state = cloud;
        try { localStorage.setItem(cfg.stateKey, JSON.stringify(state)); } catch(e) {}
        setSyncStatus('synced');
      } else {
        try { state = JSON.parse(localStorage.getItem(cfg.stateKey)) || {}; } catch(e) { state = {}; }
        setSyncStatus('offline');
      }
      renderAll(cfg, state);
      if (typeof cfg.getWeekIndex === 'function') showWeek(cfg.getWeekIndex());
    });
  }

  // ── Exports ───────────────────────────────────────────────────────────────
  global.HgPlanner = { createPlanner: createPlanner, isToday: isToday };
  global.isToday   = isToday;  // available during data-array definitions

})(window);
