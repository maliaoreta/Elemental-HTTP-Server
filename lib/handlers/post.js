var fs = require('fs');
var qs = require('querystring');
var createElementFile = require('./createElementFile');
var validateForm = require('./validateForm');



function Post (req, res, uri, postBody) {

  req.on('data', function (data) {

    postBody = data.toString();
  });

  req.on('end', function () {

    postBody = qs.parse(postBody);
    
    validateForm(res, postBody, function (err, res) {

      if (err) {

        res.statusCode = 404;
        res.write(err);
        res.end();
        return;
      }

      if (uri !== '/elements') {

        res.statusCode = 501;
        res.write('Incorrect URL! To post, please use /elements');
        res.end();
        return;
      }

      createElementFile(res, null, postBody);

      });
  });
};

module.exports = Post;