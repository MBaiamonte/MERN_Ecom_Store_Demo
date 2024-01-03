
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
        }), //end Profile
        getUsers: builder.query({
            query: () => ({
                url: USERS_URL,
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
        }),//end getUser
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE',
            }),
        }), //end Delete User
        getUserDetails: builder.query({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
            }),
            keepUnusedDataFor: 5,
        }),//end getUserDetails
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/${data.userId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),//end updateUser
    }),//end endpoints
});//end user api slice

export const {useLoginMutation,useLogoutMutation, useRegisterMutation, useProfileMutation,  useGetUsersQuery, useDeleteUserMutation, useGetUserDetailsQuery, useUpdateUserMutation}=usersApiSlice;