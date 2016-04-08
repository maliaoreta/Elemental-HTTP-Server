var fs = require('fs');
var updateIndex = require('./updateIndex.js');

function createElementFile (res, updatedElement, postBody) {

  var path;

  if (updatedElement !== null) {
    
    path = updatedElement;
  }
  else {

    path = postBody.elementName.toLowerCase();
    updateIndex(path, null);
  }
  
  fs.readFile('./elementTemplate.html', function (err, fileData) {

    fileData = fileData.toString();
    fileData = fileData.replace('name', postBody.elementName);
    fileData = fileData.replace('symbol', postBody.elementSymbol);
    fileData = fileData.replace('atomicNum', 'Atomic Number ' + postBody.elementAtomicNumber);
    fileData = fileData.replace('description', postBody.elementDescription);
    fileData = fileData.replace('Element Template', 'The Elements - ' + postBody.elementName);

    var elementFile = fs.createWriteStream('./public/' + path + '.html', {encoding: 'utf8'});
    elementFile.write(fileData);
    elementFile.end();
  });


  res.writeHead(200, {'Content-Type' : 'appication/json'});
  res.write('{"Success" : true}');
  res.end();
};


module.exports = createElementFile;