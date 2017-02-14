// Determine if the operating system is iOS.
function isOsIos() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if( userAgent.indexOf('iPad') > -1 || userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPod') > -1 ) {
    return true;
  } else { return false; }
}
