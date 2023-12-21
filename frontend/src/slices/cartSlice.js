import {createSlice} from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems: [],shippingAddress:{}, paymentMethod:'paypal' }; //can also use stripe for payments 

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers: {
        addToCart: (state, action)=>{
            const item = action.payload;
            const existItem = state.cartItems.find((x)=>x._id === item._id);

            if(existItem){
                state.cartItems = state.cartItems.map((x)=>x._id=== existItem._id? item : x)
            }else{
                state.cartItems= [...state.cartItems, item]
            }
            return updateCart(state)
        },//end addToCart
        removeFromCart: (state,action)=>{
            state.cartItems = state.cartItems.filter((x)=> x._id !==action.payload);
            return updateCart(state);//updates cart after ones deleted
        },
        saveShippingAddress: (state, action)=>{
            state.shippingAddress = action.payload;
            return updateCart(state);
        }
    },//end reducers
});//end cart slice 
export const {addToCart, removeFromCart, saveShippingAddress} = cartSlice.actions;
export default cartSlice.reducer;