angular.module('ux-app').controller('menuController',['$scope','$cookies','$window',function($scope,$cookies,$window) {

  $scope.logout = function() {
    console.log(document.cookie);
    // console.log('default');
    // $cookies.remove('_gitlab_session');
    // $window.location.href = '/';
    // return false;//disable default behavior
  }

}]);
