const calculateNewUrl = (currentComic, direction) => {
  currentComic = currentComic.slice(-5); // example: https://www.extrafabulouscomics.com/____1
  currentComic = parseInt(currentComic.replace(/\D/g, ''));

  let numberToAdd = 1;
  if (direction == 'prev') {
    numberToAdd = -1;
  }

  let newComic = currentComic + numberToAdd;
  newComic = newComic.toString().padStart(5, '_');
  newComic = 'https://www.extrafabulouscomics.com/' + newComic;

  console.log('newComic: ' + newComic);

  return newComic;
}

const redirect = () => {
  let newUrl = new URL(new URLSearchParams(window.location.search).get('redirectUrl'));

  // Don't redirect to arbitrary domains, only the the domains in this list.
  if (newUrl.hostname == 'extrafabulouscomics.com' || newUrl.hostname == 'www.extrafabulouscomics.com') {
    const direction = new URLSearchParams(window.location.search).get('direction');
    console.log('newUrl: ' + newUrl + ' direction: ' + direction)
    newUrl = calculateNewUrl(newUrl.toString(), direction);
    window.location.replace(newUrl);
  } else {
    document.getElementById('content').innerHTML = 'Invalid domain.';
  }
}
redirect();