import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addTalks, sendChat, setChatMessage, ws} from "../modules/chat";
import TextField from "@mui/material/TextField";
import {RootState} from "../modules";
import {useEffect} from "react";


const ChatContainer = () => {

    const talks = useSelector((state: RootState) => state.chatReducer.talks)
    const dispatch = useDispatch()
    const send = () => {
        // @ts-ignore
        dispatch(sendChat())
    }

    useEffect(()=>{
        ws.onmessage = (evt: MessageEvent) => {

            dispatch(addTalks(evt.data))
        };
    },[])

    let elements = talks.map((s)=>(
        <div>
            {s}
        </div>
    ));
    return (
        <div>

            <TextField
                onChange={(e)=>dispatch(setChatMessage(e.target.value))}
                ></TextField>
            <Button onClick={send}>send</Button>
            {elements}
        </div>
    )
}

export default ChatContainer