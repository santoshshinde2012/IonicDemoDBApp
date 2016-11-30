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
        },
        insertUser: function(db,User) {
            var query = 'INSERT INTO User (name,status,email,mobile,password) VALUES ("'+User.name+'","'+User.status+'","'+User.email+'","'+User.mobile+'","'+User.password+'")';
            console.log("Query : "+query);
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
        insertBank: function(db,Bank) {
            var query = 'INSERT INTO Bank (user_id,bank_name,account_number,branch_name,branch_address,ifsc_code) VALUES ("'+Bank.user_id+'","'+Bank.bank_name+'","'+Bank.account_number+'","'+Bank.branch_name+'","'+Bank.branch_address+'","'+Bank.ifsc_code+'")';
            console.log("Query : "+query);
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
        }
      }
});
