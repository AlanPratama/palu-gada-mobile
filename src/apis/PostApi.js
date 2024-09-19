import { addPost, setError, setIsLoading, setMyPost, setPost } from "../redux/auth/postSlice";
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

  static async getPosts(page, size = 10, title) {
    try {
      store.dispatch(setError(null));
      store.dispatch(setIsLoading(true));

      const { data } = await axiosInstance.get("/posts", {
        params: {
          page,
          size,
          title,
          sortField: 'createdAt',
          sortDirection: 'desc'
        },
      });

      store.dispatch(setPost(data.data.items));
    } catch (error) {
      store.dispatch(setError(error.message));
      console.log("PostApi getPosts: ", error);
      console.log("PostApi getPosts message: ", error.message);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async getPostsReturn(page = 0, size = 5, title, sortField, sortDirection) {
    try {
      store.dispatch(setError(null));
      store.dispatch(setIsLoading(true));

      const { data } = await axiosInstance.get("/posts", {
        params: {
          page,
          size,
          title,
          sortField,
          sortDirection
        },
      });
      const items = data.data.items;
      return items
    } catch (error) {
      store.dispatch(setError(error.message));
      console.log("PostApi getPostsReturn: ", error);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async getMyPosts(page, size = 10, title) {
    try {
      store.dispatch(setError(null));
      store.dispatch(setIsLoading(true));

      const { data } = await axiosInstance.get("/posts/me", {
        params: {
          page,
          size,
          title,
          sortField: 'createdAt',
          sortDirection: 'desc'
        },
      });
      const items = data.data.items;

      store.dispatch(setMyPost(items));
    } catch (error) {
      store.dispatch(setError(error.message));
      console.log("PostApi getMyPosts: ", error);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

}
