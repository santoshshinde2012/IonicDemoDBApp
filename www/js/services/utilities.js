angular.module('demoDBapp.utils', [])

.factory('$localstorage', ['$window', function ($window) {
    return {
        set: function (key, value) {
            $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key) {
            return JSON.parse($window.localStorage[key] || '{}');
        },
        removeItem: function (key) {
            $window.localStorage.removeItem(key);
        },
        clearAll: function(){
          $window.localStorage.clear();
        }
    }
}])
.factory('$sqlitestorage', ['$window', function ($window,$cordovaSQLite) {
    return {
        initialize : function(dbname){
            var response = {result : '',error : ''};
            try {
                if ($window.cordova) {
                   //result = $cordovaSQLite.openDB("myapp.db");
                   response.result = $cordovaSQLite.openDB({name: dbname+".db",location: 'default'});
                } else {
                    // Ionic serve syntax
                   response.result = $window.openDatabase(dbname+".db", "1.0", "dbname", -1);
                }
            } catch (error) {
                response.error = error;
            }
            return response;
        },
        executeQuery : function(db,query){
            var response = {result : '',error : ''};
            $cordovaSQLite.execute(db, query)
                .then(function(result) {
                    response.result = result;
                }, function(error) {
                    response.error = error;
                })
            return response;
       },
       insertRecordWithParams : function(db,query,params){
        /**
         ** for example query
         ** query = 'INSERT INTO Messages (message) VALUES (?)', [newMessage]
         ** execute INSERT statement with parameter
         **/
        var response = {result : '',error : ''};
        $cordovaSQLite.execute(db, query, [params])
            .then(function(result) {
                response.result = result;
            }, function(error) {
                response.error = error;
            })
        return response;
      }
    }
}]);
