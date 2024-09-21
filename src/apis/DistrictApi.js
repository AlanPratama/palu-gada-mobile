import { setDistrict } from "../redux/slice/districtSlice";
import store from "../redux/store";
import { axiosInstance } from "./axiosInstance";

export default class DistrictApi {
    static async getDistricts() {
        try {
          const { data } = await axiosInstance.get("/districts");
    
          console.log("data: ", data.data);
    
          const items = data.data.items
          const total = items.length

          store.dispatch(setDistrict({items, total}))
        } catch (error) {
          console.log("DistrictApi getDistricts: ", error);
        }
    }
}