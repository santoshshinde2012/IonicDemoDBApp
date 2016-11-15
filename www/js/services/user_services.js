
angular.module('demoDBapp.userservices', [])
.service('UserService', function($q, $http) {
    return {
        get_GET_User: function(mode) {
            var deferred = $q.defer();
            var promise  = deferred.promise;

            $http({
                    method  : "GET",
                    url     : ''
                })
                .success(function(data, status) {
                    deferred.resolve(data);
                })
                .error(function(data, status) {
                    if (status == 409) {
                        deferred.resolve(data);
                    } else {
                        deferred.reject(data);
                    }
                });

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
        get_POST_User: function(param) {
            var deferred = $q.defer();
            var promise  = deferred.promise;
            $http({
                      method: "POST",
                      url: '',
                      data: {params1 : '',params2 : ''},
                      headers: {
                          'Content-Type': 'application/x-www-form-urlencoded'
                      }
                })
                .success(function(data, status) {
                    deferred.resolve(data);
                })
                .error(function(data, status) {
                    if (status == 409) {
                        deferred.resolve(data);
                    } else {
                        deferred.reject(data);
                    }
                });

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
