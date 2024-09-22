import { createSlice } from "@reduxjs/toolkit";

const countTotalNotRead = (notifications) => {
  let total = 0;
  notifications.forEach((notification) => {
    if (notification.isRead == false) {
      total += 1;
    }
  });
  return total;
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    items: [],
    total: 0,
    totalNotRead: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setNotification: (state, action) => {
      state.items = [...state.items, ...action.payload];
      state.total += action.payload.length;
      state.totalNotRead = countTotalNotRead(state.items)
    },
    clearNotification: (state) => {
      state.items = [];
      state.total = 0;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setNotification, setError, setIsLoading, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
