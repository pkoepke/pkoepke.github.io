function twitterToNitter() {
  let ogUrl = document.getElementById('twitterUrl').value;
  ogUrl = ogUrl.toLowerCase()
  url1 = ogUrl.replace('twitter.com', 'nitter.net');
  console.log(ogUrl)
  if (url1.indexOf('http') != 0) {
    url1 = 'https://' + url1;
  }
  url2 = ogUrl.replace('twitter.com', 'nitter.lacontrevoie.fr')
  if (url2.indexOf('http') != 0) {
    url2 = 'https://' + url2;
  }
  url3 = ogUrl.replace('twitter.com', 'nitter.1d4.us')
  if (url3.indexOf('http') != 0) {
    url3 = 'https://' + url3;
  }
  document.getElementById('twitterToNitterOutput').innerHTML = '<p><a href="' + url1 + '">' + url1 + '</a></p><p><a href="' + url2 + '" > ' + url2 + '</a ></p><p><a href="' + url3 + '" > ' + url3 + '</a ></p>';
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
