import { axiosInstance } from "./axiosInstance";

export default class WalletApi {
    static async createPayment(request) {
        try {
            console.log("request: ", request);

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

    static async fetchPayments(page = 0, size = 10) {
        try {
            const { data } = await axiosInstance.get(`/payments`, {
                params: {
                    page,
                    size
                }
            })
            return data.data.items
        } catch (error) {
            if (error.response) {
                // Error dari API
                console.log("fetchPayments API Response Error: ", error.response);
            } else if (error.request) {
                // Tidak ada response dari API
                console.log("fetchPayments No response from API: ", error);
            } else {
                // Error yang terjadi ketika membuat request
                console.log("fetchPayments Error in setting up request: ", error.message);
            }
        }
    }
}