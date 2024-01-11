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
const productCltr = require('./app/controllers/product-cltr')

const {registerSchema, loginSchema } = require('./app/validations/user-validation')
const {authenticateUser} = require('./app/middlewares/auth')

const categoryValidationSchema = require('./app/validations/category-validation')
const productValidationSchema = require('./app/validations/product-validation')


//user APIS


app.post('/api/user/register',checkSchema(registerSchema), usersCltr.register)
app.post('/api/user/login',checkSchema(loginSchema), usersCltr.login)
app.get('/api/user/profile',authenticateUser, usersCltr.userProfile)
app.put('/api/user/profile/editprofile',authenticateUser, usersCltr.updateProfile)

//category API
app.post('/api/category',authenticateUser,checkSchema(categoryValidationSchema), categoryCltr.createCategory)

//product Api
app.post('/api/product',checkSchema(productValidationSchema),productCltr.createProduct)


app.listen(PORT, () => {
    console.log('server is running on port', PORT)
})