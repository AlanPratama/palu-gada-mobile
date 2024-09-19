import { axiosInstance } from "./axiosInstance";
import PostApi from "./PostApi";

export default class BidApi {
    static async createBid(request) {
        console.log("REQ CREAATE BID: ", request);
        
        try {
            const res = await axiosInstance.post("/bids", request);
            console.log("ASASA: ", res.data);
            if(res.data.status === "Created") {
                alert("Bid Success!")
                await PostApi.getPosts();
                return true
            }

            return false
        } catch (error) {
            console.log("BidApi createBid: ", error.response);
        }
    }

    static async updateBidStatus(bidId, status) {
        console.log("BID: ", bidId);
        console.log("STATUS: ", status);
        
        try {
            const res = await axiosInstance.patch(`/bids/${bidId}/status?status=${status}`);
            // bids/6/status?status=ACCEPTED
            console.log("ASASA: ", res);
            if(res?.data?.status === "OK") {
                await PostApi.getPosts();
                return true
            }

            return false
        } catch (error) {
            console.log("BidApi updateBidStatus: ", error.response);
        }
    }
}