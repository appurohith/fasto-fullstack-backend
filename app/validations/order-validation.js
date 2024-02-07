const Order = require('../models/order-model')

const orderValidationSchema = {
    // customerId : {
    //     notEmpty : {
    //         errorMessage : 'customer ID is required'
    //     }
    // },
        // products: {
        //     isArray:{
        //         errorMessage: 'Product must be an array'
        //     },
        //     custom:{
        //         options:(value) => {
        //             return value.every(product => {
        //                 return product.productId && product.quantity && product.price
        //             })
        //         },
        //         errorMessage:  'Each product must have a productId, quantity and price'
        //     }
        // },
    addressId : {
        notEmpty : {
            errorMessage : 'address ID is required'
        }
    },
    total : {
        notEmpty :{
            errorMessage : 'Total is required'
        },
        isNumeric : {
            errorMessage : 'Total should be number'
        }
    },
    status:{
        notEmpty:{
            errorMessage: 'Status is required'
        },
        isIn:{
            options:['pending','delivered'],
            errorMessage:'Status should be either  pending or delivered'
        }
    }
}

module.exports = orderValidationSchema