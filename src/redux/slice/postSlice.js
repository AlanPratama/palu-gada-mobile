import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    items: [],
    item: {},
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

    setPostById: (state, action) => {
      state.item = action.payload;
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
    deletePost: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      state.myPost = state.myPost.filter((item) => item.id !== action.payload)
      state.total -= 1;
      state.totalMyPost -= 1;
    }
    // updatePost: (state, action) => {
    //   state.items = state.items.map((item) => {
    //     if (item.id === action.payload.id) {
    //       return action.payload;
    //     }
    //     return item;
    //   });
    //   state.myPost = state.myPost.map((item) => {
    //     if (item.id === action.payload.id) {
    //       return action.payload;
    //     }
    //     return item;
    //   });
    // },
  },
});

export const { setPost, setPostById, setMyPost, setError, addPost, setIsLoading, clearPost, clearMyPost, deletePost } = postSlice.actions;
export default postSlice.reducer;
