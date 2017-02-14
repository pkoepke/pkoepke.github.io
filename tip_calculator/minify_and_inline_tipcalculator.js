// NodeJS script to minify HTML, CSS, and JS then linline everythig into a single index.html

var fs = require('fs');

// minify HTML
var unminifiedHtml = fs.readFileSync('./index_unminified.html', 'utf8');
unminifiedHtml = unminifiedHtml.replace('<!--<html manifest="cache.manifest">-->','<html manifest="tip_calculator.appcache">') // Uncomment appcache line
unminifiedHtml = unminifiedHtml.replace('<html>','') // Remove extra <html> tag
unminifiedHtml = unminifiedHtml.replace('<link id="css" rel="stylesheet" type="text/css" href="styles_unminified.css">','') // Remove css since it will be inlined
unminifiedHtml = unminifiedHtml.replace('<script type="text/javascript" src="./script_unminified.js"></script>','') // Remove script file since it will be inlined
unminifiedHtml = unminifiedHtml.replace('<script type="text/javascript" src="../js/isOsIos.js"></script>','') // Remove script file since it will be inlined
//console.log(unminifiedHtml); // for testing only
var minify = require('../node_modules/html-minifier').minify;
var minifiedHtml = minify(unminifiedHtml, {
  removeComments: true,
  removeCommentsFromCDATA: true,
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  removeAttributeQuotes: true,
  removeEmptyAttributes: true
});
minifiedHtml = minifiedHtml.replace('</body>','')
minifiedHtml = minifiedHtml.replace('</html>','');
var indexOfHead = minifiedHtml.indexOf('</head>');
var minifiedHeader = minifiedHtml.substr(0,indexOfHead);
var minifiedBody = minifiedHtml.substr(indexOfHead);
// console.log(minifiedHtml); // for testing only

// minify CSS
var CleanCSS = require('../node_modules/clean-css');
var unminifiedCss = fs.readFileSync('styles_unminified.css', 'utf8');
// console.log(unminifiedCss); // for testing only
var minifiedCss = new CleanCSS().minify(unminifiedCss).styles;
// console.log(minifiedCss);

// minify JS
var UglifyJS = require('../node_modules/uglify-js');
var unminifiedJs = fs.readFileSync('./script_unminified.js','utf8') + '\n' + fs.readFileSync('../js/isOsIos.js','utf8');
fs.writeFileSync('./temp_js_for_uglify.js',unminifiedJs);
var minifiedJs = UglifyJS.minify('./temp_js_for_uglify.js'); // reading from file built in, no need for fs.
fs.unlink('./temp_js_for_uglify.js') // delete temp file
// console.log(minifiedJs.code); // minified output

// add Google Analytics <script> tag to the very end.
var googleAnalyticsScriptTag = fs.readFileSync('../Google Analytics script/google_analytics_script_tag.txt', 'utf8');
//console.log(googleAnalyticsScriptTag); // for testing only

// string that will eventually be written to disk as index.html. Will include all HTML, CSS, and JS once it's all minified.
var htmlCssJSComined = minifiedHeader + '<style id="stylesTag">' + minifiedCss + '</style>' + minifiedBody + '<script>' + minifiedJs.code + '</script>' + googleAnalyticsScriptTag + '</body></html>';
fs.writeFileSync('./index.html',htmlCssJSComined);
console.log('Minified and inlined. Done.');

// Automate updating appcache with current date and time.
var appcacheText = fs.readFileSync('./cache.manifest','utf8');
var appcacheLines = appcacheText.split('\n'); // Split into an array where each line is its own element.
// for loop method.
/*for(var index = 0; index < appcacheLines.length; index++) { // split returned an array-like object, and couldn't convert it to an array for easy iterating. Might come back and use for..of later.
  var currentLine = appcacheLines[index]
  if(currentLine.includes('# last updated:')) {
    appcacheLines.splice(index, 1, '# last updated: ' + new Date());
  }
}*/

// forEach method. For some reason it was telling me that appcacheLines.forEach() was not a function, so I did the for of methods below, but now this is magically working. I probably a typo when it wasn't working.
appcacheLines.forEach(function(currentLine, index) {
  if(currentLine.includes('# last updated:')) {
    appcacheLines.splice(index, 1, '# last updated: ' + new Date());
  }
});

// for of method without tracking the current index, so it has to ask the array for the index.
/*for (let currentLine of appcacheLines) { //
  if(currentLine.includes('# last updated:')) {
    let index = appcacheLines.indexOf(currentLine);
    appcacheLines.splice(index, 1, '# last updated: ' + new Date());
  }
}*/

// better for of method using the index. Requires .entries(), which returns [index, value] aka [key, value].
/*for (let [index, currentLine] of appcacheLines.entries()) { //
  if(currentLine.includes('# last updated:')) {
    appcacheLines.splice(index, 1, '# last updated: ' + new Date());
  }
}*/
appcacheText = appcacheLines.join('\n');
fs.writeFileSync('./cache.manifest',appcacheText);
