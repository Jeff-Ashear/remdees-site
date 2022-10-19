(function ($) {

    let productListingElement = $('#product-list')
    /**
     *  maybe in the future
     *  <a href="#" class="d-flex align-items-center justify-content-center"><span
                        class="flaticon-heart"></span></a>
     */
    let shoppingCart = JSON.parse(window.sessionStorage.getItem('shopping-cart'))
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        let div = `<div class="col-md-4 d-flex">
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
                        <span class="seller">Best Seller</span>
                        <span class="category">Soap/Skincare</span>
                        <h2>${product.name}</h2>
                        <span class="price">$${product.price}</span>
                        </div>
                        </div>
                    </div>`

        productListingElement.append($(div))
    }


    $(document).on('click', '.offering.flaticon-shopping-bag', function (e) {
        e.preventDefault();
        let product_id = $(this).closest('.meta-prod').data('product_id');
        let product = {...products[product_id]};
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
})(jQuery)