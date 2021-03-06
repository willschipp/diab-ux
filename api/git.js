var router = require('express').Router();
var unirest = require('unirest');

var GITLAB_HOST = process.env.GITLAB_HOST || "http://172.16.217.1:32772";
GITLAB_HOST = GITLAB_HOST + "/api/v3/projects"

router.post('/',function(req,res) {
  //parameters should be
  //username, password, git-project name
  if (req.body.user_id == undefined || req.body.user_id.length <= 0) {
    console.log('Error - no user id');
    return res.status(500).send('No user id');
  }//end if
  // if (req.body.password == undefined || req.body.password.length <= 0) {
  //   console.log('Error - no password');
  //   return res.send('No password',500);
  // }//end if
  if (req.body.projectName == undefined || req.body.projectName.length <= 0) {
    console.log('Error - no app');
    return res.status(500).send('No project name');
  }//end if

  //build project object
  var project = {
    name:req.body.projectName
  };

  unirest.post(GITLAB_HOST + '/user/' + req.body.user_id).headers({'Content-Type':'application/json','PRIVATE-TOKEN':req.decoded.token})
  .send(project)
  .end(function(reply) {
      if (reply.status >= 200 && reply.status < 300) {
        //now add the template file for che
        return res.status(201).send(reply.body);
      } else {
        console.log(reply.body);
        res.sendStatus(500);
      }
  });

});

router.get('/',function(req,res) {
  //list all projects under the username
  unirest.get(GITLAB_HOST + '/owned').headers({'Content-Type':'application/json','PRIVATE-TOKEN':req.decoded.token})
  .send()
  .end(function(reply) {
    if (reply.status >= 200 && reply.status < 300) {
      return res.send(reply.body);
    } else if (reply.status >= 400 && reply.status < 500) {
      return res.sendStatus(404);
    } else {
      console.log(reply.body);
      return res.sendStatus(500);
    }
  });


});

module.exports = router;
