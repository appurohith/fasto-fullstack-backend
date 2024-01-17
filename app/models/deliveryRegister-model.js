const mongoose = require('mongoose')

const {Schema,model} = mongoose

const DeliveryRegisterSchema = new Schema({
    name : String,
    email : String,
    password:String,
    role : {
        type : String,
        enum : ['DeliveryMan']
    }    
})

const DeliveryModel = model('delivery',DeliveryRegisterSchema)

module.exports = DeliveryModel