// Firebase initialization with fallbacks
let firebaseInitialized = false;

try {
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
    import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
    import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
    
    window.firebaseModules = {
        initializeApp,
        getAuth,
        signInAnonymously,
        onAuthStateChanged,
        getFirestore,
        doc,
        onSnapshot
    };
    
    firebaseInitialized = true;
    console.log("Firebase modules loaded successfully");
} catch (error) {
    console.warn("Firebase not available. Using local storage only.");
    firebaseInitialized = false;
}

// Expose to global scope for dashboard.js
window.firebaseAvailable = firebaseInitialized;