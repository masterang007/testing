// Firebase initialization
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Check if Firebase is already loaded
        if (typeof firebase === 'undefined') {
            console.warn("Firebase SDK not loaded");
            return;
        }
        
        // Firebase configuration - REPLACE WITH YOUR ACTUAL CONFIG
        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
            projectId: "YOUR_PROJECT_ID",
            storageBucket: "YOUR_PROJECT_ID.appspot.com",
            messagingSenderId: "YOUR_SENDER_ID",
            appId: "YOUR_APP_ID"
        };

        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        
        // Initialize Firestore
        const db = firebase.firestore();
        
        // Set up Firebase modules on window for dashboard access
        window.firebaseModules = {
            db,
            doc: firebase.firestore.doc,
            onSnapshot: firebase.firestore.onSnapshot,
            setDoc: firebase.firestore.setDoc
        };
        
        console.log("Firebase initialized successfully");
        
        // Dispatch event to signal Firebase is ready
        const event = new Event('firebase-ready');
        window.dispatchEvent(event);
        
    } catch (error) {
        console.error("Firebase initialization error:", error);
        // Set fallback flag
        window.firebaseModules = null;
    }
});

// Add Firebase availability check function
window.isFirebaseAvailable = function() {
    return !!window.firebaseModules?.db;
};
