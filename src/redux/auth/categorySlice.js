import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        items: [],
        total: 0,
        isLoading: false,
        error: null
    },
    reducers: {
        setCategories: (state, action) => {
            const { items, total } = action.payload
            state.items = items;
            state.total = total;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    }
})

export const { setCategories, setIsLoading, setError } = categorySlice.actions
export default categorySlice.reducer 