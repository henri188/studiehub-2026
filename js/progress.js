// HydrarGyrum Studiehub — Progress service
// Auth guard + Firestore persistence voor planner-pagina's.
// Exposeert window._hgProgress zodat niet-module scripts er gebruik van kunnen maken.

import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import {
  doc,
  getDoc,
  setDoc,
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

// Toon een lichte overlay terwijl auth wordt bevestigd — pagina-shell blijft zichtbaar.
// Dit is sneller voor de perceptie dan visibility:hidden op <html>.
(function showGuard() {
  if (document.getElementById('hg-auth-guard')) return;
  var g = document.createElement('div');
  g.id = 'hg-auth-guard';
  g.setAttribute('aria-hidden', 'true');
  g.innerHTML = '<svg viewBox="0 0 100 120"><path d="M50 6 C50 6,18 52,18 78 A32 32 0 1 0 82 78 C82 52,50 6,50 6 Z" fill="currentColor"/></svg>';
  var st = document.createElement('style');
  st.textContent = '#hg-auth-guard{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:var(--paper,#ECEBE6);z-index:9999;transition:opacity .35s ease}#hg-auth-guard svg{width:36px;height:auto;color:var(--moss,#2F4A3A);opacity:.5;animation:hg-pulse 1.6s ease-in-out infinite alternate}#hg-auth-guard.hidden{opacity:0;pointer-events:none}@keyframes hg-pulse{from{opacity:.3;transform:scale(.9)}to{opacity:.7;transform:scale(1.1)}}';
  document.head.appendChild(st);
  (document.body || document.documentElement).appendChild(g);
})();

function hideGuard() {
  var g = document.getElementById('hg-auth-guard');
  if (!g) return;
  g.classList.add('hidden');
  setTimeout(function() { g.remove(); }, 400);
}

// Haal callbacks op die al via de stub geregistreerd zijn
const _stubPending = window._hgProgress?._pending ?? [];

// Vervang stub met echte implementatie
window._hgProgress = {
  userId: null,
  _queue: [],

  async load(key) {
    if (!this.userId) return null;
    try {
      const snap = await getDoc(doc(db, 'users', this.userId, 'progress', key));
      return snap.exists() ? (snap.data().state ?? null) : null;
    } catch (e) {
      console.warn('[progress] load failed:', e);
      return null;
    }
  },

  async save(key, state) {
    if (!this.userId) return false;
    try {
      await setDoc(
        doc(db, 'users', this.userId, 'progress', key),
        { state },
        { merge: true }
      );
      return true;
    } catch (e) {
      console.warn('[progress] save failed:', e);
      return false;
    }
  },

  onReady(cb) {
    if (this.userId) { cb(this.userId); }
    else { this._queue.push(cb); }
  },
};

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.replace('../login.html');
    return;
  }
  hideGuard();
  window._hgProgress.userId = user.uid;
  // Drain beide queues: stub-callbacks + callbacks na module-load
  [..._stubPending, ...window._hgProgress._queue]
    .forEach((cb) => cb(user.uid));
  window._hgProgress._queue = [];
});
