var Get = require('./get.js');
var Post = require('./post.js');
var Put = require('./put.js');
var Delete = require('./delete.js');
var Authorize = require('./authorize.js');

var Handlers = (function () {

  var handlers = {

    Get : Get,
    Post : Post,
    Put : Put,
    Delete : Delete,
    Authorize : Authorize
  }

  return handlers;
})();


module.exports = Handlers;