const Address = require('../models/address-model')
const _ = require('lodash') 
const axios = require('axios')
const {validationResult} = require('express-validator')
require('dotenv').config()

const addressCtlr = {}

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
        const  mapResponse =  await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${searchString}&apiKey=${process.env.GEO_API_KEY}`)
        if(mapResponse.data.features.length==0){
           return  res.status(400).json({errors:[{msg:"Invalid address",path:'invalid address'}]})
        }
        const location = [mapResponse.data.features[0].properties.lon,mapResponse.data.features[0].properties.lat]
        body.location = {type:'Point',coordinates:location}
        // body.user = userId
        body.customerId = customerId
        const address = new Address(body) 
        const savedAddress = await address.save() 
        return res.json(savedAddress)
    }
    catch(err){
        console.log(err)
        res.status(500).json({errors:[{msg:err.message}]})
    }
    
}

addressCtlr.getAddress = async (req,res) => { 

    try{
        const addresses = await Address.find({customerId: req.user.id}) 
        res.json(addresses)
    }
    catch(err){
        res.status(500).json({errors:[{msg:err.message}]})  
    }
}


addressCtlr.updateAddress = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { addressId } = req.params;
//   const id = req.params.id
  const customerId = req.user.id;

  const body = _.pick(req.body, ['building', 'locality', 'city', 'state', 'pincode', 'country']);
  const searchString = `${body.building}%2C%20${body.locality}%2C%20${body.city}%2C%20${body.state}%2C%20${body.pincode}%2C%20${body.country}`;

  try {
    const mapResponse = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${searchString}&apiKey=${process.env.GEO_API_KEY}`);
    if (mapResponse.data.features.length === 0) {
      return res.status(400).json({ errors: [{ msg: 'Invalid address', path: 'invalid address' }] });
    }

    const location = [mapResponse.data.features[0].properties.lon, mapResponse.data.features[0].properties.lat];
    body.location = { type: 'Point', coordinates: location };

    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ errors: [{ msg: 'Address not found', path: 'addressId' }] });
    }

    return res.json(updatedAddress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
};







module.exports = addressCtlr