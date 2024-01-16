const mongoose = require('mongoose')
const{ Schema, model} = mongoose

const cartSchema = new Schema({
    customerId : {
        type: Schema.Types.ObjectId,
        ref : 'User'  
    },
    products:[
        {
            productsId : {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: String,
            price:String
        }
    ]
    
})

const Cart = model("Cart", cartSchema)

module.exports = Cart