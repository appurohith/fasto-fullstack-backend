const Cart = require('../models/cart-model')
const _ = require('lodash')
const {validationResult} = require('express-validator')

const cartCltr = {}

cartCltr.createCart = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
    }
    // const body=_.pick(req.body,{productId,quantity,price})
    // body.customerId=req.user.id
    try{
        // console.log(body)
        const cart = new Cart(body)
        await cart.save()
        res.json(cart)
    }catch(e){
        res.status(500).json(e)
    }
}

cartCltr.updateCart = async(req,res) =>{
    const productBody = req.body
    try{
        const cart =await  Cart.findOneAndUpdate({customerId : req.user.id},{$push : {products : productBody}})
        res.json("wotking")
    }catch(e){

    }
}

cartCltr.listCart = async(req, res) => {
    try{
        const {cartId} = req.params
        const cart = await Cart.find( {customerId:req.user.id} )
        res.status(200).json(cart)
        
    } catch(e){
        console.log(e)
        res.status(500).json(e)
    }
}


cartCltr.deleteCart = async (req, res) => {
    const id = req.params.id
    try {
        const cart = await Cart.findByIdAndDelete({_id:id,customer:req.user.id})
        res.status(200).json(cart)
    } catch(e) {
        res.status(500).json(e)
    }
}

module.exports = cartCltr
 