//admin access token --> cBzSmnzKkMZxnKEsts8D
var GITLAB_HOST = "http://172.16.217.1:32769/oauth/token/revoke";
var unirest = require('unirest');
var jwt = require('jsonwebtoken');

var jwtsecret = 'thisisthejwtlongsecret';


module.exports = function(app,passport) {

  app.get('/',function(req,res) {
    res.sendFile(__dirname + '/app/home.html');
  });

  app.get('/app',isLoggedIn,function(req,res) {
    res.sendFile(__dirname + '/app/index.html');
  });

  // app.get('/login',passport.authenticate('gitlab'));
  app.post('/login',passport.authenticate('local',{successRedirect:'/app',failureRedirect:'/'}))


  app.get('/logout',function(req,res) {
    console.log('logging out');
    req.logout();
    res.redirect('/');
  });

  app.get('/auth/gitlab/callback',passport.authenticate('gitlab',{ failureRedirect:'/'}),
    function(req,res) {
      res.redirect('/app');
    }
  );

  function isLoggedIn(req, res, next) {
      // if user is authenticated in the session, carry on
      if (req.isAuthenticated())
          return next();
      // if they aren't redirect them to the home page
      res.redirect('/');
  }
}
