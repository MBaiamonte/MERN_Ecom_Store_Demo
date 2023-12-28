import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

//@desc   Create New Order
//@route  POST /api/orders
//@access Private
const addOrderItems =  asyncHandler(async (req , res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice, 
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;
    if(orderItems && orderItems.length === 0){
        res.status(400);
        throw new Error('No Order Items')
    }else{
        const order = new Order({
            orderItems: orderItems.map((x)=>({
                ...x,
                product: x._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice, 
            totalPrice,
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});

//@desc   Get Logged in user order
//@route  GET /api/orders/myorders
//@access Private
const getMyOrders =  asyncHandler(async (req , res) => {
    const orders = await Order.find({user: req.user._id});
    res.status(200).json(orders);
});

//@desc   Get order by id
//@route  Get /api/orders/;id
//@access Private
const getOrderById =  asyncHandler(async (req , res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if(order){
        res.status(200).json(order)
    }else{
        res.status(404);
        throw Error('Order Not Found')
    }
});

//@desc   Update Order to paid
//@route  PUT /api/orders/:id/pay
//@access Private
const updateOrderToPayed =  asyncHandler(async (req , res) => {
    const order = await Order.findById(req.params.id);
    if (order){
        order.isPaid =true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time : req.body.update_time,
            email_address: req.body.email_address,
        };
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    }else{
        res.status(404);
        throw new Error('Order Not Found');
    }
});

//@desc   Update Order to delivered
//@route  PUT /api/orders/:id/pay
//@access Private/admin
const updateOrderToDelivered =  asyncHandler(async (req , res) => {
    res.send('update to delivered')
});

//@desc   Get All Orders
//@route  Get /api/orders
//@access Private/admin
const getOrders =  asyncHandler(async (req , res) => {
    res.send('get All Orders')
});

export {addOrderItems, getMyOrders, getOrderById, updateOrderToPayed, updateOrderToDelivered, getOrders};