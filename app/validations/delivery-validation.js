const DeliveryMan = require('../models/delivery-model')
const User = require('../models/user-model')
// const passwordSchema = {
//     notEmpty: {
//         errorMessage: 'password is required'
//     },
//     isLength: {
//         options: { min: 8, max: 128 },
//         errorMessage: 'password should be between 8 - 128 characters'
//     }
// }
const deliverymanValidationSchema = {
    username: {
        notEmpty: {
            errorMessage: 'username is required'
        }
    },
    email: {
        notEmpty: {
            errorMessage: 'email is required'
        },
        isEmail: {
            errorMessage: 'email should be in a valid format'
        },
        custom: {
            options: async function(value){
                const user = await User.findOne({ email: value })
                if(user) {
                    throw new Error('email already taken')
                } else {
                    console.log("hhh");
                    return true 
                }
            }
        }
    },
    password: {
        notEmpty: {
            errorMessage: 'password is required'
        },
        isLength: {
            options: { min: 8, max: 128 },
            errorMessage: 'password should be between 8 - 128 characters'
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
    // status : {
    //     notEmpty : {
    //         errorMessage : 'status is required'
    //     },
    //     isIn : {
    //         options : ['available', 'outForDelivery'],
    //         errorMessage : 'status should be either available or outForDelivery '
    //     }
    // },
    // UserId:{
    //     notEmpty:{
    //         errorMessage:'userid is required'
    //     }
    // }
  
}

module.exports = deliverymanValidationSchema
