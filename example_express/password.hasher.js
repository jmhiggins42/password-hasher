const crypto = require('crypto');
const responses = require('../models/responses'); // generic error JSON response model

const createHash = (req, res, next) => {
  // Step 1: create salt
  req.model.salt = crypto.randomBytes(64).toString('hex');

  // Step 2: create hash
  crypto.pbkdf2(
    req.model.password, // password to hash
    req.model.salt, // salt
    100000, // # iterations
    64, // hash length
    'sha512', // base algorithm
    (err, derivedKey) => {
      // callback
      if (err) {
        req.send(new responses.ErrorResponse(err));
        return;
      }

      // Step 3: reset password to hashed value
      req.model.password = derivedKey.toString('hex');
      next();
    }
  );
};

module.exports = createHash;
