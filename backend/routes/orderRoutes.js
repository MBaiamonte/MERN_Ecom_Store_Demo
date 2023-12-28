import express from 'express';
const router = express.Router();
import {addOrderItems, 
    getMyOrders,
    getOrderById, 
    updateOrderToPayed, 
    updateOrderToDelivered, 
    getOrders} from '../controllers/orderController.js';
import {protect, admin} from '../middleware/authMiddleware.js';


//all connecter to "/api/user"
router.route('/').post(protect, addOrderItems).get( protect, admin, getOrders);
router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect,admin, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPayed);
router.route('/:id/deliver').put(protect, updateOrderToDelivered)


export default router;