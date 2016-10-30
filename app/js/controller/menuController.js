angular.module('ux-app').controller('menuController',['$scope','$cookies','$window','userService',function($scope,$cookies,$window,userService) {

  $scope.admin = false;

  userService.load().then(function(result) {
    $scope.admin = result;
  });

}]);
