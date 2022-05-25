import axios from "axios";

type LoginRequest = {
    email: string,
    password: string
};

export const loginApi = (loginRequest: LoginRequest) =>
    axios.post("/auth",
        {
            userId: loginRequest.email,
            userPassword: loginRequest.password
        }
    )


