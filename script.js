// Firebase Config Setup
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

// Handle Form Submit
document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const fileInput = document.getElementById("file");
  const file = fileInput.files[0];

  let fileURL = "";

  if (file) {
    const storageRef = storage.ref("uploads/" + file.name);
    await storageRef.put(file);
    fileURL = await storageRef.getDownloadURL();
  }

  await db.collection("contacts").add({
    firstName,
    lastName,
    phone,
    email,
    message,
    fileURL,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });

  alert("Thank you! We will contact you shortly.");
  document.getElementById("contactForm").reset();
});
