const fontList = {
  'Inter': 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap',
  'Noto Sans': 'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap',
  'Open Sans': 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap',
  'Helvetica': '',
  'Aptos': '',
  'Liberation Sans': '',
  'Roboto': 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
  'Arial': '',
  'sans-serif': ''
}

const applyStyles = (e, font = 'Inter') => {
  if (e) {
    font = e.target.value
  }
  if (document.getElementById('linkrel')) document.getElementById('linkrel').remove();
  if (fontList[font] != '') {
    console.log()
    document.getElementById('output').innerText = '';
    const link = document.createElement('link');
    link.id = 'linkrel';
    link.rel = 'preload';
    link.type = 'stylesheet';
    link.href = fontList[font];
    document.head.appendChild(link);
  } else { document.getElementById('output').innerText = `URL wasn't available, may or may not be showing the correct font.`; }
  document.body.style.fontFamily = font;
}

document.addEventListener('DOMContentLoaded', () => {
  for (const font in fontList) {
    const option = document.createElement('option');
    option.value = font;
    option.text = font;
    document.getElementById('fontSelect').appendChild(option);
  }
});

document.addEventListener('DOMContentLoaded', () => { document.getElementById('fontSelect').addEventListener('change', applyStyles); })
document.addEventListener('load', applyStyles);