angular.module('demoDBapp.Account_Controllers', [])
.controller('AccountCtrl', function($scope,$ionicModal,$state,$ionicPlatform,$ionicPopup,DBService) {
  var query_creat_table = 'CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,status TEXT,email TEXT,mobile TEXT,password TEXT)',
      query_insert = 'INSERT INTO User (name,status,email,mobile,password) VALUES (?,?,?,?,?)',
      query_select = 'SELECT * FROM User ORDER BY id DESC';

  var initialize = function(){
    $scope.users = [];
    $scope.newUser = {
      name: '',
      status : '',
      email : '',
      mobile : '',
      password : ''
    };
    $ionicPlatform.ready(function() {
      DBService.initialize(db_name)
          .success(function(data) {
              $scope.db = data.result;
              execute(data.result,query_creat_table)
              load(data.result);
          }).error(function(data) {
              console.log(data);
          });
    });
  }
  //function to popup msg
  var userAlert = function(title, user_template) {
      $ionicPopup.alert({
          title: '<h4 class="assertive">' + title + '</h4>',
          template: user_template,
          okText: "OK",
          okType: "button-calm button-clear"
      });
  };
  $scope.addUser = function(){
    $ionicModal.fromTemplateUrl('templates/accounts/modals/add-user.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal.remove();
  };
  var validation = function(){
    if(angular.equals($scope.newUser.name,'') || angular.isUndefined($scope.newUser.name)){
      userAlert('Error','Please Enter Valid Name');
      return;
    }
    if(angular.equals($scope.newUser.status,'') || angular.isUndefined($scope.newUser.status)){
      userAlert('Error','Please Enter Valid Status');
      return;
    }
    if(angular.equals($scope.newUser.email,'') || angular.isUndefined($scope.newUser.email)){
      userAlert('Error','Please Enter Valid Email');
      return;
    }
    if(angular.equals($scope.newUser.mobile,'') || angular.isUndefined($scope.newUser.mobile)){
      userAlert('Error','Please Enter Valid Mobile');
      return;
    }
    if(angular.equals($scope.newUser.password,'') || angular.isUndefined($scope.newUser.password)){
      userAlert('Error','Please Enter Valid Password');
      return;
    }
    return true;
  }
  $scope.createUser = function() {
    if (validation()) {
      DBService.insertUser($scope.db,$scope.newUser)
          .success(function(data) {
                userAlert('Success','You have added Successfully to user <b>'+$scope.newUser.name+'</b>');
                initialize();
                $scope.closeModal();
                load($scope.db);
          }).error(function(data) {
              console.log(data);
          });
    }
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
            //$state.go('tab.account',  null, {reload: true});
            $scope.users = [];
            angular.forEach(data.result,function(item,index){
              $scope.users.push({
                userid : item.id,
                name: item.name,
                status : item.status,
                email : item.email,
                mobile : item.mobile,
                password : item.password});
            });
            $state.go('tab.account', {reload: true});
        }).error(function(data) {
            console.log(data);
        });
  };
  initialize();
})

.controller('AccountDetailsCtrl', function($scope,$stateParams,$ionicPlatform,$ionicModal,$ionicLoading,$ionicPopup,DBService) {
  console.log($stateParams.userId);
  var query_creat_table = 'CREATE TABLE IF NOT EXISTS Bank (id INTEGER PRIMARY KEY AUTOINCREMENT,user_id TEXT,bank_name TEXT,account_number TEXT,branch_name TEXT,branch_address TEXT,ifsc_code TEXT)',
      query_insert = 'INSERT INTO Bank (bank_name,user_id,account_number,branch_name,branch_address,ifsc_code) VALUES (?,?,?,?,?,?)',
      query_select = 'SELECT * FROM Bank WHERE user_id='+$stateParams.userId+' ORDER BY id DESC';

  var initialize = function(){
    $scope.banks = [];
    $scope.newBank = {
      user_id : $stateParams.userId,
      bank_name: '',
      account_number : '',
      branch_name : '',
      branch_address : '',
      ifsc_code : ''
    };
    $ionicPlatform.ready(function() {
      DBService.initialize(db_name)
          .success(function(data) {
              $scope.db = data.result;
              execute(data.result,query_creat_table)
              load(data.result);
          }).error(function(data) {
              console.log(data);
          });
    });
  }
  //function to popup msg
  var userAlert = function(title, user_template) {
      $ionicPopup.alert({
          title: '<h4 class="assertive">' + title + '</h4>',
          template: user_template,
          okText: "OK",
          okType: "button-calm button-clear"
      });
  };
  $scope.onReorder = function (fromIndex, toIndex) {
      var moved = $scope.banks.splice(fromIndex, 1);
      $scope.banks.splice(toIndex, 0, moved[0]);
  };
  $scope.addBankAccount = function(){
    $ionicModal.fromTemplateUrl('templates/accounts/modals/add-bank-details.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal.remove();
  };
  var validation = function(){
    if(angular.equals($scope.newBank.bank_name,'') || angular.isUndefined($scope.newBank.bank_name)){
      userAlert('Error','Please Enter Valid Bank Name');
      return;
    }
    if(angular.equals($scope.newBank.account_number,'') || angular.isUndefined($scope.newBank.account_number)){
      userAlert('Error','Please Enter Valid Account Number');
      return;
    }
    if(angular.equals($scope.newBank.branch_name,'') || angular.isUndefined($scope.newBank.branch_name)){
      userAlert('Error','Please Enter Valid Branch Name');
      return;
    }
    if(angular.equals($scope.newBank.branch_address,'') || angular.isUndefined($scope.newBank.branch_address)){
      userAlert('Error','Please Enter Valid BrancH Address');
      return;
    }
    if(angular.equals($scope.newBank.ifsc_code,'') || angular.isUndefined($scope.newBank.ifsc_code)){
      userAlert('Error','Please Enter Valid IFSC Code');
      return;
    }
    return true;
  }
  $scope.addBank = function() {
    if (validation()) {
      DBService.insertBank($scope.db,$scope.newBank)
          .success(function(data) {
                userAlert('Success','You have added Successfully to Bank <b>'+$scope.newBank.bank_name+'</b>');
                initialize();
                $scope.closeModal();
          }).error(function(data) {
              console.log(data);
          });
        load($scope.db);
    }


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
            $scope.banks = [];
            angular.forEach(data.result,function(item,index){
              $scope.banks.push({
                bankid : item.id,
                bank_name: item.bank_name,
                account_number : item.account_number,
                branch_name : item.branch_name,
                branch_address : item.branch_address,
                ifsc_code : item.ifsc_code
                });
            });
        }).error(function(data) {
            console.log(data);
        });
  };
  initialize();
});
