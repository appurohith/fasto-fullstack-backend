const mongoose = require('mongoose')

const configureDB  = async () => {
    try {
        const db = await mongoose.connect('mongodb://127.0.0.1:27017/fasto-app')
        console.log("successfully connected to db")
    }
    catch(e){
        console.log(e)
    }
}

module.exports = configureDB

