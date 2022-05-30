import {ThunkAction} from "redux-thunk";
import {RootState} from "./index";
import {AnyAction} from "redux";
import {getPosts, GetPostsRequest, getPostDetail} from "../api/postApi";
import {getPostSearchSuccess} from "./search";

const GET_POST_SUCCESS = 'GET_POST_SUCCESS' as const;

const GET_POST_DETAIL_SUCCESS = 'GET_POST_DETAIL_SUCCESS' as const;

const CLICK_POST = 'CLICK_POST' as const;

const SHOW_POST_RESTORE = 'SHOW_POST_RESTORE' as const;


export interface PostPreview {
    "categoryAbbreviation": string,
    "categoryId": number,
    "categoryName": string,
    "commentCount": number,
    "imageUrls": Array<string>,
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

export interface PostDetailType {
    "categoryAbbreviation": string,
    "categoryId": number,
    "categoryName": string,
    "commentCount": number,
    "imageUrls": Array<string>,
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

export const getPostDetailSuccess = (postDetail : PostDetailType) => ({
    type: GET_POST_DETAIL_SUCCESS,
    postDetail: postDetail
});

export const clickPost = (postPreview: PostPreview) => ({
    type: CLICK_POST,
    postPreview: postPreview
});

export const showPostRestore = () => ({
    type: SHOW_POST_RESTORE
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
export const callGetPostDetail =
    (postId: number): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch,getState) => {
            await getPostDetail({postId: postId}).then((res)=>{
                console.log(res.data)
                dispatch(getPostDetailSuccess(res.data))
            }).catch((error)=>{
                console.log(error.response.data)
            })
        }


type PostAction =
    | ReturnType<typeof getPostSuccess>
    | ReturnType<typeof clickPost>
    | ReturnType<typeof showPostRestore>
    | ReturnType<typeof getPostDetailSuccess>


type PostState = {
    posts: Array<PostPreview>,
    selectedPost: PostPreview,
    showPostFlag: boolean,
    selectedPostDetail: PostDetailType,
    getPostRequest: GetPostsRequest
};

const initialState: PostState = {
    posts: [],
    selectedPost: {} as PostPreview,
    showPostFlag: false,
    selectedPostDetail: {} as PostDetailType,
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
        case CLICK_POST:
            return {...state, selectedPost: action.postPreview, showPostFlag: true}
        case SHOW_POST_RESTORE:
            return {...state, showPostFlag: false}
        case GET_POST_DETAIL_SUCCESS:
            return {...state, selectedPostDetail: action.postDetail}
        default:
            return state
    }
}

export default postReducer;