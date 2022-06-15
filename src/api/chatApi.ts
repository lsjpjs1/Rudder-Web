import axiosInstance from "./index";

export type GetChatRoomsRequest = {
};



export const getChatRooms = (getChatRoomsRequest: GetChatRoomsRequest) =>
    axiosInstance.get("/chat-rooms",
        { params: getChatRoomsRequest}
    )