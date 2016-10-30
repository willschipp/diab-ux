angular.module('ux-app').factory('userService',['$http',function($http) {

  var user = {
    admin:false
  };

  user.load = function() {
    return $http({url:'/api/settings',method:'GET'}).then(function(result){
      console.log(result.data);
      user.admin = result.data.admin;
      return user.admin;
    },function(err){
      console.log();
    });
  }

  return user;

}]);
