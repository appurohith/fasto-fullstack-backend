const addressValidationSchema = {
    street: {
        notEmpty:{
            errorMessage:'street name is required'
        }
    },
    locality:{
        notEmpty:{
            errorMessage:'locality is required'
        }
    },
    city:{
        notEmpty:{
            errorMessage:'city name is required'
        }
    },
     state:{
        notEmpty:{
            errorMessage: 'state name is required'
        }
    },
    
}

module.exports = {
 addressValidationSchema
}
