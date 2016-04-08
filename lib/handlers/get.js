var fs = require('fs'),
    redirectTo404 = require('./redirectTo404.js');

function Get (res, uri) {

  var path = './public' + uri;

  if (uri === '/') {

    path = 'public/index.html';
  }

    if (uri === '/teapot.html') {

      path = 'teapot.html';
      res.statusCode = 418;
    }

  fs.readFile(path, function (err, fileData) {

    if (err) {
      return redirectTo404(res);
    }

    res.end(fileData);
  });
};

module.exports = Get;