document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const file = document.getElementById('fileUpload').files[0];

  let fileURL = '';
  if (file) {
    const storageRef = storage.ref('uploads/' + file.name);
    await storageRef.put(file);
    fileURL = await storageRef.getDownloadURL();
  }

  await db.collection('submissions').add({
    firstName,
    lastName,
    phone,
    email,
    message,
    fileURL,
    timestamp: new Date()
  });

  document.getElementById('responseMsg').textContent = 'Thank you! We will contact you shortly.';
  document.getElementById('contactForm').reset();
});
