import { apiSlice } from "./apiSlice";
import { logout } from "./authSlice";
const USERS_URL = 'api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),

    logout:builder.mutation({
      query:()=>({
        url:`${USERS_URL}/logout`,
        method:'POST'
      }),
    }),
    UpdateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    
    UpdateImage:builder.mutation({
      query:(data)=>({
        url:`${USERS_URL}/updateimage`,
        method:'POST',
        body:data
      }),
    }),

    
  }),
});

export const { useLoginMutation,useLogoutMutation ,useRegisterMutation,useUpdateUserMutation,useUpdateImageMutation} = usersApiSlice;
