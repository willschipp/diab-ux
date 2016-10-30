var router = require('express').Router();
var unirest = require('unirest');

var GITLAB_HOST = "http://172.16.217.1:32769/api/v3/projects";
var GITLAB_TOKEN = process.env.GITLAB_TOKEN || 'ganEuvisf2H_aEj1mM6E';

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

  unirest.post(GITLAB_HOST + '/user/' + req.body.user_id).headers({'Content-Type':'application/json','PRIVATE-TOKEN':GITLAB_TOKEN})
  .send(project)
  .end(function(reply) {
      if (reply.status >= 200 && reply.status < 300) {
        return res.status(201).send(reply.body);
      } else {
        console.log(reply.body);
        res.sendStatus(500);
      }
  });


});

router.get('/:username',function(req,res) {
  //list all projects under the username

  return res.sendStatus(404);//TODO update
});

module.exports = router;
