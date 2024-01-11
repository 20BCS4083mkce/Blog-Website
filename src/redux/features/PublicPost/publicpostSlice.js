import { createSlice } from "@reduxjs/toolkit";

export const publicpostSlice=createSlice({
    name:'publicpost',
    initialState:{
        post:[],
        offsetdata:[],
        content:[],
        id:null,
        user_detail:[],
        loading:false,
        error:null,
        offset: 1,
    },
    reducers:{
        fetchPublicPost:(state)=>
        {
            state.loading=true;
            state.error=null;
        },
        fetchPublicPostSuccess:(state,action)=>
        {
            state.loading=false;
            state.post=action.payload;
            state.offset=1;
        },
        fetchPublicPostAllPost: (state, action) => {
            state.loading = false;
            state.post = [...state.post, ...action.payload];
            state.offsetdata=action.payload;
            state.offset+=1;
        },
        fetchPublicPostFailure:(state,action)=>
        {
            state.loading=false;
            state.error=action.payload;
        },
        setPostdetails:(state)=>{
            state.loading=true;

        },
        setPostdetailsupdate:(state)=>
        {
            state.loading=true;
        },
        setPostdetailsSuccess:(state,action)=> {
            state.loading = false;
            state.id = action.payload.id;
            state.user_detail=action.payload;
            console.log(state.user_detail);
        },
        setPostdetailsFailure:(state)=> {
            state.loading = true;
        },
        setPostdetailContentSuccess:(state,action)=>{
            state.content=action.payload;
            console.log(state.content);
        }


    }
})

export const {setPostdetailsFailure,setPostdetailsupdate,fetchPublicPost,fetchPublicPostAllPost,fetchPublicPostSuccess,fetchPublicPostFailure,setPostdetailsSuccess,setPostdetailContentSuccess,setPostdetails}=publicpostSlice.actions;
export default publicpostSlice.reducer;