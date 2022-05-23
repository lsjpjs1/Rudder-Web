import login from "./login";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    login
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;