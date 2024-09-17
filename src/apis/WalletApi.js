import { axiosInstance } from "./axiosInstance";

export default class WalletApi {
    static async createPayment(data) {
        try {
            const { data } = await axiosInstance.post("/payments", data)
            return data
        } catch (error) {
            console.error("WalletApi createPayment: ", error);
        }
    }
}