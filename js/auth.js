// HydrarGyrum Studiehub — Auth service
// Wraps Firebase Authentication; keeps all auth logic out of the UI layer.

import { auth } from './firebase-config.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const AuthService = {
  login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  },

  async register(email, password, displayName) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) await updateProfile(cred.user, { displayName });
    return cred;
  },

  loginWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  },

  logout() {
    return signOut(auth);
  },

  onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
  },

  get currentUser() {
    return auth.currentUser;
  },
};

// Dutch error messages for Firebase auth error codes
export function authErrorMessage(code) {
  const map = {
    'auth/invalid-email':          'Ongeldig e-mailadres.',
    'auth/user-disabled':          'Dit account is uitgeschakeld.',
    'auth/user-not-found':         'Geen account gevonden met dit e-mailadres.',
    'auth/wrong-password':         'Onjuist wachtwoord.',
    'auth/invalid-credential':     'E-mail of wachtwoord onjuist.',
    'auth/email-already-in-use':   'Er bestaat al een account met dit e-mailadres.',
    'auth/weak-password':          'Wachtwoord is te zwak — minimaal 6 tekens vereist.',
    'auth/too-many-requests':      'Te veel pogingen — probeer het later opnieuw.',
    'auth/network-request-failed': 'Netwerkfout — controleer je verbinding.',
    'auth/popup-closed-by-user':   '', // silent — user dismissed popup intentionally
    'auth/cancelled-popup-request': '',
  };
  return map[code] ?? 'Er is een fout opgetreden — probeer opnieuw.';
}
