// Checks whether the device is an iOS device. Returns true if it's iOS.
function isIos() {
  if( userAgent.indexOf('iPad') > -1 || userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPod') > -1 ) {
    return true;
  } else return false;
}

export { isIos };
