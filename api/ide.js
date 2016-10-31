var router = require('express').Router();
var unirest = require('unirest');

var IDE_URL = process.env.IDE_URL || 'http://172.16.217.1:'

router.post('/',function(req,res) {
  //get the body parameters which include the username to tie this workspace to the user
  //url to post to --> http://localhost:8080/api/workspace
  //source file --> templates/node-workspace-project|java-workspace-project
  //parameters required --> workspace-name, project_name, repository_url
});

module.exports = router;
