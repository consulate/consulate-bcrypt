/**
 * Module dependencies
 */

var bcrypt = require('bcrypt').compare;

module.exports = function(options) {
  return function(app) {
    app.verifyPassword(function(user, password, done) {
      bcrypt(password, user.passhash, function(err, result) {
        if (err) return done(err);
        done(null, result);
      });
    });
  };
};
