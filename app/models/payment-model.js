const { Schema, model } = require("mongoose");

const paymentSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order"
    },
    paymentDate: Date,
    amount: Number,
    paymentType: String,
    transaction_Id: String,
    status: {
        type: Boolean,   // Payment status
        default: false
    }
});

const PaymentModel = model("PaymentModel", paymentSchema);

module.exports = PaymentModel;



// # Payment 
// userId
// orderId
// amount
// status
// paymentType
// transactionId 

// paymentCltr.create = async (req,res) => {
//     const body = _.pick(req.body,['products','totalAmount','userEmail'])    
//     try {
//         const session = await stripe.checkout.sessions.create({

//             payment_method_types : ['card'],
//             mode : 'payment',
//             line_items : body.products.map(product => {
//                 return {
//                     price_data : {
//                         currency : 'inr',
//                         product_data : {
//                             name : product.title
//                         },
//                         unit_amount : product.price * 100
//                     },
//                     quantity : product.quantity
//                 }
//             }),
//             success_url: "http://localhost:3000/myCart?success=true",
//             cancel_url: "http://localhost:3000/myCart?cancel=true",
//         })
//         const payment = new Payment(body)
//         payment.user = req.user.id,
//         payment.transactionId = session.id
//         payment.userEmail = body.userEmail
//         payment.totalAmount = body.totalAmount
        
//         await payment.save()
//         //console.log('pay',payment)

//         // if(body.userEmail){
//         //     const info = await transporter.sendMail({
//         //         from: `Shrikant Shivangi ${process.env.NODE_MAILER_MAIL}`, // sender address
//         //         to: `${body.userEmail}`, // list of receivers
//         //         subject: "Order Recieved", // Subject line
//         //         text: "We have recieved your order.Thanks! for being a part of reStock.", // plain text body
//         //         html: "<b>We have recieved your order.Thanks! for being a part of reStock.</b>", // html body
//         //       });
        
//         //       //console.log("Message sent: %s", info.messageId);
//         // }
//         res.json({
//             url :session.url,
//             id : session.id
//         })
//     } catch (e) {
//         console.log('pc',e)
//     }
// }
