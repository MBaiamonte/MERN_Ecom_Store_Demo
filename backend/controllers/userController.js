import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import Jwt from 'jsonwebtoken';

//@desc   auth user & get token
//@route  POST /api/users/login
//@access Public
const authUser =  asyncHandler(async (req , res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email:email});
    
    if(user && (await user.matchPassword(password))) {
        const token = jwt.sign({userId: user._id},process.env.JWT_SECRET, {expiresIn: '1D'}); //pass in payload and secret(which is in env file) and token expiration time frame
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        });
    }else{
        res.status(401);
        throw new Error('Invalid Email or Password')
    }
});

//@desc   register user 
//@route  POST /api/users
//@access Public
const registerUser =  asyncHandler(async (req , res) => {
    res.send('register user')
});

//@desc   Logout user & clear cookie
//@route  POST /api/users/logout
//@access Private
const logoutUser =  asyncHandler(async (req , res) => {
    res.send('logout user')
});

//@desc   Get user profile
//@route  GET /api/users/profile
//@access Private
const getUserProfile =  asyncHandler(async (req , res) => {
    res.send('get user profile')
});

//@desc   Update user profile
//@route  PUT /api/users/profile
//@access Private
const updateUserProfile =  asyncHandler(async (req , res) => {
    res.send('update user profile')
});

//@desc   Get user 
//@route  GET /api/users
//@access Private/Admin
const getUsers =  asyncHandler(async (req , res) => {
    res.send('get users')
});

//@desc   get user by id
//@route  GET /api/users/:id
//@access Private/Admin
const getUserById =  asyncHandler(async (req , res) => {
    res.send('get user by id')
});

//@desc   Delete User
//@route  DELETE /api/users/:id
//@access Private/Admin
const deleteUser =  asyncHandler(async (req , res) => {
    res.send('delete user')
});

//@desc   Update
//@route  PUT /api/users/:id
//@access Private/Admin
const updateUser =  asyncHandler(async (req , res) => {
    res.send('update user')
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser}