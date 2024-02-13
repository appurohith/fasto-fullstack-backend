const Order = require('../models/order-model')
const Cart = require('../models/cart-model')
const Address = require('../models/address-model')
const _ = require('lodash')
const {validationResult} = require('express-validator')

const ordersCltr = {}

ordersCltr.createOrder = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const body = _.pick(req.body, ["total"])
    // console.log()
    body.customerId = req.user.id
    try{
        const cart = await Cart.findOne({customerId: body.customerId})
        const address = await Address.findOne({customerId : body.customerId})
        body.addressId = address._id
        body.cart = cart._id
        // console.log(body, "body")

        const order = new Order(body);
        await order.save();
        const populatedOrder = await Order.findById(order._id).populate({
            path: 'cart',
            populate: {
                path: 'products.productId',
                model: 'Product',
                select: 'name price image quantity'
            }
        });

        return res.json(populatedOrder);
    } catch(e){
        console.log(e);
        return res.status(500).json(e);
    }
}

ordersCltr.listSingleOrder = async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    customerId = req.user.id
    try{
        const orders = await Order.find({customerId  })
        res.status(200).json({orders})
    }catch(e){
        console.log(e)
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