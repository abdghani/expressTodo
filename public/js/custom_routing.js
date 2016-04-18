
var app = angular.module("mytodo",["ngRoute"]);


app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/todos', {
        templateUrl: 'partials/todos.ejs'
      }).
      when('/bookmarks', {
        templateUrl: 'partials/bookmarks.ejs',
      }).
      otherwise({
        redirectTo:'/todos'
      })
}]);