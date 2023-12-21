import express from 'express';
import { authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser} from '../controllers/userController.js';
import {protect, admin} from '../middleware/authMiddleware.js';

const router = express.Router();

//all connecter to "/api/user"
router.route('/').post(registerUser).get( protect, admin, getUsers);
router.post('/logout', logoutUser);
router.post('/auth', authUser); //login
router.route('/profile').get(protect, getUserProfile).put( protect, updateUserProfile);
router.route('/:id').delete( protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)


export default router;