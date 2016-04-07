var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var postBody = '';

var server = http.createServer(function (req, res) {

  var uri = req.url;
  var reqMethod = req.method;

  if (reqMethod === 'GET') {

    fs.readFile('./public'+uri, function (err, fileData) {

      if (err) {
        return redirectTo404(res);
      }

      res.write(fileData)
      res.end();
    });
  }
  
  else if (reqMethod === 'POST' && uri === '/elements' || reqMethod === 'PUT') {
       
    req.on('data', function (data) {

      postBody = data.toString();
    });

    req.on('end', function () {

      postBody = qs.parse(postBody);
      validateForm(res, function (err, res) {

        if (err) {

          res.statusCode = 404;
          res.write(err);
          res.end();
          return;
        }

        if (reqMethod === 'POST') {

          createElementFile(res, null);
        }

        else {
          
          fs.readFile('public' + uri, function (err, fileData) {

            if (err) {

              res.writeHead(500, {'Content-Type': 'appication/json'});
              res.write('{error: resource ' + uri + ' does not exist}');
              res.end();
            }

            var updatedElement = uri.slice(1, uri.indexOf('.'));
          
            createElementFile(res, updatedElement);
          });
        };
      });
    });
  };
});

server.listen({port: 8080});

function redirectTo404 (res) {

  fs.readFile('public/404.html', (err, fileData) => {

    if (err) throw err;
    res.statusCode = 404;
    res.write(fileData);
    res.end();
  });
};

function createElementFile (res, updatedElement) {

  var path;

  if (updatedElement !== null) {
    
    path = updatedElement;
  }
  else {

    path = postBody.elementName.toLowerCase();
    updateIndex();
  }
  
  fs.readFile('./elementTemplate.html', function (err, fileData) {

    fileData = fileData.toString();
    fileData = fileData.replace('name', postBody.elementName);
    fileData = fileData.replace('symbol', postBody.elementSymbol);
    fileData = fileData.replace('atomicNum', postBody.elementAtomicNumber);
    fileData = fileData.replace('description', postBody.elementDescription);
    fileData = fileData.replace('Element Template', 'The Elements - ' + postBody.elementName);

    var elementFile = fs.createWriteStream('./public/' + path + '.html', {encoding: 'utf8'});
    elementFile.write(fileData);
    elementFile.end();
  });


  res.writeHead(200, {'Content-Type' : 'appication/json'});
  res.write('{success: true}');
  res.end();
};

function updateIndex () {

  fs.readFile('./public/index.html', function (err, fileData) {

    fileData = fileData.toString();
    var linkToNewElement = '  <li>\n      <a href=\"/' + postBody.elementName.toLowerCase() + '.html\">' + postBody.elementName + '</a>\n    </li>\n  </ol>';

    fileData = fileData.replace('</ol>', linkToNewElement);

    var updatedIndex = fs.createWriteStream('./public/index.html', {encoding: 'utf8'});
    updatedIndex.write(fileData);
    updatedIndex.end();
  });
};

function validateForm (res, cb) {

  var errMsg = 'Error! The required form fields are: elementName, elementSymbol, elementAtomicNumber, and elementDescription.';
  var requiredFields = ['elementName', 'elementSymbol', 'elementAtomicNumber', 'elementDescription'];
  var valid = true;

  for (var i = 0; i < requiredFields.length; i++) {

    if (!postBody.hasOwnProperty(requiredFields[i])) {

      return cb(errMsg, res);
    }
  }

  return cb(null, res);
};