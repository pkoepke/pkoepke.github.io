/*  Flow:
    1. Bill Amount or Tip Percent fields change. This could be user input to either field or pressing a % button. % buttons call tipPercentButtonsWithRounding().
    2. Field change kicks off calculatePercentWithRounding().
    3. checkInputsDisplayErrorsReturn() checks if the fields are numbers, displays error messages, and returns True (are numbers, continue calculations) or False (are not numbers, stop calculations and display the original output placeholder).
    4. calculatePercentWithRounding() finishes the calculations and displays the outputs.
*/

// runs when the user chooses a percent button with rounding to set the Tip Percent field then run the percent calculations with rounding
function tipPercentButtonsWithRounding(buttonPercent) {
  // Set percent to the button's value
  document.getElementById('tipPercent').value = buttonPercent;
  // Run calculations with rounding.
  calculatePercentWithRounding();
}

// Runs all the calculations including rounding up and down. Runs when Bill Amount or Tip Percent fields change, or when tipPercentButtonsWithRounding() is called by pressing a % button.
function calculatePercentWithRounding() {
  // get values from web page.
  var billAmount = document.getElementById('billAmount').value;
  var tipPercent = document.getElementById('tipPercent').value;

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
  } else { displayOriginalOutput(); }
}

function checkInputsDisplayErrorsReturn(billAmount, tipPercent) { // Checks whether the inputs are numbers, if not displays an error in the output and returns False so computations stop.
  // validate the the inputs are numbers. If they aren't, show an error.
  var areFieldsNumbers = true;
  if( !isANumber(billAmount) ) { // if Bill Amount is NaN or blank, set areFieldsNumbers = false and display error message.
    areFieldsNumbers = false;
    if( !isANumber(tipPercent) ) {
      document.getElementById('output').innerHTML = 'Please enter numbers in the Bill Amount and Tip Percent field.';
    } else {
      document.getElementById('output').innerHTML = 'Please enter a number in the Bill Amount field.';
    }
  } else if( !isANumber(tipPercent)) {
    document.getElementById('output').innerHTML = 'Please enter a number in the Tip Percent field.';
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
