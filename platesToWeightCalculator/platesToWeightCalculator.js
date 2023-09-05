function calculate() {
  let weight = 0, newWeight = 0;
  newWeight = parseInt(document.getElementById('45s').value) * 45;
  if (!isNaN(newWeight)) weight += newWeight;
  newWeight = parseInt(document.getElementById('35s').value) * 35;
  if (!isNaN(newWeight)) weight += newWeight;
  newWeight = parseInt(document.getElementById('25s').value) * 25;
  if (!isNaN(newWeight)) weight += newWeight;
  newWeight = parseInt(document.getElementById('15s').value) * 15;
  if (!isNaN(newWeight)) weight += newWeight;
  newWeight = parseInt(document.getElementById('10s').value) * 10;
  if (!isNaN(newWeight)) weight += newWeight;
  newWeight = parseInt(document.getElementById('5s').value) * 5;
  if (!isNaN(newWeight)) weight += newWeight;
  newWeight = parseInt(document.getElementById('2.5s').value) * 2.5;
  if (!isNaN(newWeight)) weight += newWeight;
  newWeight = parseInt(document.getElementById('barWeight').value);
  if (!isNaN(newWeight)) weight += newWeight;
  document.getElementById('output').innerHTML = weight + " lbs";
}

function addSubtractPlate(plate, action) {
  elem = (document.getElementById(plate));
  value = parseInt(elem.value);
  if (action === '+') {
    result = value + 1;
    if (isNaN(result)) {
      elem.value = 1;
    } else {
      elem.value = result
    }
  } else if (action === '-') {
    result = value - 1;
    if (isNaN(result) || result < 0) {
      elem.value = 0;
    } else {
      elem.value = result
    }
  }
  calculate()
}

function alignInputs() {
  const labels = [...document.getElementsByTagName('label')];
  labels.shift();
  const width = labels.slice(-1)[0].offsetWidth;
  for (const currentLabel of labels) {
    currentLabel.style.display = 'inline-block'
    currentLabel.style.width = width + 'px';
  }
}

document.addEventListener("DOMContentLoaded", alignInputs);
window.addEventListener("resize", alignInputs);
