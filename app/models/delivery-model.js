const mongoose = require('mongoose')

const {Schema,model} = mongoose

const deliveryManSchema = new Schema({
    UserId:{
        type:Schema.type.objectId,
        ref:"user"
    },
    status: {
        type : String,
        enum : ['available', 'outForDelivery']
    },
    mobile:String,
      
},{timestamps:true})

const DeliveryMan = model('deliveryMan', deliveryManSchema)

module.exports = DeliveryMan