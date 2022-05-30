import React, {useEffect} from "react";
import PostList from "../components/PostList";
import {useDispatch, useSelector} from "react-redux";
import {callGetPosts} from "../modules/post";
import {RootState} from "../modules";
import {GetPostsRequest} from "../api/postApi";
import SearchBar from "../components/SearchBar";
import {clearEndPostId, setPostSearchBody} from "../modules/search";
import {useNavigate} from "react-router-dom";




const MainContainer = () => {

    const dispatch = useDispatch();
    const posts = useSelector((state: RootState) => state.postReducer.posts)
    const getPostRequest = useSelector((state: RootState) => state.postReducer.getPostRequest)
    const getSearchPostRequest = useSelector((state: RootState) => state.searchReducer.getPostRequest)
    const searchPosts = useSelector((state: RootState) => state.searchReducer.posts)
    const navigate = useNavigate()


    useEffect(() => {
        getPosts()
    },[]);

    useEffect(() => {
        if(searchPosts.length>0) {
            navigate("/search")
        }
    },[searchPosts]);

    const getPosts = () => {
        // @ts-ignore
        dispatch(callGetPosts(getPostRequest,"main"))
  }

    const onSearchTextChange = (s: string) => {
        dispatch(setPostSearchBody(s))
    }

    const search = () => {
        dispatch(clearEndPostId())
        // @ts-ignore
        dispatch(callGetPosts(getSearchPostRequest,"search"))
    }


    return (
        <div>
            <SearchBar onSearch={search} onSearchTextChange={onSearchTextChange}></SearchBar>
            <PostList onNextBtnClick={getPosts} postPreviews={posts}></PostList>
        </div>
    );
}
export default MainContainer;