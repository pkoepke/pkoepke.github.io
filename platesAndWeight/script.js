// Weight from plates functions.

function calculateWeightFromPlates() {
  let weight = 0, newWeight = 0; // newWeight is the weight to add at each step. It's needed to check for NaN results.
  const platesLabels = [...document.getElementsByClassName('labelForPlates')]
  for (const label of platesLabels) {
    let labelNum = parseInt(label.innerText);
    if (label.innerText == '2.5s:') labelNum = 2.5; // 2.5 is a float and needs special handling
    const numPlates = document.getElementById(labelNum + 's').value;
    newWeight = numPlates * labelNum;
    if (!isNaN(newWeight)) weight += newWeight;
  }
  newWeight = parseInt(document.getElementById('barWeight').value);
  if (!isNaN(newWeight)) weight += newWeight;
  document.getElementById('output').innerHTML = weight + " lbs";
  document.getElementById('desiredWeight').value = weight;
  document.getElementById('percent').value = Math.round(100 * (document.getElementById('desiredWeight').value) / parseInt(document.getElementById('1RM').value));// Recalculate % of 1RM.
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
  calculateWeightFromPlates()
}

// Plates from weight functions

const calculatePlates = () => {
  const desiredWeight = parseInt(document.getElementById('desiredWeight').value);
  const barWeight = parseInt(document.getElementById('barWeight').value);
  const fifteensYesNo = document.getElementById('fifteensYesNo').checked;

  if (isNaN(desiredWeight)) {
    document.getElementById('output').innerHTML = "";
    return; // Can't do anything with this, just exit the function.
  }
  if (desiredWeight < barWeight) {
    document.getElementById('output').innerHTML = "";
    const plateInputs = [...document.getElementsByClassName('plateInput')];
    for (const input of plateInputs) {
      input.value = 0;
    }
    return; // Can't do anything with this, just exit the function.
  } else {
    let remainingWeight = desiredWeight - barWeight;
    const a45s = parseInt(remainingWeight / 90) * 2;
    remainingWeight = remainingWeight - (a45s * 45);
    const a35s = parseInt(remainingWeight / 70) * 2;
    remainingWeight = remainingWeight - (a35s * 35);
    const a25s = parseInt(remainingWeight / 50) * 2;
    remainingWeight = remainingWeight - (a25s * 25);
    let a15s = 0
    if (fifteensYesNo) {
      a15s = parseInt(remainingWeight / 30) * 2;
      remainingWeight = remainingWeight - (a15s * 15);
    }
    const a10s = parseInt(remainingWeight / 20) * 2;
    remainingWeight = remainingWeight - (a10s * 10);
    const a5s = parseInt(remainingWeight / 10) * 2;
    remainingWeight = remainingWeight - (a5s * 5);
    const a2halfs = parseInt(remainingWeight / 5) * 2;
    remainingWeight = remainingWeight - (a2halfs * 2.5)

    let output = barWeight + 'lbs bar<br>'
    if (a45s) {
      output += a45s + ' 45s, ' + a45s / 2 + ' per side<br>';
      document.getElementById('45s').value = a45s;
    } else { document.getElementById('45s').value = 0; }
    if (a35s) {
      output += a35s + ' 35s, ' + a35s / 2 + ' per side<br>';
      document.getElementById('35s').value = a35s;
    } else { document.getElementById('35s').value = 0; }
    if (a25s) {
      output += a25s + ' 25s, ' + a25s / 2 + ' per side<br>';
      document.getElementById('25s').value = a25s;
    } else { document.getElementById('25s').value = 0; }
    if (a15s) {
      output += a15s + ' 15s, ' + a15s / 2 + ' per side<br>';
      document.getElementById('15s').value = a15s;
    } else { document.getElementById('15s').value = 0; }
    if (a10s) {
      output += a10s + ' 10s, ' + a10s / 2 + ' per side<br>';
      document.getElementById('10s').value = a10s;
    } else { document.getElementById('10s').value = 0; }
    if (a5s) {
      output += a5s + ' 5s, ' + a5s / 2 + ' per side<br>';
      document.getElementById('5s').value = a5s;
    } else { document.getElementById('5s').value = 0; }
    if (a2halfs) {
      output += a2halfs + ' 2.5s, ' + a2halfs / 2 + ' per side<br>';
      document.getElementById('2.5s').value = a2halfs;
    } else { document.getElementById('2.5s').value = 0; }
    //if (remainingWeight) output += 'Remaining weight: ' + remainingWeight + ' lbs.'
    document.getElementById('output').innerHTML = output;
  }
}

const calculateDesiredWeight = () => { // Calculates the desired weight when 1RM and % are entered
  const max = parseInt(document.getElementById('1RM').value);
  const percent = parseInt(document.getElementById('percent').value);
  document.getElementById('desiredWeight').value = max * percent / 100;
  calculatePlates();
}

// Formatting and page launch functions

function alignInputs() { // Getting everything right in CSS is finnicky. It's easier and more reliable to let the browser lay things out nearly right, then make small adjustments in JavaScript. The app doesn't work without JS anyway.
  const labelsForPlates = [...document.getElementsByClassName('labelForPlates')];
  //labelsForPlates.shift();
  const platesWidth = document.querySelector('label[for="2.5s"]').offsetWidth;
  for (const currentLabel of labelsForPlates) {
    currentLabel.style.display = 'inline-block'
    currentLabel.style.width = platesWidth + 'px';
  }

  const labelsForWeight = [...document.getElementsByClassName('labelForWeight')];
  //labelsForPlates.shift();
  const weightWidth = document.querySelector('label[for="desiredWeight"]').offsetWidth;
  for (const currentLabel of labelsForWeight) {
    currentLabel.style.display = 'inline-block'
    currentLabel.style.width = weightWidth + 'px';
  }

}

document.addEventListener("DOMContentLoaded", alignInputs); // Run alignment when page loads.
window.addEventListener("resize", alignInputs); // Rerun alignment when the window is resized.