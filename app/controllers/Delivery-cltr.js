// const DeliveryMan = require('../models/delivery-model')
// const _ = require('lodash')
// const {validationResult} = require('express-validator')

// const deliveryCltr = {}

// deliveryCltr.register = async (req, res) => {
//     const errors = validationResult(req)
//     if(!errors.isEmpty()){
//         res.status(400).json({errors : errors.array()})
//     }
//     const body = _.pick(req.body,['name','status','mobile'])
//     try {
//         delivery.UserId = req.user.id
//         await delivery.save()
//         res.json(delivery)
//     } catch(e) {
//         res.status(500).json(e)
//     }
// }

// module.exports = deliveryCltr

const DeliveryMan = require('../models/delivery-model');
const _ = require('lodash');
const { validationResult } = require('express-validator');

const deliveryCltr = {};

deliveryCltr.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const body = _.pick(req.body, ['name', 'status', 'mobile']); // corrected ' status' to 'status'

    try {
        // Create a new instance of the DeliveryMan model
        const delivery = new DeliveryMan({
            name: body.name,
            status: body.status,
            mobile: body.mobile,
            UserId: req.user.id
        });

        // Save the new delivery instance
        await delivery.save();

        // Send the response
        return res.json(delivery);
    } catch (e) {
        console.error(e);
        return res.status(500).json(e);
    }
};

module.exports = deliveryCltr;