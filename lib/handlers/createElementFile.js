var fs = require('fs'),
    updateIndex = require('./updateIndex.js');

function createElementFile (res, updatedElement, postBody) {

  var path;

  if (updatedElement !== null) {
    
    path = updatedElement;
  }
  else {

    path = postBody.elementName.toLowerCase();
    updateIndex(path, updatedElement);
  }
  
  fs.readFile('./elementTemplate.html', function (err, fileData) {

    fileData = fileData.toString()
              .replace('name', postBody.elementName)
              .replace('symbol', postBody.elementSymbol)
              .replace('atomicNum', 'Atomic Number ' + postBody.elementAtomicNumber)
              .replace('description', postBody.elementDescription);

    var elementFile = fs.createWriteStream('./public/' + path + '.html', {encoding: 'utf8'});
    elementFile.end(fileData);
  });

  res.writeHead(200, {'Content-Type' : 'appication/json'});
  res.end('{"Success" : true}');
};

module.exports = createElementFile;