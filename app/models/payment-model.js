const mongoose = require('mongoose')

const{ Schema, model} = mongoose

const paymentSchema = new Schema({
    customerId : {
        type:Schema.Types.ObjectId,
        ref : 'User'
    },
    amount : Number,
    date : String,
    status : {
        type : String,
        default : "pending",
        enum : ["pending","successful"]
    },
    paymentType : String,
    transaction_Id : String
})


const Payment = model("Payment",paymentSchema)

module.exports = Payment
// # Payment 
// userId
// orderId
// amount
// status
// paymentType
// transactionId 