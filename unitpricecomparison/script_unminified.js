window.addEventListener('load', storeSecondRowHeight, false); // store the initial heights of the second row in px because CSS animations don't work with auto heights. Apparently this includes 'initial' heights?
window.addEventListener('load', expandCollapseSecondRow, false); // initially the second row is shown, but it should be immediately hidden
window.addEventListener('load', addStyles, false); // Adds iOS or Desktop styles if either is detected by addStyles().
window.addEventListener('load', addTransitionSyles, false); // Adds transition class only to elements that should have CSS transitions.

var transitionDelayInSeconds = 0.05;
var transitionDelayInMiliSeconds = transitionDelayInSeconds * 1000;
var secondRowInitialHeight = '81px'; // just throwing in a default height, this should be overwritten when the page loads by storeSecondRowHeight().

function addStyles() { // if iPad, iPhone, or iPod, add iOS styles. If !detectBobileBrowsers(), add Desktop styles.
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if( userAgent.indexOf('iPad') > -1 || userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPod') > -1 ) {
    //document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="./iosStyles_unminified.css">'; // // for use with multiple files instead of inlining styles and JS.
    document.getElementById('stylesTag').innerHTML += 'h3 {font-size: 3rem;} button {height: 1em; min-width: 0; max-width 2em; vertical-align: 15%;} .itemLabel, .price, .units, .itemPricePerUnits, .itemName, .quantity, .unitsName {width: 22%;}'; // for minified and inlined version
  } else if (!detectBobileBrowsers()) {
    //document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="./desktopStyles_unminified.css">'; // for use with multiple files instead of inlining styles and JS.
    document.getElementById('stylesTag').innerHTML += 'body {max-width: 960px; margin-left: auto; margin-right: auto;} h3 {font-size: 2rem;} button {height: 3rem; min-width: 4rem;} .multiplicationSign, .expandCollapseArrow, .addRowImg, .removeRowImg {height: 2rem; vertical-align: 10%;} .itemLabel, .price, .units, .itemPricePerUnits, .itemName, .quantity, .unitsName {font-size: 1.5rem;}'; // for minified and inlined version.
  }
}

function doAllCalculations() {
  // When a calculation is triggered, this function starts the whole process and walks through each necessary function.
  // To avoid global state, every calculation instance gets an object that holds all of its data - inputs from the web page and results of each function's calculation. When the calculation is complete the outputs are written to the page and the object (and all of its data) becomes inaccessible once the function returns. Each new calculation gets its own data directly from the page so there's no chance of new calculations interfering with old.
  // It might be more 'functional' if each function returned a new object, which was then passed to the next function without modifying the original object, as the allDataObject currently acts as pseudo-global state. But using the same object is simple and sufficient since each function can't proceed until the previous one returns.
  var allDataObject = {
    price: [],
    units: [],
    quantity: [],
    pricePerUnit: [],
    allItemPricePerUnitsSpans: []
  }
  getAllPriceUnitQuantity(allDataObject, 'price');
  getAllPriceUnitQuantity(allDataObject, 'units');
  getAllPriceUnitQuantity(allDataObject, 'quantity');
  getAllPricePerUnitSpans(allDataObject);
  calculateAllPricesPerUnit(allDataObject);
  displayAllPricesPerUnit(allDataObject);
  highlightLowestPricePerUnit(allDataObject);
}

function getAllPriceUnitQuantity(allDataObject, currentField) {
  var nodeList = document.getElementsByClassName(currentField); // create NodeList object of all nodes of the current Class.
  nodeList = convertNodeListToArray(nodeList);
  nodeList.forEach( function(currentNode, index) {
    if(currentNode.value === '' || Number.isNaN(currentNode.value)) { // if the value of the current item is blank or NaN
      allDataObject[currentField][index] = NaN;
    } else {
      allDataObject[currentField][index] = Number(currentNode.value);
    }
  }); // iterate over the nodeList array and get the values from each item.
}

function getAllPricePerUnitSpans(allDataObject) {
  allDataObject.allItemPricePerUnitsSpans = document.getElementsByClassName('itemPricePerUnits');
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
  nodeList = convertNodeListToArray(nodeList);
  nodeList.forEach( function (currentNode, index) {
    if(isNaN(allDataObject.pricePerUnit[index])) { // if the current pricePerUnit is NaN, revert the span to the starting HTML.
      currentNode.innerHTML = '$/unit';
      currentNode.className = 'itemPricePerUnits itemPricePerUnitsPlaceholder transition';
    } else {
      currentNode.innerHTML = '$' + Math.round(allDataObject.pricePerUnit[index] * 1000) / 1000;
      currentNode.className = 'itemPricePerUnits transition';
    }
  });
}

function highlightLowestPricePerUnit(allDataObject) {
  var lowestPpuObject = {
    lowestPpuValue: Infinity,
    lowestIndex: -1
  }
  allDataObject.pricePerUnit.forEach( function(currentPpu, index) {
    if (currentPpu < lowestPpuObject.lowestPpuValue) { // NaN < Infinity and NaN < any number are both false so this check is all we need to catch NaN values.
      lowestPpuObject.lowestPpuValue = currentPpu;
      lowestPpuObject.lowestIndex = index;
    }
  });
  try { allDataObject.allItemPricePerUnitsSpans[lowestPpuObject.lowestIndex].className = 'itemPricePerUnits highlightedPricePerUnits transition';
  } catch (err) { /* The array item will be null if there is no unit prices to highlight, so errors are expected here. There's no need to do anything in resposne to the error. */ }
}

function clearAll() {
  var allInputs = document.getElementsByTagName('input');
  allInputs = convertNodeListToArray(allInputs);
  allInputs.forEach(function(currentNode) {
    currentNode.value = '';
  });
  doAllCalculations(); // Resets all of the unit price fields.
}

function convertNodeListToArray(nodeListToConvert) {
  return nodeListToConvert = Array.prototype.slice.call(nodeListToConvert); // convert NodeList to an Array for easier functional iterating - NodeList doesn't have forEach but arrays do. From https://developer.mozilla.org/en-US/docs/Web/API/NodeList
}

function storeSecondRowHeight() { // runs at window.onload, stores the height of the second row. Allows CSS transitions to work since 'auto' height is not allowed for transitions.
  var nodeList = document.getElementsByClassName('itemSecondRowDiv'); // create NodeList object of all nodes of the current Class.
  nodeList = convertNodeListToArray(nodeList);
  secondRowInitialHeight = nodeList[0].clientHeight + 'px';
}

function expandCollapseSecondRow() {
  var allSecondRows = document.getElementsByClassName('itemSecondRowDiv'); // create NodeList object of all nodes of this Class.
  allSecondRows = convertNodeListToArray(allSecondRows);
  if (allSecondRows[0].style.height == '0px') { // expand all if first is currently collapsed
    allSecondRows.forEach( function(currentNode) {
      currentNode.style.height = secondRowInitialHeight;
      // show all child nodes after height transition
      setTimeout( function() {
        var allChildElements = currentNode.childNodes;
        allChildElements = Array.prototype.slice.call(allChildElements);
        allChildElements.forEach( function(currentChildElement) {
          if(currentChildElement.nodeType == 1 && currentNode.style.height == secondRowInitialHeight) { // possible race condition here - if the setTimeout timer is shorter than the card animation time, the card won't be fully extended when this height check fires and this check will fail.
            currentChildElement.style.display = 'initial';
            setTimeout( function() {
              currentChildElement.style.opacity = 1;
            }, transitionDelayInMiliSeconds);
          }
        });
      }, transitionDelayInMiliSeconds);
  });
  document.getElementById('expandCollapseArrow').style.transform = 'rotate(270deg)'; // rotate the arrow button
} else { // otherwise collapse all
    allSecondRows.forEach( function(currentNode) {
      // hide all child nodes before setting height to zero
      var allChildElements = currentNode.childNodes;
      allChildElements = Array.prototype.slice.call(allChildElements);
      allChildElements.forEach( function(currentChildElement) {
        if(currentChildElement.nodeType == 1) {
          currentChildElement.style.opacity = 0;
          setTimeout( function() {
            currentChildElement.style.display = 'none';
            currentNode.style.height = '0px'; // sets height to zero. Triggers CSS transition to animate transition.
          }, transitionDelayInMiliSeconds);
        }
      });
    });
    document.getElementById('expandCollapseArrow').style.transform = 'rotate(90deg)'; // rotate the arrow button
  }
}

function addCard() {
  var currentNumberOfCards = document.getElementsByClassName('itemCard').length + 1;
  var cardHtml = '<div class="itemCard" >\n    <div class="itemFirstRowDiv" >\n      <span class="itemLabel">Item ' + currentNumberOfCards + '</span>\n      <input type="number" class="price" placeholder="Price $" onchange="doAllCalculations()" onkeyup="doAllCalculations()"  oncut="doAllCalculations()" onpaste="doAllCalculations()">\n      <input type="number" class="units" placeholder="Units" onchange="doAllCalculations()" onkeyup="doAllCalculations()"  oncut="doAllCalculations()" onpaste="doAllCalculations()">\n      <span class="itemPricePerUnits itemPricePerUnitsPlaceholder">$/unit</span>\n    </div>\n    <div class="itemSecondRowDiv" >\n      <input type="text" class="itemName" placeholder="Name" >\n      <input type="number" class="quantity" placeholder="Qty" onchange="doAllCalculations()" onkeyup="doAllCalculations()"  oncut="doAllCalculations()" onpaste="doAllCalculations()">\n      <input type="text" class="unitsName" placeholder="Unit name">\n    </div>\n  </div>';
  var allCardsDiv = document.getElementsByClassName('allCardsDiv')[0];
  //allCardsDiv.innerHTML += cardHtml;
  var newDiv = document.createElement('div'); // create a new div HtmlElement.
  newDiv.innerHTML = cardHtml; // add desired HTML within the new div.
  var newDiv = newDiv.firstChild; // wipe out the unwanted exterior div, firstChild is the HTML we want.
  var allSecondRows = document.getElementsByClassName('itemSecondRowDiv'); // create NodeList object of all nodes of this Class. Here we're just using this to check whether the cards are expanded or collapsed by checking the first card.
  allSecondRows = convertNodeListToArray(allSecondRows);
  var currentNode = newDiv;
  if (allSecondRows[0].style.height == '0px') { // hide second row of new itemCard if other second rows are hidden, otherwise do nothing (so no else block)
    var itemSecondRowDiv = newDiv.childNodes[3];
    itemSecondRowDiv.style.height = '0px';
    var allChildElements = itemSecondRowDiv.childNodes; // hide fields in second row.
    allChildElements = Array.prototype.slice.call(allChildElements);
    allChildElements.forEach( function(currentChildElement) {
      if(currentChildElement.nodeType == 1) { // possible race condition here - if the setTimeout timer is shorter than the card animation time, the card won't be fully extended when this height check fires and this check will fail.
        currentChildElement.style.display = 'none';
      }
    });
  }
  allCardsDiv.appendChild(newDiv); // since we created a <div> then added the itemCard HTML within it, we need to add only the div's first child element which is the itemCard div.
}

function removeCard() {
  var allCardDivs = document.getElementsByClassName('itemCard');
  if (allCardDivs.length > 2) { // only remove the card if there are more than 2 cards remaining.
    var cardDivToRemove = allCardDivs[allCardDivs.length -1];
    cardDivToRemove.parentNode.removeChild(cardDivToRemove);
  }
  doAllCalculations();
}

function addTransitionSyles() { // adds transition class only to elements that should have CSS transitions
  var classesToReceiveStyle = ['itemPricePerUnits','expandCollapseArrow', 'itemName', 'quantity', 'unitsName' ,'itemSecondRowDiv']
  classesToReceiveStyle.forEach( function(currentClass) {
    var elementsToReceiveStyle = document.getElementsByClassName(currentClass);
    elementsToReceiveStyle = convertNodeListToArray(elementsToReceiveStyle);
    elementsToReceiveStyle.forEach( function(currentElement) {
      currentElement.className += ' transition';
    });
  });
}

// Courtesy of detectmobilebrowsers.com
function  detectBobileBrowsers() {
  var check = false;
  (function(a){
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true}
  )(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}
