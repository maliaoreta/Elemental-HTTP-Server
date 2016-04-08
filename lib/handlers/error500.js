function error500 (res, uri) {

  res.writeHead(500, {'Content-Type': 'appication/json'});
  res.end('{ "error" : "resource ' + uri +  ' does not exist" }');
};

module.exports = error500;