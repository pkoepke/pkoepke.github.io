/*	If this browser has visited a page with this script before, it will already have fonts cached and we can use them
	without long load times and resulting late layout shifts. If this is the first time this browser is visiting,
	we won't add the fonts so we don't get a late layout shift. This means the font the user sees the first time they
	visit could be different from the one they see on future visits, but that's fine - font choice isn't critical for these pages.
*/
const hasVisitedBefore = () => {
	return localStorage.getItem("hasVisitedBefore");
}

if (hasVisitedBefore()) {
	document.head.innerHTML += `<link /*rel="preload"*/ as="font" href="/fonts/Inter/Inter-VariableFont_opsz,wght.ttf">
	<link /*rel="preload"*/ as="font" href="/fonts/Inter/Inter-Italic-VariableFont_opsz,wght.ttf">
	<link /*rel="preload"*/ as="font" href="/fonts/Roboto/Roboto-Italic-VariableFont_wdth,wght.ttf">
	<link /*rel="preload"*/ as="font" href="/fonts/Roboto/Roboto-VariableFont_wdth,wght.ttf">`
} else {
	localStorage.setItem("hasVisitedBefore", true);
}