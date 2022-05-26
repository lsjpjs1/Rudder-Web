import loginReducer from "./login";
import {combineReducers} from "redux";
import postReducer from "./post";

const rootReducer = combineReducers({
    loginReducer,
    postReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;