// Weight from plates functions.

let platesLabels = [];

const getPlatesLabels = () => {
  platesLabels = [...document.getElementsByClassName('labelForPlates')];
}

/*const isInteger = (event) => {
  if (!Number.isInteger((parseFloat(event.data)))) {
    event.preventDefault();
  }
}*/

function calculateWeightFromPlates() {
  document.getElementById('desiredWeightLabel').innerHTML = 'Weight:' // If the user is entering plates, change the label to Weight to make it clearer we're going from plates to weight.
  clearRemainingWeight();
  let weight = 0, newWeight = 0; // newWeight is the weight to add at each step. It's needed to check for NaN results.
  for (const label of platesLabels) {
    let labelNum = parseInt(label.innerText);
    if (label.innerText == '2.5s:') labelNum = 2.5; // 2.5 is a float and needs special handling
    const numPlates = document.getElementById(labelNum + 's').value;
    newWeight = numPlates * labelNum;
    if (!isNaN(newWeight)) weight += newWeight;
  }
  newWeight = parseInt(document.getElementById('bar').value);
  if (!isNaN(newWeight)) weight += newWeight;
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
  document.getElementById('desiredWeightLabel').innerHTML = 'Desired weight:' // If the user is entering a weight, change the label to Desired Weight to make it clear we're going from weight to plates.

  const desiredWeight = parseFloat(document.getElementById('desiredWeight').value);
  const bar = parseFloat(document.getElementById('bar').value);
  const fifteensYesNo = document.getElementById('fifteensYesNo').checked;

  if (isNaN(desiredWeight)) { // Can't do anything with this, just exit the function.
    clearRemainingWeight();
    return;
  }
  if (desiredWeight < bar) { // Can't have a desired weight less than the bar, so just make all the # of plates zero then exit the function.
    clearRemainingWeight();
    const plateInputs = [...document.getElementsByClassName('plateInput')];
    for (const input of plateInputs) {
      input.value = 0;
    }
    return;
  } else {
    let remainingWeight = desiredWeight - bar;
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
    remainingWeight = remainingWeight - (a2halfs * 2.5);

    if (remainingWeight > 0) {
      document.getElementById('remainingWeight').innerHTML = (Math.round(remainingWeight * 100) / 100) + ' lbs remaining';
    } else {
      clearRemainingWeight();
    }

    let output = bar + 'lbs bar<br>'
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
    document.getElementById('percent').value = Math.round(100 * (document.getElementById('desiredWeight').value) / parseInt(document.getElementById('1RM').value));// Recalculate % of 1RM.
  }
}

const calculateDesiredWeight = () => { // Calculates the desired weight when 1RM and % are entered
  const max = parseInt(document.getElementById('1RM').value);
  const percent = parseInt(document.getElementById('percent').value);
  document.getElementById('desiredWeight').value = max * percent / 100;
  calculatePlates();
}

function clearRemainingWeight() {
  document.getElementById('remainingWeight').innerHTML = '';
}

const getLabels = () => {
  let labelsToSave = [];
  let labelElements = [...document.querySelectorAll('.labelForPlates'), ...document.querySelectorAll('.labelForWeight')];
  for (element of labelElements) {
    labelsToSave.push(element.getAttribute('for'));
  }
  return labelsToSave;
}

const save = () => {
  clearTestKey();
  let objectToSave = {};
  let labelsToSave = getLabels();
  for (let label of labelsToSave) {
    objectToSave[label] = document.getElementById(label).value;
  }
  localStorage.setItem(localStorage.length, JSON.stringify(objectToSave));
}

const clearTestKey = () => {
  localStorage.removeItem('test key'); // Firefox creates an un wanted 'test key' on page reload. If it's in localstorage this removes it, and if it's not there this does nothing.
}

const loadPrevious = () => {
  clearTestKey();
  document.getElementById('savedData').innerHTML = '';
  let keys = Object.keys(localStorage);
  keys.sort(); // Object.keys(localStorage) doesn't always return the keys in order, so this ensures they are added to the page in order.
  for (let key of keys) {
    let dataObject = JSON.parse(localStorage.getItem(key));
    let rowDiv = document.createElement('div');
    rowDiv.className = 'outputRow';
    let innerKeys = Object.keys(dataObject);
    let rowNum = document.createElement('span');
    rowNum.className = 'savedItem';
    rowNum.textContent = key;
    rowDiv.appendChild(rowNum);
    let rowChildren = [];
    for (let innerKey of innerKeys) {
      let itemDiv = document.createElement('span');
      itemDiv.className = 'savedItem ' + innerKey;
      itemDiv.setAttribute('data-label', innerKey);
      itemDiv.setAttribute('data-value', dataObject[innerKey]);
      itemDiv.textContent = innerKey + ': ' + dataObject[innerKey] + ' ';
      if (itemDiv.className.includes('Weight')) {
        itemDiv.style.width = '9rem';
        itemDiv.textContent = 'Weight: ' + dataObject[innerKey] + ' ';
      } else if (itemDiv.className.includes('1RM') | itemDiv.className.includes('percent')) {
        itemDiv.style.width = '7rem';
      } else { itemDiv.style.width = '4rem'; }
      rowChildren.push(itemDiv);
    }
    //rowChildren.splice(6, 0, rowChildren.splice(8, 1)[0]);
    for (let child of rowChildren) {
      rowDiv.appendChild(child);
    }
    let loadButton = document.createElement('input');
    loadButton.setAttribute('type', 'button');
    loadButton.setAttribute('value', 'Load');
    loadButton.setAttribute('onclick', 'loadOne(event)');
    loadButton.setAttribute('data-object-key', key);
    rowDiv.appendChild(loadButton);
    document.getElementById('savedData').appendChild(rowDiv);
  }
}

const loadOne = (event) => {
  let allLabels = getLabels();
  for (let label of allLabels) {
    let sourceElement = event.target.parentNode.getElementsByClassName(label)[0];
    document.getElementById(label).value = sourceElement.getAttribute('data-value');
  }
}

const clearStorage = () => { localStorage.clear() }

const share = async () => {
  let allLabels = getLabels();
  let textToShare = '';
  for (let label of allLabels) {
    textToShare += label + ' ' + document.getElementById(label).value + '\n';
  }
  console.log(textToShare);
  if (navigator.share) {
    navigator.share({
      title: 'Plates and Weight',
      text: textToShare,
      url: 'https://paulkoepke.com/',
    })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
  }

}

document.addEventListener("DOMContentLoaded", clearTestKey); // Clear unwanted test key Firefox sometimes creates on refresh.
document.addEventListener("DOMContentLoaded", getPlatesLabels);
/*document.addEventListener("DOMContentLoaded", () => {
  for (element of document.querySelectorAll("input[type=number]")) {
    element.addEventListener("beforeinput", isInteger);
  }
});*/