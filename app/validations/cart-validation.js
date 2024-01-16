const Cart = require('../models/cart-model')

const cartValidationSchema = {
    products: {
        isArray:{
            errorMessage: 'Product must be an array'
        },
        custom:{
            options:(value) => {
                return value.every(product => {
                    return product.productId && product.quantity && product.price
                })
            },
            errorMessage:  'Each product must have a productId, quantity and price'
        }
    }
}

module.exports = cartValidationSchema