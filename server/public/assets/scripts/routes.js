var myApp = angular.module("myApp", ['ngRoute']);

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