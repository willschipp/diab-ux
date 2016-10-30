angular.module('ux-app').controller('appController',['$scope','projectsService',function($scope,projectsService) {

  $scope.projects = projectsService.projects;

}]);
