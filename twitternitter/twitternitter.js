function convertAll() {
  document.getElementById('output').innerHTML = '';
  let url = new URL(document.getElementById('url').value);
  let domains = ['www.twitter.com', 'nitter.1d4.us', 'nitter.net', 'nitter.lacontrevoie.fr']
  let results = []
  for (domain of domains) {
    results.push('<a href="https://' + domain + url.pathname + '">' + domain + url.pathname + '</a>')
  }
  for (result of results) {
    document.getElementById('output').innerHTML += '<p>' + result + '</p>';
  }
}

function paste() {
  navigator.clipboard
  .readText()
  .then((clipText) => (document.getElementById('url').value = clipText))
  .then(convertAll);
}

function clearAll() { 
  document.getElementById('url').value = '';
  document.getElementById('output').innerHTML = '';
}