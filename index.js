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
const deliveryCltr = require('./app/controllers/Delivery-cltr')
const ordersCltr = require('./app/controllers/order-cltr')



const {authenticateUser, authorizeUser} = require('./app/middlewares/auth')

const {registerSchema, loginSchema } = require('./app/validations/user-validation')
const categoryValidationSchema = require('./app/validations/category-validation')
const productValidationSchema = require('./app/validations/product-validation')
const deliverymanValidationSchema = require('./app/validations/delivery-validation')
const orderValidationSchema = require('./app/validations/order-validation')
const cartValidationSchema = require('./app/validations/cart-validation')
const cartCltr = require('./app/controllers/Cart-cltr')
const {addressValidationSchema} = require('./app/validations/address-validation')
const AddressCltr = require('./app/controllers/address-cltr')

//user APIS


app.post('/api/user/register',checkSchema(registerSchema), usersCltr.register)
app.post('/api/user/login',checkSchema(loginSchema), usersCltr.login)
app.get('/api/user/profile',authenticateUser, usersCltr.userProfile)
app.put('/api/user/profile/editprofile',authenticateUser, usersCltr.updateProfile)

//category API
app.post('/api/category',authenticateUser,authorizeUser(['Admin']),checkSchema(categoryValidationSchema), categoryCltr.createCategory)

//product Api
app.post('/api/product',authenticateUser,authorizeUser(['Admin']),checkSchema(productValidationSchema),productCltr.createProduct )
// app.delete('/api/admin/products/:id',authenticateUser, checkSchema(productValidationSchema), productCltr.deleteProduct)



//deliveryman api
app.post('/api/admin/deliverman/register',authenticateUser,authorizeUser(['Admin']), checkSchema(deliverymanValidationSchema), deliveryCltr.register)

//order api
app.post('/api/user/order',authenticateUser,checkSchema(orderValidationSchema),ordersCltr.createOrder)

//adress
app.post('/api/user/order/address',authenticateUser,checkSchema(addressValidationSchema),AddressCltr.createAddress)

//cart Api
app.post('/api/user/cart',authenticateUser,authorizeUser(['customer']),checkSchema(cartValidationSchema), cartCltr.createCart)

app.listen(PORT, () => {
    console.log('server is running on port', PORT)
})