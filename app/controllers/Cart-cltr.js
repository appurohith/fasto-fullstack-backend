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


cartCltr.incCart = async(req,res) => {
    const productId = req.params.id;
    // console.log(req.params.id)
    try{
        const inccart = await Cart.findOneAndUpdate(
            {customerId : req.user.id,
             'products.productId': productId },
            { $inc: { 'products.$.quantity': 1 } },
            { new: true }
        );
        const product = inccart.products.find(ele => ele.productId === productId)
        res.json(product);
        // console.log(inccart)
    } catch(e){
        console.log(e);
    }
}
cartCltr.decCart = async(req,res) => {
    const productId = req.params.id;
    // console.log(req.params.id)
    try{
        const deccart = await Cart.findOneAndUpdate(
            {customerId : req.user.id,
              'products.productId': productId },
            { $inc: { 'products.$.quantity': -1 } },
            { new: true }
        );
        const product = deccart.products.find(ele => ele.productId === productId)
        // console.log()
        res.json(product);
    } catch(e){
        console.log(e);
    }
}

cartCltr.updateCart = async(req,res) =>{
    const productBody = req.body
    try{
        const cart = await Cart.findOneAndUpdate({customerId : req.user.id},{$push : {products : productBody}}, {new: true})
        res.json(cart)
    }catch(e){
        console.log(e)
    }
}

cartCltr.idCart= async(req, res) => {
    try{
        const cart = await Cart.findOne({customerId : req.user.id})
        res.json(cart._id)
    } catch(e){
        console.log(e)
    }
}

cartCltr.listCart = async(req, res) => {
    try{
        const cart = await Cart.find( {customerId:req.user.id} )
        // console.log(cart)
        res.status(200).json(cart)
    } catch(e){
        console.log(e)
        res.status(500).json(e)
    }
}
cartCltr.deleteCart = async (req, res) => {
    const productId = req.params.id;
    try {
        const deletecart = await Cart.findOneAndUpdate(
            { customerId: req.user.id },
            { $pull: { products: { productId: productId } } },
            { new: true }
        );
        res.json(deletecart);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal server error' });
    }
}
// cartCltr.deleteAllProducts = async (req, res) => {
//     try {
//         // Find the cart document for the current user and update the products array to an empty array
//         const updatedCart = await Cart.findOneAndUpdate(
//             { customerId: req.user.id },
//             { $set: { products: [] } },
//             { new: true }
//         );

//         res.json(updatedCart);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

cartCltr.emptyCart = async (req, res) => {
    try {
        const updatedCart = await Cart.findOneAndUpdate(
            { customerId: req.user.id },
            { $set: { products: [] } },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.json(updatedCart);
    } catch (error) {
        console.error('Error deleting all products from cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = cartCltr
