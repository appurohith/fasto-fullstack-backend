const Address = require('../models/address-model')

const addressValidationSchema = {
    building:{
        notEmpty:{
            errorMessage:"Building cannot be empty."
        },
        isLength:{
            options:{
                min:2,
            },
            errorMessage:"Atleast 2 characters required."
        }
    },
    locality:{
        notEmpty:{
            errorMessage:"locality cannot be empty."
        },
        isLength:{
            options:{min:2},
            errorMessage:"Atleast 2 characters required."
        }
    },
    city:{
        notEmpty:{
            errorMessage:"city cannot be empty."
        },
        isLength:{
            options:{min:2},
            errorMessage:"Atleast 2 characters required."
        }
    },
    state:{
        notEmpty:{
            errorMessage:"state cannot be empty."
        },
        isLength:{
            options:{min:2},
            errorMessage:"Atleast 2 characters required."
        }
    },
    pincode:{
        notEmpty:{
            errorMessage:"pincode cannot be empty."
        },
        isLength:{
            options:{min:2},
            errorMessage:"Atleast 2 characters required."
        }
    },
    country:{
        notEmpty:{
            errorMessage:"country cannot be empty."
        },
        isLength:{
            options:{min:2},
            errorMessage:"Atleast 2 characters required."
        }
    }
}


module.exports = addressValidationSchema


