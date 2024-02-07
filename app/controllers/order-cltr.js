const Order = require('../models/order-model')
const Cart = require('../models/cart-model')
const _ = require('lodash')
const {validationResult} = require('express-validator')

const ordersCltr = {}

ordersCltr.createOrder = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const body = _.pick(req.body, ['cart','addressId','total'])
    body.customerId=req.user.id
    try{
        const order = new Order(body);
        await order.save();

        // Find the order and populate the 'cart.cartId' field
        const populatedOrder = await Order.findById(order._id).populate('cart.cartId');

        // Populate the 'products' field in each cart
        for (let cartItem of populatedOrder.cart) {
            await Cart.populate(cartItem, {
                path: 'cartId.products.productId',
                model: 'Product',
                select: 'name price image quantity' 
            });
        }

        return res.json(populatedOrder);

        //working
        // const order = new Order(body)
        // await order.save()

        // // Find the order and populate the 'cart.cartId' field
        // const populatedOrder = await Order.findById(order._id).populate('cart.cartId')

        // // Populate the 'products' field in each cart
        // for (let cartItem of populatedOrder.cart) {
        //     await Cart.populate(cartItem, {
        //         path: 'cartId.products.productId',
        //         model: 'Product',
        //         select : 
        //     });
        // }
        
        // return res.json(populatedOrder)
    } catch(e){
        console.log(e);
        return res.status(500).json(e);
    }
}


ordersCltr.listAllOrder = async (req, res) => {
    try {
        const order = await Order.find()
        res.status(200).json(order)
    } catch(e){
        res.status(500).json(e)
    }
}


ordersCltr.delete = async (req, res) => {
    const id = req.params.id

    try {
        const order = await Order.findByIdAndDelete({_id:id,customer:req.user.id})
        res.status(200).json(order)
    } catch(e) {
        res.status(500).json(e)
    }

}

module.exports = ordersCltr