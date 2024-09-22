import { setCategories, setError, setIsLoading } from "../redux/slice/categorySlice";
import store from "../redux/store";
import { axiosInstance } from "./axiosInstance";

export default class CategoryApi {
    static async getCategories() {
        try {
            store.dispatch(setError(null));
            store.dispatch(setIsLoading(true));

            const { data } = await axiosInstance.get("/categories");

            console.log("data cat: ", data.data.items);

            const items = data.data.items;
            const total = data.data.items.length;

            store.dispatch(setCategories({items, total}));
        } catch (error) {
            store.dispatch(setError(error.message));
            console.log("CategoryApi getCategories: ", error);
        } finally {
            store.dispatch(setIsLoading(false));
        }
    }
}