import {ThunkAction} from "redux-thunk";
import {RootState} from "./index";
import {AnyAction} from "redux";
import {getPosts} from "../api/postApi";

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


export const getPostSuccess = (posts : Array<PostPreview>) => ({
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
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch,getState) => {
            await getPosts({}).then((res)=>{
                dispatch(getPostSuccess(res.data.posts))
            }).catch((error)=>{

               console.log(error.response.data)
            })
        }



type PostAction =
    | ReturnType<typeof getPostSuccess>


type PostState = {
    posts: Array<PostPreview>
};

const initialState: PostState = {
    posts: [],
};

function postReducer(
    state: PostState = initialState,
    action: PostAction
) {
    switch (action.type) {
        case GET_POST_SUCCESS:
            return {...state, posts: action.posts}
        default:
            return state
    }
}

export default postReducer;