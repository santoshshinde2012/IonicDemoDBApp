angular.module('demoDBapp.services', [])
.service('DBService', function($q, $http,$window,$cordovaSQLite) {
    return {
        initialize: function(dbname) {
            var deferred = $q.defer();
            var promise  = deferred.promise;
            var response = {result : '',error : ''};
            try {
                if ($window.cordova) {
                   //result = $cordovaSQLite.openDB("myapp.db");
                   response.result = $cordovaSQLite.openDB({name: dbname+".db",location: 'default'});
                } else {
                    // Ionic serve syntax
                   response.result = $window.openDatabase(dbname+".db", "1.0", "dbname", -1);
                }
                deferred.resolve(response);
            } catch (error) {
                response.error = error;
                deferred.reject(response);
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }

            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }

            return promise;
        },
        getData: function(db,query) {
            var deferred = $q.defer();
            var promise  = deferred.promise;
            var response = {result : '',error : ''};
            $cordovaSQLite.execute(db, query)
                .then(function(result) {
                    response.result = result.rows;
                    deferred.resolve(response);
                }, function(error) {
                    response.error = error;
                    deferred.reject(response);
                })
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }

            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }

            return promise;
        },
        executeQuery: function(db,query) {
            var deferred = $q.defer();
            var promise  = deferred.promise;
            var response = {result : '',error : ''};
            $cordovaSQLite.execute(db, query)
                .then(function(result) {
                    response.result = result;
                    deferred.resolve(response);
                }, function(error) {
                    response.error = error;
                    deferred.reject(response);
                })
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }

            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }

            return promise;
        },
        insertRecordWithParams: function(db,query,params) {
            var deferred = $q.defer();
            var promise  = deferred.promise;
            var response = {result : '',error : ''};
            $cordovaSQLite.execute(db, query,[params])
                .then(function(result) {
                    response.result = result;
                    deferred.resolve(response);
                }, function(error) {
                    response.error = error;
                    deferred.reject(response);
                })
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }

            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }

            return promise;
        }
      }
});
