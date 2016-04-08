function error500 (res, uri) {

  res.writeHead(500, {'Content-Type': 'appication/json'});
  res.write('{ "error" : "resource ' + uri +  ' does not exist" }');
  res.end();
};

module.exports = error500;