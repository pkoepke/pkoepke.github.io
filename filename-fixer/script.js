const formatDoubleQuotes = (str) => { // Change double quotes to opening and closing quotes since some OSes and apps don't allow plain double quotes in filenames.
  if (typeof str !== 'string') {
    return "Input must be a string.";
  }

  let result = "";
  let openQuote = true; // Start with the assumption that the next quote is an opening one

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '"') {
      if (openQuote) {
        result += '\u201C'; // Left double quotation mark (opening)
      } else {
        result += '\u201D'; // Right double quotation mark (closing)
      }
      openQuote = !openQuote; // Toggle the state for the next quote
    } else {
      result += str[i];
    }
  }

  return result;
}

const run = (e) => {
  let filename = document.getElementById('input').value;
  let illegalChars = ['\\', ':', '*', '?', '<', '>', '\n', '\r', '&', ',', '...'];
  if (document.getElementById('toLowercase').checked) {
    filename = filename.toLowerCase();
  }
  if (document.getElementById('removePunctuation').checked) {
    illegalChars = illegalChars.concat(['!', '#', '$', '%', '(', ')', '+', ',', '.', ';', '@', '[', ']', '^', '`', '{', '|', '}', '~', '“', '”', '∕', '“', '”']); // Add punctuation to the list of illegal characters.
  }
  if (document.getElementById('decodeUri').checked) {
    filename = decodeURIComponent(filename);
  }
  filename = formatDoubleQuotes(filename);
  if (document.getElementById('removeIllegalChars').checked) {
    for (const char of illegalChars) {
      filename = filename.replaceAll(char, (char == '\n' || char == '\r') ? ' ' : char == '\\' ? '_' : ''); // replace \n and \r with a space, replace \ with _, and just remove everything else.
    }
  }

  while (filename.includes('  ')) { // Remove double spaces
    filename = filename.replaceAll('  ', ' ')
  }

  while (filename[0] === ' ') { // Remove leading spaces.
    filename = filename.substring(1, filename.length);
  }

  while ((filename[filename.length - 1] === ' ') || (filename[filename.length - 1] === '.')) { // Remove trailing spaces and periods.
    filename = filename.substring(0, filename.length - 1);
  }

  filename = filename.replaceAll('/', '∕') // Replace slashes with division symbol.

  let numberOfChars = document.getElementById(`characterLimit`).value;
  if (!(numberOfChars == `` || isNaN(numberOfChars))) {
    filename = filename.substring(0, numberOfChars);
  }
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

const deleteLine = () => {
  const input = document.getElementById('input');
  const text = input.value;
  const cursorPosition = input.selectionStart;
  let newCursorPosition = 0;

  const startOfLine = text.lastIndexOf('\n', cursorPosition - 1) + 1; // Get the start of the line, or 0 if this is the first line.
  newCursorPosition = startOfLine;
  console.log(`startOfLine: ${startOfLine}`)
  const endOfLine = text.indexOf('\n', cursorPosition); // Get the end of the line.
  console.log(`endOfLine: ${endOfLine}`)
  console.log(`cursorPosition: ${cursorPosition}`)
  console.log(`text.length: ${text.length}`)

  const lineText = text.substring(startOfLine, endOfLine === -1 ? text.length : endOfLine);
  console.log(`lineText: "${lineText}"`)

  let newText;

  if (startOfLine == 1 && endOfLine == 0) {   // Handle a first line that is nothing but a \n
    newText = text.substring(1, text.length);
    newCursorPosition = 0;
  }
  else if (endOfLine == -1 && cursorPosition == text.length && startOfLine == text.length) { // Handle a final line that is nothing but a \n
    newText = text.substring(0, text.length - 1);
    newCursorPosition = newText.lastIndexOf('\n') + 1; // Have to recalcuate the new cursor position to be at the end of the new last line.
  } else {

    // Determine the line segment to be deleted.
    // If there is no newline character after the cursor,
    // we are on the last line, so the end of the line is the end of the text.
    // The "+ 1" ensures the newline character itself is removed, leaving no empty space.
    const lineEnd = endOfLine === -1 ? text.length : endOfLine + 1;

    // Create the new text by combining the text before the line and the text after it.
    newText = text.substring(0, startOfLine) + text.substring(lineEnd);

    // If this is the last line, also delete the preceding newline character to avoid leaving an empty line.
    if (endOfLine === -1 && startOfLine > 0) {
      newText = text.substring(0, startOfLine - 1);
      newCursorPosition = newText.length; // Move cursor to the end of the new text.
    }
  }

  // Update the textarea's value with the new text.
  input.value = newText;

  // Restore the cursor position to the start of the line that replaced the deleted one.
  input.selectionStart = newCursorPosition;
  input.selectionEnd = newCursorPosition; // Fixes accidentally selecting text
  input.focus(); // Return focus to the textarea so setting the cursor's position actually does something.

  run();
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
  document.getElementById('deleteLine').addEventListener('click', deleteLine);
  document.getElementById('toLowercase').addEventListener('click', run);
  document.getElementById('removePunctuation').addEventListener('click', run);
  document.getElementById('decodeUri').addEventListener('click', run);
  document.getElementById('removeIllegalChars').addEventListener('click', run);
  run();
});
