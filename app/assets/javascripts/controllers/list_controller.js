djello.controller('ListCtrl', ['$scope','apiService', function($scope, apiService){

    $scope.showFooter = false;
    $scope.toggleFooter = function(){
        $scope.showFooter = !$scope.showFooter;
    };

    $scope.cardDescription = "";


    //List XEditable
    $scope.updateList = function($data, list, type){
        if(type === 'title'){
            list.title = $data;
        }
        else if(type === 'description'){
            list.description = $data;
        }
        apiService.update('lists', list);
    };


    //List Create
    $scope.createCard = function(list_id){
        apiService.create('cards', {list_id: list_id}, {list_id: list_id, title: 'Give me a title', description: $scope.cardDescription}).then(function(data){
          apiService.getData();
        });
    };

    //Transfer Card Between Lists
    $scope.addCard = function(list, item){
      item.list_id = list.id;
      apiService.updateMove('cards', item).then(function(data){
        apiService.getData();
      })
    };

}]);