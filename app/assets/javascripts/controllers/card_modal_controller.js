djello.controller('CardModalCtrl', ['$scope', '$uibModalInstance', 'cardObj', 'apiService', '_', function($scope, $uibModalInstance, cardObj, apiService, _){

  $scope.users = {};
  $scope.card = cardObj.cardObj;
  console.log($scope.card);

  var getUsers = function(){
    apiService.getIndex('users').then(function(data){
      $scope.users = data;
    });
  };
  getUsers();

  $scope.deleteCard = function(card){
    apiService.delete('cards', card).then(function(data){
      apiService.getData();
      $uibModalInstance.dismiss();
    });

  };

  $scope.addCardMember = function(){
    apiService.create('card_members', {member_id: $scope.cardMember}, {member_id: $scope.cardMember, card_id: $scope.card.id}).then(function(data){
      apiService.getData();
      $uibModalInstance.dismiss();
    })
  };

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

  $scope.removeCardMember = function(member){
    console.log($scope.card.id, member.id);
    var cardMember = _.find($scope.card.card_members, function(card_member){
      return card_member.member_id === member.id;
    });
    apiService.delete('card_members', cardMember).then(function(data){
      apiService.getData();
      $uibModalInstance.dismiss();
    });
  };
  
  $scope.createTodo = function(card){
    apiService.create('todos', {card_id: card.id}, {card_id: card.id, item: $scope.newTodo, complete: false}).then(function(data){
      apiService.getData();
    });
  };
  
  $scope.completeTodo = function(todo){
    apiService.updateTodo('todos', todo).then(function(data){
      apiService.getData();
    });
  }


}]);