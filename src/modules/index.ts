import loginReducer from "./login";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    loginReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;