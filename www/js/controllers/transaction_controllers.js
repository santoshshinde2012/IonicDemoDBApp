angular.module('demoDBapp.Transaction_Controllers', [])

.controller('TransactionsCtrl', function($scope, $ionicPopup,$ionicPlatform,DBService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  var query_creat_table = 'CREATE TABLE IF NOT EXISTS Messages (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT)',
      query_insert = 'INSERT INTO Messages (message) VALUES (?)',
      query_select = 'SELECT * FROM Messages ORDER BY id DESC';

  $scope.users = [];

  $scope.user = { username : ''};

  //function to popup msg
  var userAlert = function(title, user_template) {
      $ionicPopup.alert({
          title: '<h4 class="assertive">' + title + '</h4>',
          template: user_template,
          okText: "OK",
          okType: "button-calm button-clear"
      });
  };
  //Function to initialize DB
  var initialize = function(){
    $scope.user = { username : ''};
    $ionicPlatform.ready(function() {
      DBService.initialize('nextflow')
          .success(function(data) {
              $scope.db = data.result;
              execute(data.result,query_creat_table)
              load(data.result);
          }).error(function(data) {
              console.log(data);
          });
    });
  };
  //function to load data
  var load = function(db) {
      execute(db,query_select)
  };
  //function to execute query
  var execute = function(db,query){
    DBService.getData(db,query)
        .success(function(data) {
            console.log(data);
            $scope.users = [];
            angular.forEach(data.result,function(item,index){
              $scope.users.push({name: item.message});
            })
        }).error(function(data) {
            console.log(data);
        });
  };
  //function to save data
  $scope.save = function() {
    if(angular.equals($scope.user.username,'') || angular.isUndefined($scope.user.username)){
      userAlert('Error','Please Enter Valid User Name');
    }else{
      DBService.insertRecordWithParams($scope.db,query_insert,$scope.user.username)
          .success(function(data) {
                userAlert('Success','You have added Successfully to user <b>'+$scope.user.username+'</b>');
                $scope.user = { username : ''};
          }).error(function(data) {
              console.log(data);
          });
        load($scope.db);
    }
  };
  initialize();
});
