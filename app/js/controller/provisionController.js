angular.module('ux-app').controller('provisionController',['$scope','$modal','$rootScope',function($scope,$modal,$rootScope,provisionService) {

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


angular.module('ux-app').controller('WizardController',['$scope','$rootScope','$http','provisionService',function($scope,$rootScope,$http,provisionService){

  $scope.data = {};

  $scope.userFinished = false;
  $scope.projectFinished = false;
  $scope.templateFinished = false;
  $scope.createFinished = false;
  $scope.workspaceFinished = false;
  $scope.createError = false;


  $scope.error = {
    content:''
  }

  var initializeWizard = function () {
     $scope.nextButtonTitle = "Next >";
   };

   var startDeploy = function () {

     var projectId = '';
     var user_id = '';
     //do the user
     return provisionService.createUser($scope.data).then(function(result) {
       if (result) {
         $scope.userFinished = true;
         user_id = result;
         //create the project
         var project = {
           projectName:$scope.data.project,
           user_id:result
         }//end project
         return provisionService.createNewProject(project);
       }
     }).then(function(result) {
       if (result) {
         $scope.projectFinished = true;
         //add the files
         projectId = result;
         console.log(result);
        //  return true;//exit
        return provisionService.deployTemplate(result,$scope.data.projectType,$scope.data.project,$scope.data.username);
        // return $rootScope.$emit('wizard.done', 'done');
       }//end if
     }).then(function(result) {
       if (result) {
         $scope.templateFinished = true;
        //  $scope.createFinished = true;
        //  return true;//exit
        return provisionService.deployWorkspace(projectId)
       } else {
         $scope.error.content = 'Problem deploying files';
         $scope.createError = true;
         return;
       }
     }).then(function(result) {
       if (result) {
         $scope.workspaceFinished = true;
         $scope.createFinished = true;
         return true;
       } else {
         $scope.error.content = 'Problem deploying workspace';
         $scope.createError = true;
         return;
       }//end if
     });

   };



   $scope.nextCallback = function (step) {
     // call startdeploy after deploy button is clicked on review-summary tab
     if (step.stepId === 'review-summary') {
       return startDeploy();
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
