var fs = require('fs'),
    redirectTo404 = require('./redirectTo404.js');

function Get (res, uri) {

  if (uri === '/') {

    uri = '/index.html';
  }
    
  fs.readFile('./public'+uri, function (err, fileData) {

    if (err) {
      return redirectTo404(res);
    }


    res.end(fileData);
  });
};

module.exports = Get;