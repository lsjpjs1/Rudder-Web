import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        // @ts-ignore
        Authorization: process.env["REACT_APP_LOGIN_TOKEN"]
    }
});

export default axiosInstance;