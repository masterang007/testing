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
    apiKey: "AIzaSyB5gFPpiFHvG4LnF2KhDQVa6R98cTb-cfA",
    authDomain: "rpcm-dashboard.firebaseapp.com",
    projectId: "rpcm-dashboard",
    storageBucket: "rpcm-dashboard.firebasestorage.app",
    messagingSenderId: "718536830642",
    appId: "1:718536830642:web:7c34bf37017efe40e5a3ab",
    measurementId: "G-V7Y09MT8ET"
};

let activeConfig = null;
let configSource = 'offline';

if (USER_FIREBASE_CONFIG) { 
    activeConfig = USER_FIREBASE_CONFIG; 
    configSource = 'user'; 
} else if (typeof __firebase_config !== 'undefined') { 
    try { 
        activeConfig = JSON.parse(__firebase_config); 
        configSource = 'canvas'; 
    } catch(e) {} 
}

// Make Firebase modules available globally
window.firebaseModules = { 
    initializeApp, 
    getAuth, 
    signInAnonymously, 
    onAuthStateChanged, 
    signInWithCustomToken, 
    getFirestore, 
    doc, 
    setDoc, 
    onSnapshot,
    activeConfig,
    configSource
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