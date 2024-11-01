import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api/v1";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const request = (method, url, data, params) => {

  switch (method.toUpperCase()) {
    case "GET":
      return axios.get(url, params);
    case "POST":
      return axios.post(url, data, params);
    case "PUT":
      return axios.put(url, data, params);
    case "DELETE":
      return axios.delete(url, params);
    default:
      throw new Error("Unsupported HTTP method");
  }
};
