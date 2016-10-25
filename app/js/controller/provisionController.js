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


angular.module('ux-app').controller('WizardController',['$scope','$rootScope',function($scope,$rootScope){

  var initializeWizard = function () {
     $scope.data = {
       name: '',
       description: '',
       lorem: 'default setting',
       ipsum: ''
     };
     $scope.secondaryLoadInformation = 'ipsum dolor sit amet, porta at suspendisse ac, ut wisi vivamus, lorem sociosqu eget nunc amet.';
    //  $timeout(function () {
    //    $scope.deployReady = true;
    //  }, 1000);
     $scope.nextButtonTitle = "Next >";
   };

   var startDeploy = function () {
     $scope.deployInProgress = true;
   };

   $scope.data = {};

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
