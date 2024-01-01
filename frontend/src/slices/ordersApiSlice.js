import {apiSlice} from './apiSlice';
import {ORDERS_URL, PAYPAL_URL} from '../constants';


export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder : builder.mutation({
            query: (order)=>({
                url: ORDERS_URL,
                method: 'POST',
                body: {...order}
            }),
        }),// end createOrder
        getOrderDetails : builder.query({
            query: (orderId)=>({
                url: `${ORDERS_URL}/${orderId}`
            }),
            keepUnusedDataFor: 5
        }),// end getOrderDetails
        payOder: builder.mutation({
            query: ({orderId ,details}) =>({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body:{...details},
            })
        }),//end payOrder
        getPayPalClientId: builder.query({
            query: ()=>({
                url:PAYPAL_URL,
            }),
            keepUnusedDataFor: 5
        }), //end getPayPalClientId
        getMyOrders: builder.query({
            query: ()=>({
                url: `${ORDERS_URL}/mine`,
            }),
            keepUnusedDataFor: 5
        }),//end getMyOrders
    }),
});

export const {useCreateOrderMutation, useGetOrderDetailsQuery, usePayOderMutation, useGetPayPalClientIdQuery, useGetMyOrdersQuery} = ordersApiSlice;
