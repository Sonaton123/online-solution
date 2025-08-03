const correctPassword = "12345"; // 👈 Change this as per your choice

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const password = document.getElementById("adminPassword").value;
  if (password === correctPassword) {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    loadComplaints();
  } else {
    alert("Wrong password!");
  }
});

function loadComplaints() {
  const db = firebase.firestore();
  const listContainer = document.getElementById("complaintsList");
  listContainer.innerHTML = "<p>Loading...</p>";

  db.collection("contacts").orderBy("timestamp", "desc").get().then((querySnapshot) => {
    listContainer.innerHTML = "";
    if (querySnapshot.empty) {
      listContainer.innerHTML = "<p>No complaints found.</p>";
    } else {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const div = document.createElement("div");
        div.className = "complaint-card";
        div.innerHTML = `
          <strong>${data.firstName || ''} ${data.lastName || ''}</strong><br>
          <small>${data.email || ''} | ${data.phone || ''}</small><br>
          <b>Service:</b> ${data.service || ''}<br>
          <b>Message:</b> ${data.message || ''}<br>
          ${data.fileUrl ? `<b>File:</b> <a href="${data.fileUrl}" target="_blank">Download</a><br>` : ''}
          <hr>
        `;
        listContainer.appendChild(div);
      });
    }
  }).catch((error) => {
    listContainer.innerHTML = `<p>Error loading data: ${error.message}</p>`;
  });
}
