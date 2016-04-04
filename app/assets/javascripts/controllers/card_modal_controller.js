djello.controller('CardModalCtrl', ['$scope', '$uibModalInstance', 'cardObj', 'apiService', function($scope, $uibModalInstance, cardObj, apiService){

  $scope.card = cardObj.cardObj;
  console.log($scope.card);

  $scope.deleteCard = function(card){
    apiService.delete('cards', card);
    $uibModalInstance.dismiss();
  }

}]);