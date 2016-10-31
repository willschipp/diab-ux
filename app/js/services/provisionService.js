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
        projectName:$scope.data.project,
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

    //create the workspace with the embedded project
    //create the deployment manifest --> app and port number
  }

  //create a project for a user
  provision.createNewProject = function(payload,type) {
    //invoke the following steps
    //create the project
    return $http({method:'POST',url:'/api/git',data:project}).then(function(result){
      //now add the files to the location based on the project type
      //files should be --> empty README.md, Dockerfile, basic structure (package.json, pom.xml)
    },function(err){
      console.log(err);
      return;
    });
    //add the foundational files
  }

  //function to load up the various files on the basis of file type
  //returns an array of the files to be written
  function getFileSet(type) {
    
  }

  return provision;
}]);
