djello.controller('BoardCtrl', ["$scope", "Auth", 'data', 'apiService', '$stateParams', '$location',
  function($scope, Auth, data, apiService, $stateParams, $location){

    $scope.users = {};
    var getUsers = function(){
      apiService.getIndex('users').then(function(data){
        $scope.users = data;
      });
    };
    getUsers();

    getUsers();
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
    console.log($scope.boards);

    //Board Create
    $scope.createBoard = function(){
      apiService.create('boards', {}, {title: 'Give me a title', user_id: $scope.currentUser.id}).then(function(data){
        apiService.getData();
      })
    };

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

    //Board Delete
    $scope.deleteBoard = function(board){
      apiService.delete('boards', board).then(function(data){
        apiService.getData();
      });
    };

    //BoardMember Create
    $scope.addBoardMember = function(member_id){
      apiService.create('board_members', {member_id: member_id, board_id: $scope.board.id}, {member_id: member_id, board_id: $scope.board.id}).then(function(data){
        apiService.getData();
      });
    };

    //BoardMember Destroy
    $scope.removeMember = function(member){
      console.log($scope.board.id, member.id);
      var boardMember = _.find($scope.board.board_members, function(board_member){
        return board_member.member_id === member.id;
      });
      apiService.delete('board_members', boardMember).then(function(data){
        apiService.getData();
      });
    };


    //List Create
    $scope.createList = function(){
      apiService.create('lists', {board_id: $stateParams.id}, {board_id: $stateParams.id, title: 'Give me a title', description: 'Give me a description', user_id: $scope.currentUser.id});
        apiService.getData();
      };

    //List Delete
    $scope.deleteList = function(list){
      apiService.delete('lists', list).then(function(data){
        apiService.getData();
      });

    };

    //Board Refresh
      $scope.$watch(function() {
              return apiService.boards[$stateParams.id];
          },
          function(newValue) {
              $scope.board = newValue;
          });
  }]);
