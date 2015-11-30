
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