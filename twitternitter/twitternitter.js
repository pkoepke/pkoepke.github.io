function twitterToNitter() {
  let url = document.getElementById('twitterUrl').value;
  url = url.toLowerCase()
  url = url.replace('twitter.com', 'nitter.net');
  if (url.indexOf('http') != 0) {
    url = 'https://' + url;
  }
  url2 = url.replace('nitter.net', 'nitter.lacontrevoie.fr')
  if (url2.indexOf('http') != 0) {
    url2 = 'https://' + url2;
  }
  document.getElementById('twitterToNitterOutput').innerHTML = '<a href="' + url + '">' + url + '</a><br> <a href = "' + url2 + '" > ' + url2 + '</a >';
}

function nitterToTwitter() {
  let url = document.getElementById('nitterUrl').value;
  url = url.toLowerCase()
  url = url.replace('nitter.net', 'twitter.com');
  if (url.indexOf('http') != 0) {
    url = 'https://' + url;
  }
  document.getElementById('nitterToTwitterOutput').innerHTML = '<a href="' + url + '">' + url + '</a>';
}