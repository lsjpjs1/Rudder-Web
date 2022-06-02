import {getPosts, GetPostsRequest} from "../api/postApi";
import {ThunkAction} from "redux-thunk";
import {RootState} from "./index";
import {AnyAction} from "redux";
import {getPostSearchSuccess} from "./search";
import {getPostSuccess} from "./post";
export const ws = new WebSocket("ws://localhost:8080/ws/chat");

const SET_CHAT_MESSAGE = 'SET_CHAT_MESSAGE' as const;
const ADD_TALKS = 'ADD_TALKS' as const;




export const setChatMessage = (message : string) => ({
    type: SET_CHAT_MESSAGE,
    message: message
});

export const addTalks = (message : string) => ({
    type: ADD_TALKS,
    message: message
});

export const sendChat =
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
         async (dispatch, getState) => {
             // @ts-ignore
            await ws.send(getState().chatReducer.message)

        }


type ChatAction =
    | ReturnType<typeof setChatMessage>
    | ReturnType<typeof addTalks>


type ChatState = {
    message: string,
    talks: Array<String>
};

const initialState: ChatState = {
    message:"",
    talks:[]
};

function chatReducer(
    state: ChatState = initialState,
    action: ChatAction
) {
    switch (action.type) {
        case SET_CHAT_MESSAGE:
            return {
                ...state,
                message: action.message
            }
        case ADD_TALKS:
            return {
                ...state,
                talks: state.talks.concat(action.message)
            }
        default:
            return state
    }
}

export default chatReducer;