


(function ($) {
    // use products from global scope

    'use strict';

    $(document).on('click', '.offering.flaticon-shopping-bag', function(e) {
        e.preventDefault();
        let product_id = $(this).closest('.meta-prod').data('product_id');
        let product = {...products[product_id]} ;
        let shoppingCart = window.sessionStorage.getItem('shopping-cart');
        if(shoppingCart){
            shoppingCart = JSON.parse(shoppingCart)
            if(product){
                if(shoppingCart[product.id]) {
                    shoppingCart[product.id].quantity += 1;
                } else {
                    shoppingCart[product.id] = product;
                    shoppingCart[product.id].quantity += 1;
                    $(this).parent().html(`<span><i class="fas fa-check"></i></span>`)
                }
            }
                
        } else {
            shoppingCart = {};
            if(product) {
                shoppingCart[product.id] = product;
                shoppingCart[product.id].quantity += 1;
                $(this).parent().html(`<span><i class="fas fa-check"></i></span>`)
            }  
        }
        window.sessionStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
        updateShoppingCart();
    })
    let rand_products = [...products].sort(e => Math.random() - .50)

    for (let i = 0; i < 6; i++) {
        let product = rand_products[i];
        let div = `<div class="col-lg-2 col-md-4 ">
                        <div class="sort w-100 text-center ftco-animate">
                            <div class="img" style="background-image: url(${product.image});"></div>
                            <h3>${product.name}</h3>
                        </div>
                    </div>`

        $('#highlight-products > .container > .row').append(div)
    }
    let shoppingCart = JSON.parse(window.sessionStorage.getItem('shopping-cart'));
    
    for (let i = 0; i < 12; i++) {
        let product = rand_products[i];

        let div = `<div class="col-md-3 d-flex">
                <div class="product ftco-animate">
                    <div class="img d-flex align-items-center justify-content-center"
                        style="background-image: url(${product.image});">
                        <div class="desc">
                            <p class="meta-prod d-flex" data-product_id="${product.id}">

                                <a href="#" class="d-flex align-items-center justify-content-center">
                                ${(shoppingCart && shoppingCart[product.id] && shoppingCart[product.id].quantity > 0) ? `<span><i class="fas fa-check"></i></span>`  : '<span class="offering flaticon-shopping-bag"></span>'}</a>
                                <a href="product-single.html?product=${product.id}" class="d-flex align-items-center justify-content-center"><span
                                        class="flaticon-visibility"></span></a>
                            </p>
                        </div>
                    </div>
                    <div class="text text-center">
                        <span class="sale">Sale</span>
                        <span class="category">Skin Care</span>
                        <h2>${product.name}</h2>
                        <p class="mb-0"><span class="price price-sale">${product.price}</span> <span
                                class="price">${(product.price * .8).toFixed(2)}</span></p>
                    </div>
                </div>
            </div>`


        $('#product-offerings > .container > #offerings').append(div)
    }

    


})(jQuery);