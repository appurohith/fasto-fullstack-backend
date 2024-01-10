const express = require('express')
const cors = require('cors')
const PORT = 3040
const app = express()
app.use(express.json())
const {checkSchema } = require('express-validator')

const configureDB = require('./config/db')
configureDB()

const usersCltr = require('./app/controllers/users-cltr')

const {registerSchema, loginSchema } = require('./app/validations/user-validation')


//user APIS

app.post('/api/user/register',checkSchema(registerSchema), usersCltr.register)
app.post('/api/user/login')


app.listen(PORT, () => {
    console.log('server is running on port', PORT)
})