import {ThunkAction} from "redux-thunk";
import {RootState} from "./index";
import {AnyAction} from "redux";
import {getPosts} from "../api/postApi";
import {getSchools} from "../api/schoolApi";

const GET_SCHOOL_SUCCESS = 'GET_SCHOOL_SUCCESS' as const;


export interface SchoolInfo {
    "schoolId": number,
    "schoolName": string
}


export const getSchoolSuccess = (schoolInfos : Array<SchoolInfo>) => ({
    type: GET_SCHOOL_SUCCESS,
    schoolInfos: schoolInfos
});

// export const callLogin = ()=> async dispatch => {
//     const loginResult = await loginApi({
//         email: "getState.email",
//         password: "getState.password"
//     })
//     dispatch(login())
//
// }

export const callGetSchools =
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch,getState) => {
            await getSchools({}).then((res)=>{
                dispatch(getSchoolSuccess(res.data.schools))
            }).catch((error)=>{
                console.log(error.response.data)
            })
        }



type SchoolAction =
    | ReturnType<typeof getSchoolSuccess>


type SchoolState = {
    schools: Array<SchoolInfo>
};

const initialState: SchoolState = {
    schools: [],
};

function schoolReducer(
    state: SchoolState = initialState,
    action: SchoolAction
) {
    switch (action.type) {
        case GET_SCHOOL_SUCCESS:
            return {...state, schools: action.schoolInfos}
        default:
            return state
    }
}

export default schoolReducer;