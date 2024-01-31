const mongoose = require('mongoose')

const {Schema, model } = mongoose

const addressSchema = new Schema ({
    building:{
        type:String,
        required:true
     },
     locality:{
         type:String,
         required:true
      },
     city:{
         type:String,
         required:true
      },
     state:{
         type:String,
         required:true
      },
     pincode:{
         type:String,
         required:true
     },
     country:{
         type:String,
         required:true
     },
     location:{
         type:{
             type:String,
             required:true,
             enum:['Point']
         },
         coordinates: {      
             required:true,
             type:[Number]       //geospatial data
         }
     },
     customerId : {
        type: Schema.Types.ObjectId,
        ref : 'User'
    }
})

const Address = model('Address',addressSchema)

module.exports = Address