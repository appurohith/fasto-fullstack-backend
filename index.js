require('dotenv').config() 
const express = require('express')
const cors = require('cors')
const PORT = 3040
const app = express()
app.use(express.json())
const {checkSchema } = require('express-validator')


const configureDB = require('./config/db')
configureDB()

const usersCltr = require('./app/controllers/users-cltr')
const categoryCltr = require('./app/controllers/Category-cltr')

const {registerSchema, loginSchema } = require('./app/validations/user-validation')
const {authenticateUser} = require('./app/middlewares/auth')

const categoryValidationSchema = require('./app/validations/category-validation')


//user APIS
app.get('/api/user/profile',authenticateUser, usersCltr.userProfile)

app.post('/api/user/register',checkSchema(registerSchema), usersCltr.register)
app.post('/api/user/login',checkSchema(loginSchema), usersCltr.login)
app.get('/api/user/profile',authenticateUser, usersCltr.userProfile)
app.get('/api/user/profile/editprofile',authenticateUser, usersCltr.updateProfile)

//category API
app.post('/api/category',checkSchema(categoryValidationSchema), categoryCltr.createCategory)


app.listen(PORT, () => {
    console.log('server is running on port', PORT)
})