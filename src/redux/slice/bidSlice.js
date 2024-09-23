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
    deleteMyBid: (state, action) => {
      state.myBids = state.myBids.filter((bid) => bid.id != action.payload)
      state.totalMyBids -= 1
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setMyBids, deleteMyBid, setIsLoading, setError } = bidSlice.actions;
export default bidSlice.reducer;