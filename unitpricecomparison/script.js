import { languageToCurrency } from './language-to-currency.js';

const currencySymbol = Intl.NumberFormat(navigator.language, { style: `currency`, currency: languageToCurrency[navigator.language] }).formatToParts(`1`)[0][`value`];

const clearServiceWorkerCache = () => {
  // The cache for the Flutter app is huge, approximately 50 MB when fonts are included. If it exists, clear it.
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      caches.open('flutter-app-cache')
        .then(cache => {
          cache.keys()
            .then(keys => {
              for (const key of keys) {
                if (key.url.includes(`main.dart.js`)) { // If there's a file from the old Flutter version, delete the whole cache so we don't miss anything.
                  caches.keys().then(function (names) {
                    for (let name of names)
                      caches.delete(name);
                  });
                }
              }
            });
        });
    });
  }
}

let shouldShow = false; // Ran into race conditions if the user hid the second row and immediately added another card, so added a global variable that only changes when the show/hide button is pushed.

const buildRow = (number) => {
  // Build the first row of the card.
  const label = document.createElement(`span`);
  label.classList.add(`label`);
  label.classList.add(`nowrap`);
  label.textContent = `Item ${number}`;

  const priceInput = document.createElement(`input`);
  priceInput.type = `number`;
  priceInput.inputMode = `decimal`;
  priceInput.classList.add(`price`);
  priceInput.placeholder = `Price ${currencySymbol}`;
  priceInput.id = `priceInput${number}`;
  priceInput.addEventListener('input', runCalculations);

  const unitInput = document.createElement(`input`);
  unitInput.type = `number`;
  unitInput.inputMode = `decimal`;
  unitInput.classList.add(`units`);
  unitInput.placeholder = `Units`;
  unitInput.id = `unitInput${number}`;
  unitInput.addEventListener('input', runCalculations);

  const result = document.createElement(`span`);
  result.classList.add(`nowrap`);
  result.classList.add(`result`);
  result.textContent = `${currencySymbol}/units`;

  const row1 = document.createElement(`div`);
  row1.classList.add(`flexRow`);
  row1.appendChild(label);
  row1.appendChild(priceInput);
  row1.appendChild(unitInput);
  row1.appendChild(result);

  // Build the second row of the card
  const quantity = document.createElement(`input`);
  quantity.classList.add(`quantity`);
  quantity.type = `number`;
  quantity.inputMode = `decimal`;
  quantity.placeholder = `Qty`;
  quantity.id = `quantityInput${number}`;
  quantity.addEventListener('input', runCalculations);

  const itemName = document.createElement(`input`);
  itemName.classList.add(`itemName`);
  itemName.placeholder = `Item name`;
  itemName.id = `itemNameInput${number}`;
  itemName.addEventListener('input', runCalculations);

  const unitName = document.createElement(`input`);
  unitName.classList.add(`unitName`);
  unitName.placeholder = `Unit name`;
  unitName.id = `unitNameInput${number}`;
  unitName.addEventListener('input', runCalculations);

  const row2 = document.createElement(`div`);
  row2.classList.add(`flexRow`);
  row2.classList.add(`row2`);

  if (shouldShow) {
    row2.classList.remove(`hidden`);
    row2.classList.add(`opaque`);
  } else {
    row2.classList.remove(`opaque`);
    row2.classList.add(`hidden`);
  }

  row2.appendChild(quantity);
  row2.appendChild(itemName);
  row2.appendChild(unitName);

  const card = document.createElement(`div`);
  card.classList.add(`card`);
  card.appendChild(row1);
  card.appendChild(row2);

  document.getElementsByTagName(`main`)[0].appendChild(card);
}

const getValues = () => {
  const valuesObject = {};
  valuesObject['units'] = [...document.getElementsByClassName(`units`)];
  valuesObject['prices'] = [...document.getElementsByClassName(`price`)];
  valuesObject['quantities'] = [...document.getElementsByClassName(`quantity`)];
  valuesObject['itemNames'] = [...document.getElementsByClassName(`itemName`)];
  valuesObject['unitNames'] = [...document.getElementsByClassName(`unitName`)];
  valuesObject['results'] = [...document.getElementsByClassName(`result`)];
  console.log(valuesObject);
  return valuesObject;
}

const runCalculations = () => {
  const valuesObject = getValues();
  const units = valuesObject['units'];
  const prices = valuesObject['prices'];
  const quantities = valuesObject['quantities'];
  const itemNames = valuesObject['itemNames'];
  const unitNames = valuesObject['unitNames'];
  const results = valuesObject['results'];
  let pageurl = window.location.href;
  //let queryString = `?`; // Build a queryString for easy sharing and saving. i iterates from 1 but the items are numbered starting at 1 so we add 1 to i each time to match the UI.
  let queryString = new URLSearchParams();
  let resultValues = []; // Store results here for finding the best price per unit.
  for (let i = 0; i < units.length; i++) {
    const unit = units[i].value;
    if (unit) queryString.set(`u${i + 1}`, `${unit}`)
    const price = prices[i].value;
    if (price) queryString.set(`p${i + 1}`, `${price}`);
    let quantity = quantities[i].value;
    if (quantity) queryString.set(`q${i + 1}`, `${quantity}`);
    if (itemNames[i].value) queryString.set(`in${i + 1}`, `${itemNames[i].value}`);
    if (unitNames[i].value) queryString.set(`in${i + 1}`, `${unitNames[i].value}`);
    if (isNaN(quantity) || (quantity == 0)) {
      quantity = 1;
    }
    let result = NaN; // result = NaN is the default way to say "clear the result field"
    if (isNaN(unit) || unit == 0 || isNaN(price) || price == 0) {
      result = NaN;
    } else {
      result = price / (unit * quantity);
    }
    if (isNaN(result) || !isFinite(result)) {
      resultValues[i] = NaN;
      results[i].textContent = `${currencySymbol}/units`;
    } else {
      resultValues[i] = Math.round(result * 1000) / 1000;
      results[i].textContent = `${currencySymbol}${resultValues[i].toFixed(3)}`; // Round to 3 decimal places, and always display 3 decimal places.
    }
  }
  resultValues = resultValues.filter((result) => { return !(isNaN(result) || !isFinite(result)) }); // Remove any NaN or Inifinity which break Math.min.
  const min = Math.min(...resultValues);
  for (const result of results) {
    if (Math.round(parseFloat(result.textContent.slice(1)) * 1000) / 1000 == min) {
      result.classList.add(`bestValue`);
    } else {
      result.classList.remove(`bestValue`);
    }
  }
  history.replaceState({ foo: "bar" }, null, `${window.location.origin}${window.location.pathname}?${queryString}`);
}

const clear = () => {
  const inputs = document.getElementsByTagName(`input`);
  for (const input of inputs) {
    input.value = ``;
  }
  runCalculations();
}

const removeCard = () => {
  const cards = [...document.getElementsByClassName(`card`)];
  if (cards.length > 2) {
    cards.at(-1).remove();
  }
  runCalculations();
}

const addCard = () => {
  const cards = [...document.getElementsByClassName(`card`)];
  buildRow(cards.length + 1);
  runCalculations();
}

const showHideRow = () => {
  const rows = [...document.getElementsByClassName(`row2`)]
  shouldShow = rows[0].classList.contains(`hidden`);
  for (const row of rows) {
    if (shouldShow) {
      row.classList.remove(`hidden`);
      setTimeout(() => row.classList.add(`opaque`), 0);
    } else {
      row.classList.remove(`opaque`);
      setTimeout(() => row.classList.add(`hidden`), 400);
    }
  }
}

const share = async () => {
  const shareData = {
    title: `Unit Price Comparison`,
    text: `Comparing unit prices`,
    url: window.location.href
  }
  try {
    await navigator.share(shareData);
  } catch (err) {
    console.log(err);
  }
}

const determineNumRows = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const allKeys = [...queryParams.keys()];
  if (allKeys.length < 1) {
    return 4; // Default number of rows is 4.
  }
  const rowNums = [];
  for (const key in allKeys) {
    rowNums.push([...allKeys[key]].filter((char) => { return !isNaN(parseInt(char)) }).join(''));
  }
  const numRows = Math.max(...rowNums);
  if (numRows < 2) { // Silly to have a comparison app with only 1 item.
    return 2;
  }
  return Math.max(...rowNums);
}

const handleQueryParams = () => {
  const queryParams = new URLSearchParams(window.location.search);

  const nameMap = {
    units: `u`,
    prices: `p`,
    quantities: `q`,
    itemNames: `in`,
    unitNames: `un`
  }

  const allInputs = {
    units: [...document.getElementsByClassName(`units`)],
    prices: [...document.getElementsByClassName(`price`)],
    quantities: [...document.getElementsByClassName(`quantity`)],
    itemNames: [...document.getElementsByClassName(`itemName`)],
    unitNames: [...document.getElementsByClassName(`unitName`)]
  }

  for (const key in allInputs) {
    for (let i = 1; i <= allInputs[key].length; i++) {
      allInputs[key][i - 1].value = queryParams.get(nameMap[key] + i);
    }
  }

  runCalculations()
}

const shouldShowSecondRowAtLaunch = () => {
  const queryParams = new URLSearchParams(window.location.search);
  let allKeys = [...queryParams.keys()];
  const keyStrings = [];
  for (const key in allKeys) {
    keyStrings.push([...allKeys[key]].filter((char) => { return isNaN(parseInt(char)) }).join(''));
  }
  if (keyStrings.includes(`q`) || keyStrings.includes(`in`) || keyStrings.includes(`un`)) {
    return true;
  } else {
    return false;
  }
}

const attachListeners = () => {
  document.getElementById(`clear`).addEventListener(`click`, clear);
  document.getElementById(`removeCard`).addEventListener(`click`, removeCard);
  document.getElementById(`addCard`).addEventListener(`click`, addCard);
  document.getElementById(`showHideRow`).addEventListener(`click`, showHideRow);
  document.getElementById(`share`).addEventListener(`click`, share);
}

document.addEventListener(`DOMContentLoaded`, () => { shouldShow = shouldShowSecondRowAtLaunch() }); // So if the user loads the page using the query string, the calculations run.
document.addEventListener(`DOMContentLoaded`, () => { for (let i = 1; i < determineNumRows() + 1; i++) buildRow(i) });
document.addEventListener(`DOMContentLoaded`, handleQueryParams); // So if the user loads the page using the query string, the calculations run.
document.addEventListener(`DOMContentLoaded`, attachListeners);
document.addEventListener(`DOMContentLoaded`, clearServiceWorkerCache);