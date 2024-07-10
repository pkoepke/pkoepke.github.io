/*  Flow:
1. Bill Amount or Tip Percent fields change. This could be user input to either field or pressing a % button. % buttons call tipPercentButtonsWithRounding().
2. Field change kicks off calculatePercentWithRounding().
3. checkInputsDisplayErrorsReturn() checks if the fields are numbers, displays error messages, and returns True (are numbers, continue calculations) or False (are not numbers, stop calculations and display the original output placeholder).
4. calculatePercentWithRounding() finishes the calculations and displays the outputs.

Notes:
1. Gratuitous comments in HTML, CSS, and JS don't matter because the production files are minified.
2. Inlining the favicon and the H3 icon actually saves 0.2 KB transferred. gzip prevents the duplicate inlined images from being transferred twice. Unsure how that results in a smaller payload, but maybe there's overhead for grabbing the extra PNG file.
*/

// Add event listeners to the windows to run code when the page loads.
window.addEventListener('load', displayOriginalOutput, false);
window.addEventListener('load', giveBillAmountFocus, false);

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
  if (areFieldsNumbers) {
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
    if (tipAmountRoundingDown >= 0) {
      document.getElementById('output').innerHTML += tipPercent + '% rounding down is a tip of $' + tipAmountRoundingDown.toFixed(2) + ', so your total should be $' + (Number(billAmount) + Number(tipAmountRoundingDown)).toFixed(2) + ' which is a tip of ' + Number(tipPercentRoundingDown * 100).toFixed(0) + '%.';
    } else {
      document.getElementById('output').innerHTML += tipPercent + '% rounding down would be a negative or zero tip ($' + tipAmountRoundingDown.toFixed(2) + ') because the bill amount is very small.';
    }
  }
}

function checkInputsDisplayErrorsReturn(billAmount, tipPercent) { // Checks whether the inputs are numbers, if not displays an error in the output and returns False so computations stop.
  // validate the the inputs are numbers. If they aren't, show an error.
  var areFieldsNumbers = true;
  if (!isANumber(billAmount)) { // if Bill Amount is NaN or blank, set areFieldsNumbers = false and display error message.
    areFieldsNumbers = false;
    if (!isANumber(tipPercent)) {
      document.getElementById('output').innerHTML = 'Please enter valid numbers in the Bill Amount and Tip Percent field.';
    } else {
      document.getElementById('output').innerHTML = 'Please enter a valid number in the Bill Amount field.';
    }
  } else if (!isANumber(tipPercent)) {
    areFieldsNumbers = false;
    document.getElementById('output').innerHTML = 'Please enter a valid number in the Tip Percent field.';
  } else {
    displayOriginalOutput();
  }
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
    } else {
      return true;
    } // if there isn't already a decimal, return true.
  } else {
    return false;
  } // if the key wasn't caught by any of the conditions above, it isn't an allowed key. Return false.
}

// Determine if the operating system is iOS.
/*function isOsIos() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if( userAgent.indexOf('iPad') > -1 || userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPod') > -1 ) {
    return true;
  } else { return false; }
}*/

function convertNodeListToArray(nodeListToConvert) {
  return nodeListToConvert = Array.prototype.slice.call(nodeListToConvert); // convert NodeList to an Array for easier functional iterating - NodeList doesn't have forEach but arrays do. From https://developer.mozilla.org/en-US/docs/Web/API/NodeList
}

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

  if (areFieldsNumbers) { // if Bill Amount was a number, then run checks on Tip Percent
    if (!checkIfTipFieldIsANumber(tipPercent)) {
      areFieldsNumbers = false;
      displayTipPercentAfterError();
    } else {
      displayNormalTipPercentAfter();
    }
  }

  // if both fields are numbers, calculate.
  if (areFieldsNumbers) {
    var tipAmount = billAmount * (tipPercent / 100);
    var totalWithTip = Number(billAmount) + Number(tipAmount);
    // output result
    document.getElementById('output').innerHTML = tipPercent + '% of $' + (Math.round(billAmount * 100) / 100).toFixed(2) + ' is $' + (Math.round(tipAmount * 100) / 100).toFixed(2) + ', so your total should be $' + ((Math.round(totalWithTip * 100) / 100).toFixed(2));
  } else {
    displayOriginalOutput();
  }
}

function switchCss(event) {
  let colorCss = document.getElementById('colorCss');
  if (colorCss.getAttribute('href') == 'darkTheme.css') {
    localStorage.setItem('theme', 'light'); // Remember last choice for future visits
    colorCss.setAttribute('href', 'lightTheme.css');
  } else {
    localStorage.setItem('theme', 'dark'); // Remember last choice for future visits
    colorCss.setAttribute('href', 'darkTheme.css');
  }
}

function setThemeOnLoad() {
  // If localStorage is supported, add a Theme button and load the theme. Otherwise leave the theme dark.
  if (window.localStorage) {
    document.getElementById('themeButtonSpan').innerHTML += '<input type="button" id="themeButton" value="Dark/light theme" onclick="switchCss(event) "></input>';
    if (localStorage.getItem('theme') == 'light') colorCss.setAttribute('href', 'lightTheme.css');
    else if (localStorage.getItem('theme') == 'dark') colorCss.setAttribute('href', 'darkTheme.css');
  }
}

window.addEventListener("load", setThemeOnLoad, false); // Run when the page loads