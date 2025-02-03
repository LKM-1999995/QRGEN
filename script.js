document.getElementById('generate-btn').addEventListener('click', function() {
  const qrText = document.getElementById('qr-input').value;
  const qrColor = document.getElementById('qr-color').value;
  const bgColor = document.getElementById('bg-color').value;
  const bgImageInput = document.getElementById('bg-image');
  const qrContainer = document.getElementById('qrcode');

  // Clear any previous QR code and reset background styles.
  qrContainer.innerHTML = '';
  qrContainer.style.backgroundImage = '';
  qrContainer.style.backgroundColor = '';

  // Function to generate QR code with given parameters.
  function generateQRCode(lightColor) {
    new QRCode(qrContainer, {
      text: qrText,
      width: 128,
      height: 128,
      colorDark: qrColor,
      colorLight: lightColor,
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  // Check if user provided input text.
  if (qrText.trim() === '') {
    alert("Please enter some text or a URL.");
    return;
  }

  // If a background image is selected, read the file.
  if (bgImageInput.files && bgImageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      // Set the background image of the QR code container.
      qrContainer.style.backgroundImage = 'url(' + e.target.result + ')';
      qrContainer.style.backgroundSize = 'cover';
      qrContainer.style.backgroundPosition = 'center';
      // Use transparent background for the QR code to let the image show.
      generateQRCode("transparent");
    }
    reader.readAsDataURL(bgImageInput.files[0]);
  } else {
    // No background image; use the selected background color.
    qrContainer.style.backgroundColor = bgColor;
    generateQRCode(bgColor);
  }
});
