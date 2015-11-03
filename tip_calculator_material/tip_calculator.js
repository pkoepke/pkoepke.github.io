function start_calculations() {

// get values

var billAmount = document.getElementById("bill_amount").value;
var tipPercent = document.getElementById("tip_percent").value;

// validate the the inputs are numbers

if (tipPercent == "" || isNaN(tipPercent)) {
  document.getElementById("tip_percent_after").innerHTML = "<br />Please enter a number";
  // Removed this from the if/else chain so both warnings can be shown if both inputs have problems
} else {
  document.getElementById("tip_percent_after").innerHTML = "<br />(Enter 50 for 50%)";
}

if (billAmount == "" || isNaN(billAmount)) {
  document.getElementById("bill_amount_after").innerHTML = "<br />Please enter a number";
} else if (tipPercent == "" || isNaN(tipPercent)) {
  // This is done above so both warnings can be shown at the same time if necessary. So this if will be blank to prevent calculation with bad values.
} else {
  document.getElementById("bill_amount_after").innerHTML = "<br />";
  document.getElementById("tip_percent_after").innerHTML = "<br />(Enter 50 for 50%)";

  // calculate

  var tipAmount = billAmount * (tipPercent / 100);
  var totalWithTip = Number(billAmount) + Number(tipAmount);

  // output result

  document.getElementById("output").innerHTML = tipPercent + "% of $" + (Math.round(billAmount * 100) / 100).toFixed(2) + " is $" + (Math.round(tipAmount * 100) / 100).toFixed(2) + ", so your total should be $" + (Math.round(totalWithTip * 100) / 100).toFixed(2);
}

}// end of function start_calculations()

function tip_percent_buttons(buttonPercent) {

  // Set percent to the button's value
  document.getElementById("tip_percent").value = buttonPercent;

  // Calculate
  start_calculations();
}
