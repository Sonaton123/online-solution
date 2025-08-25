// ---- Firebase Config (same as admin) ----
const firebaseConfig = {
  apiKey: "AIzaSyA7XDbgP1o64rmeqxuf_Dfu8kD4m7mVjGg",
  authDomain: "online-solution-1b8a4.firebaseapp.com",
  projectId: "online-solution-1b8a4",
  storageBucket: "online-solution-1b8a4.appspot.com",
  messagingSenderId: "431791580403",
  appId: "1:431791580403:web:4fd2d70fa7130cb63b4386"
};

// Safe init (agar pehle se init ho to error na aaye)
try { firebase.initializeApp(firebaseConfig); } catch (e) {}

const db = firebase.firestore();
const storage = firebase.storage();

const form = document.getElementById("contactForm");
const resp = document.getElementById("responseMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  resp.textContent = "";
  resp.style.color = "";

  const firstName = document.getElementById("firstName").value.trim();
  const lastName  = document.getElementById("lastName").value.trim();
  const phone     = document.getElementById("phone").value.trim();
  const email     = document.getElementById("email").value.trim();
  const message   = document.getElementById("message").value.trim();
  const file      = document.getElementById("fileUpload").files[0] || null;

  if (!firstName || !lastName || !phone || !email || !message) {
    resp.textContent = "Please fill all fields.";
    resp.style.color = "crimson";
    return;
  }

  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = "Submitting...";

  let fileURL = "";

  try {
    // 1) Optional file upload
    if (file) {
      const path = `uploads/${Date.now()}_${file.name}`;
      const ref = storage.ref(path);
      await ref.put(file);
      fileURL = await ref.getDownloadURL();
    }

    // 2) Save to Firestore (admin panel reads this)
    await db.collection("contact_submissions").add({
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      phone,
      email,
      message,
      fileURL,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // 3) Success + redirect
    resp.textContent = "Thank you! We received your message.";
    resp.style.color = "green";
    setTimeout(() => { window.location.href = "thankyou.html"; }, 600);

  } catch (err) {
    console.error("Contact form error:", err);
    resp.textContent = (err && err.message) ? err.message : "Something went wrong. Please try again.";
    resp.style.color = "crimson";
  } finally {
    btn.disabled = false;
    btn.textContent = "Submit";
  }
});
