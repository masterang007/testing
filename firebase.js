import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { 
    getAuth, 
    signInAnonymously, 
    onAuthStateChanged,
    signInWithCustomToken
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
    try {
        activeConfig = JSON.parse(__firebase_config);
    } catch (e) {
        console.warn("Could not parse canvas config, using default.");
    }
}

// --- Initialization (The Fix) ---
// We initialize HERE, not in the dashboard
const app = initializeApp(activeConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Automatically sign in anonymously so data fetching works immediately
signInAnonymously(auth).catch(err => console.error("Auth failed:", err));

// --- Export to Window ---
// This makes the 'db' and 'auth' available to your Dashboard component
window.firebaseModules = {
    app,
    db,       // The active database connection
    auth,     // The active auth connection
    doc,
    setDoc,
    onSnapshot,
    onAuthStateChanged
};

console.log("Firebase initialized globally.");
