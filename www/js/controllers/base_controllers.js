angular.module('demoDBapp.controllers', [])

.controller('DashCtrl', function($scope,$sqlitestorage,$ionicPlatform,$ionicLoading,DBService) {
  var db,response,
      query_creat_table = 'CREATE TABLE IF NOT EXISTS Messages (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT)',
      query_insert = 'INSERT INTO Messages (message) VALUES (?)',
      query_select = 'SELECT * FROM Messages ORDER BY id DESC';

  $ionicPlatform.ready(function() {
    $ionicLoading.show({
        template: '<img src="img/ring.svg">'
    });
    DBService.initialize('nextflow')
        .success(function(data) {
            $ionicLoading.hide();
            console.log(data);
        }).error(function(data) {
            $ionicLoading.hide();
            console.log(data);
        });

    //response = $sqlitestorage.executeQuery(db,query_creat_table);
  });

  $scope.save = function(newMessage) {
     response = $sqlitestorage.execute(db, query_insert, [newMessage]);
  };

  $scope.load = function() {
      response = $sqlitestorage.execute(db, query_select);
      angular.forEach(response.rows,function(item,index){
        console.log(JSON.stringify(item.message));
      });
  };
})

.controller('TransactionsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams,$ionicLoading, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
    //Test Method To call service
    var getService = function() {
        $ionicLoading.show({
            template: '<img src="img/ring.svg">'
        });
        UserService.get_GET_User()
            .success(function(data) {
                $ionicLoading.hide();
            }).error(function(data) {
                $ionicLoading.hide();
            });
    };
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
