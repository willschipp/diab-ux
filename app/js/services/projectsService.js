angular.module('ux-app').factory('projectsService',['$http',function($http) {

  var projects = {
    projects:[]
  };

  projects.load = function() {
    return $http({url:'/api/git/',method:'GET'}).then(function(result){
      projects.projects = result.data;
      return projects.projects;
    },function(err){
      console.log();
    });
  }

  return projects;

}]);
