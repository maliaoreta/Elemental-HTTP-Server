var fs = require('fs');

function redirectTo404 (res) {

  fs.readFile('public/404.html', (err, fileData) => {

    if (err) throw err;
    res.statusCode = 404;
    res.write(fileData);
    res.end();
  });
};

module.exports = redirectTo404;