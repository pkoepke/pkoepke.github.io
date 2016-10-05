function addStyles() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if( userAgent.indexOf('iPad') > -1 || userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPod') > -1 ) {
    //document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="./iosStyles_unminified.css">'; // // for using multiple files instead of inlining styles and JS.
    document.getElementById('stylesTag').innerHTML += 'h3 {font-size: 3rem;} button {height: 1em; min-width: 0; max-width 2em; vertical-align: 15%;} .itemLabel, .price, .units, .itemPricePerUnits, .itemName, .quantity, .unitsName {width: 22%;}'; // for minified and inlined version
  } else if (!detectBobileBrowsers()) {
    //document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="./desktopStyles_unminified.css">'; // for using multiple files instead of inlining styles and JS.
    document.getElementById('stylesTag').innerHTML += 'body {max-width: 960px; margin-left: auto; margin-right: auto;} h3 {font-size: 2rem;} button {height: 3rem; min-width: 4rem;} .multiplicationSign, .expandCollapseArrow, .addRowImg, .removeRowImg {height: 2rem; vertical-align: 10%;} .itemLabel, .price, .units, .itemPricePerUnits, .itemName, .quantity, .unitsName {font-size: 1.5rem;}'; // for minified and inlined version.
  }
}
