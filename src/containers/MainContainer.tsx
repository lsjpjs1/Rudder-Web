import React, {useEffect} from "react";
import PostList from "../components/PostList";
import {useDispatch, useSelector} from "react-redux";
import {callGetPosts} from "../modules/post";
import {RootState} from "../modules";
import {GetPostsRequest} from "../api/postApi";


const MainContainer = () => {

    const dispatch = useDispatch();
    const posts = useSelector((state: RootState) => state.postReducer.posts)
    const getPostRequest = useSelector((state: RootState) => state.postReducer.getPostRequest)

    useEffect(() => {
        getPosts()
    },[]);

    const getPosts = () => {
        // @ts-ignore
        dispatch(callGetPosts(getPostRequest))
  }

    return (
        <div>
            <PostList onNextBtnClick={getPosts} postPreviews={posts}></PostList>
        </div>
    );
}
export default MainContainer;