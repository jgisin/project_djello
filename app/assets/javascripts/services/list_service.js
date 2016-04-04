djello.factory('listService', ['boardService', function(boardService){

    var obj = {};

    obj.getLists = function(board){
        return board['lists'];
    };

    obj.createList = function(id){
        apiService.create('lists', {});
    };

    return obj;

}]);