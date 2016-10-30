angular.module('ux-app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider.state('home',{
    url:'/home',
    templateUrl:'/partials/home.html'
  });

  $stateProvider.state('provision',{
    url:'/provision',
    templateUrl:'/partials/provision.html',
    controller:'provisionController'
  });

  $stateProvider.state('apps',{
    url:'/apps',
    templateUrl:'/partials/apps.html',
    controller:'appController',
    resolve: {
      postPromise: ['projectsService',function(projectsService) {
        return projectsService.load();
      }]
    }

  });

}]);
