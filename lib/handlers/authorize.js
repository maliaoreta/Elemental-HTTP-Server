function Authorize (req, res) {

  var encodedString = req.rawHeaders[req.rawHeaders.indexOf('Authorization')+1].replace('Basic ', '');
  var base64Buffer = new Buffer(encodedString, 'base64');
  var decodedString = base64Buffer.toString();
  
  if (decodedString !== 'elementalServer:plsaccept'){

    res.writeHead(401, {'WWW-Authenticate':'Basic realm = \"Secure Area\"'});
    res.end('<html><body>Not Authorized</body></html>');
    return false;
  };
};

module.exports = Authorize;