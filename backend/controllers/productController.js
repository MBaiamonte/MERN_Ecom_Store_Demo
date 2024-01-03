import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

//@desc   Fetch all products
//@route  GET /api/products
//@access Public
const getProducts =  asyncHandler(async (req , res) => {
    const products = await Product.find({});
    res.json(products);
});


//@desc   Fetch a product
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

//@desc   Update a products
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
        throw new Error('Product/Resource Not Found')
    }
});

//@desc   Delete a product
//@route  Delete /api/products/:id
//@access Private, Admin
const deleteProduct =  asyncHandler(async (req , res) => {
    const product = await Product.findById(req.params.id);
    if (product){
        await Product.deleteOne({_id: product._id})
        res.status(200).json({message: 'Product Deleted'})
    } else{
        res.status(404);
        throw new Error('Product Not Found')
    }
});

//@desc   Create New Review
//@route  Post /api/products/:id/reviews
//@access Private
const createProductReview =  asyncHandler(async (req , res) => {
    const {rating, comment}= req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
        const alreadyReviewed = product.reviews.find(
            (review) => review.user.toString() === req.user._id.toString()
        );
    
        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product Already Reviewed');
        }
    
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
        await product.save();
        res.status(201).json({ message: 'Review Added' });
    } else {
        res.status(404);
        throw new Error('Product Not Found');
    }
});



export {getProducts, getProductById, createProduct, updateProduct, deleteProduct,createProductReview };