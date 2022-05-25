import {AnyAction} from "redux";
import {loginApi} from "../api/loginApi";
import {ThunkAction} from "redux-thunk";
import {RootState} from "./index";

const LOGIN = 'LOGIN' as const;
const LOGIN_FAIL = 'LOGIN_FAIL' as const;
const UPDATE_EMAIL = 'UPDATE_EMAIL' as const;
const UPDATE_PASSWORD = 'UPDATE_PASSWORD' as const;

export const login = () => ({
    type: LOGIN
});


export const loginFail = (errorMessage: string) => ({
    type: LOGIN_FAIL,
    errorMessage: errorMessage
});

export const updateEmail = (email: string) => ({
    type: UPDATE_EMAIL,
    email: email
});

export const updatePassword = (password: string) => ({
    type: UPDATE_PASSWORD,
    password: password
});

// export const callLogin = ()=> async dispatch => {
//     const loginResult = await loginApi({
//         email: "getState.email",
//         password: "getState.password"
//     })
//     dispatch(login())
//
// }

export const callLogin =
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch,getState) => {
            await loginApi({
                email: getState().loginReducer.email,
                password: getState().loginReducer.password
            }).then((res)=>{
                dispatch(login())
            }).catch((error)=>{
                dispatch(loginFail(error.response.data.message))
            })
        }


type LoginAction =
    | ReturnType<typeof login>
    | ReturnType<typeof updateEmail>
    | ReturnType<typeof updatePassword>
    | ReturnType<typeof loginFail>

type LoginState = {
    email: string,
    password: string,
    errorMessage: string,
    isLoginSuccess: boolean,
    isLoginFail: boolean,
};

const initialState: LoginState = {
    email: "",
    password: "",
    errorMessage: "",
    isLoginSuccess: false,
    isLoginFail: false,
};

function loginReducer(
    state: LoginState = initialState,
    action: LoginAction
) {
    switch (action.type) {
        case LOGIN:
            console.log(state.password,state.email)
            return {...state, isLoginSuccess: true}
        case UPDATE_EMAIL:
            return {...state, email: action.email}
        case UPDATE_PASSWORD:
            return {...state, password: action.password}
        case LOGIN_FAIL:
            return {...state, isLoginFail: true, errorMessage: action.errorMessage}
        default:
            return state
    }
}

export default loginReducer;