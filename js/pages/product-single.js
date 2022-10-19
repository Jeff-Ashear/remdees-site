

(function($){
    'use strict';
    let productEl = $("#product-item > .container > .row")
    let productId = window.location.search.split("=")[1];
    let shoppingCart = JSON.parse(window.sessionStorage.getItem('shopping-cart'));
    let product;
    if(shoppingCart && shoppingCart[productId]){
        product = shoppingCart[productId]
    } else {
        product = products[productId];
    }
    
     let div = `<div class="col-lg-6 mb-5 ftco-animate">
     <a href="images/pexels/pexels-8.jpg" class="image-popup prod-img-bg"><img src="${product.image}" class="img-fluid" alt="Colorlib Template"></a>
 </div>
 <div class="col-lg-6 product-details pl-md-5 ftco-animate">
     <h3>${product.name}</h3>
     <div class="rating d-flex">
             <p class="text-left mr-4">
                 <a href="#" class="mr-2">5.0</a>
                 <a href="#"><span class="fa fa-star"></span></a>
                 <a href="#"><span class="fa fa-star"></span></a>
                 <a href="#"><span class="fa fa-star"></span></a>
                 <a href="#"><span class="fa fa-star"></span></a>
                 <a href="#"><span class="fa fa-star"></span></a>
             </p>
             <p class="text-left mr-4">
                 <a href="#" class="mr-2" style="color: #000;">100 <span style="color: #bbb;">Rating</span></a>
             </p>
             <p class="text-left">
                 <a href="#" class="mr-2" style="color: #000;">500 <span style="color: #bbb;">Sold</span></a>
             </p>
         </div>
     <p class="price"><span>$${product.price}</span></p>
     ${(product.description) ? product.description : `<p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
     <p>On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their.
         </p>`}
         <div class="row mt-4 justify-content-center">
             <div class="input-group col-md-8 d-flex mb-3">
      <span class="input-group-btn mr-2">
         <button type="button" class="quantity-left-minus btn"  data-type="minus" data-product_id="${product.id}">
        <i class="fa fa-minus"></i>
         </button>
         </span>
      <input type="text" id="quantity" name="quantity" class="quantity form-control input-number" value="${product.quantity}" min="1" max="100">
      <span class="input-group-btn ml-2">
         <button type="button" class="quantity-right-plus btn" data-type="plus" data-product_id=${product.id}>
          <i class="fa fa-plus"></i>
      </button>
      </span>
   </div>
   <div class="w-100"></div>
   
</div>
<p class="d-flex justify-content-center"><a href="cart.html" class="btn btn-primary py-3 px-5 w-100">View Cart</a></p>
 </div>
</div>




<div class="row mt-5">
<div class="col-md-12 nav-link-wrap">
<div class="nav nav-pills d-flex text-center" id="v-pills-tab" role="tablist" aria-orientation="vertical">
<a class="nav-link ftco-animate active mr-lg-1" id="v-pills-1-tab" data-toggle="pill" href="#v-pills-1" role="tab" aria-controls="v-pills-1" aria-selected="true">Description</a>

<a class="nav-link ftco-animate mr-lg-1" id="v-pills-2-tab" data-toggle="pill" href="#v-pills-2" role="tab" aria-controls="v-pills-2" aria-selected="false">Manufacturer</a>

<a class="nav-link ftco-animate" id="v-pills-3-tab" data-toggle="pill" href="#v-pills-3" role="tab" aria-controls="v-pills-3" aria-selected="false">Reviews</a>

</div>
</div>
<div class="col-md-12 tab-wrap">

<div class="tab-content bg-light" id="v-pills-tabContent">

<div class="tab-pane fade show active" id="v-pills-1" role="tabpanel" aria-labelledby="day-1-tab">
   <div class="p-4">
       <h3 class="mb-4">${product.name}</h3>
       <p>On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their.</p>
   </div>
</div>

<div class="tab-pane fade" id="v-pills-2" role="tabpanel" aria-labelledby="v-pills-day-2-tab">
   <div class="p-4">
       <h3 class="mb-4">Manufactured By RemDEEs Store</h3>
       <p>On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their.</p>
   </div>
</div>
<div class="tab-pane fade" id="v-pills-3" role="tabpanel" aria-labelledby="v-pills-day-3-tab">
   <div class="row p-4">
                    <div class="col-md-7">
                        <h3 class="mb-4">23 Reviews</h3>
                        <div class="review">
                            <div class="user-img" style="background-image: url(images/pexels/pexels-12.jpg)"></div>
                            <div class="desc">
                                <h4>
                                    <span class="text-left">Jacob Webb</span>
                                    <span class="text-right">25 April 2020</span>
                                </h4>
                                <p class="star">
                                    <span>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </span>
                                    <span class="text-right"><a href="#" class="reply"><i class="icon-reply"></i></a></span>
                                </p>
                                <p>When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrov</p>
                            </div>
                        </div>
                        <div class="review">
                            <div class="user-img" style="background-image: url(images/pexels/pexels-13.jpg)"></div>
                            <div class="desc">
                                <h4>
                                    <span class="text-left">Jacob Webb</span>
                                    <span class="text-right">25 April 2020</span>
                                </h4>
                                <p class="star">
                                    <span>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </span>
                                    <span class="text-right"><a href="#" class="reply"><i class="icon-reply"></i></a></span>
                                </p>
                                <p>When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrov</p>
                            </div>
                        </div>
                        <div class="review">
                            <div class="user-img" style="background-image: url(images/pexels/pexels-15.jpg)"></div>
                            <div class="desc">
                                <h4>
                                    <span class="text-left">Jacob Webb</span>
                                    <span class="text-right">25 April 2020</span>
                                </h4>
                                <p class="star">
                                    <span>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </span>
                                    <span class="text-right"><a href="#" class="reply"><i class="icon-reply"></i></a></span>
                                </p>
                                <p>When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrov</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="rating-wrap">
                            <h3 class="mb-4">Give a Review</h3>
                            <p class="star">
                                <span>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    (98%)
                                </span>
                                <span>20 Reviews</span>
                            </p>
                            <p class="star">
                                <span>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    (85%)
                                </span>
                                <span>10 Reviews</span>
                            </p>
                            <p class="star">
                                <span>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    (98%)
                                </span>
                                <span>5 Reviews</span>
                            </p>
                            <p class="star">
                                <span>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    (98%)
                                </span>
                                <span>0 Reviews</span>
                            </p>
                            <p class="star">
                                <span>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    (98%)
                                </span>
                                <span>0 Reviews</span>
                            </p>
                        </div>
                    </div>
                </div>
</div>
</div>
</div>`

$(document).on('click', "button.quantity-left-minus", function(e) {
    let product_id = $(this).data('product_id');
    let shoppingCart = JSON.parse(window.sessionStorage.getItem('shopping-cart'))
    console.log("product id ", product_id)
    if(shoppingCart) {
        if(shoppingCart[product_id]) {
            product = shoppingCart[product_id];
            product.quantity-=1; 
           if(product.quantity <= 0) {
               delete shoppingCart[product_id];
           }
        } else {
            return;
        }  
    } else {
        return;
    }
    
    
    $('input[name="quantity"').val(product.quantity);
    window.sessionStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
})


$(document).on('click', "button.quantity-right-plus", function(e) {
    let product_id = $(this).data('product_id');
    let shoppingCart = JSON.parse(window.sessionStorage.getItem('shopping-cart'))
    console.log("product id ", product_id)
    if(shoppingCart) {
        if(shoppingCart[product_id]) {
            product = shoppingCart[product_id];
            console.log("a", product)
        } else {
            shoppingCart[product_id] = {...products[product_id]};
            product = shoppingCart[product_id];
            console.log("b", product)
        }
       
    } else {
        shoppingCart = {};
        shoppingCart[product_id] = {...products[product_id]};
        product = shoppingCart[product_id];
        console.log("c", product)
    }
    
    product.quantity+=1; 
    $('input[name="quantity"').val(product.quantity);
    window.sessionStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
})
productEl.append($(div))
})(jQuery)