var fs = require('fs');
var path = require('path');
var walk = function (dir, done) {
  var results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function (err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

walk('./', function (err, results) {
  if (err) throw err;
  results = results.filter((path) => { // Files to include
    return (
      path.includes(`/pkoepke.github.io/index.html`) ||
      path.includes(`/pkoepke.github.io/manifest.json`) ||
      path.includes(`/pkoepke.github.io/styles_dark.css`) ||
      path.includes(`/bettingOddsTranslator/`) ||
      path.includes(`/filename-fixer/`) ||
      path.includes(`/pkoepke.github.io/icons/`) ||
      path.includes(`/internet-access-checker-notifier/`) ||
      path.includes(`/platesAndWeight/`) ||
      path.includes(`/redditSearch/`) ||
      path.includes(`/tip_calculator/`) ||
      path.includes(`/twitternitter/`) ||
      path.includes(`/unitpricecomparison/`) ||
      path.includes(`favicon`)
    )
  })
  results = results.filter((path) => { // Files to exclude
    return !(
      path.includes(`index.html and main page files`) ||
      path.includes(`/noto_sans/OFL.txt`) ||
      path.includes(`/noto_sans/README.txt`) ||
      path.includes(`1 kbit.zip`) ||
      path.includes(`1 kbyte.bin`) ||
      path.includes(`1 mbit.zip`) ||
      path.includes(`1 mbyte.bin`) ||
      path.includes(`10 kbits.zip`) ||
      path.includes(`10 kbytes.bin`) ||
      path.includes(`10 mbits.zip`) ||
      path.includes(`10 mbytes.bin`) ||
      path.includes(`100 kbits.zip`) ||
      path.includes(`100 kbytes.bin`) ||
      path.includes(`sw-old.js`) ||
      path.includes(`minified`) ||
      path.includes(`minify`) ||
      path.includes(`cache.manifest`) ||
      path.includes(`README.md`) ||
      path.includes(`.DS_Store`)/*||
      path.includes(`/pkoepke.github.io/unitpricecomparison`)*/
    )
  })
  results = results.map((path) => {
    return path.replace('/Users/paulk/Programming/pkoepke.github.io', '')
  })
  results.push(
    `/`,
    `/bettingOddsTranslator/`,
    `/filename-fixer/`,
    `/pkoepke.github.io/icons/`,
    `/internet-access-checker-notifier/`,
    `/noto_sans/`,
    `/platesAndWeight/`,
    `/redditSearch/`,
    `/tip_calculator/`,
    `/twitternitter/`,
    `/unitpricecomparison/`,)
  console.log(results);
});