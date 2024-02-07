const mongoose = require('mongoose')

const{ Schema, model} = mongoose

const orderSchema = new Schema({
   customerId : {
        type: Schema.Types.ObjectId,
        ref : 'User'  
    },
    products:[
        {
                type: Schema.Types.ObjectId,
                ref: 'Product'
        },
    ],
    cart : [
        {
            cartId : {
                type : Schema.Types.ObjectId,
                ref: 'Cart'
            },
            quantity : String,
        }
    ],
    addressId : {
        type : Schema.Types.ObjectId,
        ref : 'Address'
    },
    total: Number,
    status:[
        {
            type: String,
            default : "pending",
            enum : ['pending','delivered']
        }
    ],
})

const Order = model('Order',orderSchema )

module.exports = Order