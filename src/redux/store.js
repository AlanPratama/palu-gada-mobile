import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import categoryReducer from "./auth/categorySlice";
import postReducer from "./auth/postSlice";
import districtReducer from "./auth/districtSlice";
import bidReducer from "./auth/bidSlice";

export default configureStore({
	reducer: {
		auth: authReducer,
		category: categoryReducer,
		post: postReducer,
		district: districtReducer,
		bid: bidReducer
	},
});
