const Address = require('../models/address-model')
const _ = require('lodash') 
const {validationResult} = require('express-validator')

const AddressCltr = {}

AddressCltr.createAddress = async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }
    const body = _.pick(req.body,['street','locality','city','state','pincode'])
    try{
        const address = new Address(body)
        await address.save()
        res.json(address)
    }catch(e){
        res.status(500).json(e)
    }
}


AddressCltr.listAllAddress = async (req, res) => {
    try {
        const address = await Address.find()

        res.status(200).json(address)
    } catch(e){
        res.status(500).json(e)
    }
}

// productCltr.updateProduct = async (req, res) => {
//     const errors = validationResult(req)
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors: errors.array() })
//     }
//     const id = req.params.id
//     const body = _.pick(req.body, ['name','description','price','stock'])
//     try {
//         const product = await Product.findByIdAndUpdate(id, body, {new: true})
//         res.status(200).json(product)
//     } catch(e){
//         res.status(500).json(e)
//     }
// }

module.exports = AddressCltr