const mongoose = require('mongoose')

const{ Schema, model} = mongoose

const ProductSchema = new Schema ({
    name : String,
    categories : [{
        categoryId : {
            type : Schema.Types.ObjectId,
            ref : "Category"
        } 
    }],
    description : String,
    price : Number,
    stock : Number,
    minStock : Number,
    images : String

})

const Product = model('Product', ProductSchema)

module.exports = Product

// name
// categoryId 
// description
// price
// unit
// stock 
// minStock 
// images

// # Order
// customerId  
// products - [ { productId, quantity, price } ]
// total
// status - [] 
// addressId 
// agentId 

// # Cart
// customerId  
// products - [
//     { productId, quantity }
// ]

// # Payment 
// userId
// orderId
// amount
// status
// paymentType
// transactionId 
