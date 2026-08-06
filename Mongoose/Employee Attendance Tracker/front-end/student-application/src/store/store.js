import { configureStore } from "@reduxjs/toolkit";
import getteacherdataSlice from "../slices/slices.js";
const store = configureStore({
    reducer:{
        getteacherdata:getteacherdataSlice.reducer
    }
});

export default store;