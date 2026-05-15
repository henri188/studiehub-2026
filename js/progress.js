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

const _pending = [];

window._hgProgress = {
  userId: null,

  // Laad voortgang van één planner (key = 'ca' | 'wr' | …)
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

  // Sla voortgang op (gedebounced via aanroeper)
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

  // Registreer een callback die vuurt zodra de gebruiker bekend is
  onReady(cb) {
    if (this.userId) {
      cb(this.userId);
    } else {
      _pending.push(cb);
    }
  },
};

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.replace('login.html');
    return;
  }
  document.documentElement.style.visibility = '';
  window._hgProgress.userId = user.uid;
  _pending.splice(0).forEach((cb) => cb(user.uid));
});
