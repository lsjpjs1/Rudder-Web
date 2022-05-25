import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://test.rudderuni.com"
});

export default axiosInstance;