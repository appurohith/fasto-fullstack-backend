# User
    username
    email
    password
    role - [Owner, DeliveryAgent, Customer]

# DeliveryAgent 
    firstName
    lastName
    mobile
    status 
    userId

# Address
    customerId 
    street
    locality
    city
    state
    pincode
    geo: { lat, lng }

# Category
    name 

# Product
    name
    categoryId 
    description
    price
    unit
    stock 
    minStock 
    images
    
# Order
    customerId  
    products - [ { productId, quantity, price } ]
    total
    status - [""] 
    addressId
    

# Cart
    customerId  
    products - [
        { productId, quantity }
    ]

# Payment 
    userId
    orderId
    amount
    status
    paymentType
    transactionId 

# Review 
    userId
    title
    body
    productId