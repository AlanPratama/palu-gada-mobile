import { createSlice } from "@reduxjs/toolkit";

export const districtSlice = createSlice({
    name: "district",
    initialState: {
        district: [],
        total: 0,
        isLoading: false,
        error: null
    },
    reducers: {
        setDistrict: (state, action) => {
            const { items, total } = action.payload
            state.district = items;
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

export const { setDistrict, setIsLoading, setError } = districtSlice.actions
export default districtSlice.reducer