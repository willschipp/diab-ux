//admin access token --> cBzSmnzKkMZxnKEsts8D

module.exports = function(app,passport) {

  app.get('/',function(req,res) {
    res.sendFile(__dirname + '/app/home.html');
  });

  app.get('/app',function(req,res) {
    res.sendFile(__dirname + '/app/index.html');
  });

  app.post('/login',
    passport.authenticate('gitlab',{
    successRedirect: '/app',
    failureRedirect:'/',
    session:false
    }),
    serialize,generateToken,respond);

  app.get('/logout',function(req,res) {
    req.logout();
    res.redirect('/');
  });


  app.get('/auth/gitlab/callback',passport.authenticate('gitlab',{ failureRedirect:'/',successRedirect:'/app'}));

  // app.get('/auth/gitlab/callback',
  //   passport.authenticate('gitlab', { failureRedirect: '/' }),
  //   function(req, res) {
  //     console.log(req);
  //     console.log(res);
  //     // Successful authentication, redirect home.
  //     res.redirect('/');
  //   });


  function isLoggedIn(req, res, next) {
      // if user is authenticated in the session, carry on
      if (req.isAuthenticated())
          return next();

      // if they aren't redirect them to the home page
      res.redirect('/');
  }

}
