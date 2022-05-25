import axiosInstance from "./index";


type LoginRequest = {
    email: string,
    password: string
};

export const loginApi = (loginRequest: LoginRequest) =>
    axiosInstance.post("/auth",
        {
            userId: loginRequest.email,
            userPassword: loginRequest.password
        }
    )


