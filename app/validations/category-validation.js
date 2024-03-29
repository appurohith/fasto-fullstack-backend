const Category = require('../models/category-model')

const categoryValidationSchema  = {
    name  :{
       notEmpty : {
            errorMessage : 'name of category is required'
       }
    },
    custom: {
        options: async function(value){
            const user = await Category.findOne({ name: value })
            if(user) {
                throw new Error('category name already taken')
            } else {
                return true 
            }
        }
    }
}

module.exports = categoryValidationSchema