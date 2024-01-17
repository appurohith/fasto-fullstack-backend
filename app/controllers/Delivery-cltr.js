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
const User = require('../models/user-model')
const bcryptjs = require('bcryptjs')
const _ = require('lodash');
const { validationResult } = require('express-validator');

const deliveryCltr = {};

deliveryCltr.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const body = _.pick(req.body, [ 'username','email','password', 'mobile',]); 

    try {
      
        const user = new User({
            name:body.name,
            email:body.email,
            password:body.password,
            role:"DeliveryMan"
        })
        const salt =await bcryptjs.genSalt()
        const hashedPassword = await bcryptjs.hash(user.password, salt)
        user.password = hashedPassword
        await user.save()
        // Create a new instance of the DeliveryMan model
        const delivery = new DeliveryMan({
            status: "available",
            mobile: body.mobile,
            UserId: user.id
        });

        // Save the new delivery instance
        await delivery.save();
        await delivery.populate("UserId")
        // Send the response
        return res.json(delivery);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

module.exports = deliveryCltr;