var GitlabStrategy = require('passport-gitlab').Strategy;
var User = require('./model/User.js');

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
      return done(null,profile);
    }));

  }
