require("dotenv").config()
const { validationResult } = require("express-validator");
const Order = require('../models/order-model')
const stripe = require("stripe")(process.env.STRIPE_KEY);
const _ = require("lodash");
const PaymentModel = require("../models/payment-model")
const User = require("../models/user-model")
const Cart = require('../models/cart-model')
const paymentCltr = {};

paymentCltr.paymentCheckoutSession = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  } else {
    const body = _.pick(req.body, ['amount','orderId'])
    

    try {
      const user = await User.findById(req.user.id)
    //   console.log(user.username)
    //   const order = await Order.findOne({ _id:body.orderId, customerId:req.user.id}).populate('cart.cartId')
    // //   console.log(order)
    // //   return res.json(order)
    //      // Populate the 'products' field in each cart
    //      for (let cartItem of order.cart) {
    //         await Cart.populate(cartItem, {
    //             path: 'cartId.products.productId',
    //             model: 'Product',
    //             select: 'name image' 
    //         });
            
    //     }

    //     return res.json(order)
 
   
    const order = await Order.findById(body.orderId).populate({
        path: 'cart',
        populate: {
            path: 'products.productId',
            model: 'Product',
            select: 'name price image quantity'
        }
    });

    
    // return res.json(order);
    
      
    const customer = await stripe.customers.create({
      // name: profile.userId.username,
      name:"FASTO",
      address: {
          line1: 'India',
          postal_code: '560002',
          city: 'Banglore',
          state: 'KA',
          country: 'US', 
      },
  })

  const cartitems = order.cart.products.map((ele) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: ele.productId.name,
        //   images : [`https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.in%2FFresh-Potato-1kg-Pack%2Fdp%2FB07BG5GZP2&psig=AOvVaw1a_DbkXw3cTR7R3z0eTzAi&ust=1707466559690000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCODWit-mm4QDFQAAAAAdAAAAABAE`]
        //    Images : [`https://fantasy11.s3.ap-south-1.amazonaws.com/players/Virat%20Kohli.png`]
        },
        unit_amount: ele.price * 100, // not done the converting to cents for usd
      },
      quantity: ele.quantity,
    };
  })
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: cartitems,
        customer:customer.id,

        success_url: `${process.env.FRONTEND_URL}/success`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      }); 
      // console.log(session,"in session")

        res.json({id:session.id,url:session.url})

        if(session.id){
          const paymentPending = new PaymentModel({
            customerId:req.user.id,
            orderId:body.orderId,
            paymentDate:new Date(),
            amount :body.amount,
            paymentType:session.payment_method_types[0],
            transaction_Id:session.id
        })
      await paymentPending.save()
        
      }

    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" })
    }
  }
};

paymentCltr.updatedPayment = async(req,res)=>{
    const {stripeId} = req.body
    console.log(stripeId)
    try{
      console.log("1")
      const payment = await PaymentModel.findOneAndUpdate(
        { transaction_Id: stripeId },
        { status: true },
        { new: true }
      );
          console.log(payment,"paymentInfo")
      if(payment.status === true){
        console.log("2")
        const order = await Order.findOneAndUpdate({_id:payment.orderId},{status:true,paymentStatus:true})
          console.log(order._id,"id")
        res.status(200).json("Payment Successfull", order.total,"Rs")
      }
      if(!payment) return res.status(404).json("Cannot find the Payment Info")
  
    } catch(err){
      console.log(err)
      return res.status(500).json(err)
    }
  }




paymentCltr.deletePayment  = async(req,res)=>{
  const {paymentId} = req.params
  try{
    await PaymentModel.findOneAndDelete({customerId:req.user.id,transaction_Id:paymentId})
    return res.status(200).json("Somthing went wrong on the payment")
  }catch(err){//write the status code for payments
    return res.json(EvalError)
  }
}



module.exports = paymentCltr;