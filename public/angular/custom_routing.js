
var app = angular.module("mytodo",["ngRoute","ui.bootstrap.modal"]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/todos', {
        templateUrl: 'partials/todos.ejs',
        resolve:{
        logincheck: checkLogin
        }
      }).
      when('/bookmarks', {
        templateUrl: 'partials/bookmarks.ejs',
        resolve:{
        logincheck: checkLogin
        }
      }).
      when('/login', {
        templateUrl: 'partials/login.ejs',  
        controller: 'loginctrl'
      }).
      otherwise({
        redirectTo:'/todos'
      })
}]);

var checkLogin = function($q, $timeout, $http,$location,$rootScope){
  var deferred = $q.defer();
  $http.get('/loggedin')
  .success(function(user){
    $rootScope.errorMessage = null;
    if(user!=='0'){
      $rootScope.currentUser = user;
      deferred.resolve();
    }
    else{
      $rootScope.errorMessage='You are not logged in';
      deferred.reject();
      $location.url('/login');
    }
  });
  return deferred.promise;
};