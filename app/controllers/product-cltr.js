const Product = require('../models/product-model')
const _ = require('lodash')
const {validationResult} = require('express-validator')

const productCltr = {}

productCltr.createProduct = async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }
    const body = _.pick(req.body,['name','description','price','stock','minStock','categories'])
    const categoriesArr = []
    categoriesArr.push({categoryId: body.categories})
    body.categories = categoriesArr
    try{
        const product = new Product(body)
        await product.save()
        res.json(product)

    }catch(e){
        res.status(500).json(e)
    }
}

// postCltr.listPost = async (req, res) => {
//     try {
//         const post = await Post.find()
//         // .populate('author', ['_id','username', 'email'])
//         res.status(200).json(post)
//     } catch (e){
//         res.status(500).json(e)
//     }
// }

productCltr.listProduct = async (req, res) => {
    try {
        const product = await Product.find()

        res.status(200).json(product)
    } catch(e) {
        res.status(500).json(e)
    }
}

productCltr.deleteProduct = async(req, res) => {
    const id = req.params.id

    try {
        const product = await Product.findByIdAndDelete({_id:id,Admin:req.user.id})
        res.status(200).json(product)
    
    } catch(e) {
        res.status(500).json(e)
        console.log(e)
    }
}


module.exports = productCltr