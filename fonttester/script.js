const applyStyles = (fontName) => {
  document.body.style.fontFamily = 'Wavefont';
  //document.body.style.fontFamily = 'wingdings';

  document.body.style.fontFamily = document.getElementById('fontSelect').value + ',\'Wavefont\'';
}

document.addEventListener('DOMContentLoaded', applyStyles);
document.addEventListener('DOMContentLoaded', () => { document.getElementById('fontSelect').addEventListener('change', applyStyles); })