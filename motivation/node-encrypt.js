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
  results = results.map((currentPath) => {
    const workingDirectory = process.cwd();
    currentPath = currentPath.replace(workingDirectory, ''); // Make each path relative.
    currentPath = currentPath.replaceAll(path.sep, path.posix.sep); // If running on Windows, replace Windows directory separators with POSIX separators.
    return currentPath;
  })
  results = results.filter((path) => { // Files to include
    return (
      path.includes(`.jpg`) ||
      path.includes(`.mp4`)
    )
  })
  results = results.filter((path) => { // Files to exclude
    return !(
      path.includes(`.DS_Store`) ||
      path.includes(`.js`)
    )
  })

  console.log(results);

});


// From Gemini
// const fs = require('fs'); // Duplcate with above
const crypto = require('crypto');
//const path = require('path'); // Duplcate with above

async function encryptJPG(inputFilePath, outputFilePath, password) {
  try {
    const algorithm = 'aes-256-cbc'; // Choose an appropriate algorithm
    const key = crypto.createHash('sha256').update(password).digest(); // Derive key from password
    const iv = crypto.randomBytes(16); // Generate a random initialization vector

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const input = fs.createReadStream(inputFilePath);
    const output = fs.createWriteStream(outputFilePath);

    output.write(iv); // Write the IV to the beginning of the encrypted file

    input.pipe(cipher).pipe(output);

    return new Promise((resolve, reject) => {
      output.on('finish', () => {
        console.log('Encryption complete.');
        resolve();
      });

      output.on('error', (err) => {
        console.error('Encryption error:', err);
        reject(err);
      });
    });

  } catch (error) {
    console.error('Encryption failed:', error);
    throw error;
  }
}

async function decryptJPG(inputFilePath, outputFilePath, password) {
  try {
    const algorithm = 'aes-256-cbc';
    const key = crypto.createHash('sha256').update(password).digest();

    const input = fs.createReadStream(inputFilePath);
    const output = fs.createWriteStream(outputFilePath);

    let iv = null;
    let cipher;

    input.on('readable', () => {
      if (!iv) {
        iv = input.read(16); // Read the IV from the beginning of the file
        if (!iv) {
          return; // Wait for the IV to be available
        }
        cipher = crypto.createDecipheriv(algorithm, key, iv);
        input.pipe(cipher).pipe(output);
      }
    });

    return new Promise((resolve, reject) => {
      output.on('finish', () => {
        console.log('Decryption complete.');
        resolve();
      });

      output.on('error', (err) => {
        console.error('Decryption error:', err);
        reject(err);
      });
    });

  } catch (error) {
    console.error('Decryption failed:', error);
    throw error;
  }
}

const encrypt = async () => {
  const filePaths = [
    '/1.jpg', '/10.jpg', '/11.jpg', '/12.jpg',
    '/13.jpg', '/16.jpg', '/17.jpg', '/18.jpg',
    '/19.jpg', '/2.jpg', '/20.jpg', '/21.jpg',
    '/22.jpg', '/23.jpg', '/24.jpg', '/25.jpg',
    '/26.jpg', '/27.jpg', '/28.jpg', '/29.jpg',
    '/3.jpg', '/30.jpg', '/31.mp4', '/32.mp4',
    '/33.mp4', '/34.jpg', '/35.mp4', '/36.jpg',
    '/37.mp4', '/38.mp4', '/39.jpg', '/4.jpg',
    '/40.jpg', '/41.jpg', '/42.jpg', '/5.jpg',
    '/6.jpg', '/7.jpg', '/8.jpg', '/8a.jpg',
    '/9.jpg'
  ];

  for (const path of filePaths) {
    encryptJPG(`.${path}`, `./encrypted/${path}`, passwordPlaceholder); // passwordPlaceholder will cause an error if there's no password included.
  }
}

encrypt();