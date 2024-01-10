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

        const userlength = User.countDocuments()
        console.log(userlength)
        if(userlength === 0 ){
            user.role = 'Admin'
        }
        
        await user.save()
        res.status(201).json(user)
    } catch(err){
        res.status(500).json(err)
    }
}

module.exports = usersCltr
