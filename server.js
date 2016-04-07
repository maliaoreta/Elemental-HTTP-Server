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
  else if (reqMethod === 'POST') {
    
    req.on('data', function (data) {

      postBody = data.toString();
    });

    req.on('end', function () {

      createElementFile(res);
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

function createElementFile (res) {
  
  postBody = qs.parse(postBody);

  fs.readFile('./elementTemplate.html', function (err, fileData) {

    fileData = fileData.toString();
    fileData = fileData.replace('name', postBody.elementName);
    fileData = fileData.replace('symbol', postBody.elementSymbol);
    fileData = fileData.replace('atomicNum', postBody.elementAtomicNumber);
    fileData = fileData.replace('description', postBody.elementDescription);

    var elementFile = fs.createWriteStream('./public/' + postBody.elementName.toLowerCase() + '.html', {encoding: 'utf8'});
    elementFile.write(fileData);
    elementFile.end();
  });

  res.writeHead(200, {'Content-Type' : 'appication/json'});
  res.write('{success: true}');
  res.end();

  updateIndex();
};

function updateIndex () {

  fs.readFile('./public/index.html', function (err, fileData) {

    fileData = fileData.toString();
    var linkToNewElement = '  <li>\n      <a href=\"/' + postBody.elementName.toLowerCase() + '\">' + postBody.elementName + '</a>\n    </li>\n  </ol>';

    fileData = fileData.replace('</ol>', linkToNewElement);
  });
};