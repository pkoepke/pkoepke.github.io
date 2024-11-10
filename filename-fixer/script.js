const run = () => {
  const illegalChars = ['\\', '/', ':', '*', '?', '"', '<', '>', '\n', '\r', '&', ','];
  let filename = document.getElementById('input').value;
  for (const char of illegalChars) {
    filename = filename.replaceAll(char, (char == '\n' || char == '\r') ? ' ' : char == '\\' ? '_' : ''); // replce \n and \r with a space, \ with _, and just remove everything else.
  }
  filename = filename.substring(0, 253);
  document.getElementById('output').textContent = filename;
}

const paste = () => {
  navigator.clipboard
    .readText()
    .then((clipText) => document.getElementById('input').value = clipText)
    .then((e) => run());
}

const clear = () => {
  document.getElementById('input').value = '';
  document.getElementById('output').textContent = '';
}

const copy = () => {
  navigator.clipboard.writeText(document.getElementById('output').textContent);
}

const toLowercase = () => {
  document.getElementById('input').value = document.getElementById('output').textContent.toLowerCase();
  document.getElementById('input').dispatchEvent(new Event('input'));

}

const handleShareQuerystring = () => {
  const parsedUrl = new URL(window.location);
  document.getElementById('input').value += parsedUrl.searchParams.get('text') ? parsedUrl.searchParams.get('text') : '';
}

document.addEventListener('DOMContentLoaded', () => {
  handleShareQuerystring();
  document.getElementById('input').addEventListener('input', run);
  document.getElementById('input').addEventListener('paste', run);
  document.getElementById('paste').addEventListener('click', paste);
  document.getElementById('clear').addEventListener('click', clear);
  document.getElementById('copy').addEventListener('click', copy);
  document.getElementById('toLowercase').addEventListener('click', toLowercase);
  run();
});
