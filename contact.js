// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyA7XDbgP1o64rmeqxuf_Dfu8kD4m7mVjGg",
  authDomain: "online-solution-1b8a4.firebaseapp.com",
  projectId: "online-solution-1b8a4",
  storageBucket: "online-solution-1b8a4.appspot.com",
  messagingSenderId: "431791580403",
  appId: "1:431791580403:web:4fd2d70fa7130cb63b4386"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const serviceType = document.getElementById("serviceType").value;
  const message = document.getElementById("message").value.trim();
  const file = document.getElementById("fileUpload").files[0];

  let fileURL = "";

  if (file) {
    const storageRef = storage.ref(`uploads/${Date.now()}_${file.name}`);
    await storageRef.put(file);
    fileURL = await storageRef.getDownloadURL();
  }

  await db.collection("contacts").add({
    firstName,
    lastName,
    phone,
    email,
    serviceType,
    message,
    fileURL,
    createdAt: new Date()
  });

  window.location.href = "thankyou.html";
});
