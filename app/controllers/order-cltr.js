const Order = require('../models/order-model')
const _ = require('lodash')
const {validationResult} = require('express-validator')

const ordersCltr = {}

ordersCltr.createOrder = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const body = _.pick(req.body, ['customerId','products','total','status'])
    try{
        const order = new Order({
            customerId:req.customer.id,
            products:products ,
            total:body.total,
            status:body.status,
        })
        await order.save()
        return res.json(order)
    } catch(e){
        console.log(e);
        return res.status(500).json(e);
    }
}

module.exports = ordersCltr