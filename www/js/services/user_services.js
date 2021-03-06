angular.module('demoDBapp.userservices', [])

.factory('Users', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Santosh Shinde',
    lastText: 'Our Hopes Never Lossed Because Our Hopes Not For Jokes !!',
    face: 'img/santosh.jpg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
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
