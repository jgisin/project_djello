djello.controller('BoardCtrl', ["$scope", "Auth", 'data', 'apiService', '$stateParams', '$location',
  function($scope, Auth, data, apiService, $stateParams, $location){

      //Current User
      Auth.currentUser().then(function(user) {
      $scope.currentUser = user;
        // User was logged in, or Devise returned
        // previously authenticated session.
        //console.log(user); // => {id: 1, ect: '...'}
      }, function(error) {
      // unauthenticated error
        console.log(error);
    });

    //Board Index
    $scope.boards = apiService.boards;
    //Board Show
    $scope.board = apiService.boards[$stateParams.id];

    //Board Update
    $scope.updateBoard = function($data){
        $scope.board.title = $data;
        apiService.update('boards', $scope.board);
    };

    //Board Changer
    $scope.currentPage = $stateParams.id;
    $scope.changePage = function(currentPage){
        console.log(currentPage);
          $location.path('board/' + currentPage);
    };

    //List Create
    $scope.createList = function(){
      apiService.create('lists', {board_id: $stateParams.id}, {board_id: $stateParams.id, title: 'Give me a title', description: 'Give me a description', user_id: $scope.currentUser.id});
        apiService.getData();
      };

    //Board Refresh
      $scope.$watch(function() {
              return apiService.boards[$stateParams.id];
          },
          function(newValue) {
              $scope.board = newValue;
          });

  }]);
