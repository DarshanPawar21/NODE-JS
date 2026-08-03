import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value:[],
};


export const getteacherdataSlice = createSlice({
    name:"getteacherdata",
    initialState,
    reducers:{
        setteacherdata:(state,action)=>{
            state.value = action.payload;
        }
    }
});

export const {setteacherdata} = getteacherdataSlice.actions;

export default getteacherdataSlice;
