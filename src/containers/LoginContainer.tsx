import React, {useEffect} from 'react';
import LoginForm from "../components/LoginForm";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules";
import {callLogin, updateEmail, updatePassword} from "../modules/login";
import CustomAlert from "../components/CustomAlert";
import {useNavigate } from 'react-router-dom';
import {callGetPosts} from "../modules/post";
const LoginContainer = () => {
    const email = useSelector((state: RootState) => state.loginReducer.email)
    const password = useSelector((state: RootState) => state.loginReducer.password)
    const errorMessage = useSelector((state: RootState) => state.loginReducer.errorMessage)
    const isLoginSuccess = useSelector((state: RootState) => state.loginReducer.isLoginSuccess)
    const isLoginFail = useSelector((state: RootState) => state.loginReducer.isLoginFail)
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const onEmailChange = (email: string) => {
        dispatch(updateEmail(email))
    }

    const onPasswordChange = (password: string) => {
        dispatch(updatePassword(password))
    }

    const onClickLogin = () => {
        // @ts-ignore
        dispatch(callLogin())
    }

    useEffect(() => {
        if(isLoginSuccess){
            navigate("/")
        }
    },[isLoginSuccess]);


    return (
        <div>
            <LoginForm email={email} password={password} isLoginSuccess={isLoginSuccess}
                       onEmailChange={onEmailChange} onPasswordChange={onPasswordChange} onClickLogin={onClickLogin} />
            {isLoginFail&&<CustomAlert message={errorMessage}></CustomAlert>}
        </div>
    );
};

export default LoginContainer;