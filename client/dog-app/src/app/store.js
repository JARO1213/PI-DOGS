import { configureStore } from "@reduxjs/toolkit";
import dogsReducer from '../features/counter/dogsSlice.js'


export const store = configureStore({
    reducer: {
        dogState: dogsReducer
    }
})

