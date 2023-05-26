const calculateCurrentPrevNext = (currentComic) => {
  currentComic = currentComic.slice(-5); // example: https://www.extrafabulouscomics.com/____1
  currentComic = parseInt(currentComic.replace(/\D/g, ''));

  let nextComic = currentComic + 1;
  nextComic = nextComic.toString().padStart(5, '_');
  nextComic = 'https://www.extrafabulouscomics.com/' + nextComic;

  let prevComic = currentComic - 1;
  prevComic = prevComic.toString().padStart(5, '_');
  prevComic = 'https://www.extrafabulouscomics.com/' + prevComic;

  return { 'current': currentComic, 'next': nextComic, 'prev': prevComic };
}

const redirect = (direction) => {
  newUrl = new URL(new URLSearchParams(window.location.search).get('redirectUrl'));
  newUrl = calculateCurrentPrevNext(newUrl.toString());

  if (newUrl.hostname == 'extrafabulouscomics.com' || newUrl.hostname == 'www.extrafabulouscomics.com') {
    window.location.replace(newUrl);
  } else {
    document.getElementById('content').innerHTML = 'Invalid domain.';
  }
}
redirect();