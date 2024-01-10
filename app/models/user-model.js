const mongoose = require('mongoose')

const{ Schema, model} = mongoose

const UserSchema = new Schema ({
    name : String,
    email : String,
    password : String,
    role : {
        type : String,
        enum : ['Admin', 'Deliveryboy', 'customer']
    }
})

const User = model('user', UserSchema)

module.exports = User