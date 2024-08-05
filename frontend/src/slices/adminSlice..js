import { createSlice } from "@reduxjs/toolkit";

const initialState={
    adminInfo:localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')) :null,
    userForEditInfo:{}

}
console.log(initialState)
const adminSlice=createSlice({
    name:'admin',
    initialState,
    reducers:{
        
        setAdminCredentials:(state,action)=>{
         state.adminInfo=action.payload
         localStorage.setItem('adminInfo',JSON.stringify(action.payload))
         
        },
        userDetails:(state,action)=>{
            state.userForEdit=action.payload
        }
    }
})

export const {setAdminCredentials,userDetails}=adminSlice.actions
export const adminReducer=  adminSlice.reducer