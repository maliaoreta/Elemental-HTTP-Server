function validateForm (res, postBody, cb) {

  var errMsg = 'Error! The required form fields are: elementName, elementSymbol, elementAtomicNumber, and elementDescription.';
  var requiredFields = ['elementName', 'elementSymbol', 'elementAtomicNumber', 'elementDescription'];
  var valid = true;

  for (var i = 0; i < requiredFields.length; i++) {

    if (!postBody.hasOwnProperty(requiredFields[i])) {

      return cb(errMsg, res);
    }
  }

  return cb(null, res);
};

module.exports = validateForm;