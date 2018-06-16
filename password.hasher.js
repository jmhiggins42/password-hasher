const crypto = require('crypto');

module.exports = (cleartext, callback) => {
  salt = crypto.randomBytes(64).toString('hex');
  crypto.pbkdf2(cleartext, salt, 100000, 64, 'sha512', (err, derivedKey) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    const hash = derivedKey.toString('hex');

    callback(hash, salt);
  });
};
