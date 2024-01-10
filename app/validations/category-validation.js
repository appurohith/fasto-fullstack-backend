const Category = require('../models/category-model')

const categoryValidationSchema  = {
    name  :{
       notEmpty : {
            errorMessage : 'name of category is required'
       }
    }
}

module.exports = categoryValidationSchema