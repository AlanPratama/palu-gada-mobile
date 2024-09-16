import { setError, setPost } from "../redux/auth/postSlice";
import store from "../redux/store";
import { axiosInstance } from "./axiosInstance";

export default class PostApi {

    static async getPosts() {
        try {
            store.dispatch(setError(null));

            const { data } = await axiosInstance.get("/posts");
            const items = data.data.items
            const total = data.data.items.length

            store.dispatch(setPost({items, total}))
        } catch (error) {
            store.dispatch(setError(error.message))
            console.log("PostApi getPosts: ", error);
        } 
    }
}