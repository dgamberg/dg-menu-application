var myApp = angular.module('myApp', ['ngRoute']);

myApp.controller('MainController', ['$scope', '$http', function($scope, $http){


}]);
myApp.controller('MenuController', ['$scope', '$http', function($scope, $http){
    $scope.menu = {};
    $scope.menuArray = [];

    //GET
    $scope.displayMenu = function(){
        $http.get('/data').then(function(response){
            console.log(response.data)
            $scope.menuArray = response.data;
        });
    };
    ////READ all messages
    $scope.displayMenu();
}]);

myApp.config(['$routeProvider', function($routeProvider){
   $routeProvider.
       when('/home', {
          templateUrl: "/views/home.html",
       }).
       when('/appetizers', {
          templateUrl: "views/appetizers.html",
          controller: "MenuController"
       }).
       when('/burgers', {
           templateUrl: "views/burgers.html",
           controller: "MenuController"
       }).
       when('/salads', {
           templateUrl: "views/salads.html",
           controller: "MenuController"
       }).
       when('/sandwiches', {
           templateUrl: "views/sandwiches.html",
           controller: "MenuController"
       }).
       when('/kids-menu', {
           templateUrl: "views/kids.html",
           controller: "MenuController"
       }).
       otherwise({
          redirectTo: '/home'
       })
}]);