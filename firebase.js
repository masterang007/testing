import { 
    initializeApp 
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";

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

// Firebase configuration
const USER_FIREBASE_CONFIG = {
  apiKey: "AIzaSyDYHXs9Cn23FTBt4O2ogkgZzOkNVbiwZzs",
  authDomain: "rpcm-new-dashboard.firebaseapp.com",
  projectId: "rpcm-new-dashboard",
  storageBucket: "rpcm-new-dashboard.firebasestorage.app",
  messagingSenderId: "777004713762",
  appId: "1:777004713762:web:3111d9be6b4bef03f0477b",
  measurementId: "G-XY30GVK3VW"
};

// --- FIX START: Initialize Firebase Here ---
const app = initializeApp(activeConfig);
const db = getFirestore(app);
const auth = getAuth(app);
// -------------------------------------------

// Make initialized instances available globally
window.firebaseModules = { 
    app,     // The started app
    db,      // The started database connection
    auth,    // The started auth connection
    // Keep these helpers for dashboard.js
    doc, 
    setDoc, 
    onSnapshot,
    signInAnonymously,
    onAuthStateChanged
};

// Tailwind config
try {
    tailwind.config = {
        darkMode: 'class',
        theme: {
            extend: {
                colors: {
                    gray: { 750: '#2d3748', 850: '#1a202c', 950: '#0d1117' },
                    plant: { green: '#8cc63f', orange: '#f59e0b', red: '#ef4444', blue: '#3b82f6', dark: '#111827' }
                },
                fontFamily: { 
                    sans: ['Inter', 'system-ui', 'sans-serif'], 
                    mono: ['Fira Code', 'monospace'] 
                }
            }
        }
    };
} catch (e) { 
    console.warn("Tailwind config issue", e); 
}
