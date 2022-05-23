import React from 'react';
import LoginForm from "./components/LoginForm";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./modules";
import {updateEmail, updatePassword} from "./modules/login";

const Home = () => {
    const login = useSelector((state: RootState) => state.login)
    const dispatch = useDispatch();

    const onEmailChange = (email: string) => {
        dispatch(updateEmail(email))
    }

    const onPasswordChange = (password: string) => {
        dispatch(updatePassword(password))
    }

    return (
        <div>
            <LoginForm email={login.email} password={login.password}
                       onEmailChange={onEmailChange} onPasswordChange={onPasswordChange}/>
        </div>
    );
};

export default Home;