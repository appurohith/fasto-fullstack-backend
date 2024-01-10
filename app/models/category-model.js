const mongoose = require('mongoose')
const {Schema,model} = mongoose

const CategorySchema = new Schema({
    name: String
})

const Category = model("Category",CategorySchema)
module.exports = Category