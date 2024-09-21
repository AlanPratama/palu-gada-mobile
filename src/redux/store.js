import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import categoryReducer from "./slice/categorySlice";
import postReducer from "./slice/postSlice";
import districtReducer from "./slice/districtSlice";
import bidReducer from "./slice/bidSlice";

export default configureStore({
	reducer: {
		auth: authReducer,
		category: categoryReducer,
		post: postReducer,
		district: districtReducer,
		bid: bidReducer
	},
});
