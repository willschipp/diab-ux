angular.module('ux-app').controller('menuController',['$scope','$mdSidenav',function($scope,$mdSidenav) {

  $scope.toggleMenu = function() {
    $mdSidenav('left').toggle();
  }

}]);
