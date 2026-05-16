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

  function parseDurationMinutes(dur) {
    if (!dur) return 0;
    var m = String(dur).match(/(\d+(?:[\.,]\d+)?)\s*(uur|u|min)/i);
    if (!m) return 0;
    var val = parseFloat(m[1].replace(',', '.'));
    if (m[2].toLowerCase().indexOf('u') === 0) return Math.round(val * 60);
    return Math.round(val);
  }

  function sumTaskMinutes(sess) {
    var total = 0;
    (sess.tasks || []).forEach(function(task) { total += (task.min || 0); });
    return total;
  }

  function plannedMinutes(sess) {
    var taskMin = sumTaskMinutes(sess);
    if (taskMin > 0) return taskMin;
    return parseDurationMinutes(sess.dur);
  }

  function formatClock(sec, targetSec) {
    if (!targetSec) return '--:--';
    var s = Math.max(0, Math.floor(sec));
    var m = Math.floor(s / 60);
    var r = s % 60;
    return String(m).padStart(2, '0') + ':' + String(r).padStart(2, '0');
  }

  function ensureTimers(state) {
    if (!state._timers) state._timers = {};
    return state._timers;
  }

  function getTimerState(state, sessId) {
    var timers = ensureTimers(state);
    if (!timers[sessId]) timers[sessId] = { trackedSec: 0, running: false, startedAt: 0, targetSec: 0 };
    return timers[sessId];
  }

  function getTrackedSeconds(timer, now) {
    if (!timer.running || !timer.startedAt) return timer.trackedSec || 0;
    return (timer.trackedSec || 0) + Math.max(0, Math.floor((now - timer.startedAt) / 1000));
  }

  function getTargetSeconds(timer, plannedMin) {
    return timer.targetSec || (plannedMin ? plannedMin * 60 : 0);
  }

  function timerHtml(sessId, timer, plannedMin, now) {
    var targetSec = getTargetSeconds(timer, plannedMin);
    var trackedSec = getTrackedSeconds(timer, now);
    var remainingSec = Math.max(0, targetSec - trackedSec);
    var isDone = targetSec > 0 && remainingSec === 0;
    return '<div class="session-timer' + (timer.running ? ' running' : '') + (isDone ? ' done' : '') + '"'
      + ' data-sess="' + sessId + '" data-planned="' + plannedMin + '">' 
      + '<button class="timer-btn timer-btn-main" onclick="toggleTimer(\'' + sessId + '\',event)">' + (timer.running ? '⏸' : '▶') + '</button>'
      + '<span class="timer-remaining">' + formatClock(remainingSec, targetSec) + '</span>'
      + '<span class="timer-progress">' + Math.round(trackedSec / 60) + '/' + Math.round(targetSec / 60) + 'm</span>'
      + '<div class="timer-quick">'
      + '<button class="timer-chip" onclick="setTimerMinutes(\'' + sessId + '\',5,event)">5m</button>'
      + '<button class="timer-chip" onclick="setTimerMinutes(\'' + sessId + '\',10,event)">10m</button>'
      + '<button class="timer-chip" onclick="setTimerMinutes(\'' + sessId + '\',15,event)">15m</button>'
      + '</div>'
      + '<button class="timer-btn timer-reset" onclick="resetTimer(\'' + sessId + '\',event)">↺</button>'
      + '</div>';
  }

  function daySummaryHtml(day, trackedMin, plannedMin, remainingMin, pctDay, dayLeftMin) {
    return '<div class="day-summary" data-day-key="' + day.date + '" data-day-planned="' + plannedMin + '">'
      + '<div class="day-stat"><span class="day-stat-n" data-day-worked>' + trackedMin + 'm</span><span class="day-stat-l">gewerkt</span></div>'
      + '<div class="day-stat"><span class="day-stat-n" data-day-planned>' + plannedMin + 'm</span><span class="day-stat-l">gepland</span></div>'
      + '<div class="day-stat"><span class="day-stat-n" data-day-remaining>' + remainingMin + 'm</span><span class="day-stat-l">nog nodig</span></div>'
      + '<div class="day-bar"><div class="day-bar-fill" data-day-fill style="width:' + pctDay + '%"></div></div>'
      + (dayLeftMin !== null ? '<div class="day-stat day-stat-right"><span class="day-stat-n" data-day-left>' + dayLeftMin + 'm</span><span class="day-stat-l">dag rest</span></div>' : '')
      + '</div>';
  }

  function playTimerSound() {
    try {
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 880;
      gain.gain.value = 0.04;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      setTimeout(function() { osc.stop(); ctx.close(); }, 350);
    } catch (e) {}
  }

  function updateTimerDom(cfg, state) {
    var now = Date.now();
    document.querySelectorAll('.session-timer').forEach(function(el) {
      var sessId = el.getAttribute('data-sess');
      var plannedMin = parseInt(el.getAttribute('data-planned') || '0', 10);
      var timer = getTimerState(state, sessId);
      var targetSec = getTargetSeconds(timer, plannedMin);
      var trackedSec = getTrackedSeconds(timer, now);
      var remainingSec = Math.max(0, targetSec - trackedSec);
      var isDone = targetSec > 0 && remainingSec === 0;
      el.classList.toggle('running', timer.running);
      el.classList.toggle('done', isDone);
      var btn = el.querySelector('.timer-btn-main');
      if (btn) btn.textContent = timer.running ? '⏸' : '▶';
      var rem = el.querySelector('.timer-remaining');
      if (rem) rem.textContent = formatClock(remainingSec, targetSec);
      var prog = el.querySelector('.timer-progress');
      if (prog) prog.textContent = Math.round(trackedSec / 60) + '/' + Math.round(targetSec / 60) + 'm';
    });
  }

  function collectDailyTotals(cfg, state, now) {
    var totals = { byDate: {}, todayKey: null };
    cfg.weeks.forEach(function(week, wi) {
      week.days.forEach(function(day, di) {
        var dayPlannedMin = 0;
        var dayTrackedSec = 0;
        day.sessions.forEach(function(sess, si) {
          if (sess.isBreak && !sess.tasks.length) return;
          var plannedMin = plannedMinutes(sess);
          dayPlannedMin += plannedMin;
          var sessId = 'sess_' + wi + '_' + di + '_' + si;
          var timer = getTimerState(state, sessId);
          dayTrackedSec += getTrackedSeconds(timer, now);
        });
        totals.byDate[day.date] = {
          plannedMin: dayPlannedMin,
          trackedMin: Math.round(dayTrackedSec / 60)
        };
        if (day.today) totals.todayKey = day.date;
      });
    });
    return totals;
  }

  function updateDaySummaries(cfg, state) {
    var now = Date.now();
    var totals = collectDailyTotals(cfg, state, now);
    Object.keys(totals.byDate).forEach(function(key) {
      var el = document.querySelector('.day-summary[data-day-key="' + key + '"]');
      if (!el) return;
      var t = totals.byDate[key];
      var remainingMin = Math.max(0, t.plannedMin - t.trackedMin);
      var pctDay = t.plannedMin ? Math.min(100, Math.round(t.trackedMin / t.plannedMin * 100)) : 0;
      var worked = el.querySelector('[data-day-worked]');
      var planned = el.querySelector('[data-day-planned]');
      var remaining = el.querySelector('[data-day-remaining]');
      var fill = el.querySelector('[data-day-fill]');
      if (worked) worked.textContent = t.trackedMin + 'm';
      if (planned) planned.textContent = t.plannedMin + 'm';
      if (remaining) remaining.textContent = remainingMin + 'm';
      if (fill) fill.style.width = pctDay + '%';
      if (key === totals.todayKey) {
        var leftEl = el.querySelector('[data-day-left]');
        if (leftEl) {
          var end = new Date();
          end.setHours(23, 59, 59, 999);
          var dayLeftMin = Math.max(0, Math.round((end.getTime() - now) / 60000));
          leftEl.textContent = dayLeftMin + 'm';
        }
      }
    });
    try { localStorage.setItem('hg_planner_totals_' + cfg.firestoreKey, JSON.stringify(totals.byDate)); } catch (e) {}
    updateCrossPlanner(cfg, totals);
  }

  function updateCrossPlanner(cfg, totals) {
    var el = document.getElementById('planner-cross');
    if (!el) return;
    if (!totals.todayKey) { el.textContent = ''; return; }
    var otherKey = cfg.firestoreKey === 'ca' ? 'wr' : 'ca';
    var otherTotals = {};
    try { otherTotals = JSON.parse(localStorage.getItem('hg_planner_totals_' + otherKey) || '{}'); } catch (e) {}
    var self = totals.byDate[totals.todayKey];
    var other = otherTotals[totals.todayKey];
    if (!self && !other) { el.textContent = ''; return; }
    var selfLabel = cfg.firestoreKey.toUpperCase();
    var otherLabel = otherKey.toUpperCase();
    var selfTxt = self ? (self.trackedMin + '/' + self.plannedMin + 'm') : '—';
    var otherTxt = other ? (other.trackedMin + '/' + other.plannedMin + 'm') : '—';
    el.textContent = 'Vandaag: ' + selfLabel + ' ' + selfTxt + ' • ' + otherLabel + ' ' + otherTxt;
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
    var dayTotals = {};
    var todayKey = null;
    var now = Date.now();

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
        var sessPlanned = [];
        var dayPlannedMin = 0;
        var dayTrackedSec = 0;
        day.sessions.forEach(function(sess, si) {
          if (sess.isBreak && !sess.tasks.length) return;
          var plannedMin = plannedMinutes(sess);
          sessPlanned[si] = plannedMin;
          dayPlannedMin += plannedMin;
          var sessId = 'sess_' + wi + '_' + di + '_' + si;
          var timer = getTimerState(state, sessId);
          dayTrackedSec += getTrackedSeconds(timer, now);
        });
        var trackedMin = Math.round(dayTrackedSec / 60);
        var remainingMin = Math.max(0, dayPlannedMin - trackedMin);
        var pctDay = dayPlannedMin ? Math.min(100, Math.round(trackedMin / dayPlannedMin * 100)) : 0;
        var dayLeftMin = null;
        if (day.today) {
          var end = new Date();
          end.setHours(23, 59, 59, 999);
          dayLeftMin = Math.max(0, Math.round((end.getTime() - now) / 60000));
          todayKey = day.date;
        }
        dayTotals[day.date] = { plannedMin: dayPlannedMin, trackedMin: trackedMin };

        html += '<div class="day-card' + (day.today ? ' today' : '') + '">' 
          + '<div class="day-header">'
          + (day.today ? '<div class="today-dot"></div>' : '')
          + '<div class="day-label">' + day.label
          + ' <span style="color:var(--graphite);font-weight:400">' + day.date + '</span></div>'
          + '<span class="day-tag ' + day.tag + '">' + day.tagText + '</span>'
          + '</div>'
          + daySummaryHtml(day, trackedMin, dayPlannedMin, remainingMin, pctDay, dayLeftMin);

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
          var timer = getTimerState(state, sessId);
          var plannedMin = sessPlanned[si] || plannedMinutes(sess);

          html += '<div class="session">'
            + '<div class="session-header" onclick="toggleSession(\'' + sessId + '\',this)">' 
            + (sess.time ? '<span class="time-badge">' + sess.time + '</span>' : '')
            + '<span class="session-title"' + (complete ? ' data-complete="true"' : '') + '>'
            + (complete ? '&#10003; ' : '') + sess.title + '</span>'
            + (sess.dur ? '<span class="session-dur">' + sess.dur + '</span>' : '')
            + (sess.tasks.length ? '<span class="chevron' + (isOpen ? ' open' : '') + '">&#9658;</span>' : '')
            + '</div>'
            + (sess.isBreak ? '' : timerHtml(sessId, timer, plannedMin, now));

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

    try { localStorage.setItem('hg_planner_totals_' + cfg.firestoreKey, JSON.stringify(dayTotals)); } catch (e) {}
    updateCrossPlanner(cfg, { byDate: dayTotals, todayKey: todayKey });
  }

  // ── createPlanner ─────────────────────────────────────────────────────────
  function createPlanner(cfg) {
    var state = {};
    var syncTimer;
    var tickId;
    var lastTickSave = 0;

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

    function renderAndSync() {
      renderAll(cfg, state);
      updateTimerDom(cfg, state);
      updateDaySummaries(cfg, state);
    }

    function startTimerLoop() {
      if (tickId) return;
      tickId = setInterval(function() {
        var now = Date.now();
        var anyRunning = false;
        Object.keys(ensureTimers(state)).forEach(function(key) {
          if (state._timers[key].running) anyRunning = true;
        });
        if (!anyRunning) return;

        updateTimerDom(cfg, state);
        updateDaySummaries(cfg, state);

        if (now - lastTickSave > 30000) {
          lastTickSave = now;
          saveState();
        }

        Object.keys(ensureTimers(state)).forEach(function(key) {
          var timer = state._timers[key];
          if (!timer.running) return;
          var plannedMin = 0;
          var el = document.querySelector('.session-timer[data-sess="' + key + '"]');
          if (el) plannedMin = parseInt(el.getAttribute('data-planned') || '0', 10);
          var targetSec = getTargetSeconds(timer, plannedMin);
          var trackedSec = getTrackedSeconds(timer, now);
          if (targetSec > 0 && trackedSec >= targetSec) {
            timer.trackedSec = targetSec;
            timer.running = false;
            timer.startedAt = 0;
            saveState();
            playTimerSound();
            updateTimerDom(cfg, state);
            updateDaySummaries(cfg, state);
          }
        });
      }, 1000);
    }

    global.toggleTask = function(taskId, e) {
      if (e) e.stopPropagation();
      state[taskId] = !state[taskId];
      saveState();
      renderAndSync();
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

    global.toggleTimer = function(sessId, e) {
      if (e) e.stopPropagation();
      var timer = getTimerState(state, sessId);
      if (timer.running) {
        timer.trackedSec = getTrackedSeconds(timer, Date.now());
        timer.running = false;
        timer.startedAt = 0;
      } else {
        if (!timer.targetSec) {
          var el = document.querySelector('.session-timer[data-sess="' + sessId + '"]');
          var plannedMin = el ? parseInt(el.getAttribute('data-planned') || '0', 10) : 0;
          timer.targetSec = plannedMin ? plannedMin * 60 : 5 * 60;
        }
        timer.running = true;
        timer.startedAt = Date.now();
      }
      saveState();
      updateTimerDom(cfg, state);
      updateDaySummaries(cfg, state);
    };

    global.resetTimer = function(sessId, e) {
      if (e) e.stopPropagation();
      var timer = getTimerState(state, sessId);
      timer.trackedSec = 0;
      timer.running = false;
      timer.startedAt = 0;
      saveState();
      updateTimerDom(cfg, state);
      updateDaySummaries(cfg, state);
    };

    global.setTimerMinutes = function(sessId, min, e) {
      if (e) e.stopPropagation();
      var timer = getTimerState(state, sessId);
      timer.targetSec = Math.max(0, min) * 60;
      timer.trackedSec = 0;
      timer.running = false;
      timer.startedAt = 0;
      saveState();
      updateTimerDom(cfg, state);
      updateDaySummaries(cfg, state);
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
      renderAndSync();
      startTimerLoop();
      if (typeof cfg.getWeekIndex === 'function') showWeek(cfg.getWeekIndex());
    });
  }

  // ── Exports ───────────────────────────────────────────────────────────────
  global.HgPlanner = { createPlanner: createPlanner, isToday: isToday };
  global.isToday   = isToday;  // available during data-array definitions

})(window);
