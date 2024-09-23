import { deleteMyBid, setMyBids } from "../redux/slice/bidSlice";
import store from "../redux/store";
import { axiosInstance } from "./axiosInstance";
import PostApi from "./PostApi";
import UserApi from "./UserApi";

export default class BidApi {

  static async myBids(page, size = 10) {
    try {
      const res = await axiosInstance.get(`/bids`, {
        params: {
          page, size
        }
      });
      console.log("ASASA: ", res.data);

      if(res.data.status === "OK") {
        const myBids = res.data.data.items
        const totalMyBids = res.data.data.items.length
        store.dispatch(setMyBids({myBids, totalMyBids}))
      }

    } catch (error) {
      console.log("BidApi createBid: ", error.response);
    }
  } 

  static async createBid(request) {
    console.log("REQ CREAATE BID: ", request);

    try {
      const res = await axiosInstance.post("/bids", request);
      console.log("ASASA: ", res.data);
      if (res.data.status === "Created") {
        await PostApi.getPosts();
        alert("Bid Success!");
        return true;
      }

      return false;
    } catch (error) {
      console.log("BidApi createBid: ", error.response);
    }
  }

  static async updateBidStatus(bidId, status) {
    console.log("BID: ", bidId);
    console.log("STATUS: ", status);

    try {
      const res = await axiosInstance.patch(
        `/bids/${bidId}/status?status=${status}`
      );
      // bids/6/status?status=ACCEPTED
      console.log("ASASA: ", res);
      if (res?.data?.status === "OK") {
        await PostApi.getPosts();
        await UserApi.getAuthenticated();
        return res.data.data;
      }

      return false;
    } catch (error) {
      console.log("BidApi updateBidStatus: ", error.response);
    }
  }

  static async createReview(request) {
    console.log("REQUEST: ", request);
    
    try {
      const { data } = await axiosInstance.post(`/reviews`, request);

      console.log("data: ", data);

      return data;
    } catch (error) {
      if (error.response) {
        // Error dari API
        console.log("API Response Error: ", error.response);
      } else if (error.request) {
        // Tidak ada response dari API
        console.log("No response from API: ", error.request);
      } else {
        // Error yang terjadi ketika membuat request
        console.log("Error in setting up request: ", error.message);
      }
    }
  }

  static async getMyReview() {
    try {
      const { data } = await axiosInstance.get(`/reviews/me`);

      console.log("data: ", data);

      return data;
    } catch (error) {
      if (error.response) {
        // Error dari API
        console.log("API Response Error: ", error.response);
      } else if (error.request) {
        // Tidak ada response dari API
        console.log("No response from API: ", error.request);
      } else {
        // Error yang terjadi ketika membuat request
        console.log("Error in setting up request: ", error.message);
      }
    }
  }

  static async getReviewByUserId(userId) {
    console.log("USER ID: ", userId);
    
    try {
      const { data } = await axiosInstance.get(`/reviews/user/${userId}`);

      console.log("data: ", data);

      return data;
    } catch (error) {
      if (error.response) {
        // Error dari API
        console.log("API Response Error: ", error.response);
      } else if (error.request) {
        // Tidak ada response dari API
        console.log("No response from API: ", error.request);
      } else {
        // Error yang terjadi ketika membuat request
        console.log("Error in setting up request: ", error.message);
      }
    }
  }

  static async deleteBidById(bidId) {
    console.log("BID ID: ", bidId);
    
    try {
      const { data } = await axiosInstance.delete(`/bids/${bidId}`);

      console.log("data: ", data);
      store.dispatch(deleteMyBid(bidId))

      return data;
    } catch (error) {
      if (error.response) {
        // Error dari API
        console.log("API Response Error: ", error.response);
      } else if (error.request) {
        // Tidak ada response dari API
        console.log("No response from API: ", error.request);
      } else {
        // Error yang terjadi ketika membuat request
        console.log("Error in setting up request: ", error.message);
      }
    }
  }
}
