var router = require('express').Router();
var jenkins = require('jenkins')({
  baseUrl:'http://admin:welcome1@jenkins.code.domain.local:8080',
  crumbIssuer:false
});

router.post('/',function(req,res) {
  //create a job for the project
  // jenkins.
  res.sendStatus(200);
});

module.exports = router;
