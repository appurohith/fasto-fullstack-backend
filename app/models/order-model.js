const mongoose = require('mongoose')

const{ Schema, model} = mongoose

const orderSchema = new Schema({
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
        }
    ],
    Cart : [
        {
            cartId : {
                type : Schema.Types.ObjectId,
                ref: 'Cart'
            },
            quantity : String,
            price : String
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
            enum : ['pending','delivered']
        }
    ],
    

})

const Order = model('Order',orderSchema )

module.exports = Order