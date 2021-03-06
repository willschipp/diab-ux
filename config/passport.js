var LocalStrategy = require('passport-local').Strategy;
var unirest = require('unirest');

var jwt = require('jsonwebtoken');

var jwtsecret = 'thisisthejwtlongsecret';

var GITLAB_URL = process.env.GITLAB_URL || "http://localhost:32772/api/v3/session";

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(user,done) {
      done(null,user);
    });

    passport.use(new LocalStrategy({usernameField:'username',passwordField:'password'},
      function (username,password,done) {
        //invoke gitlab url
        unirest.post(GITLAB_URL + "?login=" + username + "&password=" + password).headers({'Content-type':'application/json'})
        .send()
        .end(function(reply) {
          if (reply.body) {
            var jtoken = jwt.sign({token:reply.body.private_token,
                admin:reply.body.is_admin,
                username:username},jwtsecret);
            return done(null,jtoken);
          }
        });
      }
    ));
  }
