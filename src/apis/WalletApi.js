import { axiosInstance } from "./axiosInstance";

export default class WalletApi {
    static async createPayment(request) {
        try {
            console.log("request: ",request);
            
            const { data } = await axiosInstance.post("/payments", request)
            return data
        } catch (error) {
            console.error("WalletApi createPayment: ", error);
        }
    }

    static async fetchPayment(paymentId) {
        try {
            const { data } = await axiosInstance.get(`/payments/${paymentId}/transaction`)

            console.log(data);
            
            return data
        } catch (error) {
            console.error("WalletApi createPayment: ", error);
        }
    }
}