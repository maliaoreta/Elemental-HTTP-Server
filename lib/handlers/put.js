var fs = require('fs'),
    qs = require('querystring'),
    createElementFile = require('./createElementFile.js'),
    error500 = require('./error500.js');

function Put (req, res, uri, postBody) {

  req.on('data', function (data) {

    postBody = data.toString();
  });

  req.on('end', function () {

  postBody = qs.parse(postBody);

    fs.readFile('public' + uri, function (err, fileData) {

      if (err) {

        return error500(res, uri);
      }

      var updatedElement = uri.slice(1, uri.indexOf('.'));

      createElementFile(res, updatedElement, postBody);
    });
  });
};

module.exports = Put;