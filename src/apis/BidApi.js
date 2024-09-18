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
}