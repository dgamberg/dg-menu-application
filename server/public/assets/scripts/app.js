var myApp = angular.module('myApp',  ['ngRoute']);

myApp.controller('MenuController', ['$scope', '$http', 'shoppingCart', function($scope, $http, shoppingCart){
    //Menu Display
    $scope.menu = {};
    $scope.menuArray = [];

    $scope.displayMenu = function(){
        $http.get('/data').then(function(response){
            $scope.menuArray = response.data;
        });
    };
    $scope.displayMenu();

    //Shopping Cart functions
    $scope.currentCart = shoppingCart.getShoppingCart();
    $scope.ordersTotal = shoppingCart.ordersTotal;

    $scope.updateTotal = function(){
        $scope.ordersTotal = 0;

        angular.forEach($scope.currentCart.price, function() {
            $scope.ordersTotal += currentCart.price;
        });
    }

    $scope.addToOrder = function(menuItem){
        $scope.currentCart.push(menuItem);
        $scope.updateTotal(menuItem);

    }

    $scope.removeFromOrder = function(index){
        $scope.currentCart.splice(index, 1);
        $scope.updateTotal(menuItem);

    }

}]);

//Shopping Cart Factory
myApp.factory('shoppingCart', function(){
    var currentCart = [];
    var shoppingCart = {};
    shoppingCart.ordersTotal = 0;

    shoppingCart.getShoppingCart = function(){
        return currentCart;
    }
    return shoppingCart;
});


//Routes
myApp.config(['$routeProvider', function($routeProvider){
   $routeProvider.
       when('/home', {
          templateUrl: "/views/home.html",
       }).
       when('/appetizers', {
          templateUrl: "views/menu/appetizers.html",
          controller: "MenuController"
       }).
       when('/burgers', {
           templateUrl: "views/menu/burgers.html",
           controller: "MenuController"
       }).
       when('/salads', {
           templateUrl: "views/menu/salads.html",
           controller: "MenuController"
       }).
       when('/sandwiches', {
           templateUrl: "views/menu/sandwiches.html",
           controller: "MenuController"
       }).
       when('/kids-menu', {
           templateUrl: "views/menu/kids.html",
           controller: "MenuController"
       }).
       when('/shopping-cart', {
           templateUrl: "views/shoppingCart.html",
           controller: "MenuController"
       }).
       otherwise({
          redirectTo: '/home'
       })
}]);

