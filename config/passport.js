var GitlabStrategy = require('passport-gitlab').Strategy;
var jwt = require('jsonwebtoken');

var jwtsecret = 'thisisthejwtlongsecret';

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(user,done) {
      done(null,user);
    });

    passport.use('gitlab',new GitlabStrategy({
      clientID:'67218fa0e843a41aec174a3c6bd313629d0973589b1c4f9f663cd0853c68078b',
      clientSecret:'749d9291fb1d40c96d37017a19fda86dc4667c9af8619c6246ab2e79f4a728be',
      gitlabURL: 'http://172.16.217.1:32769',
      callbackURL:'http://172.16.217.1:3000/auth/gitlab/callback'
    },function(token,tokenSecret,profile,done){
      //TODO generate the JWT token and return that instead of the profile
      var jtoken = jwt.sign({token:token,user:profile,tokenSecret:tokenSecret},jwtsecret);

      return done(null,jtoken);
    }));

  }
