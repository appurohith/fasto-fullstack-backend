const mongoose = require('mongoose')

const{ Schema, model} = mongoose

const orderSchema = new Schema({
    customerId : {
        type: Schema.Types.ObjectId,
        ref : 'Customer'
        
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
    ],
    total: Number,
    status:[
        {
            type: String,
            enum : ['dispatched', 'pending','delivered']
        }
    ],
    

})

const Order = model('Order',orderSchema )

module.exports = Order