function generate() {
  const query = document.getElementById('query').value;
  const subreddit = document.getElementById('subreddit').value;
  const sort = document.getElementById('sort').value;
  const time = document.getElementById('time').value;
  const nsfw = document.getElementById('nsfw').checked;

  let URL = 'https://www.reddit.com/r/' + subreddit + '/search?q=' + query + '&sort=' + sort + '&t=' + time + '&restrict_sr=on'
  if (nsfw) {URL += '&include_over_18=on'}
  document.getElementById('output').innerHTML = '<a href="' + URL + '">' + URL + '</a>';
}
