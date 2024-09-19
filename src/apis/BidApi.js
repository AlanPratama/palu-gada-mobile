import { axiosInstance } from "./axiosInstance";
import PostApi from "./PostApi";

export default class BidApi {
    static async createBid(request) {
        console.log("REQ CREAATE BID: ", request);
        
        try {
            const { data } = await axiosInstance.post("/bids", request);
            console.log("ASASA: ", data);
            if(data.status === "Created") {
                alert("Bid Success!")
                await PostApi.getPosts();
                return true
            }

            return false
        } catch (error) {
            console.log("PostApi createPost: ", error);
        }
    }

    static async updateBidStatus(bidId, status) {
        console.log("BID: ", bidId);
        console.log("STATUS: ", status);
        
        try {
            const { data } = await axiosInstance.patch(`/bids/${bidId}?status=${status}`);
            console.log("ASASA: ", data);
            if(data.status === "OK") {
                alert("Bid Success!")
                await PostApi.getPosts();
                return true
            }

            return false
        } catch (error) {
            console.log("PostApi createPost: ", error);
        }
    }
}