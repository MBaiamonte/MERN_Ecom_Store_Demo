
import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice"

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getProducts : builder.query({
            query: () => ({
                url:PRODUCTS_URL  
            }),
            keepUnusedDataFor: 5
        }), //end getAll
        getProductDetails: builder.query({
            query: (productId) => ({
                url:`${PRODUCTS_URL}/${productId}` 
            }),
            keepUnusedDataFor: 5
        }) //end getOne
    }),
});


export const {useGetProductsQuery,useGetProductDetailsQuery} = productsApiSlice;