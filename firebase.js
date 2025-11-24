// Check if Firebase SDKs are loaded
if (typeof firebase === 'undefined') {
    console.warn("Firebase SDK not loaded. Using local storage only.");
    window.firebaseReady = () => {};
    window.isFirebaseAvailable = () => false;
} else {
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
    try {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        
        // Initialize Firestore
        const db = firebase.firestore();
        
        // Set up Firebase modules on window
        window.firebaseModules = {
            db,
            doc: firebase.firestore.doc,
            onSnapshot: firebase.firestore.onSnapshot,
            setDoc: firebase.firestore.setDoc
        };
        
        window.isFirebaseAvailable = () => true;
        console.log("Firebase initialized successfully");
        
        // Dispatch event to signal Firebase is ready
        const event = new Event('firebase-ready');
        window.dispatchEvent(event);
    } catch (error) {
        console.error("Firebase initialization error:", error);
        window.isFirebaseAvailable = () => false;
    }
}

// Fallback functions if Firebase fails
if (!window.isFirebaseAvailable) {
    window.isFirebaseAvailable = () => false;
}
