// HydrarGyrum Studiehub — Hub page logic
// Handles auth guard, user display, countdowns, theme.

import { AuthService } from './auth.js';
import { db } from './firebase-config.js';
import {
  doc,
  getDoc,
  setDoc,
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

// ── Auth guard ────────────────────────────────────────────────────────────────
const guard = document.getElementById('auth-guard');

AuthService.onAuthChange((user) => {
  if (!user) {
    window.location.replace('login.html');
    return;
  }
  guard.classList.add('hidden');
  setTimeout(() => guard.remove(), 400);
  initHub(user);
});

// ── Hub init ──────────────────────────────────────────────────────────────────
function initHub(user) {
  const emailEl = document.getElementById('user-email');
  if (emailEl) {
    emailEl.textContent = user.displayName || user.email || '';
  }
  setPill('mm-pill', '2026-06-04', 'do 4 jun');
  setPill('ca-pill', '2026-06-08', 'ma 8 jun');
  setPill('wr-pill', '2026-06-17', 'wo 17 jun');
  setPill('wd-pill', '2026-06-23', 'di 23 jun');
  setPill('la-pill', '2026-06-23', 'di 23 jun');

  // Upgrade _hgProgress stub to real Firestore impl so day-view.js can sync
  const pending = window._hgProgress?._pending?.slice() ?? [];
  window._hgProgress = {
    userId: user.uid,
    _pending: [],
    async load(key) {
      try {
        const snap = await getDoc(doc(db, 'users', user.uid, 'progress', key));
        return snap.exists() ? (snap.data().state ?? null) : null;
      } catch { return null; }
    },
    async save(key, state) {
      try {
        await setDoc(doc(db, 'users', user.uid, 'progress', key), { state }, { merge: true });
        return true;
      } catch { return false; }
    },
    onReady(cb) { cb(user.uid); },
  };
  pending.forEach((cb) => cb(user.uid));
}

// ── Countdown pills ───────────────────────────────────────────────────────────
function daysUntil(dateStr) {
  const target = new Date(dateStr);
  const now    = new Date();
  now.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target - now) / 86_400_000);
}

function setPill(id, dateStr, label) {
  const el = document.getElementById(id);
  if (!el) return;
  const d = daysUntil(dateStr);
  const dot = '<span class="countdown-dot"></span>';
  if (d > 0) {
    el.innerHTML = `${dot}${label} — nog <strong>${d}</strong> dag${d !== 1 ? 'en' : ''}`;
  } else if (d === 0) {
    el.innerHTML = `${dot}Vandaag is het examen!`;
  } else {
    el.innerHTML = `${dot}Examen voorbij`;
  }
}

// ── Logout ─────────────────────────────────────────────────────────────────────
document.getElementById('logout-btn').addEventListener('click', async () => {
  await AuthService.logout();
  window.location.replace('login.html');
});

// ── Navigation sounds ──────────────────────────────────────────────────────────
document.querySelectorAll('.hub-card').forEach((card) => {
  card.addEventListener('click', () => {
    if (window.HgSound) window.HgSound.play('navigate');
  });
});

// ── Theme toggle ───────────────────────────────────────────────────────────────
const root     = document.documentElement;
const themeBtn = document.getElementById('theme-btn');

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const cur  = root.getAttribute('data-theme') || 'light';
    const next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('hg-theme', next); } catch { /* quota */ }
    if (window.HgSound) window.HgSound.play(next === 'dark' ? 'theme-dark' : 'theme-light');
    updateThemeLabel(next);
  });
}

function updateThemeLabel(theme) {
  const lbl = themeBtn?.querySelector('.theme-label');
  if (lbl) lbl.textContent = theme === 'dark' ? 'Light' : 'Dark';
}

// Sync label with current theme
updateThemeLabel(root.getAttribute('data-theme') || 'light');
