const run = () => {
  const illegalChars = ['\\', '/', ':', '*', '?', '"', '<', '>', '\n', '\r'];
  let filename = document.getElementById('input').value;
  for (const char of illegalChars) {
    filename = filename.replaceAll(char, (char == '\n' || char == '\r') ? ' ' : '-');
  }
  document.getElementById('output').textContent = filename;
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('input').addEventListener('input', run);
});
