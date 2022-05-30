import React, {useEffect} from "react";
import PostDetail from "../components/PostDetail";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules";
import {callGetPostDetail} from "../modules/post";


const ShowPostContainer = () => {

    const dispatch = useDispatch();
    const selectedPost = useSelector((state: RootState) => state.postReducer.selectedPost)
    const selectedPostDetail = useSelector((state: RootState) => state.postReducer.selectedPostDetail)

    useEffect(() => {
        // @ts-ignore
        dispatch(callGetPostDetail(selectedPost.postId))
    },[]);
    console.log(selectedPostDetail)

    return (
        <div>
            <PostDetail postDetail={selectedPostDetail}></PostDetail>
        </div>
    );
}
export default ShowPostContainer;