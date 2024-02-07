require('dotenv').config() 
const express = require('express')
const cors = require('cors')
const PORT = 3040
const app = express()
const multer = require('multer')
const path = require('path')
const staticpath = path.join(__dirname, '/images')

app.use(cors())
app.use(express.json())
const {checkSchema } = require('express-validator')


const configureDB = require('./config/db')
configureDB()
app.use('/images', express.static(staticpath))

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, "images")
    },
    filename:(req,file,cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

const usersCltr = require('./app/controllers/users-cltr')
const categoryCltr = require('./app/controllers/Category-cltr')
const productCltr = require('./app/controllers/product-cltr')
const deliveryCltr = require('./app/controllers/Delivery-cltr')
const ordersCltr = require('./app/controllers/order-cltr')


const {authenticateUser, authorizeUser} = require('./app/middlewares/auth')

const {registerSchema, loginSchema , userForgotPassword} = require('./app/validations/user-validation')
const categoryValidationSchema = require('./app/validations/category-validation')
const {productSchema, productUpdateSchema}= require('./app/validations/product-validation')
const deliverymanValidationSchema = require('./app/validations/delivery-validation')
const orderValidationSchema = require('./app/validations/order-validation')
const cartValidationSchema = require('./app/validations/cart-validation')
const cartCltr = require('./app/controllers/Cart-cltr')
const addressValidationSchema = require('./app/validations/address-validation')
const addressCtlr = require('./app/controllers/address-cltr')

//user APIS
app.post('/api/user/register',checkSchema(registerSchema), usersCltr.register)
app.post('/api/user/login',checkSchema(loginSchema), usersCltr.login)
app.get('/api/user/getSingleProfile',authenticateUser, usersCltr.userProfile)
app.get('/api/user/getAllUsers',authenticateUser,authorizeUser(['Admin']), usersCltr.listAllUser)
app.put('/api/user/profile/editprofile',authenticateUser, usersCltr.updateProfile)

//Forgot password
app.post("/api/user/forgot-password",checkSchema(userForgotPassword),usersCltr.forgotPassword)
app.post("/api/reset-password/:id/:token",usersCltr.resetPassword)

//category API
app.post('/api/category',authenticateUser,authorizeUser(['Admin']),checkSchema(categoryValidationSchema), categoryCltr.createCategory)
app.get('/api/listallCategory',categoryCltr.listAllCategory)
app.delete('/api/admin/category/:id',authenticateUser, authorizeUser(['Admin']), categoryCltr.deleteCategory)
app.put('/api/admin/updateCategory/:id', authenticateUser, authorizeUser(['Admin']), categoryCltr.updateCategory)


//product Api
app.post('/api/product',upload.single('image'),authenticateUser,authorizeUser(['Admin']),checkSchema(productSchema),productCltr.createProduct )
app.get('/api/getAllProducts',productCltr.listProduct)
app.put('/api/admin/product/:id',authenticateUser, authorizeUser(['Admin']),checkSchema(productUpdateSchema), productCltr.updateProduct)
app.delete('/api/admin/products/:id',authenticateUser,authorizeUser(['Admin']), productCltr.deleteProduct)

//deliveryman api
app.post('/api/admin/deliverman/register',authenticateUser,authorizeUser(['Admin']), checkSchema(deliverymanValidationSchema), deliveryCltr.register)
app.get('/api/admin/getAllDeliveryman',authenticateUser,authorizeUser(['Admin']), deliveryCltr.listAllDeliveryman)
app.delete('/api/admin/deliveryman/:id', authenticateUser, authorizeUser(['Admin']), deliveryCltr.deleteDeliveryman)

//order api
app.post('/api/user/order',authenticateUser,checkSchema(orderValidationSchema),ordersCltr.createOrder)
app.get('/api/listAllOders',authenticateUser,authorizeUser(['Admin']), ordersCltr.listAllOrder)
app.delete('/api/user/order/:id',authenticateUser,authorizeUser(['customer']),ordersCltr.delete)

//adress
// app.post('/api/user/order/address',authenticateUser,checkSchema(addressValidationSchema),AddressCltr.createAddress)
// app.get('/api/listAllAddress',authenticateUser, authorizeUser(['Admin']), AddressCltr.listAllAddress)
// app.post('/api/address',authenticateUser,checkSchema(addressValidationSchema),addressCtlr.createAddress)
app.get('/api/getaddress',authenticateUser,authorizeUser(['Admin','customer']), addressCtlr.getAddress)
app.post('/api/address',authenticateUser,checkSchema(addressValidationSchema),addressCtlr.createAddress)
app.put('/api/updateaddress/:addressId',authenticateUser, addressCtlr.updateAddress)

//cart Api
app.post('/api/user/cart',authenticateUser,authorizeUser(['customer']),checkSchema(cartValidationSchema), cartCltr.createCart)
app.delete('/api/user/cart/:id',authenticateUser, authorizeUser(['customer']), cartCltr.deleteCart)
app.put("/api/updateCart",authenticateUser,authorizeUser(['customer']),cartCltr.updateCart)
app.get('/api/getUserCart',authenticateUser,authorizeUser(['customer']),cartCltr.listCart)
app.put('/api/user/inccart/:id',authenticateUser,authorizeUser(['customer']),cartCltr.incCart)
app.put('/api/user/deccart/:id',authenticateUser,authorizeUser(['customer']),cartCltr.decCart)

app.get('/api/user/cardid',cartCltr.cartId)


app.listen(PORT, () => {
    console.log('server is running on port', PORT)
})

// const express = require('express')
// const { checkSchema } = require('express-validator')
// const cors = require('cors')
// const multer = require('multer')
// const path = require('path')
// const PORT = 3034
// const app = express()
// app.use(express.json())
// app.use(cors())
// require('dotenv').config()

// const configureDB = require('./config/db')
// configureDB()

// const storage = multer.diskStorage({
//     destination : function (req,file,cb) {
//         return cb (null , "./public/Images")
//     },
//     filename:function(req,file,cb){
//         return cb(null, ${Date.now()}_${file.originalname})
//     }
// })

// const upload = multer ({storage})

// //upload images
// app.post('/api/upload', upload.single('file'), (req, res) =>{
//     console.log(req.body)
//     console.log(req.file)
// })

// //user
// const User = require('./app/models/user-model')
// const usersCltr = require('./app/controllers/user-cltr')

// //register and login
// const { registerSchema, loginSchema, updateUserSchema } = require('./app/validators/user-validation')
// const { authenticateUser, authorizeUser } = require('./app/middlewares/auth')

// //operators
// const { operatorSchema, operatorUpdateSchema } = require('./app/validators/operator-validation')
// const operatorsCltr = require('./app/controllers/operator-cltr')

// //packages
// const { packageSchema, packageUpdateSchema } = require('./app/validators/package-validations')
// const packagesCltr = require('./app/controllers/package-cltr')

// //channels
// const channelsCltr = require('./app/controllers/channel-cltr')
// const { channelsSchema , channelUpdateSchema} = require('./app/validators/channel-validation')

// //customers
// const customerCltr = require('./app/controllers/customer-cltr')
// const {customerSchema, customerUpdateSchema, customerPackageSchema} = require('./app/validators/customer-validation')

// //orders
// const { orderSchema } = require('./app/validators/order-validations')
// const ordersCltr = require('./app/controllers/order-cltr')



// //users Api's

// app.post('/api/users/register', checkSchema(registerSchema), usersCltr.register)
// app.post('/api/users/login', checkSchema(loginSchema), usersCltr.login)
// app.get('/api/users/profile', authenticateUser, usersCltr.profile)
// app.put('/api/users/:id', authenticateUser, checkSchema(updateUserSchema), usersCltr.updateUser)
// app.delete('/api/users/:id', authenticateUser, usersCltr.deleteUser)
// app.get('/api/listAllUsers', authenticateUser, authorizeUser(['admin']), usersCltr.listAllUsers)
// app.get('/api/listSingleUser/:id', authenticateUser, authorizeUser(['admin']), usersCltr.listSingleUser)


// //operators api
// app.post('/api/operator', authenticateUser, authorizeUser(['admin']), checkSchema(operatorSchema), operatorsCltr.create)
// app.get('/api/listAllOperators', authenticateUser, authorizeUser(['admin']), operatorsCltr.listAllOperators)
// app.get('/api/listSingleOperator/:operatorId', authenticateUser, authorizeUser(['admin']), operatorsCltr.listSingleOperator)
// app.put('/api/operator/:operatorId', authenticateUser, authorizeUser(['operator']), checkSchema(operatorUpdateSchema), operatorsCltr.updateOperator)
// app.delete('/api/operator/:operatorId', authenticateUser, authorizeUser(['admin']), operatorsCltr.deleteOperator)

// //packages api's
// app.post('/api/packages', authenticateUser, authorizeUser(['admin']), checkSchema(packageSchema), packagesCltr.create)
// app.get('/api/listAllPackages', packagesCltr.listAllPackages)
// app.get('/api/listOnePackage/:packageId', packagesCltr.listSinglePAckage)
// app.put('/api/packages/:packageId', authenticateUser, authorizeUser(['admin']), checkSchema(packageUpdateSchema), packagesCltr.updatePackage)
// app.delete('/api/packages/:packageId', authenticateUser, authorizeUser(['admin']), packagesCltr.deletePackage)

// //channels api
// app.post('/api/channels',authenticateUser,authorizeUser(['admin']),checkSchema(channelsSchema),channelsCltr.create)
// app.get('/api/listAllchannels',checkSchema(channelsSchema),channelsCltr.listAllChannels)
// app.get('/api/listOneChannel/:id',checkSchema(channelsSchema),channelsCltr.listOneChannel)
// app.put('/api/updateChannel/:id', authenticateUser, authorizeUser(['admin']),checkSchema(channelUpdateSchema),channelsCltr.updateChannel)
// app.delete('/api/deleteChannel/:id', authenticateUser, authorizeUser(['admin']),channelsCltr.deleteChannel)


// //customers api
// app.post('/api/customers',authenticateUser, authorizeUser(['operator']), checkSchema(customerSchema),customerCltr.create)
// app.get('/api/listAllCustomers',authenticateUser,authorizeUser(['operator']),customerCltr.listAllCustomers)
// app.get('/api/singleCustomer/:id',authenticateUser,authorizeUser(['operator']),customerCltr.singleCustomer)
// app.put('/api/customer/:customerId', authenticateUser, authorizeUser(['operator']), checkSchema(customerUpdateSchema), customerCltr.updateCustomer)
// app.delete('/api/customer/:id',authenticateUser,authorizeUser(['operator']),customerCltr.deleteCustomer)
// app.post('/api/customers/:customerId/packages', checkSchema(customerSchema),customerCltr.assignPackage)
// app.post('/api/customers/:customerId/channels', checkSchema(customerSchema), customerCltr.assignChannel)

// //orders api
// app.post('/api/orders', authenticateUser, authorizeUser(['operator']), checkSchema(orderSchema), ordersCltr.create)
// app.get('/api/orders', authenticateUser, authorizeUser(['admin']), ordersCltr.list)



// app.listen(PORT, ()=>{
//     console.log('server running on port', PORT)
// })