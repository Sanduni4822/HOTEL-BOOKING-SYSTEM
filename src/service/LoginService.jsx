import { data } from "autoprefixer";
import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/v1/auth/signup";

export const CustomerAdd = (data) => {
    return axios.post(REST_API_BASE_URL, data);
};