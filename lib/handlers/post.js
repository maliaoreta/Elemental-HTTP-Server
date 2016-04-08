var fs = require('fs'),
    qs = require('querystring'),
    createElementFile = require('./createElementFile'),
    validateForm = require('./validateForm');

function Post (req, res, uri, postBody) {

  req.on('data', function (data) {

    postBody = data.toString();
  });

  req.on('end', function () {

    postBody = qs.parse(postBody);
    
    validateForm(res, postBody, function (err, res) {

      if (err) {

        res.statusCode = 404;
        res.end(err);
        return;
      }

      if (uri !== '/elements') {

        res.statusCode = 501;
        res.end('Incorrect URL! To post, please use /elements');
        return;
      }

      createElementFile(res, null, postBody);
    });
  });
};

module.exports = Post;