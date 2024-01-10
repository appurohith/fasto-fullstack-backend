const mongoose = require('mongoose')
const {Schema,model} = mongoose

const CategorySchema = new Schema({
    name:{
        type:String,
        
    }
})

const Category = model("Category",CategorySchema)
models.exports = Category