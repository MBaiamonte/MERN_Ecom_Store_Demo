
import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice"

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        login : builder.mutation({
            query: (data) => ({
                url:`${USERS_URL}/auth`,
                method: 'POST',
                body: data
            }),
        }),//end login
        register: builder.mutation({
            query : (data)=>({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            }),
        }),//end register
        logout: builder.mutation({ //clears out user info from server
            query: ()=>({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            })
        }),//end logout
        profile: builder.mutation({
            query: (data)=>({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            })
        })
    }),//end endpoints
});//end user api slice

export const {useLoginMutation,useLogoutMutation, useRegisterMutation, useProfileMutation}=usersApiSlice;