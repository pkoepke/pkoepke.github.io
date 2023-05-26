const redirect = () => {
  newUrl = new URL(new URLSearchParams(window.location.search).get('redirectUrl'));
  console.log(newUrl);
  console.log(newUrl.hostname);

  if (newUrl.hostname == 'extrafabulouscomics.com' || newUrl.hostname == 'www.extrafabulouscomics.com') {
    window.location.replace(newUrl);
  } else {
    document.getElementsByTagName('body')[0].innerHTML += 'Invalid domain.';
  }
}
redirect();