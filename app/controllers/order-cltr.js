const Order = require('../models/order-model')
const _ = require('lodash')
const {validationResult} = require('express-validator')

const ordersCltr = {}

ordersCltr.createOrder = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const body = _.pick(req.body, ['products','addressId','total','status'])
    body.customerId=req.user.id
    try{
        const order = new Order(body)
        const cart = await Cart.findOne({customerId : req.user.id})
        await order.save()
        return res.json(order)
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