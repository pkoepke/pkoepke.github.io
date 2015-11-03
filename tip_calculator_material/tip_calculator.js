// runs when the user enters a number in the Tip Percent field. Is also called by tip_percent_buttons(), which is used when the user chooses a percent button.
function start_calculations() {
  // get values
  var billAmount = document.getElementById("bill_amount").value;
  var tipPercent = document.getElementById("tip_percent").value;

  // validate the the inputs are numbers. If they aren't, show an error.
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

} // end of function start_calculations()

// runs when the user chooses a percent button.
function tip_percent_buttons(buttonPercent) {
  // Set percent to the button's value
  document.getElementById("tip_percent").value = buttonPercent;

  // Calculate
  start_calculations();
}

// logs the device's resolution, pixel density, and physical screen size to the console.
function detect_resolution_pixel_density_screen_size() {
  console.log("The window's resolution is: " + window.innerHeight + " x " + window.innerWidth);
  console.log("The device's pixel density is: " + window.devicePixelRatio);
  console.log("The device's computed physcal screen size (resolution / pixel density) is: " );
}
detect_resolution_pixel_density_screen_size() // detect as soon as the page loads.s

function detect_if_mobile_device() {
  var isMobi = navigator.userAgent.search("mobi");
  console.log(isMobi);
  if( isMobi > -1 ) {
    document.write("mobile device");
  }
}
detect_if_mobile_device();
