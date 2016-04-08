var http = require('http');
var Handlers = require('./lib/handlers/index.js');
var postBody = '';

var server = http.createServer(function (req, res) {

  var uri = req.url;
  var reqMethod = req.method;

  if (Handlers.Authorize(req, res) === false) {
    return;
  }

  switch(reqMethod) {

    case 'GET':
      return Handlers.Get(res, uri);
      break;
    case 'POST':
      return Handlers.Post(req, res, uri, postBody);
      break;
    case 'PUT':
      return Handlers.Put(req, res, uri, postBody);
      break;
    case 'DELETE':
      return Handlers.Delete(res, uri);
      break;
    default:
      res.statusCode = 501;
      res.end('Available methods: GET, POST, PUT, DELETE.');
      return;
  };
}).listen({port: 8080});