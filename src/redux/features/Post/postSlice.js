import { createSlice } from "@reduxjs/toolkit";

export const postSlice=createSlice({
    name:'post',
    initialState:{
        data: { data: [] },
        preview:[],
        previewPage:false,
        loading:false,
        error:null,
        page:1,
        postMessage:null,
        deleteStatus:null,
        updateStatus:null,
        publishStatus:null,
    },
    reducers:{
        fetchPost:(state)=>{
            state.loading=true;
            state.error=null;
        },
        fetchPostSuccess:(state,action)=>{
            state.loading=false;
            state.data = action.payload;
            state.page=1;
            console.log(state.data);
        },
        fetchAllPost: (state, action) => {
            state.loading=false;
            state.data = {data: state.data.data.concat(action.payload.data)};
            console.log(state.data);
            state.page+=1;
            console.log(state.data);
        },
        fetchAllPostComplete:(state)=>{
           state.loading=false;
           console.log("english");
        },
        fetchPostFailure:(state,action)=> {
            state.loading=false;
            state.error=action.payload;
        },
        createPost:(state)=>{
          state.postMessage=null;
        },
        createPostSuccess:(state,action)=>{
            state.postMessage=action.payload;
            state.page=1;
        },
        createPostFailure:(state,action)=>{
            state.postMessage=action.payload;
        },
        deletePost:(state)=>{
            state.postMessage=null;
        },
        deletePostSuccess:(state,action)=>{
            state.postMessage=action.payload;
            state.previewPage=false;
            state.page=1;
            state.data=[];
            state.loading=true;
        },
        deletePostFailure:(state,action)=>{
            state.postMessage=action.payload;
            state.previewPage=true;
        },
        updatePost:(state)=>
        {
            state.updateStatus=null;
        },
        updatePostSuccess:(state,action)=>
        {
            state.updateStatus=action.payload;
        },
        updatePostFailure:(state,action)=>
        {
            state.updateStatus=action.payload;
        },
        previewPost:(state)=>{
            state.loading=true;
        },
        previewPostSuccess:(state,action)=>{
           state.preview=action.payload;
           state.previewPage=true;
           state.loading=false;
        },
        previewPostFailure:(state)=>{
           state.previewPage=false;
        },
        publishPost:(state)=>{
           state.publishStatus=null;
        },
        publishPostSuccess:(state,action)=>{
            state.publishStatus=action.payload;
        },
        publishPostFailure:(state,action)=>{
            state.publishStatus=action.payload;
        },


    }
})

export const
    {
    publishPost,publishPostSuccess,publishPostFailure,
    updatePost,updatePostFailure,updatePostSuccess,
    deletePost,deletePostSuccess,deletePostFailure,
    previewPost,previewPostSuccess,previewPostFailure,
    createPostSuccess,createPost,createPostFailure,
    fetchPost,fetchPostFailure,fetchPostSuccess,fetchAllPost,fetchAllPostComplete
}=postSlice.actions;

export default postSlice.reducer;