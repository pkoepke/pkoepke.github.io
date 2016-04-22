window.addEventListener('load', expandCollapseSecondRow, false); // initially the second row is shown, but it should be immediately hidden
window.addEventListener('load', addIosStyles, false);

function doAllCalculations() {
  var allDataObject = {
    price: [],
    units: [],
    quantity: [],
    pricePerUnit: []
  }
  getAllPriceUnitQuantity(allDataObject, 'price');
  getAllPriceUnitQuantity(allDataObject, 'units');
  getAllPriceUnitQuantity(allDataObject, 'quantity');
  calculateAllPricesPerUnit(allDataObject);
  displayAllPricesPerUnit(allDataObject);
}

function getAllPriceUnitQuantity(allDataObject, currentField) {
  var nodeList = document.getElementsByClassName(currentField); // create NodeList object of all nodes of the current Class.
  nodeList = Array.prototype.slice.call(nodeList); // convert NodeList to an Array for easier functional iterating. From https://developer.mozilla.org/en-US/docs/Web/API/NodeList
  nodeList.forEach( function(currentNode, index) {
    if(currentNode.value === '' || Number.isNaN(currentNode.value)) { // if the value of the current item is blank or NaN
      allDataObject[currentField][index] = NaN;
    } else {
      allDataObject[currentField][index] = Number(currentNode.value);
    }
  }); // iterate over the nodeList array and get the values from each item.
}

function calculateAllPricesPerUnit(allDataObject) {
  allDataObject.price.forEach( function (currentItem, index) {
    if(Number.isNaN(allDataObject.quantity[index])) { // if quantity of current item is NaN, use 1 as the quantity. Typically this will happen when the user doesn't enter any quantity.
    var currentQuantity = 1;
  } else {
    var currentQuantity = allDataObject.quantity[index];
  }
  if(!Number.isNaN(allDataObject.price[index]) && !Number.isNaN(allDataObject.units[index])) { // if price and units aren't NaN, run the calculation.
  allDataObject.pricePerUnit[index] = allDataObject.price[index] / (allDataObject.units[index] * currentQuantity);
} else { // if either price or units are NaN, set pricePerUnit to NaN. If the user deletes a number then the price per unit should be NaN and blanked out.
  allDataObject.pricePerUnit[index] = NaN;
}
});
}

function displayAllPricesPerUnit(allDataObject) {
  var nodeList = document.getElementsByClassName('itemPricePerUnits'); // create NodeList object of all nodes of this Class.
  nodeList = Array.prototype.slice.call(nodeList); // convert NodeList to an Array for easier functional iterating. From https://developer.mozilla.org/en-US/docs/Web/API/NodeList
  nodeList.forEach( function (currentNode, index) {
    if(isNaN(allDataObject.pricePerUnit[index])) { // if the current pricePerUnit is NaN, revert the span to the starting HTML.
      currentNode.innerHTML = '$/unit';
      currentNode.className = 'itemPricePerUnits itemPricePerUnitsPlaceholder';
    } else {
      currentNode.innerHTML = '$' + Math.round(allDataObject.pricePerUnit[index] * 1000) / 1000;
      currentNode.className = 'itemPricePerUnits';
    }
  });
}

function clearAll() {
  var allInputs = document.getElementsByTagName('input');
  allInputs = Array.prototype.slice.call(allInputs); // convert NodeList to an Array for easier functional iterating. From https://developer.mozilla.org/en-US/docs/Web/API/NodeList
  allInputs.forEach(function(currentNode) {
    currentNode.value = '';
  });
  doAllCalculations(); // Resets all of the unit price fields.
}

function expandCollapseSecondRow() {
  var allSecondRows = document.getElementsByClassName('itemSecondRowDiv'); // create NodeList object of all nodes of this Class.
  allSecondRows = Array.prototype.slice.call(allSecondRows); // convert NodeList to an Array for easier functional iterating. From https://developer.mozilla.org/en-US/docs/Web/API/NodeList
  if (allSecondRows[0].style.display == 'none') { // display all if first is currently hidden
    /*allSecondRows.forEach( function (currentNode, index) {
      currentNode.style.display = 'initial';
    });*/
    //$(".itemSecondRowDiv").slideDown('slow');
  $(".itemSecondRowDiv").fadeIn();
  //document.getElementById('expandCollapseButton').innerHTML = '?';
  document.getElementById('expandCollapseButton').innerHTML = '<img class="expandCollapseArrow" src="./Pfeil_oben.svg">';
  } else { // otherwise hide all and rename the button.
    /*allSecondRows.forEach( function (currentNode, index) {
    currentNode.style.display = 'none';
  });*/
  $(".itemSecondRowDiv").fadeOut();
  //$(".itemSecondRowDiv").slideUp('slow');
  //document.getElementById('expandCollapseButton').innerHTML = '?';
  document.getElementById('expandCollapseButton').innerHTML = '<img class="expandCollapseArrow" src="./Pfeil_unten.svg">';
  }
}

function addIosStyles() {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if( userAgent.indexOf('iPad') > -1 || userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPod') > -1 ) {
    document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="./iosStyles.css">';
  }
}
