var router = require('express').Router();

var GITLAB_URL = process.env.GITLAB_URL || "http://172.16.217.1:32772"

//get the settings for the authenticated user
router.get('/',function(req,res) {
  var settings = {
    gitablUrl:GITLAB_URL,
    user:req.decoded.username,
    admin:req.decoded.admin
  }

  res.json(settings);
});

module.exports = router;
