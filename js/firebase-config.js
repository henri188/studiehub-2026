// ─────────────────────────────────────────────────────────────────────────────
// HydrarGyrum Studiehub — Firebase configuratie

import { initializeApp }  from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getAuth }        from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { getFirestore }   from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

// ──────────────────────────────────────────────────────────────────────────────
// VERVANG ONDERSTAANDE WAARDEN MET JE EIGEN CONFIG VAN DE FIREBASE CONSOLE
// Project settings → Your apps → Web app → SDK setup and configuration
// ──────────────────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyCDHQaqmlZZthuAturgIYjBExerit7KdnY",
  authDomain: "hydrargyrum-6c7a2.firebaseapp.com",
  projectId: "hydrargyrum-6c7a2",
  storageBucket: "hydrargyrum-6c7a2.firebasestorage.app",
  messagingSenderId: "657676577325",
  appId: "1:657676577325:web:f6aee504df5b40287326a4",
  measurementId: "G-JJJ5XRXR13"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);
