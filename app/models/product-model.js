const mongoose = require('mongoose')

const{ Schema, model} = mongoose

const ProductSchema = new Schema ({

})

const Product = model('product', ProductSchema)

module.exports = Product