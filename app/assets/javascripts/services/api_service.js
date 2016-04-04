djello.factory('apiService', ['Restangular', function(Restangular, boardService){

    var obj = {};
    obj.data = {};
    obj.boards = {};

    obj.getData = function(){
        return Restangular.all('boards').getList().then(function(data){
           //console.log("data from service:", data[0]);
           obj.data = data;
           obj.populateBoards();
           return data;
       }, function(error){
           console.log("It didn't work");
       });
    };

    obj.populateBoards = function(){
        obj.data.forEach(function(board){
            obj.boards[board.id] = board;
        });
    };

    obj.create = function(item, queryParams, postParams){
      return Restangular.all(item, queryParams).post(postParams);
    };

    obj.update = function(item, obj){
        console.log(obj, obj.id);
      Restangular.one(item, obj.id).get().then(function(object){
          object.title = obj.title;
          if(object.description){
              object.description = obj.description;
          }
          object.put();
      })
    };

    obj.delete = function(item, obj){
      Restangular.one(item, obj.id).get().then(function(object){
        object.remove();
        obj.getData();
      })
    };


    return obj;
}]);
