const mongoose = require('mongoose')

const configureDB  = async () => {
    try {
        const db = await mongoose.connect('mongodb+srv://suchithmgadde45:suchith45@fasto1.uhqpluz.mongodb.net/?retryWrites=true&w=majority')
        console.log("successfully connected to db")
    }
    catch(e){
        console.log(e)
    }
}

module.exports = configureDB

