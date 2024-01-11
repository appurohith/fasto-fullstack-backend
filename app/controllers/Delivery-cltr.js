const DeliveryMan = require('../models/delivery-model')
const _ = require('lodash')
const {validationResult} = require('express-validator')

const deliveryCltr = {}

deliveryCltr.register = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors : errors.array()})
    }
    const body = _.pick(req.body,[' status','mobile'])
    try {
        delivery.UserId = req.users.id
        await delivery.save()
        res.json(delivery)
    } catch(e) {
        res.status(500).json(e)
    }
}

module.exports = deliveryCltr