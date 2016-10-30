var router = require('express').Router();
var unirest = require('unirest');
// var GitLab = require('gitlab');
//
var GITLAB_HOST = "http://172.16.217.1:32772/api/v3/users";
//
// var gitlab = new GitLab({
//   url:GITLAB_HOST,
//   token:GITLAB_TOKEN
// });


router.post('/',function(req,res) {
  //validate the requirements
  //should have username, email address and password
  if (req.body.username == undefined || req.body.username.length <= 0) {
    console.log('Error - no username');
    return res.status(500).send('No username');
  }//end if

  if (req.body.email == undefined || req.body.email.length <= 0) {
    console.log('Error - no email address');
    return res.status(500).send('No email address');
  }//end if

  if (req.body.password == undefined || req.body.password.length <= 0) {
    console.log('Error - no password');
    return res.status(500).send('No password');
  }//end if

  if (req.body.name == undefined || req.body.name.length <= 0) {
    console.log('Error - no name');
    return res.status(500).send('No name');
  }//end if

  var newUser = {
    username:req.body.username,
    password:req.body.password,
    name:req.body.name,
    email:req.body.email
  };

  unirest.post(GITLAB_HOST).headers({'Content-Type':'application/json','PRIVATE-TOKEN':req.decoded.token})
  .send(newUser)
  .end(function(reply) {
    if (reply.status >= 200 && reply.status < 300) {
      return res.send(reply.body);
    } else {
      console.log(reply.body);
      return res.sendStatus(500);
    }
  });
});

router.get('/',function(req,res) {
  unirest.get(GITLAB_HOST).headers({'Content-Type':'application/json','PRIVATE-TOKEN':req.decoded.token})
  .end(function(reply) {
    return res.send(reply.body);
  });
});

router.delete('/:username',function(req,res) {
  console.log(req.params.username);
  return res.sendStatus(204);
});

router.get('/admin',function(req,res) {
  res.send(req.decoded.admin);
});

module.exports = router;
