import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules";
import {useEffect} from "react";
import {getChatRooms} from "../api/chatApi";
import {callGetChatRooms} from "../modules/chat";


const ChatContainer = () => {

    const chatRooms = useSelector((state: RootState) => state.chatReducer.chatRooms)
    const dispatch = useDispatch()

    console.log(chatRooms.get(1))

    useEffect(()=>{
        // @ts-ignore
        dispatch(callGetChatRooms({}))
    },[])

    let elements = Array.from(chatRooms)
        .sort(([chatRoomNumber1,chatRoom1],[chatRoomNumber2,chatRoom2])=>chatRoom1.recentMessageTime>chatRoom2.recentMessageTime ? 1: -1
        )
        .map(([chatRoomId,chatRoom])=>(
        <div>
            {chatRoom.recentMessageTime}
            {chatRoom.recentMessage}
            {chatRoom.notReadMessageCount}
        </div>
    ));
    return (
        <div>
            {elements}
        </div>
    )
}

export default ChatContainer