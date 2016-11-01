var router = require('express').Router();
var unirest = require('unirest');
var fs = require('fs');
var request = require('sync-request');

var GITLAB_HOST = process.env.GITLAB_HOST || "http://172.16.217.1:32772";
GITLAB_HOST = GITLAB_HOST + "/api/v3/projects"

var templates = {
  'nodejs':['Dockerfile_node','node-workspace-project.json'],
  'springboot':['Dockerfile_java','java-workspace-project.json']
}

router.post('/',function(req,res) {
  //parameters should be
  //username, password, git-project name
  if (req.body.user_id == undefined || req.body.user_id.length <= 0) {
    console.log('Error - no user id');
    return res.status(500).send('No user id');
  }//end if
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
        var projectId = reply.body.id;
        var user = {
          user_id:req.decoded.userId,
          access_level:40
        }
        unirest.post(GITLAB_HOST + '/' + projectId + '/members').headers({'Content-Type':'application/json','PRIVATE-TOKEN':req.decoded.token})
        .send(user)
        .end(function(re) {
          if (re.status >= 200 && re.status < 300) {
            return res.send('' + projectId);
          } else {
            console.log(re.status);
            return res.sendStatus(500);
          }//end if
        });
      } else {
        console.log(reply.body);
        res.sendStatus(500);
      }
  });

});


//TODO - figure out permissions

router.post('/:project/template/:type',function(req,res) {
  //add the files to the project
  //load them up
  var contentArray = {};
  var files = templates[req.params.type];
  for (var i=0;i<files.length;i++) {
    var path = __dirname + '/../templates/' + files[i];
    var file = fs.readFileSync(path,'utf8');
    //now add
    contentArray[files[i]] = file;
  }//end for
  //now send
  // console.log(contentArray);
  var broken = false;
  //TODO --fix thix
  for (key in contentArray) {
    var payload = {
      "file_name":key,
      "branch_name":"master",
      "content":contentArray[key],
      "file_path":"./" + key,
      "commit_message":"template"
    }

    console.log('sending...');
    var url = GITLAB_HOST + '/' + req.params.project + '/repository/files';
    console.log(url);

    var response = request('POST',url,{headers:{
      'Content-Type':'application/json','PRIVATE-TOKEN':req.decoded.token
    },json:payload});

    if (response.statusCode >= 400) {
      console.log(response.getBody('utf8'));
      return res.sendStatus(500);
    }//end if

    // unirest.post(url).header({'Content-Type':'application/json','PRIVATE-TOKEN':req.decoded.token})
    // .send(payload)
    // .end(function(reply) {
    //   // console.log(reply);
    //   if (reply.status > 400) {
    //     //problem
    //     console.log(reply.body);
    //     broken = true;
    //     return res.sendStatus(500);
    //   }//end if
    // });
  }

  return res.sendStatus(201);
  // for (var i=0;i<contentArray.length;i++) {
  //   var payload = {
  //     "file_name":contentArray[i],
  //     "branch_name":"master",
  //     "content":contentArray[i]
  //   }
  //   unirest.post(GITLAB_HOST + '/' + req.params.project + '/repository/files').header({'Content-Type':'application/json','PRIVATE-TOKEN':req.decoded.token})
  //   .send()
  // }
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
