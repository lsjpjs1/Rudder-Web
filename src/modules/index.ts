import loginReducer from "./login";
import {combineReducers} from "redux";
import postReducer from "./post";
import schoolReducer from "./school";

const rootReducer = combineReducers({
    loginReducer,
    postReducer,
    schoolReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;