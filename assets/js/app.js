var shopApp = angular.module('shopApp', ['ui.router']);
shopApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider

//STATES
.state('home', {
  url : '/',
  templateUrl : 'assets/tpl/lists.html',
  controller: 'ListCtrl'
}).state('add-user', {
  url : '/add-user',
  templateUrl : 'assets/tpl/add-new.html',
  controller : 'AddCtrl'
}).state('/edit/:id', {
  url : '/edit/:id',
  templateUrl : 'assets/tpl/edit.html',
  controller : 'EditCtrl'
})
});


//LIST CONTROLLER
//-----------------------------------------------------------------------------------------------------------------------------------------
shopApp.controller('ListCtrl', function($scope, $http){
  var vm = this;
  $http.get('api/users').success(function(data){
    vm.users = data;
  });
});


//ADD CONTROLLER
//-----------------------------------------------------------------------------------------------------------------------------------------
shopApp.controller('AddCtrl', function($scope, $http, $state){
  $scope.master = {};
  $scope.activePath = null;
  $scope.add_new = function(user, AddNewForm){
    $http.post('api/add_user', user).success(function(){
      $scope.reset();
      $state.go('home');
    });
    $scope.reset = function(){
      $scope.user = angular.copy($scope.master);
    };
    $scope.reset();
  };

});


//EDIT CONTROLLER
//-----------------------------------------------------------------------------------------------------------------------------------------
shopApp.controller('EditCtrl', function($scope, $http, $location, $stateParams, $state){
  var vm = this;
  var id = $stateParams.id;
  $scope.activePath = null;
  $http.get('api/users/'+id).success(function(data){
    vm.users = data;
  });
  $scope.update = function(user){
    $http.put('api/users/'+id, user).success(function(data){
      vm.users = data;
    });
    $state.go('home');
  };
  $scope.delete = function(user){
    console.log(user);
    var deleteUser = confirm('You sure?');
    if(deleteUser){
      $http.delete('api/users/'+user.id);
      $state.go('home');
    }
  };
});
