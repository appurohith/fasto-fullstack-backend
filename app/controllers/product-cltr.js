const Product = require('../models/product-model')
const _ = require('lodash')
const {validationResult} = require('express-validator')

const productCltr = {}

productCltr.createProduct = async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }
    // console.log(req.body)
    const body = _.pick(req.body,['name','description','price','stock','minStock','category',"image"])
    // console.log(req.file)
    body.image = req.file.filename
    
    // const categoriesArr = []
    // categoriesArr.push({categoryId: body.categories})
    // body.categories = categoriesArr
    try{
        const product = new Product(body)
        await product.save()
        res.json(product)

    }catch(e){
        // console.log(e)
        res.status(500).json(e)  
        
    }
}

productCltr.AllProducts = async (req, res) => {
    try {
        const product = await Product.find()

        res.status(200).json(product)
    } catch(e) {
        res.status(500).json(e)
    }
}
 
productCltr.listProduct = async (req, res) => {
    try {
        // Extract search query, default to empty string if not provided
        const search = req.query.search ? String(req.query.search) : "";
        console.log(search,"search")
        const { sortBy = 'name', order = -1 } = req.query
        // Extract sortBy and order, defaulting to 'title' and -1 (desc)
    const sortOrder = order === 'asc' ? 1 : -1;
        // Construct search query using regex for case-insensitive search
        const searchQuery = { name: { $regex: search, $options: "i" } };
        
        // Construct sort query based on sortBy and order
        const sortQuery = {};
        sortQuery[sortBy] = sortOrder;
        console.log(sortQuery,"sortquery")
        // Extract page and limit from request query, default to 1 and 3 respectively
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 8;
        
        // Log page and limit for debugging
        console.log(page, limit,order);

        // Query products based on search, sort, pagination, and limit
        const products = await Product.find(searchQuery)
                                      .sort(sortQuery)
                                      .skip((page - 1) * limit)
                                      .limit(limit);
        // const products = await Product.find()
        // Count total documents matching the search query
        const total = await Product.countDocuments(searchQuery);

        // Return response with paginated products and metadata
        return res.json({
            data: products,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (err) {
        // Handle errors and log them
        console.log(err);
        res.status(500).json(err);
    }
};

productCltr.updateProduct = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() })
    }
    const id = req.params.id
    const body = _.pick(req.body, ['name','description','price','stock'])
    try {
        const product = await Product.findByIdAndUpdate(id, body, {new: true})
        res.status(200).json(product)
    } catch(e){
        res.status(500).json(e)
    }
}




productCltr.deleteProduct = async(req, res) => {
    const id = req.params.id
    try {
        const product = await Product.findByIdAndDelete({_id: id,Admin:req.user.id})
        res.status(200).json(product)
    
    } catch(e) {
        res.status(500).json(e)
        console.log(e)
    }
}


module.exports = productCltr