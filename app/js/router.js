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

}]);
