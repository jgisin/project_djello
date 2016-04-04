djello.factory('boardService',
  ['Restangular',
  'apiService',
  function(Restangular, apiService){

    var obj = {};

    obj.boards = [];

    obj.createBoard = function(id){
      apiService.create('board', {id: id});
    };

    return obj;
}]);
