import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import categoryReducer from "./auth/categorySlice";
import postReducer from "./auth/postSlice";

export default configureStore({
	reducer: {
		auth: authReducer,
		category: categoryReducer,
		post: postReducer
	},
});
