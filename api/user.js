var router = require('express').Router();

router.post('/',function(req,res) {
  //validate the requirements
  //should have username, email address and password
  if (req.body.username == undefined || req.body.username.length <= 0) {
    console.log('Error - no username');
    return res.send('No username',500);
  }//end if

  if (req.body.email == undefined || req.body.email.length <= 0) {
    console.log('Error - no email address');
    return res.send('No email address',500);
  }//end if

  if (req.body.password == undefined || req.body.password.length <= 0) {
    console.log('Error - no password');
    return res.send('No password',500);
  }//end if

  //TODO action gitlab api

  return res.sendStatus(201);
});

router.get('/',function(req,res) {
  //return the list of users

});

router.delete('/:username',function(req,res) {
  console.log(req.params.username);
  return res.sendStatus(204);
});

module.exports = router;
