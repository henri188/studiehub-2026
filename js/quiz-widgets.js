/* HydrarGyrum Quiz Widgets — shared logic for all practice tools */
(function(global) {
  'use strict';

  function snd(name) { if (window.HgSound) window.HgSound.play(name); }

  function buildCategoryOptions(categories) {
    var html = '<option value="all">Alle categorieën</option>';
    categories.forEach(function(cat) {
      html += '<option value="' + cat.value + '">' + cat.label + '</option>';
    });
    return html;
  }

  function buildRefHtml(cards) {
    if (!cards || !cards.length) return '';
    var html = '<div class="section-title">Snelreferentie</div><div class="quick-ref">';
    cards.forEach(function(card) {
      html += '<div class="ref-card">'
        + '<div class="ref-title">' + card.title + '</div>'
        + '<div class="ref-body">' + card.body + '</div>'
        + '</div>';
    });
    html += '</div>';
    return html;
  }

  function buildExamTableHtml(examTable) {
    if (!examTable) return '';
    var tableTitle = examTable.title || 'Examenstructuur';
    var html = '<div class="section-title">' + tableTitle + '</div>'
      + '<div style="overflow-x:auto;"><table class="exam-table"><thead><tr><th>Vraag</th>';
    examTable.columns.forEach(function(col) { html += '<th>' + col + '</th>'; });
    html += '</tr></thead><tbody>';
    examTable.rows.forEach(function(row) {
      html += '<tr><td class="q-row">' + row.label + '</td>';
      row.cells.forEach(function(cell) { html += '<td>' + cell + '</td>'; });
      html += '</tr>';
    });
    html += '</tbody></table></div>';
    return html;
  }

  // ── createQuiz ─────────────────────────────────────────────────────────────
  function createQuiz(cfg) {
    var containerId = cfg.containerId  || 'quiz-root';
    var questions   = cfg.questions    || [];
    var categories  = cfg.categories   || [];
    var refCards    = cfg.referenceCards || null;
    var examTable   = cfg.examTable    || null;

    var container = document.getElementById(containerId);
    if (!container) return;

    var hasRef  = refCards  && refCards.length > 0;
    var hasExam = !!examTable;

    // Build dynamic tab list
    var tabItems = [['oefenen', '📝 Oefenvragen']];
    if (hasRef)  tabItems.push(['ref',     '📖 Snelreferentie']);
    if (hasExam) tabItems.push(['examens', '📋 Examenstructuur']);

    var tabsHtml = '<div class="tabs">';
    tabItems.forEach(function(t, i) {
      tabsHtml += '<div class="tab' + (i === 0 ? ' active' : '') + '" onclick="showTab(\'' + t[0] + '\')">' + t[1] + '</div>';
    });
    tabsHtml += '</div>';

    var exerciseHtml = '<div id="tab-oefenen">'
      + '<div class="score-bar">'
      + '<span class="score-pill score-correct">✓ <span id="n-correct">0</span> correct</span>'
      + '<span class="score-pill score-wrong">✗ <span id="n-wrong">0</span> fout</span>'
      + '<span class="score-pill score-total">Vraag <span id="q-index">1</span>/<span id="q-total">?</span></span>'
      + (categories.length
          ? '<select class="hg-select" id="category-filter" onchange="filterCategory()">'
            + buildCategoryOptions(categories)
            + '</select>'
          : '')
      + '</div>'
      + '<div class="progress"><div class="progress-fill" id="progress-fill" style="width:0%"></div></div>'
      + '<div id="question-area"></div>'
      + '</div>';

    var refHtml  = hasRef  ? '<div id="tab-ref"     style="display:none;">' + buildRefHtml(refCards)       + '</div>' : '';
    var examHtml = hasExam ? '<div id="tab-examens" style="display:none;">' + buildExamTableHtml(examTable) + '</div>' : '';

    container.innerHTML = tabsHtml + exerciseHtml + refHtml + examHtml;

    // State
    var allQ     = questions.slice();
    var filtered = questions.slice();
    var current  = 0;
    var correct  = 0;
    var wrong    = 0;
    var hintShown   = false;
    var answerShown = false;

    var activeTabIds = tabItems.map(function(t) { return t[0]; });

    function renderQuestion() {
      var area  = document.getElementById('question-area');
      var total = filtered.length;
      document.getElementById('q-total').textContent = total;
      document.getElementById('q-index').textContent = Math.min(current + 1, total);
      var pct = total ? (current / total * 100) : 0;
      document.getElementById('progress-fill').style.width = pct + '%';

      if (allQ.length === 0) {
        area.innerHTML = '<div class="empty-state"><div class="icon">📋</div><div>Nog geen vragen beschikbaar voor dit vak.</div></div>';
        return;
      }
      if (total === 0) {
        area.innerHTML = '<div class="empty-state"><div class="icon">🔍</div><div>Geen vragen gevonden voor deze categorie.</div></div>';
        return;
      }
      if (current >= total) {
        area.innerHTML = '<div class="card" style="text-align:center; padding:40px;">'
          + '<div style="font-size:2.5rem; margin-bottom:16px;">🎉</div>'
          + '<div style="font-size:1.2rem; font-weight:700; color:var(--moss); margin-bottom:8px;">Alle vragen gedaan!</div>'
          + '<div style="color:var(--graphite); margin-bottom:20px;">Correct: ' + correct + ' | Fout: ' + wrong + '</div>'
          + '<button class="btn btn-next" onclick="restartQuiz()">Opnieuw beginnen</button>'
          + '</div>';
        return;
      }

      hintShown = false; answerShown = false;
      var q     = filtered[current];
      var qtext = q.q.replace(/\n/g, '<br>').replace(/\s{4}/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
      var hasHint = !!q.hint;

      area.innerHTML = '<div class="card">'
        + '<div class="card-header">'
        + (q.cat  ? '<span class="q-badge">' + q.cat  + '</span>' : '')
        + '<div class="q-text">' + qtext + '</div>'
        + (q.year ? '<span class="q-year">' + q.year + '</span>' : '')
        + '</div>'
        + (hasHint ? '<div class="hint" id="hint-box">💡 <strong>Hint:</strong> ' + q.hint + '</div>' : '')
        + '<div class="answer-box" id="answer-box">'
        + '<div class="answer-label">✓ Oplossing</div>'
        + '<pre>' + q.answer + '</pre>'
        + '</div>'
        + '<div class="btn-row">'
        + (hasHint ? '<button class="btn btn-hint"   onclick="toggleHint()">💡 Hint</button>' : '')
        + '<button class="btn btn-answer"  onclick="toggleAnswer()">👁 Toon antwoord</button>'
        + '<button class="btn btn-correct" onclick="markCorrect()">✓ Correct</button>'
        + '<button class="btn btn-wrong"   onclick="markWrong()">✗ Fout</button>'
        + '<button class="btn btn-next"    onclick="goNext()">Volgende →</button>'
        + '</div>'
        + '</div>';
    }

    global.filterCategory = function() {
      var cat = document.getElementById('category-filter').value;
      filtered = cat === 'all' ? allQ.slice() : allQ.filter(function(q) { return q.cat === cat; });
      current = 0; correct = 0; wrong = 0;
      document.getElementById('n-correct').textContent = 0;
      document.getElementById('n-wrong').textContent = 0;
      snd('filter-change');
      renderQuestion();
    };

    global.toggleHint = function() {
      hintShown = !hintShown;
      var el = document.getElementById('hint-box');
      if (el) el.classList.toggle('show', hintShown);
      if (hintShown) snd('hint-reveal');
    };

    global.toggleAnswer = function() {
      answerShown = !answerShown;
      var el = document.getElementById('answer-box');
      if (el) el.classList.toggle('show', answerShown);
      if (answerShown) snd('hint-reveal');
    };

    global.markCorrect = function() {
      correct++;
      document.getElementById('n-correct').textContent = correct;
      snd('correct');
      current++;
      renderQuestion();
    };

    global.markWrong = function() {
      wrong++;
      document.getElementById('n-wrong').textContent = wrong;
      snd('wrong');
      current++;
      renderQuestion();
    };

    global.goNext = function() {
      snd('next-q');
      current++;
      renderQuestion();
    };

    global.restartQuiz = function() {
      current = 0; correct = 0; wrong = 0;
      document.getElementById('n-correct').textContent = 0;
      document.getElementById('n-wrong').textContent = 0;
      snd('restart');
      renderQuestion();
    };

    global.showTab = function(name) {
      activeTabIds.forEach(function(t) {
        var el = document.getElementById('tab-' + t);
        if (el) el.style.display = t === name ? '' : 'none';
      });
      container.querySelectorAll('.tab').forEach(function(el, i) {
        el.classList.toggle('active', activeTabIds[i] === name);
      });
      snd('tab-switch');
    };

    renderQuestion();
  }

  // ── Exports ────────────────────────────────────────────────────────────────
  global.HgQuiz = { createQuiz: createQuiz };

})(window);
