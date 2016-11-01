var router = require('express').Router();
var unirest = require('unirest');
var atob = require('atob');

var IDE_URL = process.env.IDE_URL || 'http://172.16.217.1:8080';
var WORKSPACE_URL = IDE_URL + '/api/workspace';

router.post('/',function(req,res) {
  //get the body parameters which include the username to tie this workspace to the user
  //url to post to --> http://localhost:8080/api/workspace
  var content = req.body.workspace;
  content = atob(content);//convert
  console.log(WORKSPACE_URL);
  unirest.post(WORKSPACE_URL).headers({'Content-Type':'application/json'})
  .send(content)
  .end(function(result) {
    console.log(result.status);
    return res.sendStatus(result.status);
  });
});

module.exports = router;
