import {ThunkAction} from "redux-thunk";
import {RootState} from "./index";
import {AnyAction} from "redux";
import {getPosts, GetPostsRequest} from "../api/postApi";
import {getPostSearchSuccess} from "./search";

const GET_POST_SUCCESS = 'GET_POST_SUCCESS' as const;


export interface PostPreview {
    "categoryAbbreviation": string,
    "categoryId": number,
    "categoryName": string,
    "commentCount": number,
    "imageUrls": string,
    "isLiked": boolean,
    "isMine": boolean,
    "likeCount": number,
    "postBody": string,
    "postId": number,
    "postTime": number,
    "userInfoId": number,
    "userNickname": string,
    "userProfileImageUrl": string
}


export const getPostSuccess = (posts: Array<PostPreview>) => ({
    type: GET_POST_SUCCESS,
    posts: posts
});

// export const callLogin = ()=> async dispatch => {
//     const loginResult = await loginApi({
//         email: "getState.email",
//         password: "getState.password"
//     })
//     dispatch(login())
//
// }

export const callGetPosts =
    (getPostRequest: GetPostsRequest, postPageType: string): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch, getState) => {
            await getPosts(getPostRequest).then((res) => {
                console.log("call",getPostRequest)
                if(postPageType=="main") {
                    dispatch(getPostSuccess(res.data.posts))
                }else if(postPageType=="search") {
                    dispatch(getPostSearchSuccess(res.data.posts))
                }

            }).catch((error) => {

                console.log(error.response.data)
            })
        }


type PostAction =
    | ReturnType<typeof getPostSuccess>


type PostState = {
    posts: Array<PostPreview>,
    getPostRequest: GetPostsRequest
};

const initialState: PostState = {
    posts: [],
    getPostRequest: {
        endPostId: null,
        categoryId: null,
        isMyPost: false,
        searchBody: null
    }
};

function postReducer(
    state: PostState = initialState,
    action: PostAction
) {
    switch (action.type) {
        case GET_POST_SUCCESS:
            return {
                ...state,
                posts: action.posts,
                getPostRequest: {
                    ...state.getPostRequest,
                    endPostId: action.posts.length > 0 ? action.posts[action.posts.length - 1].postId : state.getPostRequest.endPostId
                }
            }
        default:
            return state
    }
}

export default postReducer;