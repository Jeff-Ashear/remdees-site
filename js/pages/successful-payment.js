(function($){
    let cs_id = window.location.search.split("=")[1];
    fetch(`https://ghn6v97v71.execute-api.us-east-1.amazonaws.com/dev/stripe/get-receipt-url?cs_id=${cs_id}`)
    .then(response => response.json())
    .then(data => {
        $(".receipt-link a").attr('href', data.receipt_url).text("VIEW RECEIPT")
        window.sessionStorage.removeItem('shopping-cart')
    })
    .catch(err => console.log("err", err))

})(jQuery)