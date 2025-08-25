// --- Firebase config (fixed bucket) ---
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyA7XDbgP1o64rmeqxuf_Dfu8kD4m7mVjGg",
  authDomain: "online-solution-1b8a4.firebaseapp.com",
  projectId: "online-solution-1b8a4",
  storageBucket: "online-solution-1b8a4.appspot.com", // ✅ correct domain
  messagingSenderId: "431791580403",
  appId: "1:431791580403:web:4fd2d70fa7130cb63b4386"
};

// Initialize (safe re-init)
try { firebase.initializeApp(window.FIREBASE_CONFIG); } catch (e) { /* already init */ }

// Default admin password: Sonabhai@123 (SHA-256)
window.ADMIN_PASSWORD_HASH = "f9f9084e648ae0d2d7775a39c8b87c8191d23bdf086f8af47f6beee3172f4ca0";
