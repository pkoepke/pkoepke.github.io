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
  if (action === '+') {
    elem.value = parseInt(elem.value) + 1;
  } else if (action === '-') { elem.value = parseInt(elem.value) - 1; }
}