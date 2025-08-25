// simple sha256
async function sha256(text){
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,"0")).join("");
}

const loginForm = document.getElementById("loginForm");
const dash = document.getElementById("dashboard");
const list = document.getElementById("complaintsList");
const refreshBtn = document.getElementById("refreshBtn");
const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", async (e)=>{
  e.preventDefault();
  loginError.textContent = "";
  const pass = document.getElementById("adminPassword").value;
  const hash = await sha256(pass);
  if(hash === window.ADMIN_PASSWORD_HASH){
    loginForm.style.display = "none";
    dash.style.display = "block";
    loadData();
  }else{
    loginError.textContent = "Incorrect password.";
  }
});

refreshBtn.addEventListener("click", loadData);

function fmt(ts){
  if(!ts) return "";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleString();
}

async function loadData(){
  list.innerHTML = "<div class='card'>Loading...</div>";
  try{
    const db = firebase.firestore();
    const snap = await db.collection("contact_submissions")
      .orderBy("createdAt","desc")
      .limit(200)
      .get();

    if(snap.empty){
      list.innerHTML = "<div class='card'>No submissions yet.</div>";
      return;
    }

    const items = [];
    snap.forEach(doc=>{
      const d = doc.data();
      items.push(`
        <div class="card">
          <div class="row">
            <div><strong>${d.name || ""}</strong></div>
            <div>${d.phone || ""} <small>${d.email || ""}</small></div>
            <div><small>${fmt(d.createdAt)}</small></div>
          </div>
          <div class="msg">${(d.message || "").replace(/</g,"&lt;")}</div>
          <div class="row">
            <div><b>UPI:</b> ${d.upi || "-"}</div>
            <div>${d.fileURL ? `<a href="${d.fileURL}" target="_blank">View file</a>` : "-"}</div>
          </div>
        </div>
      `);
    });
    list.innerHTML = items.join("");
  }catch(err){
    list.innerHTML = `<div class="card error">Error: ${err.message || err}</div>`;
  }
}
