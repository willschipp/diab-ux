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
  $scope.createError = false;

  $scope.error = {
    content:''
  }

  var initializeWizard = function () {
     $scope.nextButtonTitle = "Next >";
   };

   var startDeploy = function () {
     //do the user
     return provisionService.createUser($scope.data).then(function(result) {
       if (result) {
         $scope.userFinished = true;
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
        //  return true;//exit
        return provisionService.deployTemplate(result,$scope.data.projectType);
        // return $rootScope.$emit('wizard.done', 'done');
       }//end if
     }).then(function(result) {
       if (result) {
         $scope.templateFinished = true;
         $scope.createFinished = true;
         return true;//exit
       } else {
         $scope.error.content = 'Problem deploying files';
         $scope.createError = true;
         return;
       }
     });


    //  return provisionService.init($scope.data).then(function(result) {
    //    console.log(result);
    //  });
    //  $scope.deployInProgress = true;
    /*
    var user = {
      username:$scope.data.username,
      password:$scope.data.password,
      email:$scope.data.email,
      name:$scope.data.name
    }

    return $http({method:'POST',url:'/api/user',data:user}).then(function(result){
      //now create the project
      console.log(result.data.id);
      //create a project
      var project = {
        projectName:$scope.data.project,
        user_id:result.data.id
      }
      //execute
      return $http({method:'POST',url:'/api/git',data:project});
    },function(err){
      console.log(err);
    }).then(function(result){
      console.log(result);
    },function(err){
      console.log(err);
    });
    */


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
