const User = require('../models/user-model')
const bcryptjs = require('bcryptjs')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const Cart = require("../models/cart-model")
const { validationResult } = require('express-validator')

const usersCltr = {}

usersCltr.register = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const body = _.pick(req.body, ['username', 'email', 'password','role']) 
    const user = new User(body) 
    try {
        const salt =await bcryptjs.genSalt()
        const hashedPassword = await bcryptjs.hash(user.password, salt)
        user.password = hashedPassword
      
        const userlength =  await User.countDocuments()
        // console.log(userlength)
        if(userlength === 0 ){
            user.role = 'Admin'
           
        }else
        if(userlength > 0 && user.role === 'Admin'){
            user.role = 'customer'
        }else
        if(user.role ==='DeliveryMan'){
          user.role = 'customer'
        }
        
        await user.save()
        const cart = new Cart({customerId : user._id})
        await cart.save()
        res.status(201).json(user)
    } catch(err){
        res.status(500).json(err)
        console.log(err)
    }
}

// usersCltr.login = async (req, res) =>{
//   const errors = validationResult(req)
//   if(!errors.isEmpty()){
//       return res.status(400).json({errors: errors.array()})
//   }
//   const body = _.pick(req.body, ['mobile', 'password'])
//   // body.image = req.file.filename
//   try{
//       const user = await User.findOne({mobile: body.mobile})
//       if(!user){
//           return res.status(404).json({errors: 'invalid mobile/password'})
//       }
//       const result = await bcryptjs.compare(body.password, user.password)
//       if(!result){
//           return res.status(404).json({errors:"invalid mobile/password"})
//       }
      
//       const operator = await OperatorProfile.findOne({userId: user._id})
//       if(operator){
//           const tokenData = {
//               id: user._id,
//               role: user.role,
//               operator: operator._id     
//           }
//           console.log(tokenData)
//           const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: '14d'})
//           res.json({token : token})
//       }else{
//           const tokenData = {
//               id: user._id,
//               role: user.role     
//           }
//           console.log(tokenData)
//           const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: '14d'})
//           res.json({token: token})
//       }
//   }catch(e){
//       res.status(500).json(e)
//   }
// }



usersCltr.login = async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
    } 
   
    const body = _.pick(req.body,["email","password"])
    try{
        const user = await User.findOne({email : body.email})
        // console.log(user);
        if(!user){
            return res.status(404).json({errors:'invalidEmail'})
        }
        const result = await bcryptjs.compare(body.password,user.password)
        // console.log(result,body.password,user.password);
        if(!result){
            return res.status(404).json({errors:'invalid password'})
        }
  
        const tokenData ={id:user._id, role: user.role}
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '14d' });
        res.json({token:token})
  
    } catch(e){
      console.log(e)
        res.json(e)
    }
  
}

usersCltr.userProfile = async (req, res) => {
    try {
      console.log
        const user = await User.findById(req.user.id)
         res.json(user)
    } catch(e){
        res.status(500).json(e)
    }
}

usersCltr.listAllUser = async (req, res) => {
  try {
    const user = await User.find()
    res.status(200).json(user)
  } catch(e){
    res.status(500).json(e)
  }
}

usersCltr.updateProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    } 
      const user = _.pick(req.body, ["currentPassword","newPassword", "confirmPassword"])
      const { currentPassword, newPassword, confirmPassword } = user
      console.log(req.user.id)
      const currentuser = await User.findById(req.user.id)
      console.log(currentPassword)
      console.log(currentuser.password)
      
     try{
      if(!currentuser){
        return res.status(400).json({error:"User not found"})
      }
      const match = await bcryptjs.compare(currentPassword,currentuser.password)
      console.log(match)
      if(!match){
        return res.status(400).json({error:"Current password is incorrect"})
      }
      if(newPassword !== confirmPassword){
        return res.status(400).json({error:"New passwords do not match"})
      }
      const salt = await bcryptjs.genSalt()
      const hashedPassword = await bcryptjs.hash(newPassword,salt)
      const updateUser = await User.findByIdAndUpdate(
        req.user.id,
        {password:hashedPassword},
        {new:true}
      )
      return res.status(200).json(updateUser)
     }catch(error){
      console.log(error)
      return res.status(500).json({error: "Internal Server Error"})
     }
  };
  


module.exports = usersCltr
