const { valodationResult, validationResult } = require('express-validator')
const Payment = require('../models/payment-model')
const_ = require('lodash')

const paymentsCltr = {}

paymentsCltr.create = async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    } 
    const body = _.pick(req.body,['amount','orderId'])
    

}