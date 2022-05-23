
const LOGIN = 'LOGIN' as const;
const UPDATE_EMAIL = 'UPDATE_EMAIL' as const;
const UPDATE_PASSWORD = 'UPDATE_PASSWORD' as const;

export const login = () => ({
    type: LOGIN
});

export const updateEmail = (email: string) => ({
    type: UPDATE_EMAIL,
    email: email
});

export const updatePassword = (password: string) => ({
    type: UPDATE_PASSWORD,
    password: password
});

type LoginAction =
    | ReturnType<typeof login>
    | ReturnType<typeof updateEmail>
    | ReturnType<typeof updatePassword>

type LoginState = {
    email: string,
    password: string
};

const initialState: LoginState = {
    email: "",
    password: ""
};

function loginReducer(
    state: LoginState = initialState,
    action: LoginAction
) {
    switch (action.type) {
        case LOGIN:
            return {...state}
        case UPDATE_EMAIL:
            console.log(action.email)
            return {...state,email:action.email}
        case UPDATE_PASSWORD:
            return {...state,password:action.password}
        default:
            return state
    }
}

export default loginReducer;