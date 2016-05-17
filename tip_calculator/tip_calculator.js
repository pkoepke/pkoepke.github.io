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
    
    // rounding down breask for bills of $1.01-$1.66, $2.01-$2.49, $3.01-$3.33, or $4.01-4.16. Since rounding down in this instance would be super cheap anyway, we'll 
    if(billAmount >= 4.17) {
      document.getElementById('output').innerHTML += tipPercent + '% rounding down is a tip of $' + tipAmountRoundingDown.toFixed(2) + ', so your total should be $' + (Number(billAmount) + Number(tipAmountRoundingDown)).toFixed(2) + ' which is a tip of ' + tipPercentRoundingDown * 100 + '%.';
    } else {
      document.getElementById('output').innerHTML += 'Rounding down for bills under $4.16 can sometimes result in a negative tip, and would be really cheap anyway. So we don\'t round down for bills that small.';
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

// Courtesy of detectmobilebrowsers.com
function  detectBobileBrowsers() {
  var check = false;
  (function(a){
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true}
  )(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}
//document.write('Is mobile device per detectBobileBrowsers(): ' + detectBobileBrowsers()); // for testing only.

// Function to add a mobile stylesheet if the browser is a mobile browser
function addDesktopStyles() {
  if (!detectBobileBrowsers()) {
    document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="./desktopStyles.css">';
  }
}
//addDesktopStyles();
