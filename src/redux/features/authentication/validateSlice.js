import { createSlice } from "@reduxjs/toolkit";

export const validateSlice=createSlice({
    name:'validate',
    initialState:{
        isValid:false,
        isLoading:true,
        errorMessage:null,
        updateMessage:'',
        isUpdate:false,
        profile:null,
    },
    reducers:{
        registerUser:(state)=>{
            state.isValid=false;
            state.isLoading=true;
        },
        loginUser:(state)=>{
            state.isValid=false;
            state.isLoading=true;
        },
        logoutUser:(state)=>{
            state.isValid=false;
            state.isLoading=true;
        },
        validUser:(state)=>{
            state.isValid=false;
            state.isLoading=true;

        },
        updateUser:(state)=>
        {
            state.updateMessage='';
            state.isUpdate=false;
        },
        updateUserSuccess:(state)=>
        {
            state.isUpdate=true;
            state.updateMessage='Successfully Updated';
        },
        updateUserFailure:(state)=>
        {
            state.isUpdate=false;
            state.updateMessage='unSuccess'
        },
        validUserSuccess:(state,action)=>{
            state.isValid=true;
            state.isLoading=false;
            state.errorMessage=null;
            state.profile=action.payload;
        },
        validUserFailure:(state,action)=>{
            state.isValid=false;
            state.isLoading=false;
            state.errorMessage=action.payload;
        }

    }
})

export const{registerUser,loginUser,logoutUser,validUser,validUserSuccess,validUserFailure,updateUser,updateUserSuccess,updateUserFailure}=validateSlice.actions;

export default validateSlice.reducer;