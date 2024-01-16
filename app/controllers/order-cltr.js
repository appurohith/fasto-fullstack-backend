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
        await order.save()
        return res.json(order)
    } catch(e){
        console.log(e);
        return res.status(500).json(e);
    }
}

module.exports = ordersCltr