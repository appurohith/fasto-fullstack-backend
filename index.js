const express = require('express')
const cors = require('cors')
const PORT = 3040
const app = express()
app.use(express.json())

const configureDB = require('./config/db')
configureDB()




app.listen(PORT, () => {
    console.log('server is running on port', PORT)
})