import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { 
    getAuth, 
    signInAnonymously, 
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    setDoc, 
    onSnapshot 
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// --- Configuration ---
const USER_FIREBASE_CONFIG = {
  apiKey: "AIzaSyDYHXs9Cn23FTBt4O2ogkgZzOkNVbiwZzs",
  authDomain: "rpcm-new-dashboard.firebaseapp.com",
  projectId: "rpcm-new-dashboard",
  storageBucket: "rpcm-new-dashboard.firebasestorage.app",
  messagingSenderId: "777004713762",
  appId: "1:777004713762:web:3111d9be6b4bef03f0477b",
  measurementId: "G-XY30GVK3VW"
};

let activeConfig = USER_FIREBASE_CONFIG;

// Attempt to load from canvas environment if available
if (typeof __firebase_config !== 'undefined') {
    try { activeConfig = JSON.parse(__firebase_config); } catch (e) {}
}

// --- Initialization ---
console.log("Firebase Script Started...");
const app = initializeApp(activeConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Sign in
signInAnonymously(auth).catch(err => console.error("Auth failed:", err));

// --- Export Global ---
window.firebaseModules = {
    app, db, auth, doc, setDoc, onSnapshot, onAuthStateChanged
};

// --- FIX: Dispatch Event for Dashboard ---
console.log("Firebase initialized. Dispatching 'firebase-ready' event.");
window.dispatchEvent(new Event('firebase-ready'));
