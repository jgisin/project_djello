djello.controller('CardCtrl', ['$scope', 'apiService', '$uibModal', function($scope, apiService, $uibModal){

    //List XEditable
    $scope.updateCard = function($data, card, type){
        if(type === 'title'){
            card.title = $data;
        }
        else if(type === 'description'){
            card.description = $data;
        }
        apiService.update('cards', card);
    };

    //Modal
    $scope.open = function(card) {

        var cardModal = $uibModal.open({
            animation: true,
            templateUrl: 'templates/card_modal.html',
            controller: 'CardModalCtrl',
            size: 'lg',
            resolve: {
                cardObj: function () {
                    return card;
                }
            }
        });
    };

}]);