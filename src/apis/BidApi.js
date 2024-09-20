import { axiosInstance } from "./axiosInstance";
import PostApi from "./PostApi";
import UserApi from "./UserApi";

export default class BidApi {

  static async myBids(userId) {
    console.log("REQ CREAATE BID: ", request);
    try {
      const res = await axiosInstance.get(`/bids/user/${userId}`);
      console.log("ASASA: ", res.data);

      

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
        return true;
      }

      return false;
    } catch (error) {
      console.log("BidApi updateBidStatus: ", error.response);
    }
  }
}
