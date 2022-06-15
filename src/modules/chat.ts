import {getPosts, GetPostsRequest} from "../api/postApi";
import {ThunkAction} from "redux-thunk";
import {RootState} from "./index";
import {AnyAction} from "redux";
import {getPostSearchSuccess} from "./search";
import {getChatRooms, GetChatRoomsRequest} from "../api/chatApi";
import {client} from "../api/stomp";
import {IMessage} from "@stomp/stompjs";


const SET_CHAT_MESSAGE = 'SET_CHAT_MESSAGE' as const;
const ADD_TALKS = 'ADD_TALKS' as const;
const GET_CHAT_ROOMS_SUCCESS = 'GET_CHAT_ROOMS_SUCCESS' as const;
const GET_NEW_MESSAGE = 'GET_NEW_MESSAGE' as const;

export interface ChatRoom {
    "chatRoomId": number
    "recentMessage": string
    "recentMessageTime": number
    "notReadMessageCount": number
}

export interface CustomMessage {
    "sender": string
    "body": string
    "channelId": string
}



export const setChatMessage = (message: string) => ({
    type: SET_CHAT_MESSAGE,
    message: message
});

export const addTalks = (message: string) => ({
    type: ADD_TALKS,
    message: message
});

export const getChatRoomsSuccess = (chatRooms: Map<number,ChatRoom>) => ({
    type: GET_CHAT_ROOMS_SUCCESS,
    chatRooms: chatRooms
});

export const getNewMessage = (updateChatRooms: Map<number,ChatRoom>) => ({
    type: GET_NEW_MESSAGE,
    updateChatRooms: updateChatRooms
});

export const callGetChatRooms =
    (getChatRoomsRequest: GetChatRoomsRequest): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch, getState) => {
            await getChatRooms(getChatRoomsRequest).then((res) => {

                const chatRooms: Array<ChatRoom> = res.data.chatRooms;
                chatRooms.forEach(chatRoom =>
                    client.subscribe('/topic/' + chatRoom.chatRoomId,
                        (message: IMessage) => {
                            const customMessage:CustomMessage = JSON.parse(message.body);
                            const targetChatRoom = getState().chatReducer.chatRooms.get(parseInt(customMessage.channelId));
                            targetChatRoom.notReadMessageCount+=1
                            targetChatRoom.recentMessage=customMessage.body
                            const newChatRooms = new Map(getState().chatReducer.chatRooms)
                            newChatRooms.set(targetChatRoom.chatRoomId,targetChatRoom);
                            dispatch(getNewMessage(newChatRooms))
                        }
                    ))
                const chatRoomMap:Map<number,ChatRoom> = chatRooms.reduce((map, obj) => {
                    map.set(obj.chatRoomId, obj)
                    return map
                }, new Map);
                dispatch(getChatRoomsSuccess(chatRoomMap))
            }).catch((error) => {
                console.log(error.response.data)
            })
        }

export const sendChat =
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch, getState) => {
            // @ts-ignore
            await ws.send(getState().chatReducer.message)

        }


type ChatAction =
    | ReturnType<typeof setChatMessage>
    | ReturnType<typeof addTalks>
    | ReturnType<typeof getChatRoomsSuccess>
    | ReturnType<typeof getNewMessage>


type ChatState = {
    message: string,
    talks: Array<String>,
    chatRooms: Map<number,ChatRoom>
};

const initialState: ChatState = {
    message: "",
    talks: [],
    chatRooms: new Map()
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
        case GET_CHAT_ROOMS_SUCCESS:
            return {
                ...state,
                chatRooms: action.chatRooms
            }
        case GET_NEW_MESSAGE:
            return {
                ...state,
                chatRooms: action.updateChatRooms
            }
        default:
            return state
    }
}

export default chatReducer;