import loginReducer from "./login";
import {combineReducers} from "redux";
import postReducer from "./post";
import schoolReducer from "./school";
import searchReducer from "./search";

const rootReducer = combineReducers({
    loginReducer,
    postReducer,
    schoolReducer,
    searchReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;