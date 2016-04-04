djello.directive('cardPanel', [function(){

    return {
        restrict: "A",
        scope: {
            card: "="
        },
        templateUrl: 'templates/directives/card_panel.html',
        controller: 'CardCtrl'
    }

}]);