/*  Flow:
1. Bill Amount or Tip Percent fields change. This could be user input to either field or pressing a % button. % buttons call tipPercentButtonsWithRounding().
2. Field change kicks off calculatePercentWithRounding().
3. checkInputsDisplayErrorsReturn() checks if the fields are numbers, displays error messages, and returns True (are numbers, continue calculations) or False (are not numbers, stop calculations and display the original output placeholder).
4. calculatePercentWithRounding() finishes the calculations and displays the outputs.
*/

// Add event listeners to the windows to run code when the page loads.
window.addEventListener('load', displayOriginalOutput, false);
window.addEventListener('load', giveBillAmountFocus, false);
window.addEventListener('load', applyIosStyles, false);

function giveBillAmountFocus(event) {
  document.getElementById('billAmount').focus();
}

// runs when the user chooses a percent button with rounding to set the Tip Percent field then run the percent calculations with rounding
function tipPercentButtonsWithRounding(buttonPercent) {
  // Set percent to the button's value
  document.getElementById('tipPercent').value = buttonPercent;
  // Run calculations with rounding.
  calculatePercentWithRounding();
}

// Runs all the calculations including rounding up and down. Runs when Bill Amount or Tip Percent fields change, or when tipPercentButtonsWithRounding() is called by pressing a % button.
function calculatePercentWithRounding(event) {
  // get values from web page.
  var billAmountInputElement = document.getElementById('billAmount');
  var tipPercentInputElement = document.getElementById('tipPercent');
  var billAmount = billAmountInputElement.value;
  var tipPercent = tipPercentInputElement.value;

  /*if (billAmount < 0) {
    billAmountInputElement.value = billAmount * -1;
    billAmount = billAmountInputElement.value;
  }

  if (tipPercent < 0) {
    tipPercentInputElement.value = tipPercent * -1;
    tipPercent = tipPercentInputElement.value;
  }*/

  // validate the the inputs are numbers. If they aren't, store False in var areFieldsNumbers so we know to stop and show an error. If they are numbers, store True in var areFieldsNumbers so the computations continue.
  var areFieldsNumbers = checkInputsDisplayErrorsReturn(billAmount, tipPercent);

  // if both fields are numbers, calculate.
  if(areFieldsNumbers) {
    // first do the calculations without rounding and output the result. These values will be used during the rounding calculations.
    var tipAmountUnrounded = Number(billAmount * (tipPercent / 100));
    var totalAmountUnrounded = Number(billAmount) + Number(tipAmountUnrounded);
    document.getElementById('output').innerHTML = tipPercent + '% of $' + (Math.round(billAmount * 100) / 100).toFixed(2) + ' is $' + (Math.round(tipAmountUnrounded * 100) / 100).toFixed(2) + ', so your total should be $' + ((Math.round(totalAmountUnrounded * 100) / 100).toFixed(2)) + '.<br /><br />';

    // second do the calculations without and withrounding using values from unrounded calculations
    var totalAmountRoundedUp = Math.ceil(totalAmountUnrounded);
    var tipAmountRoundingUp = Math.round((totalAmountRoundedUp - billAmount) * 100) / 100;
    var tipPercentRoundingUp = Math.round((tipAmountRoundingUp / billAmount) * 100) / 100;

    var totalAmountRoundedDown = Math.floor(totalAmountUnrounded);
    var tipAmountRoundingDown = Math.round((totalAmountRoundedDown - billAmount) * 100) / 100;
    var tipPercentRoundingDown = Math.round((tipAmountRoundingDown / billAmount) * 100) / 100;

    // output rounded up result
    document.getElementById('output').innerHTML += tipPercent + '% rounding up is a tip of $' + tipAmountRoundingUp.toFixed(2) + ', so your total should be $' + (Number(billAmount) + Number(tipAmountRoundingUp)).toFixed(2) + ' which is a tip of ' + Number(tipPercentRoundingUp * 100).toFixed(0) + '%.<br /><br />';

    // rounding down results in negative tips for bills of $1.01-$1.66, $2.01-$2.49, $3.01-$3.33, or $4.01-4.16. We'll display a warning instead of giving the negative tip amount.
    if(tipAmountRoundingDown >= 0) {
      document.getElementById('output').innerHTML += tipPercent + '% rounding down is a tip of $' + tipAmountRoundingDown.toFixed(2) + ', so your total should be $' + (Number(billAmount) + Number(tipAmountRoundingDown)).toFixed(2) + ' which is a tip of ' + Number(tipPercentRoundingDown * 100).toFixed(0) + '%.';
    } else {
      document.getElementById('output').innerHTML += tipPercent + '% rounding down would be a negative or zero tip ($' + tipAmountRoundingDown.toFixed(2) + ') because the bill amount is very small.';
    }
  }
}

function checkInputsDisplayErrorsReturn(billAmount, tipPercent) { // Checks whether the inputs are numbers, if not displays an error in the output and returns False so computations stop.
  // validate the the inputs are numbers. If they aren't, show an error.
  var areFieldsNumbers = true;
  if( !isANumber(billAmount) ) { // if Bill Amount is NaN or blank, set areFieldsNumbers = false and display error message.
    areFieldsNumbers = false;
    if( !isANumber(tipPercent) ) {
      document.getElementById('output').innerHTML = 'Please enter valid numbers in the Bill Amount and Tip Percent field.';
    } else {
      document.getElementById('output').innerHTML = 'Please enter a valid number in the Bill Amount field.';
    }
  } else if( !isANumber(tipPercent)) {
    areFieldsNumbers = false;
    document.getElementById('output').innerHTML = 'Please enter a valid number in the Tip Percent field.';
  } else { displayOriginalOutput(); }
  return areFieldsNumbers;
}

// checks if bill amount  is NaN or blank.
function isANumber(numberToCheck) {
  return !(numberToCheck == '' || isNaN(numberToCheck));
}

function displayOriginalOutput() {
  document.getElementById('output').innerHTML = 'Tip and total amounts:';
}

function isAllowedKey(event) { // combining several answers from http://stackoverflow.com/questions/2808184/restricting-input-to-textbox-allowing-only-numbers-and-decimal-point
  /*console.log('onkeydown: ')
  function logAllProperties(obj) {
       if (obj == null) return; // recursive approach
       console.log(Object.getOwnPropertyNames(obj));
       logAllProperties(Object.getPrototypeOf(obj));
  }
  logAllProperties(event);*/

  var keyCode = event.keyCode; // grab they key code
  var variousAllowedkeyCodes = [8, 9, 46, 35, 36, 37, 38, 39, 40, 115]; // always-allowed key codes. Allowed: backspace 8, tab 9, delete 46, end 35, home 36, left arrow 37, up arrow 38, right arrow 39, down arrow 40, F5 115.
  if (variousAllowedkeyCodes.indexOf(keyCode) != -1) { // return true if an allowed control key is pressed.
    return true;
  } else if ((48 <= keyCode && keyCode <= 57) || (96 <= keyCode && keyCode <= 105)) { // return true if a keyboard number or numpad key is pressed
    return true;
  } else if (keyCode == 110 || keyCode == 190) {
    // return true if the period or numpad decimal is pressed, but only if there is not already a decimal in the number. If there is already a decimal, return false so only one decimal can be entered.
    // This DOES NOT WORK for numbers with trailing decimals like '1.'' because event.target.value for a numeric input does not return trailing decimals. So we can't detect extra decimals unless there is a character after the decimal. So '1.1.' or '.3.' can be prevented, but not '1..'.
    // Also, once two decimals make it into the field, .value completely breaks because the value is NaN. So '1..1.' is allowed because the first two decimals break .value .
    // This could be fixed by making the input's type something else, like text, but then smartphones wouldn't present the user with a nice keypad to enter their numbers. So that's a no-go.
    var currentValue = event.target.value;
    if (((keyCode == 110) || (keyCode == 190)) && currentValue.indexOf('.') != -1) {
      return false;
    } else { return true; } // if there isn't already a decimal, return true.
  }
  else { return false; } // if the key wasn't caught by any of the conditions above, it isn't an allowed key. Return false.
}

// Determine if the operating system is iOS.
function isIos() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if( userAgent.indexOf('iPad') > -1 || userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPod') > -1 ) {
    return true;
  } else { return false; }
}

// If the OS is iOS, move the dollar sign span to make it line up better, and make the text on the buttons slightly larger.
function applyIosStyles() {
  if(isIos()) {
    document.getElementById('dollarSignSpan').style.left = '0.7em';
    // ES6 way that uglify-js can't handle.
    /* let r allButtons = document.querySelectorAll('input[type=button]');
    for (currentButton of allButtons) {
      currentButton.style.fontSize = '1rem';
    }*/
    // Older way that uglify-js can handle.
    var allButtons = document.querySelectorAll('input[type=button]'); // create NodeList object of all input input[type=button].
    allButtons = convertNodeListToArray(allButtons);
    allButtons.forEach( function (currentButton, index) {
      currentButton.style.fontSize = '1rem';
    });
  }
}

function convertNodeListToArray(nodeListToConvert) {
  return nodeListToConvert = Array.prototype.slice.call(nodeListToConvert); // convert NodeList to an Array for easier functional iterating - NodeList doesn't have forEach but arrays do. From https://developer.mozilla.org/en-US/docs/Web/API/NodeList
}

/*function addInlinedIcons() { // PageSpeed gets judmental of my icons, even the little 64x64 one, so I want to inline. But if I inline just one or inline both in HTML, the data is transmitted twice. This
  var inlinedImageAsString = 'data:image/png;base64,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';

}*/

// runs when the user chooses a percent button to set the Tip Percent field then run the calculations without rounding. Not used anymore, will remove from a future version.
function tipPercentButtonsWithoutRounding(buttonPercent) {
  // Set percent to the button's value
  document.getElementById('tipPercent').value = buttonPercent;
  // Calculate
  calculationsWithoutRounding();
}

// calculates tip using exactly the percent entered in the Tip Percent field. Not used anymore, will remove from a future version.
function calculationsWithoutRounding() {
  // get values
  var billAmount = document.getElementById('billAmount').value;
  var tipPercent = document.getElementById('tipPercent').value;

  // validate the the inputs are numbers. If they aren't, show an error.
  var areFieldsNumbers = checkInputsDisplayErrorsReturn(billAmount, tipPercent);

  if(areFieldsNumbers) { // if Bill Amount was a number, then run checks on Tip Percent
    if( !checkIfTipFieldIsANumber(tipPercent) ) {
      areFieldsNumbers = false;
      displayTipPercentAfterError();
    } else { displayNormalTipPercentAfter(); }
  }

  // if both fields are numbers, calculate.
  if(areFieldsNumbers) {
    var tipAmount = billAmount * (tipPercent / 100);
    var totalWithTip = Number(billAmount) + Number(tipAmount);
    // output result
    document.getElementById('output').innerHTML = tipPercent + '% of $' + (Math.round(billAmount * 100) / 100).toFixed(2) + ' is $' + (Math.round(tipAmount * 100) / 100).toFixed(2) + ', so your total should be $' + ((Math.round(totalWithTip * 100) / 100).toFixed(2));
  } else { displayOriginalOutput(); }
}
