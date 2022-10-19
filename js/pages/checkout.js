const createCheckoutSession = function(props) {
    $('#ftco-loader').addClass('show');
    // loader
	// var loader = function() {
	// 	setTimeout(function() { 
	// 		if($('#ftco-loader').length > 0) {
	// 			$('#ftco-loader').removeClass('show');
	// 		}
	// 	}, 1);
	// };
	// loader();
    return new Promise ((resolve, reject) => {
        fetch(`https://ghn6v97v71.execute-api.us-east-1.amazonaws.com/dev/stripe/create-session`, {
            method: 'POST',
            body: JSON.stringify({unit_amount: 12, product_data:{name: 'Soap'}}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log(response)
            return response.json()
            
        })
        .then(data => {
            resolve(data);
        })
        .catch(err => {
            console.log(err);
            reject(err);
        })
    })
}

const handleCreateCheckout = async (event) => {
    // Call your {}backend to create the Checkout Session—see previous step
    const { session,  stripe_pk} = await createCheckoutSession();
    // When the customer clicks on the button, redirect them to Checkout.

    const stripePromise = Stripe(stripe_pk);
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
};

(function($){
    'use strict';
    function updateTotals() {
        let shoppingCart = JSON.parse(window.sessionStorage.getItem('shopping-cart'));
        let total = 0;
        for (let i = 0; i < shoppingCart.length; i++) {
            let product = shoppingCart[i];
            total+=product.price*product.quantity;
        }
        
        $(".cart-total .subtotal .amount").text(total.toFixed(2))
        $(".cart-total .total-price .amount").text(total.toFixed(2))
    }

    let placeOrder = $('#place-order');
    placeOrder.click(handleCreateCheckout)
    updateTotals(); 
})(jQuery)