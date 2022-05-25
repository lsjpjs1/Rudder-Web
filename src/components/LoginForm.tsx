import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";

type LoginProps = {
    email: string;
    password: string;
    isLoginSuccess: boolean;
    onEmailChange: (email: string) => void;
    onPasswordChange: (password: string) => void;
    onClickLogin: () => void ;
}

const LoginForm = (loginProps: LoginProps) =>{

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" label="Email" variant="outlined"
                       onChange={(event)=>loginProps.onEmailChange(event.target.value)} />
            <br/>
            <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={(event)=>loginProps.onPasswordChange(event.target.value)}
            />
            <br/>
            <Button variant="contained" onClick={loginProps.onClickLogin}>Login</Button>
        </Box>
    );
}


export default LoginForm