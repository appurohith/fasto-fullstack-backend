const Product = require('../models/product-model')

const productValidationSchema  = {
    name  :{
       notEmpty : {
            errorMessage : 'name of category is required'
       }
    },
    custom: {
        options: async function(value){
            const user = await Product.findOne({ name: value })
            if(user) {
                throw new Error('name already taken')
            } else {
                return true 
            }
        }
    },
    description : {
        notEmpty : {
            errorMessage : 'product description is required'
        }
    },
    price : {
        notEmpty : {
            errorMessage : 'product price is required'
        },
        isNumeric : {
            errorMessage : 'product price should be in number'
        }
    },
    stock : {
        notEmpty : {
            errorMessage : 'product stock is required'
        },
        isNumeric : {
            errorMessage : 'stock should br in number'
        }
    },
    minStock : {
        notEmpty : {
            errorMessage : 'min stock is required'

        },
        isNumeric : {
            errorMessage : 'minStock is in numbers'
        }
    },
    category : {
        errorMessage : 'categoryId missing'
    }
}

const productUpdateValidationSchema = {
    name  :{
        notEmpty : {
             errorMessage : 'name of category is required'
        }
     },
     custom: {
         options: async function(value){
             const user = await Product.findOne({ name: value })
             if(user) {
                 throw new Error('name already taken')
             } else {
                 return true 
             }
         }
     },
    description : {
        notEmpty : {
            errorMessage : 'product description is required'
        }
    },
    price : {
        notEmpty : {
            errorMessage : 'product price is required'
        },
        isNumeric : {
            errorMessage : 'product price should be in number'
        }
    },
    stock : {
        notEmpty : {
            errorMessage : 'product stock is required'
        },
        isNumeric : {
            errorMessage : 'stock should be in number'
        }
    }
}

module.exports = {
    productSchema :productValidationSchema,
    productUpdateSchema :productUpdateValidationSchema
}