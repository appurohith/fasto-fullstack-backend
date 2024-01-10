const mongoose = require('mongoose')
const {Schema,model} = mongoose
const deliveryManSchema = new Schema({
    UserId:{
        type:Schema.type.objectId,
        ref:"user"
    },
    status:String,
    mobileNum:String,
    job:[Schema.Types.objectId]

    
},{timestamps:true})
const deliveryMan = model('deliveryMan')