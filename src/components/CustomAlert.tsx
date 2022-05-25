import Alert from '@mui/material/Alert';

type AlertProps = {
    message: string;
    visibility: boolean;
}


const CustomAlert = (alertProps: AlertProps) =>{

    return (
        <Alert hidden={!alertProps.visibility} severity="error">{alertProps.message}</Alert>
    );
}


export default CustomAlert