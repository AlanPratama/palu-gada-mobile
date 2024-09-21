import { axiosInstance } from "./axiosInstance";

export default class PayoutApi {
  static async createPayout(request) {
    try {
      const { data } = await axiosInstance.post("/payouts", { ...request, payoutStatus: 'PENDING' })
      return data
    } catch (error) {
      if (error.response) {
        // Error dari API
        console.log("createPayout API Response Error: ", error.response);
      } else if (error.request) {
        // Tidak ada response dari API
        console.log("createPayout No response from API: ", error);
      } else {
        // Error yang terjadi ketika membuat request
        console.log("createPayout Error in setting up request: ", error.message);
      }
    }
  }

  static async getAllMyPayout(page, size) {
    try {
      const { data } = await axiosInstance.get(`/payouts/me`, {
        params: {
          page,
          size
        }
      })
      return data?.data?.items
    } catch (error) {
      if (error.response) {
        // Error dari API
        console.log("createPayout API Response Error: ", error.response);
      } else if (error.request) {
        // Tidak ada response dari API
        console.log("createPayout No response from API: ", error);
      } else {
        // Error yang terjadi ketika membuat request
        console.log("createPayout Error in setting up request: ", error.message);
      }
    }
  }
}