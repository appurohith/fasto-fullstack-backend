const mongoose = require('mongoose')

const {Schema, model } = mongoose

const addressSchema = new Schema ({
    customerId : {
        type: Schema.Types.ObjectId,
        ref: "customer"
    },
    street : String,
    locality: String,
    city : String,
    state : String,
    pincode : Number,
    geo: {
        lat: Number,
        lng: Number
    }
})

const Address = model('Address',addressSchema)

module.exports = Address