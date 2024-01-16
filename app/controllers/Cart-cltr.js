const Cart = require('../models/cart-model')
const _ = require('lodash')
const {validationResult} = require('express-validator')

const cartCltr = {}

cartCltr.createCart = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
    }
    const body=_.pick(req.body,["products"])
    body.customerId=req.user.id
    try{
        // console.log(body)
        const cart = new Cart(body)

        await cart.save()
        res.json(cart)
    }catch(e){
        res.status(500).json(e)
    }
}

module.exports = cartCltr
 