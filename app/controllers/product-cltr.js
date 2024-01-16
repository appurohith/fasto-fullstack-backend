const Product = require('../models/product-model')
const _ = require('lodash')
const {validationResult} = require('express-validator')

const productCltr = {}

productCltr.createProduct = async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }
    const body = _.pick(req.body,['name','description','price','stock','minStock','categories'])
    const categoriesArr = []
    categoriesArr.push({categoryId: body.categories})
    body.categories = categoriesArr
    try{
        const product = new Product(body)
        await product.save()
        res.json(product)

    }catch(e){
        res.status(500).json(e)
    }
}

// productCtrl.deleteProduct = async (req, res) => {
//     try {
//         // Assuming the product ID is sent in the request parameters
//         const productId = req.params.productId;

//         // Check if the product exists
//         const product = await Product.findById(productId);
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         // Delete the product
//         await Product.findByIdAndDelete(productId);

//         res.json({ message: 'Product deleted successfully' });
//     } catch (e) {
//         console.error(e);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }

// notesCltr.removeNote = async (req, res) => {
//     const id = req.params.id
//     try{
//         const note = await Note.findOneAndDelete({_id: id, userId:req.user.id},body,{new:true})
//         if(!note){
//             return res.status(404).json({errors: 'record not found'})
//         }
//         res.json(note)
//     } catch(e){
//         res.status(500).json(e)
//     }
// }
// };

productCltr.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id

        const product = await Product.findOne({productId})
        if(!product){
            return res.status(404).json({message: 'Product not found'})
        }

        await Product.findByIdAndDelete(productId)
        res.json(product)
    } catch(e){
        console.log(e)
        res.status(500).json(e)
    }
}


module.exports = productCltr