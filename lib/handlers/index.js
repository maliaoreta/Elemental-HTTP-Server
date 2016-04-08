var Get = require('./get.js'),
    Post = require('./post.js'),
    Put = require('./put.js'),
    Delete = require('./delete.js'),
    Authorize = require('./authorize.js');

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