angular.module('ux-app').controller('appController',['$scope','projectsService','$templateCache','$window','$state',function($scope,projectsService,$templateCache,$window,$state) {

  var manageButtonInclude = '<span>Manage</span>';
  var editButtonInclude = '<span>Edit</span>';

  $templateCache.put('manage-button-template', manageButtonInclude);
  $templateCache.put('edit-button-template', editButtonInclude);

  var goGit = function(action,item) {
    var username = 'john';
    var GITLAB_URL = 'http://172.16.217.1:32772'
    $window.open(GITLAB_URL + '/' + username + '/' + item.name,"_blank");
  }

  var goIDE = function(action,item) {
    console.log('go to the IDE interface');
  }

  $scope.projects = projectsService.projects;

  $scope.config = {
       selectItems: false,
       multiSelect: false,
       dblClick: false,
       selectionMatchProp: 'name',
       selectedItems: [],
       showSelectBox: false,
       useExpandingRows: false//,
      //  onSelect: handleSelect,
      //  onSelectionChange: handleSelectionChange,
      //  onCheckBoxChange: handleCheckBoxChange,
      //  onClick: handleClick,
      //  onDblClick: handleDblClick
    };

  $scope.actionButtons = [
      {
        name: 'Manage',
        class: 'btn-default',
        include: 'manage-button-template',
        title: 'Manage Code',
        actionFn: goGit
      },
      {
        name: 'Edit',
        class: 'btn-default',
        include: 'edit-button-template',
        title: 'Edit Code',
        actionFn: goIDE
      }
  ];

}]);
