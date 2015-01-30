/**
 * Module dependencies
 */
var should = require('should');
var bcrypt = require('..');

/**
 * Passwords
 */
var TESTING123_PASSWORD = '$2a$10$ta23D.CmVEvNJ93hu79qQ.SyMy2sV3TRIPQ5sZgGwmoH1o5dQGode';

describe('consulate-bcrypt', function() {

  var app;

  beforeEach(function() {
    app = {
      'verifyPassword': function(fn) {
        app.callbacks.verifyPassword = fn;
      },
      callbacks: {}
    };
  });

  it('should register a `verifyPassword` callback', function() {
    var options = {}
      , instance = bcrypt(options);

    instance(app);

    should.exist(app.callbacks.verifyPassword);
    Object.keys(app.callbacks).should.have.length(1);
  });

  it('should not accept an incorrect password', function(done) {
    var instance = bcrypt({})(app);

    app.callbacks.verifyPassword({passhash: TESTING123_PASSWORD}, "testing", function(err, isValid) {
      should.not.exist(err);
      should.exist(isValid);
      isValid.should.be.false;
      done();
    });
  });

  it('should return an error on an invalid password', function(done) {
    var instance = bcrypt({})(app);

    app.callbacks.verifyPassword({passhash: 'invalid hash'}, "testing", function(err, isValid) {
      isValid.should.be.false;
      done();
    });
  });

  it("should accept a correct password", function(done) {
    var instance = bcrypt({})(app);

    app.callbacks.verifyPassword({passhash: TESTING123_PASSWORD}, "testing123", function(err, isValid) {
      should.not.exist(err);
      should.exist(isValid);
      isValid.should.be.true;
      done();
    });
  });
});
