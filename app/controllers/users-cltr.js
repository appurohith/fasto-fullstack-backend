const User = require('../models/user-model')
const bcryptjs = require('bcryptjs')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
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
        }

        await user.save()
        res.status(201).json(user)
    } catch(err){
        res.status(500).json(err)
    }
}

usersCltr.login = async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
    } 
   
    const body = _.pick(req.body,["email","password"])
    try{
        const user = await User.findOne({email : body.email})
        if(!user){
            return res.status(404).json({errors:'invalidEmail'})
        }
        const result = await bcryptjs.compare(body.password,user.password)
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
        const user = await User.findById(req.user.id)
         res.json(user)
    } catch(e){
        res.status(500).json(e)
    }
}

usersCltr.updateProfile = async (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors });
    } else {
      const body = _.pick(req.body, ["newPassword", "changePassword"]);
  
      try {
        if (body.newPassword === body.changePassword) {
         
          const tempUser = await User.findById(req.user.id);
  
          if (!tempUser) {
            return res.status(203).json({ error: "User not found" });
          }
  
          const salt = await bcryptjs.genSalt();
          const encryptedPwd = await bcryptjs.hash(body.changePassword, salt);
  
         
          const user = await User.findOneAndUpdate(
            { _id: req.user.id, password: encryptedPwd },
            { new: true }
          );
  
          return res.status(200).json(user);
        } else {
          
          return res.status(400).json({ error: "Passwords do not match" });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
  


module.exports = usersCltr
