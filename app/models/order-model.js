const mongoose = require('mongoose')

const{ Schema, model} = mongoose

const orderSchema = new Schema({
   customerId : {
        type: Schema.Types.ObjectId,
        ref : 'User'  
    },
    cart : {
                type : Schema.Types.ObjectId,
                ref: 'Cart'
            },
    addressId : {
        type : Schema.Types.ObjectId,
        ref : 'Address'
    },
    total: Number,
    status:{
            type: String,
            default : "pending",
            enum : ['pending','delivered']
    },
    paymentStatus : {
        type : Boolean,
        default : false

    }

})

const Order = model('Order',orderSchema )

module.exports = Order