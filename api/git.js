var router = require('express').Router();

router.post('/',function(req,res) {
  //parameters should be
  //username, password, git-project name
  if (req.body.username == undefined || req.body.username.length <= 0) {
    console.log('Error - no username');
    return res.send('No username',500);
  }//end if
  if (req.body.password == undefined || req.body.password.length <= 0) {
    console.log('Error - no password');
    return res.send('No password',500);
  }//end if
  if (req.body.app == undefined || req.body.app.length <= 0) {
    console.log('Error - no app');
    return res.send('No app',500);
  }//end if

  //create process
  return res.sendStatus(201);

});

router.get('/:username',function(req,res) {
  //list all projects under the username

  return res.sendStatus(404);//TODO update
});

module.exports = router;
