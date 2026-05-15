// HydrarGyrum Studiehub — Hub page logic
// Handles auth guard, user display, countdowns, theme.

import { AuthService } from './auth.js';

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
  setPill('ca-pill', '2026-06-08', 'ma 8 jun');
  setPill('wr-pill', '2026-06-17', 'wo 17 jun');
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

// ── Theme toggle ───────────────────────────────────────────────────────────────
const root     = document.documentElement;
const themeBtn = document.getElementById('theme-btn');

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const cur  = root.getAttribute('data-theme') || 'light';
    const next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('hg-theme', next); } catch { /* quota */ }
    updateThemeLabel(next);
  });
}

function updateThemeLabel(theme) {
  const lbl = themeBtn?.querySelector('.theme-label');
  if (lbl) lbl.textContent = theme === 'dark' ? 'Light' : 'Dark';
}

// Sync label with current theme
updateThemeLabel(root.getAttribute('data-theme') || 'light');
