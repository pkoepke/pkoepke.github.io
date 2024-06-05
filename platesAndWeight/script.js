// the source of truth for whether certain plates should be shown and used for calculations or hidden and skipped in calculations is the checkboxes in the HTML. That's why this always starts by grabbing the value of the checkboxes instead of storing on/off in JavaScript.

const plateLabels = ["55s", "45s", "35s", "25s", "15s", "10s", "5s", "2.5s"]; // In order for cases where that helps.

const isInteger = (event) => {
  console.log(event);
  if (!Number.isInteger(parseFloat(event.data))) {
    event.preventDefault();
    return false;
  }
};

const savePlatesStatus = () => {
  // "true" = show, "false" = hide. Localstorage can only store strings.
  let allPlatesMap = getAllPlatesStatus();
  //for (let plate of allPlatesMap) { localStorage.setItem(plate[0], plate[1]);} Trying .map() for this instead.
  [...allPlatesMap].map((plate) => localStorage.setItem(plate[0], plate[1]));
};

const loadPlatesStatusOnLoad = () => {
  // when the page loads, check localstorage  for saved statuses.
  if (localStorage.getItem("55s")) {
    // If there's data in localstorage, use it to override checkboxes. Otherwise leave defaults.
    let allPlatesMap = getAllPlatesStatus();
    for (let plate of allPlatesMap) {
      let label = plate[0];
      let status = localStorage.getItem(label);
      if (status == "false") {
        document.getElementById(label + "Status").checked = false;
      } else {
        document.getElementById(label + "Status").checked = true;
      }
    }
  }
  savePlatesStatus(); // Ensure that plate status is stored in localstorage as soon as the page loads, even on first load, because localstorage is the source of truth and calculations depend on it.
  showHidePlates();
  /*for (let checkbox of [...document.getElementsByClassName('plateStatus')]) { // To avoid recursion when we load the page, don't attach the listenier to the checkboxes until we've set their initial state.
    checkbox.addEventListener(onchange, calculatePlatesFromWeight);
    checkbox.addEventListener(onchange, showHidePlates);
  }*/
};

const getAllPlatesStatus = () => {
  // returns a Map of all plates and whether they're on or off.
  let allPlatesCollection = document.getElementsByClassName("plateStatus");
  let allPlatesMap = new Map();
  for (let plate of allPlatesCollection) {
    allPlatesMap.set(plate.id.replace("Status", ""), plate.checked);
  }
  return allPlatesMap;
};

const showHidePlates = () => {
  // hides or shows rows of plates.
  let allPlatesMap = getAllPlatesStatus();
  for (let plate of allPlatesMap) {
    let row = document.getElementById(plate[0] + "Row");
    if (plate[1]) {
      // If show=true, remove the class that hides the row
      row.classList.remove("displayNone");
    } else {
      row.classList.add("displayNone");
    }
  }
  savePlatesStatus();
  calculatePlatesFromWeight();
};

const barOrPlatesChanged = () => { // Call other functions in order.
  calculateWeightFromPlates();
}

function calculateWeightFromPlates() {
  document.getElementById("desiredWeightLabel").innerHTML = "Weight:"; // If the user is entering plates, change the label to Weight to make it clearer we're going from plates to weight.
  clearRemainingWeight();
  let weight = 0,
    newWeight = 0; // newWeight is the weight to add at each step. It's needed to check for NaN results.
  for (const plateLabel of plateLabels) {
    if (localStorage.getItem(plateLabel) === "true") { // Check localstorage to see if the plate should be included in the calculation. === needed because Localstorage only stores strings
      const plateWeight = parseFloat(plateLabel),
        numPlates = parseFloat(document.getElementById(plateLabel).value);
      newWeight = numPlates * plateWeight;
      if (!isNaN(newWeight)) weight += newWeight;
    }
  }
  newWeight = parseInt(document.getElementById("barWeight").value);
  if (!isNaN(newWeight)) weight += newWeight;
  document.getElementById("desiredWeight").value = weight;
  document.getElementById("percent").value = Math.round(
    (100 * document.getElementById("desiredWeight").value) /
    parseInt(document.getElementById("1RM").value)
  ); // Recalculate % of 1RM.
}

//function addSubtractPlate(plate, action) { // Removing awkward parameters, will use the event instead
const addSubtractPlate = (event) => {
  const button = event.target;
  const plateInput = button.parentElement.getElementsByClassName("plateInput")[0];
  const value = parseInt(plateInput.value);
  if ([...button.classList].includes("plusButton")) {
    result = value + 1;
    if (isNaN(result)) {
      plateInput.value = 1;
    } else {
      plateInput.value = result;
    }
  } else {
    result = value - 1;
    if (isNaN(result) || result < 0) {
      plateInput.value = 0;
    } else {
      plateInput.value = result;
    }
  }
  calculateWeightFromPlates();
}

// Plates from weight functions
const calculatePlatesFromWeight = () => {
  document.getElementById("desiredWeightLabel").innerHTML = "Desired weight:"; // If the user is entering a weight, change the label to Desired Weight to make it clear we're going from weight to plates.

  const desiredWeight = parseFloat(
    document.getElementById("desiredWeight").value
  );
  const barWeight = parseFloat(document.getElementById("barWeight").value);

  if (isNaN(desiredWeight)) {
    // Can't do anything with this, just exit the function.
    clearRemainingWeight();
    return;
  }
  if (desiredWeight < barWeight) {
    // Can't have a desired weight less than the bar, so just make all the # of plates zero then exit the function.
    clearRemainingWeight();
    const plateInputs = [...document.getElementsByClassName("plateInput")];
    for (const input of plateInputs) {
      input.value = 0;
    }
    return;
  } else {
    let remainingWeight = desiredWeight - barWeight;
    const plateNumbers = {}; // Object to hold plates and how many of each plate is needed
    for (const plateLabel of plateLabels) {
      if (localStorage.getItem(plateLabel) === "true") { // Check localstorage to see if the plate should be included in the calculation. === needed because Localstorage only stores strings
        let plateWeight = parseFloat(plateLabel);
        plateNumbers[plateLabel] = parseInt(remainingWeight / (plateWeight * 2)) * 2;
        remainingWeight = remainingWeight - plateNumbers[plateLabel] * plateWeight;
      } else {
        plateNumbers[plateLabel] = 0; // If these plates are hidden, set their number to zero by default.
      }
    }

    if (remainingWeight > 0) {
      document.getElementById("remainingWeight").innerHTML =
        Math.round(remainingWeight * 100) / 100 + " lbs remaining";
    } else {
      clearRemainingWeight();
    }

    for (const plateLabel of plateLabels) {
      document.getElementById(plateLabel).value = plateNumbers[plateLabel];
    }

    document.getElementById("percent").value = Math.round(
      (100 * document.getElementById("desiredWeight").value) /
      parseInt(document.getElementById("1RM").value)
    ); // Recalculate % of 1RM.
  }
};

const calculateDesiredWeight = (event) => {
  // Calculates the desired weight when 1RM and % are entered
  const max = parseInt(document.getElementById("1RM").value);
  const percent = parseInt(document.getElementById("percent").value);
  document.getElementById("desiredWeight").value = (max * percent) / 100;
  //if (doCalculatePlates) calculatePlatesFromWeight();
  calculatePlatesFromWeight(); // Unsure if that IF is still needed
};

function clearRemainingWeight() {
  document.getElementById("remainingWeight").innerHTML = "";
}

const addEventListeners = () => { // Adds all needed event listeners to remove them from the HTML.
  for (const input of document.getElementsByClassName("plateInput")) {
    input.addEventListener("input", barOrPlatesChanged);
  }
  for (const plusButton of document.getElementsByClassName("plusButton")) {
    plusButton.addEventListener("click", addSubtractPlate);
  }
  for (const minusButton of document.getElementsByClassName("minusButton")) {
    minusButton.addEventListener("click", addSubtractPlate);
  }
  document.getElementById("1RM").addEventListener("input", calculateDesiredWeight);
  document.getElementById("percent").addEventListener("input", calculateDesiredWeight);
  document.getElementById("desiredWeight").addEventListener("input", calculatePlatesFromWeight);
  for (const checkBox of document.getElementsByClassName("plateStatus")) {
    checkBox.addEventListener("change", showHidePlates);
  }
};

document.addEventListener("DOMContentLoaded", loadPlatesStatusOnLoad);
document.addEventListener("DOMContentLoaded", addEventListeners);
/*document.addEventListener("DOMContentLoaded", () => { // isInteger prevents non-integer values, but needs some work to allow deleting numbers.
  for (let element of document.querySelectorAll("input[type=number]")) {
    element.addEventListener("beforeinput", isInteger);
  }
});*/
