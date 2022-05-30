import axiosInstance from "./index";
import {PostPreview} from "../modules/post";

export type GetPostsRequest = {
    categoryId: number,
    endPostId: number,
    isMyPost: boolean,
    searchBody: string
};

type GetPostDetailRequest = {
    postId: number
};


export const getPosts = (getPostsRequest: GetPostsRequest) =>
    axiosInstance.get("/posts",
        { params: getPostsRequest}
    )

export const getPostDetail = (getPostDetailRequest: GetPostDetailRequest) =>
    axiosInstance.get(`/posts/${getPostDetailRequest.postId}`
    )

