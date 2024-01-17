const mongoose = require('mongoose')

const {Schema,model} = mongoose

const deliveryManSchema = new Schema({
    UserId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    username : String,
    status: {
        type : String,
        enum : ['available', 'outForDelivery']
    },
    mobile:String,
    email:String
      
},{timestamps:true})

const DeliveryMan = model('DeliveryMan', deliveryManSchema)

module.exports = DeliveryMan