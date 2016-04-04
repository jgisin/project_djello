djello.directive('listPanel', [function(){

  return {
      restrict: "A",
      scope: {
          list: '=',
          showFooter: '=',
          toggleFooter: '&'
      },
      templateUrl: 'templates/directives/list_panel.html',
      controller: 'ListCtrl'
  };

}]);