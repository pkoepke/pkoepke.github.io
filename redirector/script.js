const redirect = () => {
  newUrl = new URL(new URLSearchParams(window.location.search).get('redirectUrl'));
  console.log(newUrl);
  console.log(newUrl.indexOf('extrafabulouscomics.com'));

  /*if ((newUrl.indexOf('extrafabulouscomics.com') >= 0) && ((newUrl.indexOf('extrafabulouscomics.com') <= 12))) {
    window.location.replace(newUrl);
  } else {
    document.getElementsByTagName('body')[0].innerHTML += 'Invalid domain.';
  }*/
}
redirect();