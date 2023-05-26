console.log('script ran')

const redirect = () => {
  newUrl = new URLSearchParams(window.location.search).get('redirectUrl');
  console.log(newUrl);
  console.log(newUrl.indexOf('extrafabulouscomics.com'));
  if ((newUrl.indexOf('extrafabulouscomics.com') > -1) && ((newUrl.indexOf('extrafabulouscomics.com') > 12))) {
    window.location.href = newUrl;
  }
}
redirect();