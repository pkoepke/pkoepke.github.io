function generate() {
  const query = document.getElementById('query').value;
  let subreddit = document.getElementById('subreddit').value;
  subreddit = subreddit.split(' ').join(''); // Remove all spaces in the subreddit name. String.replace only does the first one unless you use regular expressions.
  if (subreddit !== "") { subreddit = 'r/' + subreddit + '/'; }
  const sort = document.getElementById('sort').value;
  const time = document.getElementById('time').value;
  const nsfw = document.getElementById('nsfw').checked;
  const oldOrNewReddit = document.getElementById('oldReddit').checked;

  let URL = 'reddit.com/' + subreddit + 'search?q=' + query + '&sort=' + sort + '&t=' + time + '&restrict_sr=on'
  if (oldOrNewReddit) { URL = 'https://old.' + URL;}
  else {URL = 'https://www.' + URL;}
  if (nsfw) {URL += '&include_over_18=on'}
  document.getElementById('output').innerHTML = '<a href="' + URL + '">' + URL + '</a>';
}
