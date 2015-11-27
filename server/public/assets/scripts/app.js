var myApp = angular.module('myApp',  ['ngRoute']);

myApp.controller('MenuController', ['$scope', '$http', 'shoppingCart', function($scope, $http, shoppingCart){
    //Menu Display
    $scope.menu = {};
    $scope.menuArray = [];
    $scope.ordersTotal = 0;

    $scope.displayMenu = function(){
        $http.get('/data').then(function(response){
            $scope.menuArray = response.data;
        });
    };
    $scope.displayMenu();

    //Shopping Cart functions
    $scope.currentCart = shoppingCart.getShoppingCart();
    $scope.ordersTotal = shoppingCart.ordersTotal;


    $scope.addToOrder = function(menuItem){
        $scope.currentCart.push(menuItem);
        shoppingCart.ordersTotal = 0;
        $scope.ordersTotal = 0;
        //re-run the total
        for (var i =0; i < $scope.currentCart.length; i++){
            shoppingCart.ordersTotal += parseFloat($scope.currentCart[i].price);
            $scope.ordersTotal = shoppingCart.ordersTotal;
        }
    };

    $scope.removeFromOrder = function(index){
        $scope.currentCart.splice(index, 1);
        shoppingCart.ordersTotal = 0;
        $scope.ordersTotal = 0;
        //re-run the total
        for (var i =0; i < $scope.currentCart.length; i++){
            shoppingCart.ordersTotal += parseFloat($scope.currentCart[i].price);
            $scope.ordersTotal = shoppingCart.ordersTotal;
        }
    };
    //Pull one item by ID
    $scope.itemToEdit = {};
    $scope.getItem = function(id){
        $http.put('/data/' + id).then(function(data){
           $scope.itemToEdit = data;
            console.log($scope.itemToEdit);
        });
    };
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
          templateUrl: "/views/partials/home.html",
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
           templateUrl: "views/partials/shoppingCart.html",
           controller: "MenuController"
       }).
       when('/about', {
           templateUrl: "views/partials/about.html",
           controller: "MenuController"
       }).
       when('/contact', {
           templateUrl: "views/partials/contact.html",
           controller: "MenuController"
       }).
       when('/directions', {
           templateUrl: "views/partials/directions.html",
           controller: "MenuController"
       }).
       when('/login', {
           templateUrl: "views/customer/login.html",
           controller: "MenuController"
       }).
       when('/register', {
           templateUrl: "views/customer/register.html",
           controller: "MenuController"
       }).
       when('/admin', {
           templateUrl: "views/admin/admin-index.html",
           controller: "MenuController"
       }).
       when('/admin-menu', {
           templateUrl: "views/admin/admin-menu.html",
           controller: "MenuController"
       }).
       otherwise({
          redirectTo: '/home'
       })
}]);

//var firebase = new Firebase('https://dg-restaurant-orders.firebaseio.com/');
//firebase.push({
//    name: "Dave",
//    location: "Florida"
//});
