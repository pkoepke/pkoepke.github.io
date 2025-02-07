const run = (e) => {
  let filename = document.getElementById('input').value;
  let illegalChars = ['\\', '/', ':', '*', '?', '"', '<', '>', '\n', '\r', '&', ','];
  if (document.getElementById('toLowercase').checked) {
    filename = filename.toLowerCase();
  }
  if (document.getElementById('removePunctuation').checked) {
    illegalChars = illegalChars.concat(['!', '#', '$', '%', '(', ')', '+', ',', '.', ';', '@', '[', ']', '^', '`', '{', '|', '}', '~'])
  }
  if (document.getElementById('decodeUri').checked) {
    filename = decodeURIComponent(filename);
  }
  if (document.getElementById('removeIllegalChars').checked) {
    for (const char of illegalChars) {
      filename = filename.replaceAll(char, (char == '\n' || char == '\r') ? ' ' : char == '\\' ? '_' : ''); // replce \n and \r with a space, \ with _, and just remove everything else.
    }
  }
  let numberOfChars = document.getElementById(`characterLimit`).value;
  if (!(numberOfChars == `` || isNaN(numberOfChars))) {
    filename = filename.substring(0, numberOfChars);
  }
  console.log(filename);
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

const removePunctuation = (e) => {
  run(e, true);
}

const decodeUri = (e) => {
  document.getElementById('input').value = decodeURIComponent(document.getElementById('output').textContent);
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
  document.getElementById('characterLimit').addEventListener('paste', run);
  document.getElementById('characterLimit').addEventListener('input', run);
  document.getElementById('paste').addEventListener('click', paste);
  document.getElementById('clear').addEventListener('click', clear);
  document.getElementById('copy').addEventListener('click', copy);
  document.getElementById('toLowercase').addEventListener('click', run);
  document.getElementById('removePunctuation').addEventListener('click', run);
  document.getElementById('decodeUri').addEventListener('click', run);
  document.getElementById('removeIllegalChars').addEventListener('click', run);
  run();
});
