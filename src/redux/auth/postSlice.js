import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    items: [],
    total: 0,
    isLoading: false,
    myPost: [],
    totalMyPost: 0,
    error: null,
  },
  reducers: {
    setPost: (state, action) => {
      state.items = [...state.items, ...action.payload];
      state.total += action.payload.length;
    },
    setMyPost: (state, action) => {
      state.myPost = [...state.myPost, ...action.payload];
      state.totalMyPost += action.payload.length;
    },
    clearPost: (state) => {
      state.items = [];
      state.total = 0;
    },
    clearMyPost: (state) => {
      state.myPost = [];
      state.totalMyPost = 0;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addPost: (state, action) => {
      state.items = [...state.items, action.payload];
      state.myPost = [...state.myPost, action.payload];
      state.total += 1;
      state.totalMyPost += 1;
    },
  },
});

export const { setPost, setMyPost, setError, addPost, setIsLoading, clearPost, clearMyPost } = postSlice.actions;
export default postSlice.reducer;
