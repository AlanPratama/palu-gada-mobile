import { createSlice } from "@reduxjs/toolkit";
import { setIsLoading } from "./categorySlice";

export const postSlice = createSlice({
    name: "post",
    initialState: {
        items: [],
        total: 0,
        // isLoading: false,
        error: null
    },
    reducers: {
        setPost: (state, action) => {
            const { items, total } = action.payload
            state.items = items
            state.total = total
        },
        // setIsLoading: (state, action) => {
        //     state.isLoading = action.payload
        // },
        setError: (state, action) => {
            state.error = action.payload
        }
    }
})

export const { setPost, setError } = postSlice.actions
export default postSlice.reducer