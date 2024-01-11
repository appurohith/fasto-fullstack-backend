const DeliveryMan = require('../models/delivery-model')
const _ = require('lodash')
const {validationResult} = require('express-validator')

const deliveryCltr = {}

deliveryCltr.register = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors : errors.array()})
    }
    const body = _.pick(req.body, ['name',' status','mobile'])
    try {
        // delivery.UserId = req.users.id
        const delivery = new DeliveryMan(body)
        delivery.userId = req.users.id
        await delivery.save()
        res.json(delivery)
    } catch(e) {
        res.status(500).json(e)
    }
}

module.exports = deliveryCltr

// const deliveryCltr = {};

// deliveryCltr.register = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         res.status(400).json({ errors: errors.array() });
//         return;  // Add this line to stop execution if there are validation errors
//     }

//     const body = _.pick(req.body, ['name', 'status', 'mobile']);  // Corrected ' status' to 'status'

//     try {
//         const delivery = new DeliveryMan(body);  // Create a new instance of DeliveryMan with the provided body
//         delivery.UserId = req.users.id;
        
//         await delivery.save();
//         res.json(delivery);
//     } catch (e) {
//         console.error(e);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// module.exports = deliveryCltr;