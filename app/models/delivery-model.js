const mongoose = require('mongoose')

const {Schema,model} = mongoose

const deliveryManSchema = new Schema({
    UserId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    name : String,
    status: {
        type : String,
        enum : ['available', 'outForDelivery']
    },
    mobile:String,
      
},{timestamps:true})

const DeliveryMan = model('DeliveryMan', deliveryManSchema)

module.exports = DeliveryMan