import { createSlice } from "@reduxjs/toolkit";

export const bidSlice = createSlice({
  name: "bid",
  initialState: {
    myBids: [],
    totalMyBids: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setMyBids: (state, action) => {
      const { myBids, totalMyBids } = action.payload;
      state.myBids = myBids;
      state.totalMyBids = totalMyBids;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setMyBids, setIsLoading, setError } = bidSlice.actions;
export default bidSlice.reducer;