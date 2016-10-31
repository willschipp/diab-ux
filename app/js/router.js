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

  $stateProvider.state('project',{
    url:'/project',
    templateUrl:'/partials/project.html',
    controller:'projectController'
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



}]).run(['$state','$rootScope',function($state,$rootScope){
  $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    $rootScope.preloader = true;
  });

  $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
    console.log('finished');
    $rootScope.preloader = false;
  });
}]);
