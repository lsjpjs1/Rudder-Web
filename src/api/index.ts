import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "https://test.rudderuni.com",
    headers: {
        // @ts-ignore
        Authorization: process.env["REACT_APP_LOGIN_TOKEN"]
    }
});

export default axiosInstance;