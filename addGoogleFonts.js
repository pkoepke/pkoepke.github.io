/*	If this browser has visited a page with this script before, it will already have fonts cached and we can use them
	without long load times and resulting late layout shifts. If this is the first time this browser is visiting,
	we won't add the fonts so we don't get a late layout shift.
*/
const hasVisitedBefore = () => {
	return localStorage.getItem("hasVisitedBefore");
}

console.log(hasVisitedBefore());

if (hasVisitedBefore()) {
document.head.innerHTML +=
  `	<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap">
	<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&family=Noto+Sans+Mono:wght@100..900&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&family=Noto+Sans+Mono:wght@100..900&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap">`
} else { 
	localStorage.setItem("hasVisitedBefore", true);

}