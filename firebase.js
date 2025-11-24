// firebase.js - Proper Firebase initialization
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Import Firebase SDKs from CDN
        const firebase = window.firebase;
        if (!firebase) {
            console.error("Firebase SDK not loaded");
            return;
        }

        // Firebase configuration - REPLACE WITH YOUR ACTUAL CONFIG
        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
            projectId: "YOUR_PROJECT_ID",
            storageBucket: "YOUR_PROJECT_ID.appspot.com",
            messagingSenderId: "YOUR_SENDER_ID",
            appId: "YOUR_APP_ID",
            measurementId: "YOUR_MEASUREMENT_ID"
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
            setDoc: firebase.firestore.setDoc,
            initializeApp: firebase.initializeApp
        };
        
        console.log("Firebase initialized successfully");
        
        // Dispatch event to signal Firebase is ready
        const event = new Event('firebase-ready');
        window.dispatchEvent(event);
        
    } catch (error) {
        console.error("Firebase initialization error:", error);
        // Set flag that Firebase is not available
        window.firebaseModules = null;
    }
});

// Load Firebase SDKs from CDN
const firebaseSDKs = [
    'https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js',
    'https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js'
];

firebaseSDKs.forEach(src => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => console.log(`Loaded: ${src}`);
    script.onerror = (e) => console.error(`Error loading ${src}:`, e);
    document.head.appendChild(script);
});
