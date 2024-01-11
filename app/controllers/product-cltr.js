const Product = require('../models/product-model')
const _ = require('lodash')
const {validationResult} = require('express-validator')

const productCltr = {}

productCltr.createProduct = async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }
    const body = _.pick(req.body,['name','description','price','stock','minStock'])
    try{
        const product = new Product(body)
        await product.save()
        res.json(product)

    }catch(e){
        res.status(500).json(e)
    }
}


module.exports = productCltr