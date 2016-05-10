window.addEventListener('load', storeSecondRowHeight, false); // store the initial heights of the second row in px because CSS animations don't work with auto heights. Apparently this includes 'initial' heights?
window.addEventListener('load', expandCollapseSecondRow, false); // initially the second row is shown, but it should be immediately hidden
window.addEventListener('load', addIosStyles, false);
window.addEventListener('load', addDesktopStyles, false);

var transitionDelayInSeconds = 1;
var transitionDelayInMiliSeconds = transitionDelayInSeconds * 1000;
var secondRowInitialHeight = '81px'; // just throwing in a default height, this should be overwritten when the page loads by storeSecondRowHeight().

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
  highlightLowestPricePerUnit(allDataObject);
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

function highlightLowestPricePerUnit(allDataObject) {
  var lowestPpuObject = {
    lowestPpu: Infinity,
    lowestIndex: -1
  }
  allDataObject.pricePerUnit.forEach( function(currentPpu, index) {
    if (currentPpu < lowestPpuObject.lowestPpu) { // NaN < Infinity and NaN < any number are both false so this check is all we need to catch NaN values.
      lowestPpuObject.lowestPpu = currentPpu;
      lowestPpuObject.lowestIndex = index;
    }
  });
  lowestPpuObject.lowestIndex += 1; // have to add 1 because indexes start counting at zero but my IDs start at 1.
  var spanToHighlightId = 'item' + lowestPpuObject.lowestIndex + 'PricePerUnits';
  try { document.getElementById(spanToHighlightId).className = 'itemPricePerUnits highlightedPricePerUnits';
} catch (err) { /* getElementById will be null if there is no unit prices to highlight, so errors are expected here. There's no need to do anything in resposne to the error. */ }
}

function clearAll() {
  var allInputs = document.getElementsByTagName('input');
  allInputs = Array.prototype.slice.call(allInputs); // convert NodeList to an Array for easier functional iterating. From https://developer.mozilla.org/en-US/docs/Web/API/NodeList
  allInputs.forEach(function(currentNode) {
    currentNode.value = '';
  });
  doAllCalculations(); // Resets all of the unit price fields.
}

function storeSecondRowHeight() {
  secondRowInitialHeight = document.getElementById('item1SecondRowDiv').clientHeight + 'px';
}

function expandCollapseSecondRow() {
  var allSecondRows = document.getElementsByClassName('itemSecondRowDiv'); // create NodeList object of all nodes of this Class.
  allSecondRows = Array.prototype.slice.call(allSecondRows); // convert NodeList to an Array for easier functional iterating. From https://developer.mozilla.org/en-US/docs/Web/API/NodeList
  
  if (allSecondRows[0].style.height == '0px') { // display all if first is currently hidden
    allSecondRows.forEach( function(currentNode) {
      currentNode.style.height = secondRowInitialHeight;
      // show all child nodes after height transition
      setTimeout( function() {
        var allChildElements = currentNode.childNodes;
        allChildElements = Array.prototype.slice.call(allChildElements);
        allChildElements.forEach( function(currentChildElement) {
          if(currentChildElement.nodeType == 1) {
            currentChildElement.style.display = 'initial';
          }
        });
      }, transitionDelayInMiliSeconds);
  });
    document.getElementById('expandCollapseButton').innerHTML = '<img class="expandCollapseArrow" src="./Pfeil_oben.svg">';
  } else { // otherwise hide all and rename the button.
    allSecondRows.forEach( function(currentNode) {
      // hide all child nodes before setting height to zero
      var allChildElements = currentNode.childNodes;
      allChildElements = Array.prototype.slice.call(allChildElements);
      allChildElements.forEach( function(currentChildElement) {
        if(currentChildElement.nodeType == 1) {
          currentChildElement.style.display = 'none';
        }
      });
      currentNode.style.height = '0px'; // sets height to zero. Triggers CSS transition to animate transition.
    });
    document.getElementById('expandCollapseButton').innerHTML = '<img class="expandCollapseArrow" src="./Pfeil_unten.svg">';
  }
}

function hideUnhideSecondRowChildren(currentNode) {
  currentNode.style.height = secondRowInitialHeight;
  // show all child nodes after height transition
  setTimeout( function() {
    var allChildElements = currentNode.childNodes;
    allChildElements = Array.prototype.slice.call(allChildElements);
    allChildElements.forEach( function(currentChildElement) {
      if(currentChildElement.nodeType == 1) {
        currentChildElement.style.display = 'initial';
      }
    });
  }, transitionDelayInMiliSeconds);
}

function addIosStyles() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if( userAgent.indexOf('iPad') > -1 || userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPod') > -1 ) {
    document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="./iosStyles.css">';
  }
}

function addDesktopStyles() {
  if (!detectBobileBrowsers()) {
    document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="./desktopStyles.css">';
  }
}

// Courtesy of detectmobilebrowsers.com
function  detectBobileBrowsers() {
  var check = false;
  (function(a){
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true}
  )(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}