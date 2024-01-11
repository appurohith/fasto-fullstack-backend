const Product = require('../models/product-model')

const productValidationSchema  = {
    name  :{
       notEmpty : {
            errorMessage : 'name of category is required'
       }
    },
    custom: {
        options: async function(value){
            const user = await product.findOne({ name: value })
            if(user) {
                throw new Error('name already taken')
            } else {
                return true 
            }
        }
    }
}

module.exports = productValidationSchema