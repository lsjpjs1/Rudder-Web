import {ThunkAction} from "redux-thunk";
import {RootState} from "./index";
import {AnyAction} from "redux";
import {getPosts, GetPostsRequest} from "../api/postApi";
import {getSchools} from "../api/schoolApi";
import {PostPreview} from "./post";

const GET_POST_SEARCH_SUCCESS = 'GET_POST_SEARCH_SUCCESS' as const;
const SET_POST_SEARCH_BODY = 'SET_POST_SEARCH_BODY' as const;
const CLEAR_END_POST_ID = 'CLEAR_END_POST_ID' as const;


export const getPostSearchSuccess = (posts : Array<PostPreview>) => ({
    type: GET_POST_SEARCH_SUCCESS,
    posts: posts
});

export const setPostSearchBody = (searchBody : string) => ({
    type: SET_POST_SEARCH_BODY,
    searchBody: searchBody
});

export const clearEndPostId = () => ({
    type: CLEAR_END_POST_ID,
});



type SearchPostAction =
    | ReturnType<typeof getPostSearchSuccess>
    | ReturnType<typeof setPostSearchBody>
    | ReturnType<typeof clearEndPostId>


type SearchPostState = {
    posts: Array<PostPreview>,
    getPostRequest: GetPostsRequest
};

const initialState: SearchPostState = {
    posts: [],
    getPostRequest: {
        endPostId: null,
        categoryId: null,
        isMyPost: false,
        searchBody: null
    }
};

function searchReducer(
    state: SearchPostState = initialState,
    action: SearchPostAction
) {
    switch (action.type) {
        case GET_POST_SEARCH_SUCCESS:
            return {
                ...state,
                posts: action.posts,
                getPostRequest: {
                    ...state.getPostRequest,
                    endPostId: action.posts.length > 0 ? action.posts[action.posts.length - 1].postId : state.getPostRequest.endPostId
                }
            }
        case SET_POST_SEARCH_BODY:
            return {
                ...state,
                getPostRequest: {
                    ...state.getPostRequest,
                    searchBody: action.searchBody
                }
            }
        case CLEAR_END_POST_ID:
            console.log("clear")
            return {
                ...state,
                getPostRequest: {
                    ...state.getPostRequest,
                    endPostId: null
                }
            }
        default:
            return state
    }
}

export default searchReducer;