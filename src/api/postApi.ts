import axiosInstance from "./index";

type GetPostsRequest = {

};

export const getPosts = (getPostsRequest: GetPostsRequest) =>
    axiosInstance.get("/posts",
    )