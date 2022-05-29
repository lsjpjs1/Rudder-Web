import PostList from "../components/PostList";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules";
import {useNavigate} from "react-router-dom";
import {callGetPosts} from "../modules/post";
import {clearEndPostId, setPostSearchBody} from "../modules/search";
import SearchBar from "../components/SearchBar";



const SearchContainer = () => {

    const getSearchPostRequest = useSelector((state: RootState) => state.searchReducer.getPostRequest)
    const searchPosts = useSelector((state: RootState) => state.searchReducer.posts)
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const onSearchTextChange = (s: string) => {
        dispatch(setPostSearchBody(s))
    }

    const search = () => {
        dispatch(clearEndPostId())
        getSearchPostRequest.endPostId = null
        // @ts-ignore
        dispatch(callGetPosts(getSearchPostRequest,"search"))
    }



    const getNextPage = () => {
        // @ts-ignore
        dispatch(callGetPosts(getSearchPostRequest,"search"))
    }

    useEffect(() => {
        console.log(getSearchPostRequest)
    },[getSearchPostRequest]);

    return (
        <div>
            <SearchBar onSearch={search} onSearchTextChange={onSearchTextChange}></SearchBar>
            <PostList onNextBtnClick={getNextPage} postPreviews={searchPosts}></PostList>
        </div>

    )
}

export default SearchContainer