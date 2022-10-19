
const createCheckoutSession = function (props) {
    $('#ftco-loader').addClass('show');
    let shoppingCart = JSON.parse(window.sessionStorage.getItem('shopping-cart'));
    let address = {};
    address["postal_code"] = $('input[name="zipcode"]').val().trim();
    address["city"] = $('input[name="city"]').val().trim();
    address["state"] = $('input[name="state"]').val().trim();
    address["line1"] = $('input[name="address1"]').val().trim();
    address["customer_email"] = $('input[name="email"]').val().trim();
    let add2 = $('input[name="address2"]').val().trim();;
    if(add2)
        address["line2"] = add2;

    console.log("address", address);
    let price_data = [];
    let keys = Object.keys(shoppingCart);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        let product = shoppingCart[key];
        price_data.push({
            price_data: {
                currency: 'usd',
                product_data: { name: product.name },
                unit_amount: parseFloat((product.price * 100).toFixed(2)),
            },
            quantity: product.quantity,
        })
    }

    return new Promise((resolve, reject) => {
        fetch(`https://ghn6v97v71.execute-api.us-east-1.amazonaws.com/dev/stripe/create-session`, {
            method: 'POST',
            body: JSON.stringify({price_data: price_data, address: address}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response)
                return response.json()

            })
            .then(data => {
                console.log(data)
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
    const { session, stripe_pk } = await createCheckoutSession();

    console.log("stripe pk is: ", stripe_pk)
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


(function ($) {

    function updateTotals() {
        let productTotals = $(".product-total");//.map((el,e) => el.innerText);
        let total = 0;
        for (let i = 0; i < productTotals.length; i++) {
            total += parseFloat(productTotals[i].textContent.replace("$", ""))
        }

        $(".cart-total .subtotal .amount").text(total.toFixed(2))
        $(".cart-total .total-price .amount").text(total.toFixed(2))
    }

    let shoppingCart = JSON.parse(window.sessionStorage.getItem('shopping-cart'));

    if (shoppingCart) {
        let keys = Object.keys(shoppingCart);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let product = shoppingCart[key];

            let cartProducts = $('#cart-products tbody');
            let div = `<tr class="alert" role="alert">
           
            <td>
            <div class="img" style="background-image: url(${product.image});"></div>
            </td>
            <td>
            <div class="email">
            <span>${product.name}</span>
            <span>Fugiat voluptates quasi nemo, ipsa perferendis</span>
            </div>
            </td>
            <td>$${product.price}</td>
            <td class="quantity">
            <div class="input-group">
            <input type="text" name="quantity" class="quantity form-control input-number"
            value="${product.quantity}" min="1" max="100" data-product_id="${product.id}">
            </div>
            </td>
            <td id="sub-price-${product.id}" class="product-total">$${(product.price * product.quantity).toFixed(2)}</td>
            <td>
            <button type="button" class="close" data-dismiss="alert" data-product_id="${product.id}" aria-label="Close">
            <span aria-hidden="true"><i class="fa fa-close"></i></span>
            </button>
            </td>
            </tr>`

            cartProducts.append($(div))
        }

        $(document).on('change', 'input[name="quantity"]', function (e) {
            let val = $(this).val().trim();
            let product_id = $(this).data('product_id');
            let shoppingCart = JSON.parse(window.sessionStorage.getItem('shopping-cart'))
            let product = shoppingCart[product_id];
            product.quantity = parseInt(val);

            let sub_price_el = $(`#sub-price-${product_id}`)
            let price = product.price;
            sub_price_el.text(`${price * val}`)
            window.sessionStorage.setItem('shopping-cart', JSON.stringify(shoppingCart))


            updateTotals();


        })

        $(document).on('click', 'button[class="close"]', function (e) {
            console.log(this);
            let $this = $(this);
            let product_id = $this.data('product_id');
            let shoppingCart = { ...JSON.parse(window.sessionStorage.getItem('shopping-cart')) };
            // shoppingCart = shoppingCart.filter(sc => sc.id != product_id);
            delete shoppingCart[product_id]
            window.sessionStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
        })

        updateTotals();
        let placeOrder = $('#proceed-to-checkout');
        placeOrder.click(handleCreateCheckout)
    }


    function verifyZip(e) {
        let zip = document.querySelector('#verify-zip');

    }
})(jQuery)

$(function () {
    // IMPORTANT: Fill in your client key
    var clientKey = "js-w8LzcANu8AJ1vC0HSmBSyQALfwLJffB1I02s45FDMbzrQ0iwyUvdlfcUEynnmDPP";

    var cache = {};
    var container = $("#shipping");
    var errorDiv = container.find("div.text-error");

    /** Handle successful response */
    function handleResp(data) {
        // Check for error
        console.log(data)
        if (data.error_msg){
            errorDiv.text(data.error_msg);

            document.querySelector('#shipping-form').classList.remove('d-block')
            document.querySelector('#shipping-form').classList.add('d-none')
        }
        else if ("city" in data) {
            if (data.state != 'CA') {
                errorDiv.text(`Not shipping to ${data.state} at this time.`);
                document.querySelector('#shipping-form').classList.remove('d-block')
                document.querySelector('#shipping-form').classList.add('d-none')
            } else {
                // Set city and state
                container.find("input[name='city']").val(data.city);
                container.find("input[name='state']").val(data.state);
                document.querySelector('#shipping-form').classList.remove('d-none')
                document.querySelector('#shipping-form').classList.add('d-block')
            }

        }
    }

    // Set up event handlers
    container.find("input[name='zipcode']").on("keyup change", function () {
        // Get zip code
        var zipcode = $(this).val().substring(0, 5);
        if (zipcode.length == 5 && /^[0-9]+$/.test(zipcode)) {
            // Clear error
            errorDiv.empty();

            // Check cache
            if (zipcode in cache) {
                handleResp(cache[zipcode]);
            }
            else {
                // Build url
                var url = "https://www.zipcodeapi.com/rest/" + clientKey + "/info.json/" + zipcode + "/radians";

                // Make AJAX request
                $.ajax({
                    "url": url,
                    "dataType": "json"
                }).done(function (data) {
                    handleResp(data);

                    // Store in cache
                    cache[zipcode] = data;
                }).fail(function (data) {
                    console.log(data)
                    if (data.responseText && (json = $.parseJSON(data.responseText))) {
                        // Store in cache
                        cache[zipcode] = json;

                        // Check for error
                        if (json.error_msg)
                            errorDiv.text(json.error_msg);
                    }
                    else
                        errorDiv.text('Request failed.');
                });
            }
        }
    }).trigger("change");
});