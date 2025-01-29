import { languageToCurrency } from './language-to-currency.js';

const currencySymbol = Intl.NumberFormat(navigator.language, { style: `currency`, currency: languageToCurrency[navigator.language] }).formatToParts(`1`)[0][`value`];

const clearServiceWorkerCache = () => {
  // The cache for the Flutter app is huge, approximately 50 MB when fonts are included. If it exists, clear it.
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      // Open the cache with the specified name
      caches.open('your-cache-name')
        .then(cache => {
          // Get all keys in the cache
          cache.keys()
            .then(keys => {
              // Log the keys or do something with them
              console.log('Cache keys:', keys);
            });
        });
    });
  }
}

clearServiceWorkerCache();

const buildRow = (number) => {
  // Build the first row of the card.
  const label = document.createElement(`span`);
  label.classList.add(`label`);
  label.classList.add(`nowrap`);
  label.textContent = `Item ${number}`;

  const priceInput = document.createElement(`input`);
  priceInput.type = `number`;
  priceInput.classList.add(`price`);
  priceInput.placeholder = `Price ${currencySymbol}`;

  const unitInput = document.createElement(`input`);
  unitInput.type = `number`;
  unitInput.classList.add(`units`);
  unitInput.placeholder = `Units`;

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
  quantity.placeholder = `Qty`;

  const itemName = document.createElement(`input`);
  itemName.classList.add(`itemName`);
  itemName.placeholder = `Item name`;

  const unitName = document.createElement(`input`);
  unitName.classList.add(`unitName`);
  unitName.placeholder = `Unit name`;

  const row2 = document.createElement(`div`);
  row2.classList.add(`flexRow`);
  row2.classList.add(`row2`);
  row2.classList.add(`hidden`)
  row2.appendChild(quantity);
  row2.appendChild(itemName);
  row2.appendChild(unitName);

  const card = document.createElement(`div`);
  card.classList.add(`card`);
  card.appendChild(row1);
  card.appendChild(row2);

  document.getElementsByTagName(`main`)[0].appendChild(card);
}

const runCalculations = () => {
  const units = [...document.getElementsByClassName(`units`)];
  const prices = [...document.getElementsByClassName(`price`)];
  const quantities = [...document.getElementsByClassName(`quantity`)];
  const results = [...document.getElementsByClassName(`result`)];
  let resultValues = []; // Store results here for finding the best price per unit.
  for (let i = 0; i < units.length; i++) {
    const unit = units[i].value;
    const price = prices[i].value;
    let quantity = quantities[i].value;
    if (isNaN(quantity) || (quantity == 0)) {
      quantity = 1;
    }
    let result = NaN; // result = NaN is the default way to say "clear the result field"
    if (isNaN(unit) || unit == 0 || isNaN(price) || price == 0) {
      result = NaN;
    } else {
      result = price / (unit * quantity);
      console.log(result)
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
}

const clear = () => {
  const inputs = document.getElementsByTagName(`input`);
  console.log(inputs);
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
}

const addCard = () => {
  const cards = [...document.getElementsByClassName(`card`)];
  buildRow(cards.length + 1);
}

const showHideRow = () => {
  const rows = [...document.getElementsByClassName(`row2`)]
  const shouldshow = rows[0].classList.contains(`hidden`);
  for (const row of rows) {
    if (shouldshow) {
      row.classList.remove(`hidden`);
      setTimeout(() => row.classList.add(`opaque`), 0);
    } else {
      row.classList.remove(`opaque`);
      setTimeout(() => row.classList.add(`hidden`), 400);
    }
  }
}

const attachListeners = () => {
  const inputs = [...document.getElementsByClassName(`units`)].concat([...document.getElementsByClassName(`price`)], [...document.getElementsByClassName(`quantity`)]);
  for (const input of inputs) {
    input.addEventListener(`input`, runCalculations);
  }
  document.getElementById(`clear`).addEventListener(`click`, clear);
  document.getElementById(`removeCard`).addEventListener(`click`, removeCard);
  document.getElementById(`addCard`).addEventListener(`click`, addCard);
  document.getElementById(`showHideRow`).addEventListener(`click`, showHideRow);
}

for (let i = 1; i < 5; i++) { document.addEventListener(`DOMContentLoaded`, () => { buildRow(i) }); }
document.addEventListener(`DOMContentLoaded`, attachListeners);