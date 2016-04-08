var fs = require('fs');
var redirectTo404 = require('./redirectTo404.js');

function Get (res, uri) {

  fs.readFile('./public'+uri, function (err, fileData) {

    if (err) {
      return redirectTo404(res);
    }

    res.write(fileData)
    res.end();
  });
};

module.exports = Get;