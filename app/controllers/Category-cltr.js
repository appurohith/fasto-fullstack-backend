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

module.exports = categoryCltr