function createUrl() {
  var originalUrl = document.getElementById('originalUrl').value;
  var originalDomain = extractDomain(originalUrl);
  var newDomain = originalDomain.replace('m.','')
  newDomain = newDomain.replace('i.','')
  newDomain = newDomain.replace('www.','')
  newDomain = newDomain.replace('w3.','')
  newDomainAndProtocol = 'https://i.' + newDomain;

  var path = originalUrl.replace(originalDomain, '')
  path = path.slice(path.lastIndexOf("/") + 1);
  console.log(path);
  path = path.split(".")[0];
  console.log(path);
  path = path.split('?')[0];
  console.log(path);

  var gifvUrl = newDomainAndProtocol + '/' + path +'.gifv';
  document.getElementById('output').innerHTML = gifvUrl;
  document.getElementById('outputInput').value = gifvUrl;
}

//http://stackoverflow.com/a/23945027/3784441
function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }
    //find & remove port number
    domain = domain.split(':')[0];
    return domain;
}

//http://stackoverflow.com/a/30810322/3784441
window.addEventListener('load', setupCopyToClipboard, false);
function setupCopyToClipboard() {
  var copyTextareaBtn = document.querySelector('.copyToClipboard');
  copyTextareaBtn.addEventListener('click', function(event) {
    var copyTextarea = document.querySelector('.outputInput');
    copyTextarea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    }
  });
}
