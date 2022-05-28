import axiosInstance from "./index";

export type GetPostsRequest = {
    categoryId: number,
    endPostId: number,
    isMyPost: boolean,
    searchBody: string
};

export const getPosts = (getPostsRequest: GetPostsRequest) =>
    axiosInstance.get("/posts",
        { params: getPostsRequest}
    )