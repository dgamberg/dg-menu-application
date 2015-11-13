var myApp = angular.module('myApp', ['ngRoute']);

myApp.controller('MenuDisplayController', ['$scope', '$http', function($scope, $http){
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

   ////DELETE MESSAGE
   //$scope.deleteMessage = function(message){
   //   console.log(message.id);
   //   $http.put('/data/' + message.id).then(function(){
   //      $scope.getMessages();
   //   });
   //};

   //POST
   //$scope.addMenu = function(response){
   //   $http.post('/data', response).then(function(response){
   //      console.log(response);
   //      $scope.menu = {};
   //      $scope.displayMenu();
   //   });
   //};

}]);

//myApp.controller('AppetizerDisplayController', ['$scope', '$http', function($scope, $http){
//      $scope.appetizers = [];
//
//}]);

myApp.config(['$routeProvider', function($routeProvider){
   $routeProvider.
       when('/home', {
          templateUrl: "/assets/views/routes/index.html",
          controller: "MenuDisplayController"

       }).
      //when('/code', {
      //    templateUrl: "/assets/views/routes/code.html",
      //    controller: "SomeController"
      //}).
       when('/appetizers', {
          templateUrl: "/assets/views/appetizers.html",
          controller: "MenuDisplayController"
       }).
       otherwise({
          redirectTo: 'home'
       })
}]);