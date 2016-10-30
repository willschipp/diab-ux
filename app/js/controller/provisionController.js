angular.module('ux-app').controller('provisionController',['$scope','$modal','$rootScope',function($scope,$modal,$rootScope) {

  $scope.launchWizard = function() {
    var wizardDoneListener,
              modalInstance = $modal.open({
                animation: true,
                backdrop: 'static',
                templateUrl: '/partials/provision-wizard-container.html',
                controller: 'WizardController',
                size: 'lg'
              });

      var closeWizard = function (e, reason) {
        modalInstance.dismiss(reason);
        wizardDoneListener();
      };

      modalInstance.result.then(function () { }, function () { });

      wizardDoneListener = $rootScope.$on('wizard.done', closeWizard);
  }
}]);


angular.module('ux-app').controller('WizardController',['$scope','$rootScope','$http',function($scope,$rootScope,$http){

  $scope.data = {};

  var initializeWizard = function () {
     $scope.nextButtonTitle = "Next >";
   };

   var startDeploy = function () {
    //  $scope.deployInProgress = true;
    var user = {
      username:"john",
      password:"12345678",
      email:"john@doe.com",
      name:"john"
    }

    return $http({method:'POST',url:'/api/user',data:user}).then(function(result){
      //now create the project
      console.log(result.data.id);
      var project = {
        projectName:"test_project",
        user_id:result.data.id
      }
      return $http({method:'POST',url:'/api/git',data:project});
    },function(err){
      console.log(err);
    }).then(function(result){
      console.log(result);
    },function(err){
      console.log(err);
    });
   };


   $scope.nextCallback = function (step) {
     // call startdeploy after deploy button is clicked on review-summary tab
     if (step.stepId === 'review-summary') {
       startDeploy();
     }
     return true;
   };

   $scope.backCallback = function (step) {
     return true;
   };

   $scope.$on("wizard:stepChanged", function (e, parameters) {
     console.log('invoked');
     if (parameters.step.stepId === 'review-summary') {
       $scope.nextButtonTitle = "Deploy";
     } else if (parameters.step.stepId === 'review-progress') {
       $scope.nextButtonTitle = "Close";
     } else {
       $scope.nextButtonTitle = "Next >";
     }
   });

   $scope.cancelDeploymentWizard = function () {
     $rootScope.$emit('wizard.done', 'cancel');
   };

   $scope.finishedWizard = function () {
     $rootScope.$emit('wizard.done', 'done');
     return true;
   };

   initializeWizard();

}]);

angular.module('ux-app').controller('CreateUserController',['$scope','$rootScope',function($scope,$rootScope){}]);
