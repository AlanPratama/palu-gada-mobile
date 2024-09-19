import { addPost, setError, setMyPost, setPost } from "../redux/auth/postSlice";
import store from "../redux/store";
import { axiosInstance } from "./axiosInstance";

export default class PostApi {
  static async createPost(formData) {
    console.log("billie elis", formData);
    try {
      store.dispatch(setError(null));

      const { data } = await axiosInstance.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const items = data.data;
      console.log("ASASA: ", items);

      store.dispatch(addPost(items));
      return true
      //   this.getPosts();
    } catch (error) {
      store.dispatch(setError(error.message));
      console.log("PostApi createPost: ", error);
    }
  }

  static async getPosts(page, size = 99999, query) {
    try {
      store.dispatch(setError(null));

      const { data } = await axiosInstance.get("/posts", {
        params: {
          page,
          size,
          title: query,
        },
      });
      const items = data.data.items;
      const total = data.data.items.length;

      store.dispatch(setPost({ items, total }));
    } catch (error) {
      store.dispatch(setError(error.message));
      console.log("PostApi getPosts: ", error);
    }
  }


  static async getMyPosts(page, size = 99999, query) {
    try {
      store.dispatch(setError(null));

      const { data } = await axiosInstance.get("/posts/me", {
        params: {
          page,
          size,
          name: query,
        },
      });
      const items = data.data.items;
      const total = data.data.items.length;

      store.dispatch(setMyPost({ items, total }));
    } catch (error) {
      store.dispatch(setError(error.message));
      console.log("PostApi getPosts: ", error);
    }
  }

}
