import axios from "axios";


const axiosInstance = axios.create({
    baseURL: process.env["REACT_APP_SERVER_BASE_URL"],
    headers: {
        // @ts-ignore
        Authorization: process.env["REACT_APP_LOGIN_TOKEN"]
    }
});

export default axiosInstance;