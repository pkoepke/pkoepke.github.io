function calculate() {
  const originalDatetimeString = document.getElementById('inputDatetime');
  const outputDate = new Date(originalDatetimeString);

  document.getElementById('output').innerHTML = outputDate.toLocaleDateString()
}
