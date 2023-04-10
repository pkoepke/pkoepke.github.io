function convertAll() {
  document.getElementById('output').innerHTML = '';
  let url = new URL(document.getElementById('url').value);
  let domains = ['www.twitter.com', 'www.nitter.1d4.us', 'www.nitter.net', 'www.nitter.lacontrevoie.fr']
  let results = []
  for (domain of domains) {
    results.push('<a href="https://' + domain + url.pathname + '">' + domain + url.pathname + '</a>')
  }
  for (result of results) {
    document.getElementById('output').innerHTML += '<p>' + result + '</p>';
  }
}