
function updateShoppingCart() {

    let shoppingCart = JSON.parse(window.sessionStorage.getItem('shopping-cart'));
    if (shoppingCart) {
        let navCart = $("#nav-cart");
        navCart.empty();
        let keys = Object.keys(shoppingCart);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let product = shoppingCart[key];
            let div = `<div class="dropdown-item d-flex align-items-start" href="#">
            <div class="img" style="background-image: url(${product.image});"></div>
            <div class="text pl-3">
            <h4>${product.name}</h4>
            <p class="mb-0"><a href="#" class="price">$${product.price}</a><span class="quantity ml-3">Quantity:
            ${product.quantity}</span></p>
            </div>
            </div>`
            navCart.append($(div));
        }
        navCart.append($(`<a class="dropdown-item text-center btn-link d-block w-100" href="cart.html">
                            View All
                            <span class="ion-ios-arrow-round-forward"></span>
                        </a>`))

        console.log(navCart.prev().find('small').text(keys.length))//.find('small').text(shoppingCart.length)
    }
}
(function ($) {
    'use strict';
    updateShoppingCart();

})(jQuery)