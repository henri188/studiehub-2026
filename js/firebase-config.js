// ─────────────────────────────────────────────────────────────────────────────
// HydrarGyrum Studiehub — Firebase configuratie
//
// SETUP (eenmalig):
//   1. Ga naar https://console.firebase.google.com en maak een nieuw project
//   2. Voeg een web-app toe → kopieer de config hieronder
//   3. Ga naar Authentication → Sign-in method → activeer:
//        • Email/Password
//        • Google
//   4. Ga naar Firestore Database → Create database → Production mode
//      Voeg deze regel toe aan de Firestore rules:
//        allow read, write: if request.auth != null;
//   5. (Optioneel) Firebase Hosting: `npm i -g firebase-tools && firebase deploy`
//
// GRATIS TIER (Spark plan):
//   • Authentication  — onbeperkt voor email + Google
//   • Firestore       — 1 GB opslag, 50K reads/dag, 20K writes/dag
//   • Hosting         — 10 GB, 360 MB/dag transfer
// ─────────────────────────────────────────────────────────────────────────────

import { initializeApp }  from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getAuth }        from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { getFirestore }   from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

// ──────────────────────────────────────────────────────────────────────────────
// VERVANG ONDERSTAANDE WAARDEN MET JE EIGEN CONFIG VAN DE FIREBASE CONSOLE
// Project settings → Your apps → Web app → SDK setup and configuration
// ──────────────────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            "JOUW_API_KEY",
  authDomain:        "JOUW_PROJECT_ID.firebaseapp.com",
  projectId:         "JOUW_PROJECT_ID",
  storageBucket:     "JOUW_PROJECT_ID.appspot.com",
  messagingSenderId: "JOUW_SENDER_ID",
  appId:             "JOUW_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);
