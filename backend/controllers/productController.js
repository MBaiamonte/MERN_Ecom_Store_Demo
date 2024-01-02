import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

//@desc   fetch all products
//@route  GET /api/products
//@access Public
const getProducts =  asyncHandler(async (req , res) => {
    const products = await Product.find({});
    res.json(products);
});


//@desc   fetch a product
//@route  GET /api/products/:id
//@access Public
const getProductById =  asyncHandler(async (req , res) => {
    const product = await Product.findById(req.params.id);
    if(product){
        return res.json(product);
    }else{
        res.status(404);
        throw new Error('Product/Resource Not Found')
    }
});

//@desc   Create a product
//@route  POST /api/products
//@access Private, admin
const createProduct =  asyncHandler(async (req , res) => {
    const product = new Product({
        name: ' Sample Name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'sample brand', 
        category: 'sample Category',
        countInStock: 0,
        numReviews: 0,
        description: 'sample Description'
    })
    const createProduct = await product.save();
    res.status(201). json(createProduct);
});

//@desc   update a products
//@route  PUT /api/products/:id
//@access Private, Admin
const updateProduct =  asyncHandler(async (req , res) => {
    const {name, price, description,  image, brand, category, countInStock} = req.body;
    const product = await Product.findById(req.params.id);
    if (product){
        product.name= name;
        product.price= price;
        product.description= description;
        product.image= image;
        product.brand= brand;
        product.category= category;
        product.countInStock= countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else{
        res.status(404);
        throw new Error('Product/Resource not Found')
    }
});

export {getProducts, getProductById, createProduct, updateProduct};