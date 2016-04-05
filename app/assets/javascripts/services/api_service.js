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

    obj.getIndex = function(item){
      return Restangular.all(item).getList();
    };

    obj.create = function(item, queryParams, postParams){
      return Restangular.all(item, queryParams).post(postParams);
    };

    obj.update = function(item, obj){
        console.log(obj, obj.id);
      return Restangular.one(item, obj.id).get().then(function(object){
          object.title = obj.title;
          if(object.description){
              object.description = obj.description;
          }
          object.put();
      })
    };

    obj.updateMove = function(item, obj){
      return Restangular.one(item, obj.id).get().then(function(object){
        object.list_id = obj.list_id
        object.put();
      });
    };

    obj.updateTodo = function(item, obj){
      return Restangular.one(item, obj.id).get().then(function(todo){
        todo.complete = obj.complete;
        todo.put();
      });
    }

    obj.delete = function(item, obj){
      return Restangular.one(item, obj.id).get().then(function(object){
        object.remove();
      })
    };

    obj.deleteWithoutId = function(item, obj){
      Restangular.all(item).getList(obj).then(function(data){
        data.remove();
      });
    };


    return obj;
}]);
