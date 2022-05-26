import React, {useEffect} from "react";
import PostList from "../components/PostList";
import {useDispatch, useSelector} from "react-redux";
import {callGetPosts} from "../modules/post";
import {RootState} from "../modules";


const MainContainer = () => {

    const dispatch = useDispatch();
    const posts = useSelector((state: RootState) => state.postReducer.posts)

    useEffect(() => {
        // @ts-ignore
        dispatch(callGetPosts())
    });

    return (
        <div>
            <PostList postPreviews={posts}></PostList>
        </div>
    );
}
export default MainContainer;