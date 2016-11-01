angular.module('ux-app').factory('provisionService',['$http',function($http) {
  var provision = {};

  //create the basis
  provision.init = function(payload) {
    //invoke the steps in sequence
    //create the user
    var user = {
      username:payload.username,
      password:payload.password,
      email:payload.email,
      name:payload.name
    }
    return $http({method:'POST',url:'/api/user',data:user}).then(function(result){
      //now create the project
      console.log(result.data.id);
      //create a project
      var project = {
        projectName:payload.project,
        user_id:result.data.id
      }//end project
      //create the project --> add files including Dockerfile template based on project type choice
      return provision.createNewProject(project,payload.projectType);
    },function(err){
      console.log(err);
      return;
    }).then(function(result){
      console.log(result);
      return true;
    },function(err){
      console.log(err);
      return;
    });
  }


  provision.createUser = function(payload) {
    //create the user
    var user = {
      username:payload.username,
      password:payload.password,
      email:payload.email,
      name:payload.name
    }
    return $http({method:'POST',url:'/api/user',data:user}).then(function(result){
      return result.data.id;
    },function(err){
      console.log(err);
      return;
    });
  }

  //create a project for a user
  provision.createNewProject = function(payload,type) {
    //invoke the following steps
    console.log('creating new project');
    //create the project
    return $http({method:'POST',url:'/api/git',data:payload}).then(function(result){
      return result.data;
    },function(err){
      console.log(err);
      return;
    });
  }

  provision.deployWorkspace = function(projectId) {
    //get the workspace json
    var filePath = 'workspace-project.json';
    return $http({method:'GET',url:'/api/git/file/' + projectId + '/' + filePath}).then(function(result){
      var json = result.data;
      //the content is base64 encoded, need to send it back
      console.log(json);
      var payload = {
        workspace: json
      }
      //submit to the api to create the workspace
      return $http({method:'POST',url:'/api/ide',data:payload})
    },function(err){
      console.log(err)
      return;
    }).then(function(result){
      return true;
    },function(err){
      console.log(err);
      return;
    });

  }

  provision.deployTemplate = function(projectId,type,projectName,username) {

    var payload = {
      projectName:projectName,
      workspaceName:'workspace-' + username,
      username:username
    };

    console.log(payload);

    return $http({method:'POST',url:'/api/git/' + projectId + '/template/' + type,data:payload}).
    then(function(result) {
      return true;//all good
    },function(err) {
      console.log(err);
      return;
    });
  }

  return provision;
}]);
