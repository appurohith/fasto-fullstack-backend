const Category = require('../models/category-model')
const _ = require('lodash')
const {validationResult} = require('express-validator')

const categoryCltr = {}

categoryCltr.createCategory = async (req, res ) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
    }

    const body = _.pick(req.body,['name'])
    try {
        const category = new Category(body)
        await category.save()
        res.json(category)
    } catch(e){
        res.status(500).json(e)
    }
}


categoryCltr.listAllCategory = async (req, res) => {
    try {
        const category = await Category.find()
        res.status(200).json(category)
    } catch(e) {
        res.status(500).json(e)
    }
}

// productCltr.deleteProduct = async(req, res) => {
//     const id = req.params.id

//     try {
//         const product = await Product.findByIdAndDelete({_id:id,Admin:req.user.id})
//         res.status(200).json(product)
    
//     } catch(e) {
//         res.status(500).json(e)
//         console.log(e)
//     }
// }

categoryCltr.deleteCategory = async (req, res) => {
    const id = req.params.id
    try {
        const category = await Category.findByIdAndDelete({_id: id, Admin:req.user.id})
        res.status(200).json(category)
    } catch(e) {
        res.status(500).json(e)
    }
}


module.exports = categoryCltr