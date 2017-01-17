// NodeJS script to minify HTML, CSS, and JS then linline everythig into a single index.html

var fs = require('fs');

// minify HTML
var unminifiedHtml = fs.readFileSync('./index_unminified.html', 'utf8');
unminifiedHtml = unminifiedHtml.replace('<!--<html manifest="tip_calculator.appcache">-->','<html manifest="tip_calculator.appcache">') // Uncomment appcache line
unminifiedHtml = unminifiedHtml.replace('<html>','') // Remove extra <html> tag
unminifiedHtml = unminifiedHtml.replace('<link id="css" rel="stylesheet" type="text/css" href="styles_unminified.css">','') // Remove css since it will be inlined
unminifiedHtml = unminifiedHtml.replace('<script src="./script_unminified.js"></script>','') // Remove script file since it will be inlined
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
var minifiedJs = UglifyJS.minify('./script_unminified.js'); // reading from file built in, no need for fs.
// console.log(minifiedJs.code); // minified output

// add Google Analytics <script> tag to the very end.
var googleAnalyticsScriptTag = fs.readFileSync('../Google Analytics script/google_analytics_script_tag.txt', 'utf8');
//console.log(googleAnalyticsScriptTag); // for testing only

// string that will eventually be written to disk as index.html. Will include all HTML, CSS, and JS once it's all minified.
var htmlCssJSComined = minifiedHeader + '<style id="stylesTag">' + minifiedCss + '</style>' + minifiedBody + '<script>' + minifiedJs.code + '</script>' + googleAnalyticsScriptTag + '</html>';
fs.writeFileSync('./index.html',htmlCssJSComined);
console.log('Minified and inlined. Done.');
