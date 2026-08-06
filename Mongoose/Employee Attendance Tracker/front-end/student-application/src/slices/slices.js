import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit";



const initialState = {
    value:[],
};


export const getteacherdataSlice = createSlice({
    name:"getteacherdata",
    initialState,
    reducers:{
        setteacherdata:(state,action)=>{
            state.value = action.payload;
            console.log("teacher data set successfully",state.value);
        }
    },
});

export const {setteacherdata} = getteacherdataSlice.actions;

export default getteacherdataSlice;
