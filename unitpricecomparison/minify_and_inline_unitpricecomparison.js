// NodeJS script to minify HTML, CSS, and JS then linline everythig into a single index.html.

var fs = require('fs');

// Minify HTML, store in var minifiedHtml.
var unminifiedHtml = fs.readFileSync('./index_unminified.html', 'utf8');
var htmlManifestTagCommentedOut = '<!--<html manifest="cache.manifest">-->';
unminifiedHtml = unminifiedHtml.replace(htmlManifestTagCommentedOut,'<html manifest="cache.manifest">'); // Uncomment appcache line
unminifiedHtml = unminifiedHtml.replace('<html>',''); // Remove extra <html> tag
var stylesheetLinkLine = '<link id="styles" rel="stylesheet" type="text/css" href="styles_unminified.css">';
unminifiedHtml = unminifiedHtml.replace('<link id="styles" rel="stylesheet" type="text/css" href="styles_unminified.css">',''); // Remove css since it will be inlined
var javascriptLinkLine = '<script type="text/javascript" src="./script_unminified.js"></script>';
unminifiedHtml = unminifiedHtml.replace(javascriptLinkLine,''); // Remove script file since it will be inlined
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

// Minify CSS, store in var minifiedCss.
var CleanCSS = require('../node_modules/clean-css');
var unminifiedCss = fs.readFileSync('styles_unminified.css', 'utf8');
var minifiedCss = new CleanCSS().minify(unminifiedCss).styles;

// Minify JS, insert inlined CSS for iOS and desktop into addStyles() function. Store minified JS with inlined iOS and desktop CSS in var minifiedJs.
var UglifyJS = require('../node_modules/uglify-js');
var unminifiedJs = fs.readFileSync('./script_unminified.js', 'utf8');
// Get and minify iOS CSS to drop into the addStyles() function.
var unminifiedIosCss = fs.readFileSync('iosStyles_unminified.css', 'utf8');
var minifiedIosCss = new CleanCSS().minify(unminifiedIosCss).styles;
// Get and minify desktop CSS to drop into addStyles() function.
var unminifiedDesktopCss = fs.readFileSync('desktopStyles_unminified.css', 'utf8');
var minifiedDesktopCss = new CleanCSS().minify(unminifiedDesktopCss).styles;
// Remove <link> elements to CSS in addStyles(), add inlined CSS directly to JS in addStyles(). addStyles() will add the new CSS to the bottom of the <style id="stylesTag"> element and override the orignal CSS which will be higher in that element.
unminifiedJs = unminifiedJs.replace('document.head.innerHTML += \'<link rel="stylesheet" type="text/css" href="./iosStyles_unminified.css">\'; // for use with multiple files instead of inlining styles and JS. Minify and inline script replaces this with the minified version.',''); // remove the <link> element.
unminifiedJs = unminifiedJs.replace('// For use in minified version with <style id="stylesTag">: ',''); // remove the comment at the start of the line. This is followed by 'document.getElementById('stylesTag').innerHTML += minifiedIosCss;' which is now uncommented, and the next line will fill in the minified CSS.
unminifiedJs = unminifiedJs.replace('minifiedIosCss', '\'' + minifiedIosCss + '\''); // replace 'minifiedIosCss' with the actual minified CSS.
unminifiedJs = unminifiedJs.replace('document.head.innerHTML += \'<link rel="stylesheet" type="text/css" href="./desktopStyles_unminified.css">\'; // for use with multiple files instead of inlining styles and JS. Minify and inline script replaces this with the minified version.',''); // remove the <link> element.
unminifiedJs = unminifiedJs.replace('// For use in minified version with <style id="stylesTag">: ',''); // remove the comment at the start of the line. This is followed by 'document.getElementById('stylesTag').innerHTML += minifiedDesktopCss;' which is now uncommented, and the next line will fill in the minified CSS.
unminifiedJs = unminifiedJs.replace('minifiedDesktopCss', '\'' + minifiedDesktopCss + '\''); // replace 'minifiedDesktopCss' with the actual minified CSS.
// Write a temporary file with the unminified JS so UglifyJS can read it - UglifyJS doesn't accept a string as input as far as I can tell.
fs.writeFileSync('./temp_unminified_Js.js',unminifiedJs); // Write the temp file.
var minifiedJs = UglifyJS.minify('./temp_unminified_Js.js'); // Read JS from temp file. Reading from file is built in to UglifyJS, no need for fs.
fs.unlinkSync('./temp_unminified_Js.js'); // Delete the temp file.
minifiedJs = minifiedJs.code; // convert UglifyJS object to string with just the minified code.
fs.writeFileSync('./minifiedJs_test_output.js',minifiedJs);

// add Google Analytics <script> tag to the very end.
var googleAnalyticsScriptTag = fs.readFileSync('../Google Analytics script/google_analytics_script_tag.txt', 'utf8');

// String that will eventually be written to disk as index.html. Will include all HTML, CSS, and JS once it's all minified.
var htmlCssJSComined = minifiedHtml + '<style id="stylesTag">' + minifiedCss + '</style><script>' + minifiedJs + '</script>' + googleAnalyticsScriptTag + '</body></html>';
fs.writeFileSync('./index.html',htmlCssJSComined);

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
