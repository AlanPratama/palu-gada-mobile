import {
  addPost,
  setError,
  setIsLoading,
  setMyPost,
  setPost,
  setPostById,
  updatePost,
} from "../redux/auth/postSlice";
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
      return true;
      //   this.getPosts();
    } catch (error) {
      store.dispatch(setError(error.message));
      console.log("PostApi createPost: ", error);
    }
  }

  static async updatePost(id, formData) {
    console.log("billie elis id", id);
    console.log("kali uchis", formData);

    try {
      store.dispatch(setError(null));

      const { data } = await axiosInstance.put("/posts/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const items = data.data;
      console.log("ASASA: ", items);

      // store.dispatch(updatePost(items));
      store.dispatch(setPostById(items));
      this.getPosts();
      return items;
    } catch (error) {
      store.dispatch(setError(error.message));
      console.log("PostApi updatePost: ", error);
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
          sortField: "createdAt",
          sortDirection: "desc",
          status: 'AVAILABLE'
        },
      });

      const items = data.data.items;
      store.dispatch(setPost(items));
      return { length: items.length }
    } catch (error) {
      store.dispatch(setError(error.message));
      console.log("PostApi getPosts: ", error);
      console.log("PostApi getPosts message: ", error.message);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async getPostsReturn(
    page = 0,
    size = 5,
    title,
    sortField,
    sortDirection,
    categoryIds = '' // Pakai koma jika ingin filter banyak kategori - contoh: 1,2,3
  ) {
    try {
      store.dispatch(setError(null));
      store.dispatch(setIsLoading(true));

      const { data } = await axiosInstance.get("/posts", {
        params: {
          page,
          size,
          title,
          sortField,
          sortDirection,
          status: 'AVAILABLE',
          categoryIds
        },
      });
      const items = data.data.items;
      return items;
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
          sortField: "createdAt",
          sortDirection: "desc",
        },
      });

      const items = data.data.items;
      store.dispatch(setMyPost(items));
      return { length: items.length }
    } catch (error) {
      store.dispatch(setError(error.message));
      console.log("PostApi getMyPosts: ", error);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async getPostById(postId) {
    try {
      store.dispatch(setError(null));

      const { data } = await axiosInstance.get(`/posts/${postId}`);
      const item = data.data;

      store.dispatch(setPostById(item));
    } catch (error) {
      store.dispatch(setError(error.message));
      console.log("PostApi getPosts: ", error);
    }
  }

  static async getReportPost(page, size = 9999) {
    try {
      const { data } = await axiosInstance.get("/post-reports", {
        params: {
          page,
          size
        }
      })

      console.log(data.data);

      return data.data;
    } catch(error) {
      console.log("PostApi reportPost: ", error);
    }

  }

  static async reportPost(request) {
    try {
      const { data } = await axiosInstance.post("/post-reports", request)
      console.log(data);

      if (data.status === "Created") {
        alert("Report Success!");
        return true;
      }
      
      return false
    } catch(error) {
      console.log("PostApi reportPost: ", error);
    }

  }
}
