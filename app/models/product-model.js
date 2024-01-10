const mongoose = require('mongoose')

const{ Schema, model} = mongoose

const ProductSchema = new Schema({

})

const Product = model('Product', ProductSchema)

module.exports = Product