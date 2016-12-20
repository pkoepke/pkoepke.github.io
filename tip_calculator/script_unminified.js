function checkInputsDisplayErrorsReturn(billAmount, tipPercent) {
  // validate the the inputs are numbers. If they aren't, show an error.
  var areFieldsNumbers = true;
  if( !checkIfBillAmountFieldIsANumber(billAmount) ) { // if Bill Amount is NaN or blank, set areFieldsNumbers = false and display error message.
    areFieldsNumbers = false;
    displayBillAmountAfterError();
    if ( !checkIfTipFieldIsANumber(tipPercent) ) {
      displayTipPercentAfterError();
    } else {
      displayNormalTipPercentAfter();
    }
  } else { displayNormalBillAmountAfter(); }

  return areFieldsNumbers;
}

// calculates tip using exactly the percent entered in the Tip Percent field.
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

// runs when the user chooses a percent button to set the Tip Percent field then run the percent calculations
function tipPercentButtons(buttonPercent) {
  // Set percent to the button's value
  document.getElementById('tipPercent').value = buttonPercent;
  // Calculate
  calculationsWithoutRounding();
}

// runs when the user chooses a percent button with rounding to set the Tip Percent field then run the percent calculations with rounding
function tipPercentButtonsWithRounding(buttonPercent) {
  // Set percent to the button's value
  document.getElementById('tipPercent').value = buttonPercent;
  // Calculate
  calculatePercentWithRounding();
}

// called when tipPercentButtonsWithRounding() is called, or when the bill amount changes on the assumption that this is the most common use case.
function calculatePercentWithRounding() {
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
    document.getElementById('output').innerHTML += tipPercent + '% rounding up is a tip of $' + tipAmountRoundingUp.toFixed(2) + ', so your total should be $' + (Number(billAmount) + Number(tipAmountRoundingUp)).toFixed(2) + ' which is a tip of ' + tipPercentRoundingUp * 100 + '%.<br /><br />';

    // rounding down results in negative tips for bills of $1.01-$1.66, $2.01-$2.49, $3.01-$3.33, or $4.01-4.16. We'll display a warning instead of giving the negative tip amount.
    if(tipAmountRoundingDown >= 0) {
      document.getElementById('output').innerHTML += tipPercent + '% rounding down is a tip of $' + tipAmountRoundingDown.toFixed(2) + ', so your total should be $' + (Number(billAmount) + Number(tipAmountRoundingDown)).toFixed(2) + ' which is a tip of ' + tipPercentRoundingDown * 100 + '%.';
    } else {
      document.getElementById('output').innerHTML += tipPercent + '% rounding down would be a negative tip ($' + tipAmountRoundingDown.toFixed(2) + ') because the bill amount is very small.';
    }
  } else { displayOriginalOutput(); }
}

// checks if bill amount  is NaN or blank.
function checkIfBillAmountFieldIsANumber(billAmount) {
  if (billAmount == '' || isNaN(billAmount)) {
    return false;
  } else {
    displayBillAmountAfterError()
    return true;
  }
}

function displayNormalBillAmountAfter() {
  document.getElementById('billAmountAfter').innerHTML = '<br />';
}

function displayBillAmountAfterError() {
  document.getElementById('billAmountAfter').innerHTML = '<br />Please enter a number';
}

// checks if tip field is NaN or blank.
function checkIfTipFieldIsANumber(tipPercent) {
  if (tipPercent == '' || isNaN(tipPercent)) {
    return false;
  } else {
    return true;
  }
}

function displayNormalTipPercentAfter() {
  document.getElementById('tipPercentAfter').innerHTML = '<br />(Enter 20 for 20%)';
}

function displayTipPercentAfterError() {
  document.getElementById('tipPercentAfter').innerHTML = '<br />Please enter a number';
}

function displayOriginalOutput() {
  document.getElementById('output').innerHTML = 'Tip and total amounts:<br />';
}
