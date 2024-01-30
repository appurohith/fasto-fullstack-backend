const Address = require('../models/address-model')
const _ = require('lodash') 
const axios = require('axios')
const {validationResult} = require('express-validator')

const addressCtlr = {}

// AddressCltr.createAddress = async(req,res) => {
//     const errors = validationResult(req)
//     if(!errors.isEmpty()){
//         res.status(400).json({errors:errors.array()})
//     }
//     const body = _.pick(req.body,['street','locality','city','state','pincode'])
//     try{
//         const address = new Address(body)
//         await address.save()
//         res.json(address)
//     }catch(e){
//         res.status(500).json(e)
//     }
// }

addressCtlr.createAddress = async (req,res) =>{ 
    const errors = validationResult(req) 
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    // const userId = req.user.id 
    const customerId = req.user.id
    const body = _.pick(req.body,['building','locality','city','state','pincode','country'])
    const searchString = `${body.building}%2C%20${body.locality}%2C%20${body.city}%2C%20${body.state}%2C%20${body.pincode}%2C%20${body.country}`
    try{
        const  mapResponse =  await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${searchString}&apiKey=${process.env.GEOAPIFYKEY}`)
        if(mapResponse.data.features.length==0){
           return  res.status(400).json({errors:[{msg:"Invalid address",path:'invalid address'}]})
        }
        const location = [mapResponse.data.features[0].properties.lon,mapResponse.data.features[0].properties.lat]
        body.location = {type:'Point',coordinates:location}
        // body.user = userId
        body.user = customerId
        const address = new Address(body) 
        const savedAddress = await address.save() 
        res.json(savedAddress)
    }
    catch(err){
        res.status(500).json({errors:[{msg:err.message}]})
    }
    
}


addressCtlr.listAllAddress = async (req, res) => {
    try {
        const address = await Address.find()

        res.status(200).json(address)
    } catch(e){
        res.status(500).json(e)
    }
}



module.exports = addressCtlr