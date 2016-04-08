var fs = require('fs'),
    updateIndex = require('./updateIndex.js');

function createElementFile (res, updatedElement, postBody) {

  var path;

  if (updatedElement !== null) {
    
    path = updatedElement;
  }
  else {

    path = postBody.elementName.toLowerCase();
    updateIndex(path, updatedElement)
  }
  
  fs.readFile('./elementTemplate.html', function (err, fileData) {

    fileData = fileData.toString()
              .replace('name', postBody.elementName)
              .replace('symbol', postBody.elementSymbol)
              .replace('atomicNum', 'Atomic Number ' + postBody.elementAtomicNumber)
              .replace('description', postBody.elementDescription)
              .replace('Element Template', 'The Elements - ' + postBody.elementName);

    var elementFile = fs.createWriteStream('./public/' + path + '.html', {encoding: 'utf8'});
    elementFile.write(fileData);
    elementFile.end();
  });


  res.writeHead(200, {'Content-Type' : 'appication/json'});
  res.write('{"Success" : true}');
  res.end();
};


module.exports = createElementFile;