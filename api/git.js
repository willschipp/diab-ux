var router = require('express').Router();
var unirest = require('unirest');
var fs = require('fs');
var request = require('sync-request');

var GITLAB_SERVER = process.env.GITLAB_HOST || "http://172.16.217.1:32772";
var GITLAB_HOST = GITLAB_SERVER + "/api/v3/projects"

var templates = {
  'nodejs':{
    'Dockerfile_node':'Dockerfile',
    'node-workspace-project.json':'workspace-project.json',
    'node_gitignore':'.gitignore',
    'README.md':'README.md'
  },

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


router.post('/:project/template/:type',function(req,res) {
  //add the files to the project
  //load them up
  var contentArray = {};
  var files = templates[req.params.type];
  var repository_url = GITLAB_SERVER + '/' + req.body.username + '/' + req.body.projectName + '.git';
  // for (var i=0;i<files.length;i++) {
  for (key in files) {
    // var path = __dirname + '/../templates/' + files[i];
    var path = __dirname + '/../templates/' + key;
    var file = fs.readFileSync(path,'utf8');
    //do the substitution
    file = file.replace(/%%project_name%%/g,req.body.projectName);
    file = file.replace(/%%workspace_name%%/g,req.body.workspaceName);
    file = file.replace(/%%repository_url%%/g,repository_url);
    //now add
    contentArray[files[key]] = file;
  }//end for
  //now send
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

    var response = request('POST',url,{headers:{
      'Content-Type':'application/json','PRIVATE-TOKEN':req.decoded.token
    },json:payload});

    if (response.statusCode >= 400) {
      console.log(response.getBody('utf8'));
      return res.sendStatus(500);
    }//end if
  }

  return res.sendStatus(201);
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
