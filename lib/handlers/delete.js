var fs = require('fs'),
    error500 = require('./error500.js'),
    updateIndex = require('./updateIndex.js');

function Delete (res, uri) {

  fs.readFile('public' + uri, function (err, fileData) {

    if (err) {

      return error500(res, uri);
    }

    fs.unlink('public' + uri);
      res.writeHead(200, {'Content-Type' : 'appication/json'});
      res.end('{"Success" : true}');

      var elementName = uri.slice(1, uri.indexOf('.'));
      updateIndex(elementName, true);
  });
};

module.exports = Delete;