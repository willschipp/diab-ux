var router = require('express').Router();
var unirest = require('unirest');

var IDE_URL = process.env.IDE_URL || 'http://172.16.217.1:'

router.post('/',function(req,res) {
  //get the body parameters which include the username to tie this workspace to the user

});

module.exports = router;
