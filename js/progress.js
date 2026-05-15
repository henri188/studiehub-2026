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

// Verberg pagina tot auth bevestigd is
document.documentElement.style.visibility = 'hidden';

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
    window.location.replace('login.html');
    return;
  }
  document.documentElement.style.visibility = '';
  window._hgProgress.userId = user.uid;
  // Drain beide queues: stub-callbacks + callbacks na module-load
  [..._stubPending, ...window._hgProgress._queue]
    .forEach((cb) => cb(user.uid));
  window._hgProgress._queue = [];
});
