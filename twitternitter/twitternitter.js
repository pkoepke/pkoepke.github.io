function convertAll() {
  document.getElementById('output').innerHTML = '';
  try {
    let url = new URL(document.getElementById('url').value);
    let domains = ['www.twitter.com', 'twiiit.com', document.getElementById('prependDomain').value]
    let results = []
    for (domain of domains) {
      results.push('<a href="https://' + domain + url.pathname + '">' + domain + url.pathname + '</a>')
    }
    for (result of results) {
      document.getElementById('output').innerHTML += '<p>' + result + '</p>';
    }
  } catch (error) { // If the URL is invalid, do nothing except clearing the output (which already happened above)
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