const DeliveryMan = require('../models/delivery-model')

const deliverymanValidationSchema = {
    name: {
        notEmpty:{
            errorMessage: 'name is required'
        },
        custom: {
            options: async function(value){
                const user = await DeliveryMan.findOne({ name: value })
                if(user) {
                    throw new Error('name already taken')
                } else {
                    return true 
                }
            }
        }
    },
        mobile: {
        notEmpty: {
            errorMessage: 'mobile is required'
        },
        isLength: {
            options: { min: 10, max: 10},
            errorMessage: 'mobile should be 10 digits'
        },
        isNumeric: {
            errorMessage: 'mobile should be a number'
        }
    },
    status : {
        notEmpty : {
            errorMessage : 'status is required'
        },
        isIn : {
            options : ['available', 'outForDelivery'],
            errorMessage : 'status should be either available or outForDelivery '
        }
    }

}

module.exports = deliverymanValidationSchema
