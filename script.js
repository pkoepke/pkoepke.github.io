window.addEventListener('load', change_navigation_display, false); // Run change_navigation_display once the window loads, otherwise some HTML elements aren't found.

function change_navigation_display() {
  var windowWidth = window.matchMedia( '(max-device-width: 767.99999px)' );
  if (windowWidth.matches){
    if (document.getElementById('navigation_menu').style.display == 'none') {
      document.getElementById('navigation_menu').style.display = 'initial';
      document.getElementById('navigation_bar').style.width = '7em';
      document.getElementById('menu_icon_span').style.width = '6.3em';
      // document.getElementById('h1').innerHTML += 'if passed'; // for testing only
    } else {
      document.getElementById('navigation_menu').style.display = 'none';
      document.getElementById('navigation_bar').style.width = '3em';
      document.getElementById('menu_icon_span').style.width = '3em';
      // document.getElementById('h1').innerHTML += 'else'; // for testing only
    }
  }
}
