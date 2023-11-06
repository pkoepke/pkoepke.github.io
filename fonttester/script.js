const applyStyles = (fontName) => {
  document.body.style.fontFamily = 'Libre Barcode 39';
  document.body.style.fontFamily = 'wingdings';
}

document.addEventListener('DOMContentLoaded', applyStyles);
document.getElementById('fontSelect').addEventListener('change', applyStyles);