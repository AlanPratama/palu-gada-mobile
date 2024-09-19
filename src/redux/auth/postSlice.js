import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    items: [],
    item: {},
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

    setPostById: (state, action) => {
      state.item = action.payload;
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
      state.myPost = [...state.myPost, action.payload];
      state.total += 1;
      state.totalMyPost += 1;
    },
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

export const {
  setPost,
  setPostById,
  setMyPost,
  setError,
  addPost,
  updatePost,
} = postSlice.actions;
export default postSlice.reducer;
