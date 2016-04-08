var fs = require('fs');

function updateIndex (path, updateDeleted) {

  fs.readFile('./public/index.html', function (err, fileData) {

    fileData = fileData.toString();
    var capElementName = path.charAt(0).toUpperCase() + path.slice(1);

    var linkToNewElement = '  <li>\n      <a href=\"/' + path + '.html\">' + capElementName + '</a>\n    </li>\n  </ol>';


    if (updateDeleted === null && fileData.includes(linkToNewElement) === false) {

      fileData = fileData.replace('</ol>', linkToNewElement);
    }

    else if (updateDeleted === true) {

      fileData = fileData.replace(linkToNewElement, '</ol>');
    }

    var updatedIndex = fs.createWriteStream('./public/index.html', {encoding: 'utf8'});
    updatedIndex.write(fileData);
    updatedIndex.end();
  });
};

module.exports = updateIndex;