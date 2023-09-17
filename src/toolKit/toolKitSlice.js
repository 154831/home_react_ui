import { configureStore } from "@reduxjs/toolkit";
import { BoardSlice } from "./BoardSlice";


export const toolkitStore = configureStore({
    reducer: {
        board: BoardSlice.reducer,
    }
})