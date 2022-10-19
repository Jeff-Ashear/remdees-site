let fs = require('fs');
let products = [];
for(let i = 0; i <  19; i++) {
    products.push({
        "id": i,
        "name": `Skin Care Product - ${i}`,
        "price": parseFloat((Math.random()*30 + 7).toFixed(2)),
        "quantity": 0,
        'image': `images/pexels/pexels-${i}.jpg`        
    })
}
fs.writeFile('data/products.js', `var products = ${JSON.stringify(products, null, 2)}`, function(err) {
    if(err)
        return console.log("Err");
    console.log("done")
})

