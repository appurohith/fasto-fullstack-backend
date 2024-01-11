const mongoose = require('mongoose')

const {Schema,model} = mongoose

const deliveryManSchema = new Schema({
    UserId:{
        type:Schema.type.objectId,
        ref:"user"
    },
    status:String,
    mobileNum:String,
      
},{timestamps:true})

const deliveryMan = model('deliveryMan', deliveryManSchema)

module.exports = deliveryMan