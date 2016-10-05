// NodeJS script to minify HTML, CSS, and JS then linline everythig into a single index.html

var fs = require('fs');

// minify HTML
var unminifiedHtml = fs.readFileSync('./index_unminified.html', 'utf8');
//console.log(unminifiedHtml); // for testing only
var minify = require('/home/paul/.npm-global/lib/node_modules/html-minifier').minify;
var minifiedHtml = minify(unminifiedHtml, {
  removeComments: true,
  removeCommentsFromCDATA: true,
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  removeAttributeQuotes: true,
  removeEmptyAttributes: true
});
minifiedHtml = minifiedHtml.replace('</html>','');
console.log(minifiedHtml); // for testing only

// minify CSS
var CleanCSS = require('/home/paul/.npm-global/lib/node_modules/clean-css');
var unminifiedCss = fs.readFileSync('styles_unminified.css', 'utf8');
// console.log(unminifiedCss); // for testing only
var minifiedCss = new CleanCSS().minify(unminifiedCss).styles;
// console.log(minifiedCss);

// minify JS
var UglifyJS = require('/home/paul/.npm-global/lib/node_modules/uglify-js');
var minifiedJs = UglifyJS.minify('./script_unminified.js'); // reading from file built in, no need for fs.
// console.log(minifiedJs.code); // minified output

// string that will eventually be written to disk as index.html. Will include all HTML, CSS, and JS once it's all minified.
var htmlCssJSComined = minifiedHtml + '<style id="stylesTag">' + minifiedCss + '</style><script>' + minifiedJs.code + '</script></html>';
fs.writeFileSync('./index.html',htmlCssJSComined);