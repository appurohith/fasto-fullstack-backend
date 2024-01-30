const mongoose = require('mongoose')
const{ Schema, model} = mongoose

const cartSchema = new Schema({
    // customerId : {
    //     type: Schema.Types.ObjectId,
    //     ref : 'User'  ,
    //         productsId : {
    //             type: Schema.Types.ObjectId,
    //             ref: 'Product'
    //         },
    //         productsId : String,
    //         quantity: String,
    //         price:String
    //     }  
    customerId : {
        type: Schema.Types.ObjectId,
        ref : 'User'
    },
    products : []
})
const Cart = model("Cart", cartSchema)
module.exports = Cart