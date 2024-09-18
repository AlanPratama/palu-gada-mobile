import { createSlice } from "@reduxjs/toolkit";
import { setIsLoading } from "./categorySlice";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    items: [],
    total: 0,
    // isLoading: false,
    myPost: [],
    totalMyPost: 0,
    error: null,
  },
  reducers: {
    setPost: (state, action) => {
      const { items, total } = action.payload;
      state.items = items;
      state.total = total;
    },

    setMyPost: (state, action) => {
      const { items, total } = action.payload;
      state.myPost = items;
      state.totalMyPost = total;
    },
    // setIsLoading: (state, action) => {
    //     state.isLoading = action.payload
    // },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addPost: (state, action) => {
      state.items = [...state.items, action.payload];
      state.total += 1;
    },
  },
});

export const { setPost, setError, addPost } = postSlice.actions;
export default postSlice.reducer;
